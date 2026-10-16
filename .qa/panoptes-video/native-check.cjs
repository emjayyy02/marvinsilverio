const {chromium}=require('C:/Users/silve/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Users/silve/.cache/puppeteer/chrome/win64-152.0.7977.54/chrome-win64/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto((process.env.PORTFOLIO_URL || 'http://127.0.0.1:5174')+'/?motion=reduce');
 await page.getByRole('button',{name:'Play Panoptes OS video preview'}).click();
 const video=page.locator('video');await video.scrollIntoViewIfNeeded();await video.hover();await page.waitForFunction(()=>document.querySelector('video').controls);
 const cdp=await page.context().newCDPSession(page);
 const {root}=await cdp.send('DOM.getDocument',{depth:-1,pierce:true});const nodes=[];
 function walk(n){if(n.nodeName==='VIDEO'||(n.attributes||[]).some(a=>/media-controls|Unmute|Mute|timeline|Full screen/i.test(a)))nodes.push({nodeId:n.nodeId,name:n.nodeName,attributes:n.attributes});for(const c of [...(n.children||[]),...(n.shadowRoots||[])])walk(c)}walk(root);
 const checks=[];
 const control=pseudo=>nodes.find(n=>n.name==='INPUT'&&n.attributes.includes(pseudo)&&!n.attributes.includes('true'));
 async function clickControl(pseudo,fraction=0.5){
  await video.hover();const node=control(pseudo);assert(node,`Missing native ${pseudo}`);
  const {model}=await cdp.send('DOM.getBoxModel',{nodeId:node.nodeId});const q=model.content;
  await page.mouse.click(q[0]+(q[2]-q[0])*fraction,(q[1]+q[5])/2);
 }
 await clickControl('-webkit-media-controls-play-button');await page.waitForFunction(()=>document.querySelector('video').paused);checks.push('Native Pause button');
 await clickControl('-webkit-media-controls-play-button');await page.waitForFunction(()=>!document.querySelector('video').paused);checks.push('Native Play button');
 await clickControl('-webkit-media-controls-mute-button');await page.waitForFunction(()=>!document.querySelector('video').muted);checks.push('Native Unmute button');
 await clickControl('-webkit-media-controls-timeline',0.55);await page.waitForFunction(()=>document.querySelector('video').currentTime>15);checks.push('Native timeline pointer seek');
 await clickControl('-webkit-media-controls-fullscreen-button');await page.waitForFunction(()=>Boolean(document.fullscreenElement));checks.push('Native Fullscreen button');await page.keyboard.press('Escape');
 fs.writeFileSync('.qa/panoptes-video/native-check.json',JSON.stringify({engine:'Chrome 152',checks,method:'Pointer clicks at browser-native UA media control boxes inspected through CDP'},null,2)+'\n');console.log(checks);
 await video.screenshot({path:'.qa/panoptes-video/native-video.png'});
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
