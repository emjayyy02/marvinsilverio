const { chromium } = require('C:/Users/silve/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5175';
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Users/silve/.cache/puppeteer/chrome/win64-152.0.7977.54/chrome-win64/chrome.exe', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await context.addInitScript(() => { window.__plays = 0; const play = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function (...args) { window.__plays++; return play.apply(this, args) }; });
  const page = await context.newPage(); const errors = [], checks = [];
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  const frame = page.locator('#featured-build article .aspect-\\[2\\/1\\]');
  const video = page.locator('#featured-build video');
  async function load(query = '') { await page.mouse.move(0, 0); await page.goto(url + '/' + query); await frame.scrollIntoViewIfNeeded(); await video.evaluate(v => v.readyState >= 1 || new Promise(r => v.addEventListener('loadedmetadata', r, { once: true }))); }
  const baseline = JSON.parse(fs.readFileSync('.qa/panoptes-video/baseline.json'));
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 }); await load('?motion=reduce');
    const measured = await page.evaluate(() => { const rect = s => { const r = document.querySelector(s).getBoundingClientRect(); return { width: r.width, height: r.height } }; return { card: rect('#featured-build article'), frame: rect('#featured-build article .aspect-\\[2\\/1\\]'), overflow: document.documentElement.scrollWidth > innerWidth } });
    const old = baseline.find(b => b.width === width); assert.deepEqual(measured.card, old.card); assert.deepEqual(measured.frame, old.frame); assert.equal(measured.overflow, false);
  }
  checks.push('Original frame/card dimensions preserved at 320/375/768/1024/1440px');
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const point of ['top-left-padding', 'top-right-padding', 'bottom-left-padding', 'bottom-right-padding', 'center']) {
    await load(); assert(await video.evaluate(v => v.paused && v.currentTime === 0 && !v.autoplay));
    const button = page.getByRole('button', { name: 'Play Panoptes OS video preview' });
    assert((await button.innerText()).includes('Hover to preview'));
    const microcopy = button.locator('span').filter({ hasText: /^Hover to previewPlay preview$/ });
    assert.equal(await microcopy.evaluate(el => getComputedStyle(el).backgroundColor), 'rgba(0, 0, 0, 0)');
    const r = await frame.boundingBox();
    await page.mouse.move(point.includes('right') ? r.x + r.width - 3 : point.includes('left') ? r.x + 3 : r.x + r.width / 2, point.includes('bottom') ? r.y + r.height - 3 : point.includes('top') ? r.y + 3 : r.y + r.height / 2);
    await page.waitForFunction(() => { const v = document.querySelector('video'); return !v.paused && v.currentTime > 0.1 && v.muted && v.controls });
    assert.equal(await page.evaluate(() => window.__plays), 1); checks.push(`No-click muted first start: ${point}`);
  }
  const time = await video.evaluate(v => v.currentTime); await page.mouse.move(0, 0); await page.waitForTimeout(300); assert(await video.evaluate((v, t) => !v.paused && v.currentTime > t, time)); checks.push('Mouse leave keeps playing');
  await video.hover(); const cdp = await context.newCDPSession(page); const { root } = await cdp.send('DOM.getDocument', { depth: -1, pierce: true }); const nodes = [];
  function walk(n) { if (n.nodeName === 'INPUT') nodes.push(n); for (const c of [...(n.children || []), ...(n.shadowRoots || [])]) walk(c) } walk(root);
  async function nativeClick(pseudo, fraction = 0.5) { await video.hover(); const n = nodes.find(n => (n.attributes || []).includes(pseudo) && !(n.attributes || []).includes('true')); assert(n); const { model } = await cdp.send('DOM.getBoxModel', { nodeId: n.nodeId }); const q = model.content; await page.mouse.click(q[0] + (q[2] - q[0]) * fraction, (q[1] + q[5]) / 2) }
  await nativeClick('-webkit-media-controls-play-button'); await page.waitForFunction(() => document.querySelector('video').paused);
  await page.mouse.move(0, 0); await frame.hover(); await page.waitForTimeout(200); assert(await video.evaluate(v => v.paused)); assert.equal(await page.evaluate(() => window.__plays), 1); checks.push('Native Pause persists through leave/re-enter');
  await nativeClick('-webkit-media-controls-play-button'); await page.waitForFunction(() => !document.querySelector('video').paused); checks.push('Native Play resumes');
  await nativeClick('-webkit-media-controls-mute-button'); await page.waitForFunction(() => !document.querySelector('video').muted); checks.push('Native unmute works');
  await nativeClick('-webkit-media-controls-timeline', 0.55); await page.waitForFunction(() => document.querySelector('video').currentTime > 15); checks.push('Native progress bar pointer seek works');
  await video.evaluate(v => v.currentTime = 34.8); await page.waitForFunction(() => { const v = document.querySelector('video'); return v.currentTime < 3 && !v.paused }); checks.push('Loop after activation works');
  await page.emulateMedia({ reducedMotion: 'reduce' }); await load(); await frame.hover(); await page.waitForFunction(() => { const v = document.querySelector('video'); return !v.paused && v.muted && v.controls }); assert.equal(await page.evaluate(() => window.__plays), 1); checks.push('OS reduced motion still allows first-hover muted playback, as requested');
  await video.focus(); await page.keyboard.press('Space'); await page.waitForFunction(() => document.querySelector('video').paused); await page.mouse.move(0, 0); await frame.hover(); assert(await video.evaluate(v => v.paused)); checks.push('Reduced-motion manual pause also persists on re-enter');
  await load('?motion=reduce'); await frame.hover(); await page.waitForFunction(() => !document.querySelector('video').paused); checks.push('Site reduced-motion path still allows first-hover playback');
  await load('?motion=reduce');
  const play = page.getByRole('button', { name: 'Play Panoptes OS video preview' }); await play.focus(); await play.press('Enter'); await page.waitForFunction(() => !document.querySelector('video').paused); assert(await video.evaluate(v => document.activeElement === v)); checks.push('Keyboard Enter starts; focus transfers to native player');
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }); const mp = await mobile.newPage(); await mp.goto(url + '/'); const mb = mp.getByRole('button', { name: 'Play Panoptes OS video preview' }); await mb.scrollIntoViewIfNeeded(); assert(await mp.locator('video').evaluate(v => v.paused)); await mb.tap(); await mp.waitForFunction(() => { const v = document.querySelector('video'); return !v.paused && v.muted && v.controls }); checks.push('Touch tap starts muted inline playback'); await mobile.close();
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await load(); await page.waitForFunction(() => getComputedStyle(document.querySelector('#featured-build article').parentElement).opacity === '1'); await page.locator('#featured-build article').screenshot({ path: '.qa/panoptes-video/hover-patch-desktop.png' });
  assert.deepEqual(errors, []); checks.push('No autoplay on page load or console errors');
  fs.writeFileSync('.qa/panoptes-video/hover-patch.json', JSON.stringify({ url, engine: 'Chrome 152 / Playwright', checks, errors, physicalTouch: 'not tested' }, null, 2) + '\n');
  console.log(checks.join('\n')); await browser.close();
})().catch(e => { console.error(e); process.exit(1) });
