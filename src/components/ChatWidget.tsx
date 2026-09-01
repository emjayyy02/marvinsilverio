import { type FormEvent, useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { content } from '../data/content'
import { Icon } from './Icon'
import { usePrefersReducedMotion } from '../lib/motionPreference'
import { motionDuration, motionEase } from '../lib/motionTokens'
import {
  buildConversationWindow,
  PortfolioAssistantRequestError,
  streamPortfolioAssistantResponse,
  type ChatMessage,
} from '../lib/portfolioAssistant'

const INITIAL_RESPONSE_TIMEOUT_MS = 30_000
const STREAM_INACTIVITY_TIMEOUT_MS = 25_000
const ABSOLUTE_REQUEST_TIMEOUT_MS = 90_000

const assistantMarkdownComponents: Components = {
  p: ({ children }) => <p className="[&:not(:first-child)]:mt-2">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  h1: ({ children }) => <strong className="mt-2 block font-semibold first:mt-0">{children}</strong>,
  h2: ({ children }) => <strong className="mt-2 block font-semibold first:mt-0">{children}</strong>,
  h3: ({ children }) => <strong className="mt-2 block font-semibold first:mt-0">{children}</strong>,
  h4: ({ children }) => <strong className="mt-2 block font-semibold first:mt-0">{children}</strong>,
  h5: ({ children }) => <strong className="mt-2 block font-semibold first:mt-0">{children}</strong>,
  h6: ({ children }) => <strong className="mt-2 block font-semibold first:mt-0">{children}</strong>,
  ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ children, className }) => (
    <code className={`rounded-card bg-surface px-1 py-0.5 font-mono text-[0.85em] ${className ?? ''}`}>
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-card bg-surface p-3 font-mono text-xs leading-5 [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-border underline-offset-2 hover:decoration-foreground"
    >
      {children}
    </a>
  ),
}

type ActiveRequest = {
  controller: AbortController
  id: number
  initialTimeoutId: number | null
  inactivityTimeoutId: number | null
  absoluteTimeoutId: number | null
}

function clearRequestTimers(request: ActiveRequest) {
  if (request.initialTimeoutId !== null) {
    window.clearTimeout(request.initialTimeoutId)
    request.initialTimeoutId = null
  }
  if (request.inactivityTimeoutId !== null) {
    window.clearTimeout(request.inactivityTimeoutId)
    request.inactivityTimeoutId = null
  }
  if (request.absoluteTimeoutId !== null) {
    window.clearTimeout(request.absoluteTimeoutId)
    request.absoluteTimeoutId = null
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryMessages, setRetryMessages] = useState<ChatMessage[] | null>(null)
  const [isMobileModal, setIsMobileModal] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const shouldReduceMotion = usePrefersReducedMotion()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)
  const sendingRef = useRef(false)
  const isMountedRef = useRef(true)
  const requestIdRef = useRef(0)
  const activeRequestRef = useRef<ActiveRequest | null>(null)
  const panelId = useId()
  const headingId = useId()
  const descriptionId = useId()

  const closePanel = useCallback((restoreFocus = true) => {
    setIsOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus())
    }
  }, [])

  const openPanel = () => {
    shouldAutoScrollRef.current = true
    setIsOpen(true)
  }

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      requestIdRef.current += 1

      const activeRequest = activeRequestRef.current
      if (activeRequest) {
        clearRequestTimers(activeRequest)
        activeRequest.controller.abort()
        activeRequestRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handleChange = () => setIsMobileModal(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    if (sendingRef.current) {
      closeButtonRef.current?.focus()
    } else {
      inputRef.current?.focus()
    }
    const previousOverflow = document.body.style.overflow
    if (isMobileModal) document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePanel()
        return
      }

      if (event.key === 'Tab' && isMobileModal && panelRef.current) {
        const focusableElements = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'),
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements.at(-1)

        if (!firstElement || !lastElement) return
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closePanel, isMobileModal, isOpen])

  useEffect(() => {
    if (!isOpen || !shouldAutoScrollRef.current) return

    messagesEndRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [error, isOpen, isSending, messages, shouldReduceMotion])

  const panelMotion = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.98 },
      }

  const runAssistantRequest = async (requestMessages: readonly ChatMessage[]) => {
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    const controller = new AbortController()
    let didTimeout = false
    let receivedAssistantContent = false
    const activeRequest: ActiveRequest = {
      controller,
      id: requestId,
      initialTimeoutId: null,
      inactivityTimeoutId: null,
      absoluteTimeoutId: null,
    }
    activeRequestRef.current = activeRequest

    const isCurrentRequest = () => (
      isMountedRef.current
      && requestIdRef.current === requestId
      && activeRequestRef.current?.id === requestId
    )

    const abortCurrentRequestForTimeout = () => {
      if (!isCurrentRequest()) return

      didTimeout = true
      clearRequestTimers(activeRequest)
      controller.abort()
    }

    const startInactivityTimer = () => {
      if (activeRequest.inactivityTimeoutId !== null) {
        window.clearTimeout(activeRequest.inactivityTimeoutId)
      }
      activeRequest.inactivityTimeoutId = window.setTimeout(
        abortCurrentRequestForTimeout,
        STREAM_INACTIVITY_TIMEOUT_MS,
      )
    }

    activeRequest.initialTimeoutId = window.setTimeout(
      abortCurrentRequestForTimeout,
      INITIAL_RESPONSE_TIMEOUT_MS,
    )
    activeRequest.absoluteTimeoutId = window.setTimeout(
      abortCurrentRequestForTimeout,
      ABSOLUTE_REQUEST_TIMEOUT_MS,
    )

    try {
      await streamPortfolioAssistantResponse(requestMessages, (chunk) => {
        if (!isCurrentRequest()) return

        if (chunk.trim()) {
          receivedAssistantContent = true

          if (activeRequest.initialTimeoutId !== null) {
            window.clearTimeout(activeRequest.initialTimeoutId)
            activeRequest.initialTimeoutId = null
          }
          startInactivityTimer()
        }

        setMessages((currentMessages) => {
          const assistantMessage = currentMessages.at(-1)
          if (assistantMessage?.role !== 'assistant') return currentMessages

          return [
            ...currentMessages.slice(0, -1),
            { ...assistantMessage, content: assistantMessage.content + chunk },
          ]
        })
      }, { signal: controller.signal })
    } catch (requestError) {
      if (import.meta.env.DEV) {
        console.error('[portfolio assistant] Request failed.', requestError)
      }

      if (!isCurrentRequest()) return

      if (!receivedAssistantContent) {
        setMessages((currentMessages) => {
          const assistantMessage = currentMessages.at(-1)
          return assistantMessage?.role === 'assistant' && !assistantMessage.content.trim()
            ? currentMessages.slice(0, -1)
            : currentMessages
        })
        setRetryMessages([...requestMessages])
      } else {
        setRetryMessages(null)
      }

      if (receivedAssistantContent) {
        setError(content.chat.interruptedErrorMessage)
      } else if (didTimeout) {
        setError(content.chat.timeoutErrorMessage)
      } else if (requestError instanceof PortfolioAssistantRequestError && requestError.code === 'rate-limit') {
        setError(content.chat.rateLimitErrorMessage)
      } else {
        setError(content.chat.errorMessage)
      }
    } finally {
      clearRequestTimers(activeRequest)

      if (isCurrentRequest()) {
        activeRequestRef.current = null
        sendingRef.current = false
        setIsSending(false)
      }
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userMessage = draft.trim()

    if (!userMessage || sendingRef.current) return

    const requestMessages = buildConversationWindow(messages, userMessage)
    sendingRef.current = true
    shouldAutoScrollRef.current = true
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' },
    ])
    setDraft('')
    setError(null)
    setRetryMessages(null)
    setIsSending(true)
    void runAssistantRequest(requestMessages)
  }

  const handleRetry = () => {
    if (!retryMessages || sendingRef.current) return

    const failedRequestMessages = [...retryMessages]
    sendingRef.current = true
    shouldAutoScrollRef.current = true
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'assistant', content: '' },
    ])
    setError(null)
    setRetryMessages(null)
    setIsSending(true)
    void runAssistantRequest(failedRequestMessages)
  }

  const handleNewConversation = () => {
    requestIdRef.current += 1

    const activeRequest = activeRequestRef.current
    if (activeRequest) {
      clearRequestTimers(activeRequest)
      activeRequest.controller.abort()
      activeRequestRef.current = null
    }

    sendingRef.current = false
    shouldAutoScrollRef.current = true
    setMessages([])
    setDraft('')
    setError(null)
    setRetryMessages(null)
    setIsSending(false)

    window.requestAnimationFrame(() => {
      if (conversationRef.current) conversationRef.current.scrollTop = 0
      inputRef.current?.focus()
    })
  }

  const handleConversationScroll = () => {
    const conversation = conversationRef.current
    if (!conversation) return

    const distanceFromBottom = conversation.scrollHeight - conversation.scrollTop - conversation.clientHeight
    shouldAutoScrollRef.current = distanceFromBottom < 48
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-[55] bg-black/20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : motionDuration.fast }}
            />
            <motion.div
              {...panelMotion}
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal={isMobileModal ? true : undefined}
              aria-labelledby={headingId}
              aria-describedby={descriptionId}
              data-lenis-prevent
              className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-[60] flex h-[30rem] max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card md:inset-x-auto md:right-6 md:w-[22rem]"
              transition={{ duration: shouldReduceMotion ? 0 : motionDuration.normal, ease: motionEase.out }}
            >
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative size-10 shrink-0">
                    <img
                      src={content.chat.avatar.src}
                      alt={content.chat.avatar.alt}
                      className="size-10 rounded-full border border-border object-cover"
                    />
                    <span aria-hidden="true" className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-surface bg-emerald-500" />
                  </span>
                  <div className="min-w-0">
                    <h2 id={headingId} className="text-base font-medium tracking-[-0.02em] text-foreground">{content.chat.heading}</h2>
                    <p id={descriptionId} className="mt-0.5 truncate text-xs text-muted-foreground">{content.chat.description}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={handleNewConversation}
                    title={content.chat.newConversationLabel}
                    aria-label={content.chat.newConversationLabel}
                    className="interactive-control rounded-card px-2 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    New
                  </button>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => closePanel()}
                    aria-label={content.chat.closeLabel}
                    className="interactive-control grid size-9 shrink-0 place-items-center rounded-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Icon name="close" />
                  </button>
                </div>
              </div>

              <div
                ref={conversationRef}
                className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5"
                aria-live="polite"
                aria-busy={isSending}
                onScroll={handleConversationScroll}
              >
                <div className="flex max-w-[18rem] items-start gap-3">
                  <img
                    src={content.chat.avatar.src}
                    alt=""
                    className="size-8 shrink-0 rounded-full border border-border object-cover"
                  />
                  <p className="rounded-card bg-muted px-3.5 py-3 text-sm leading-6 text-foreground">
                    {content.chat.greeting}
                  </p>
                </div>

                {messages.map((message, index) => (
                  message.role === 'assistant' ? (
                    <div key={`${message.role}-${index}`} className="flex max-w-[18rem] items-start gap-3">
                      <img
                        src={content.chat.avatar.src}
                        alt=""
                        className="size-8 shrink-0 rounded-full border border-border object-cover"
                      />
                      <div className="min-w-0 rounded-card bg-muted px-3.5 py-3 text-sm leading-6 text-foreground">
                        {message.content ? (
                          <ReactMarkdown
                            skipHtml
                            components={assistantMarkdownComponents}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : content.chat.thinkingMessage}
                      </div>
                    </div>
                  ) : (
                    <div key={`${message.role}-${index}`} className="flex justify-end">
                      <p className="max-w-[16rem] rounded-card bg-primary px-3.5 py-3 text-sm leading-6 text-primary-foreground">{message.content}</p>
                    </div>
                  )
                ))}

                {error && (
                  <div role="status" className="flex items-center justify-between gap-3 text-xs leading-5 text-muted-foreground">
                    <p>{error}</p>
                    {retryMessages && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="interactive-control shrink-0 rounded-card border border-border bg-surface px-2.5 py-1 font-medium text-foreground hover:bg-muted"
                      >
                        {content.chat.retryLabel}
                      </button>
                    )}
                  </div>
                )}
                <div ref={messagesEndRef} aria-hidden="true" className="h-px" />
              </div>

              <form onSubmit={handleSubmit} className="flex min-w-0 shrink-0 items-end gap-2 border-t border-border bg-muted/40 p-4">
                <div className="min-w-0 flex-1">
                  <label htmlFor="portfolio-chat-message" className="sr-only">Message M</label>
                  <input
                    ref={inputRef}
                    id="portfolio-chat-message"
                    type="text"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    disabled={isSending}
                    placeholder={content.chat.inputPlaceholder}
                    maxLength={750}
                    className="min-h-11 w-full min-w-0 rounded-card border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending || !draft.trim()}
                  aria-label="Send message"
                  className="interactive-control button-primary grid size-11 shrink-0 place-items-center rounded-card bg-primary text-primary-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <Icon name="arrow" className="size-4 -rotate-45" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={openPanel}
        aria-label={content.chat.triggerLabel}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className="interactive-control button-primary fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-[65] inline-flex size-11 items-center justify-center gap-2 rounded-full border border-border bg-primary p-0 text-sm font-medium text-primary-foreground shadow-card md:h-11 md:w-auto md:px-4"
      >
        <Icon name="message" className="size-4" />
        <span className="hidden md:inline">{content.chat.triggerLabel}</span>
      </button>
    </>
  )
}
