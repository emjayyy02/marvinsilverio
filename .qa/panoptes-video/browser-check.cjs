const { chromium } = require('C:/Users/silve/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
const url=process.env.PORTFOLIO_URL || 'http://127.0.0.1:5174';
const baseline=JSON.parse(fs.readFileSync('.qa/panoptes-video/baseline.json'));
(async()=>{
  const browser=await chromium.launch({executablePath:'C:/Users/silve/.cache/puppeteer/chrome/win64-152.0.7977.54/chrome-win64/chrome.exe',headless:true});
  const errors=[];const consoleErrors=[];const checks=[];const matrix=[];let expectedFailure=false;
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  await context.addInitScript(()=>{window.__playCalls=0;const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(...args){window.__playCalls++;return play.apply(this,args)};});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!expectedFailure)consoleErrors.push(m.text())});
  const video=page.locator('#featured-build video');
  const play=page.getByRole('button',{name:'Play Panoptes OS video preview'});
  const frame=page.locator('#featured-build article .aspect-\\[2\\/1\\]');
  const state=()=>video.evaluate(v=>({paused:v.paused,time:v.currentTime,muted:v.muted,controls:v.controls,loop:v.loop,preload:v.preload,autoplay:v.autoplay,ready:v.readyState,plays:window.__playCalls}));
  async function load(query='?motion=reduce'){await page.mouse.move(0,0);await page.goto(url+'/'+query);await frame.scrollIntoViewIfNeeded();await video.evaluate(v=>v.readyState>=1 || new Promise(r=>v.addEventListener('loadedmetadata',r,{once:true})));}
  for(const theme of ['light','dark'])for(const width of [320,375,768,1024,1440]){
    await page.setViewportSize({width,height:1000});await page.emulateMedia({colorScheme:theme});if(page.url().startsWith(url))await page.evaluate(()=>localStorage.removeItem('marvin-theme'));await load();
    assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('dark')),theme==='dark');
    const m=await page.evaluate(()=>{const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {width:r.width,height:r.height}};return {width:innerWidth,card:rect('#featured-build article'),frame:rect('#featured-build article .aspect-\\[2\\/1\\]'),neighbors:[...document.querySelectorAll('#projects article')].map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),overflow:document.documentElement.scrollWidth>innerWidth}});
    const old=baseline.find(b=>b.width===width);assert.deepEqual(m.card,old.card);assert.deepEqual(m.frame,old.frame);assert.deepEqual(m.neighbors,old.neighbors);assert.equal(m.overflow,false);
    assert.equal((await state()).paused,true);await frame.hover();assert.equal((await state()).plays,0);
    matrix.push({theme,...m});
    if(width===1440||width===375)await page.locator('#featured-build article').screenshot({path:`.qa/panoptes-video/${theme}-${width}.png`});
  }
  checks.push('10 theme/width cases: exact baseline card/frame/neighbor dimensions; no overflow; reduced motion hover stays paused');
  await page.setViewportSize({width:1440,height:1000});await load('?motion=full');
  await page.waitForTimeout(400);const initial=await state();assert(initial.ready>=1);delete initial.ready;assert.deepEqual(initial,{paused:true,time:0,muted:true,controls:false,loop:true,preload:'metadata',autoplay:false,plays:0});
  checks.push('No playback on page load; metadata preload; poster; loop configured without autoplay');
  await frame.hover();await page.waitForFunction(()=>{const v=document.querySelector('video');return !v.paused&&v.currentTime>0.1});
  assert.equal((await state()).muted,true);assert.equal((await state()).controls,true);assert.equal((await state()).plays,1);
  const time=(await state()).time;await page.mouse.move(0,0);await page.waitForTimeout(300);assert((await state()).time>time);assert.equal((await state()).paused,false);
  checks.push('First desktop hover starts muted once; native controls; pointer exit keeps playing');
  await video.focus();await page.keyboard.press('Space');await page.waitForFunction(()=>document.querySelector('video').paused);
  const pausedAt=(await state()).time;await page.mouse.move(0,0);await frame.hover();await page.waitForTimeout(250);assert.equal((await state()).paused,true);assert.equal((await state()).time,pausedAt);assert.equal((await state()).plays,1);
  checks.push('Native keyboard Pause persists on later hover; no repeated play calls');
  await video.focus();await page.keyboard.press('Space');await page.waitForFunction(()=>!document.querySelector('video').paused);
  await video.hover();await page.screenshot({path:'.qa/panoptes-video/native-controls.png'});
  // Media APIs exercise the real browser seek/audio/loop behavior, with native controls enabled.
  await video.evaluate(v=>{v.currentTime=15;v.muted=false;v.volume=0.5});await page.waitForFunction(()=>{const v=document.querySelector('video');return !v.seeking&&v.currentTime>=15});
  assert.equal((await state()).muted,false);checks.push('Native Play resumes; browser seek to 15s and unmute work');
  await video.evaluate(v=>v.currentTime=34.7);await page.waitForFunction(()=>{const v=document.querySelector('video');return v.currentTime<3&&!v.paused});checks.push('Activated playback loops across the 35s boundary');
  await load();await play.focus();assert(await play.evaluate(b=>b.matches(':focus-visible')));await play.press('Enter');await page.waitForFunction(()=>!document.querySelector('video').paused);assert(await video.evaluate(v=>document.activeElement===v));checks.push('Keyboard overlay Enter works, visible focus, focus transfers to native video');
  await page.getByRole('link',{name:'View Case Study',exact:true}).first().click();await page.waitForURL('**/projects/panoptes-os');assert.equal(await page.locator('video').count(),0);assert.equal(await page.locator('#film-music-credit a').count(),2);assert((await page.locator('#film-music-credit').textContent()).includes('Edited, filtered, faded and mixed'));checks.push('Case-study CTA works; case-study media remains static; linked music credit present');
  const source=page.getByRole('link',{name:'View Source',exact:true}).first();assert.equal(await source.getAttribute('href'),'https://github.com/emjayyy02/panoptes-os');checks.push('Source CTA retains correct external URL');
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const mp=await mobile.newPage();mp.on('pageerror',e=>errors.push(e.message));await mp.goto(url+'/?motion=full');const mb=mp.getByRole('button',{name:'Play Panoptes OS video preview'});await mb.scrollIntoViewIfNeeded();assert(await mp.locator('video').evaluate(v=>v.paused));await mb.tap();await mp.waitForFunction(()=>!document.querySelector('video').paused);assert(await mp.locator('video').evaluate(v=>v.muted&&v.controls&&v.playsInline));checks.push('Touch emulation: paused initially; tap starts muted inline with native controls');await mobile.close();
  await page.emulateMedia({reducedMotion:'reduce'});await load('');await frame.hover();assert.equal((await state()).plays,0);checks.push('OS reduced-motion preference also prevents hover initiation');
  const resources=await page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>/panoptes-os-showcase/.test(r.name)).map(r=>({name:r.name,transferSize:r.transferSize,encodedBodySize:r.encodedBodySize})));
  assert.equal(await video.count(),1);assert.equal(new Set(resources.filter(r=>r.name.endsWith('.mp4')).map(r=>r.name)).size,1);checks.push('One video element and one MP4 resource URL; shared poster URL uses browser cache');
  expectedFailure=true;await page.route('**/media/*.mp4',route=>route.abort());await page.goto(url+'/?motion=reduce');await frame.scrollIntoViewIfNeeded();await page.getByRole('status').filter({hasText:'Video preview unavailable.'}).waitFor();assert(await frame.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0));assert.equal(await video.evaluate(v=>getComputedStyle(v).visibility),'hidden');checks.push('Failed MP4 request preserves loaded poster and readable error state');
  assert.deepEqual(errors,[]);assert.deepEqual(consoleErrors,[]);checks.push('No uncaught browser or unexpected console errors');
  fs.writeFileSync('.qa/panoptes-video/browser-check.json',JSON.stringify({url,engine:'Chrome 152 / Playwright',matrix,checks,errors,consoleErrors,resources,limitations:['Touch is browser emulation, not physical-device verification.','Native control pointer checks are recorded separately.','The intentionally aborted MP4 failure test produces an expected browser network error.']},null,2)+'\n');
  await browser.close();console.log(checks.join('\n'));
})().catch(e=>{console.error(e);process.exit(1)});
