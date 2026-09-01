export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export class PortfolioAssistantRequestError extends Error {
  readonly code: 'rate-limit' | 'request'

  constructor(code: 'rate-limit' | 'request', message: string) {
    super(message)
    this.name = 'PortfolioAssistantRequestError'
    this.code = code
  }
}

const MAX_CONVERSATION_MESSAGES = 10
const MAX_MESSAGE_LENGTH = 750

type SseChunk = {
  response?: unknown
}

type SseStreamParser = {
  push: (text: string) => boolean
  finish: () => boolean
}

export function buildConversationWindow(
  existingMessages: readonly ChatMessage[],
  currentUserMessage: string,
  maxMessages = MAX_CONVERSATION_MESSAGES,
): ChatMessage[] {
  const normalizedCurrentMessage = currentUserMessage.trim().slice(0, MAX_MESSAGE_LENGTH)
  if (!normalizedCurrentMessage) return []

  const completedMessages = existingMessages.flatMap((message) => {
    if (message.role !== 'user' && message.role !== 'assistant') return []

    const content = message.content.trim().slice(0, MAX_MESSAGE_LENGTH)
    return content ? [{ role: message.role, content } satisfies ChatMessage] : []
  })
  const windowSize = Math.max(1, Math.floor(maxMessages))

  return [
    ...completedMessages,
    { role: 'user', content: normalizedCurrentMessage } satisfies ChatMessage,
  ].slice(-windowSize)
}

export function createSseStreamParser(onChunk: (chunk: string) => void): SseStreamParser {
  let buffer = ''
  let accumulatedResponse = ''
  let isDone = false

  const processLine = (line: string) => {
    const normalizedLine = line.trimEnd()
    if (!normalizedLine.startsWith('data:')) return

    const raw = normalizedLine.slice(5).trim()
    if (!raw) return
    if (raw === '[DONE]') {
      isDone = true
      return
    }

    try {
      const chunk = JSON.parse(raw) as SseChunk
      if (typeof chunk.response === 'string') {
        accumulatedResponse += chunk.response
        onChunk(chunk.response)
      }
    } catch {
      // Ignore a malformed event so later valid stream events can still render.
    }
  }

  const push = (text: string) => {
    if (isDone || !text) return isDone

    buffer += text
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      processLine(line)
      if (isDone) break
    }

    return isDone
  }

  const finish = () => {
    if (!isDone && buffer) {
      processLine(buffer)
    }
    buffer = ''
    return accumulatedResponse.trim().length > 0
  }

  return { push, finish }
}

function getServerErrorDetail(text: string): string | null {
  try {
    const body = JSON.parse(text) as { error?: unknown }
    return typeof body.error === 'string' ? body.error : null
  } catch {
    return null
  }
}

export async function streamPortfolioAssistantResponse(
  messages: readonly ChatMessage[],
  onChunk: (chunk: string) => void,
  options: { signal?: AbortSignal } = {},
): Promise<void> {
  const apiUrl = import.meta.env.VITE_PORTFOLIO_ASSISTANT_API_URL?.trim()

  if (!apiUrl) {
    throw new Error('VITE_PORTFOLIO_ASSISTANT_API_URL is missing or empty.')
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    signal: options.signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  })

  if (!response.ok) {
    const responseText = await response.text()
    const serverDetail = getServerErrorDetail(responseText)
    const detail = serverDetail ? `Assistant request failed: ${serverDetail}` : `Assistant request failed with status ${response.status}.`

    throw new PortfolioAssistantRequestError(response.status === 429 ? 'rate-limit' : 'request', detail)
  }

  if (!response.body) {
    throw new Error('Assistant response did not include a readable stream.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  const parser = createSseStreamParser(onChunk)

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const reachedDoneEvent = parser.push(decoder.decode(value, { stream: true }))
      if (reachedDoneEvent) break
    }

    parser.push(decoder.decode())
  } finally {
    reader.releaseLock()
  }

  if (!parser.finish()) {
    throw new Error('Assistant response did not contain valid message content.')
  }
}
