const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const bin = process.env.FFMPEG_DIR || 'C:/Users/silve/Documents/Codex/2026-10-14/remotion-plugin-remotion-openai-curated-remote/outputs/five-bar-chart/node_modules/@remotion/compositor-win32-x64-msvc';
const master = '../project-08-panoptes-video/film/out/panoptes-os-final-master.mp4';
const web = 'public/media/panoptes-os-showcase.mp4';
function run(tool,args) {
  const r=spawnSync(`${bin}/${tool}.exe`,args,{encoding:'utf8',maxBuffer:30*1024*1024});
  assert.equal(r.status,0,r.stderr || String(r.error)); return r.stdout;
}
const hash = path => crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
function inspect(path) {
  const info=JSON.parse(run('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',path]));
  const video=info.streams.find(s=>s.codec_type==='video'),audio=info.streams.find(s=>s.codec_type==='audio');
  assert.equal(video.codec_name,'h264'); assert.equal(video.width,1920); assert.equal(video.height,1080);
  assert.equal(video.r_frame_rate,'60/1'); assert.equal(video.nb_read_frames,'2100');
  assert.equal(video.duration,'35.000000'); assert.equal(info.format.duration,'35.000000');
  assert.equal(audio.codec_name,'aac'); assert.equal(audio.channels,2); assert.equal(audio.duration,'35.000000');
  run('ffmpeg',['-hide_banner','-v','error','-xerror','-i',path,'-map','0:v:0','-map','0:a:0','-c:v','rawvideo','-c:a','pcm_s16le','-f','null','-']);
  const pcm=spawnSync(`${bin}/ffmpeg.exe`,['-v','error','-i',path,'-vn','-c:a','pcm_s16le','-f','wav','-'],{maxBuffer:15*1024*1024});
  assert.equal(pcm.status,0,String(pcm.stderr));
  const dataStart=pcm.stdout.indexOf(Buffer.from('data'),12)+8;assert(dataStart>8);
  let sum=0,peak=0;for(let i=dataStart;i<pcm.stdout.length;i+=2){const n=pcm.stdout.readInt16LE(i)/32768;sum+=n*n;peak=Math.max(peak,Math.abs(n));}
  const rmsDb=20*Math.log10(Math.sqrt(sum/((pcm.stdout.length-dataStart)/2))); assert(rmsDb > -60,'Missing/silent audio');
  return {sha256:hash(path),bytes:fs.statSync(path).size,width:video.width,height:video.height,pixelFormat:video.pix_fmt,fps:video.r_frame_rate,frames:Number(video.nb_read_frames),duration:info.format.duration,audio:{codec:audio.codec_name,channels:audio.channels,sampleRate:audio.sample_rate,rmsDb,peakDb:20*Math.log10(peak)},decode:'pass'};
}
const source=inspect(master),derivative=inspect(web);
assert.equal(source.sha256,'097b3bb94d0dd1e29421a5a805123247f59883cb84780408a1000e89f07e7464');
assert.equal(derivative.pixelFormat,'yuv420p');
const packets=(path,selector,entries)=>JSON.parse(run('ffprobe',['-v','error','-select_streams',selector,'-show_packets','-show_data_hash','sha256','-show_entries',entries,'-of','json',path])).packets;
const audioPackets=path=>packets(path,'a:0','packet=pts_time,dts_time,duration_time,data_hash');
assert.deepEqual(audioPackets(master),audioPackets(web));
const pts=path=>packets(path,'v:0','packet=pts_time,duration_time').sort((a,b)=>Number(a.pts_time)-Number(b.pts_time));
assert.deepEqual(pts(master),pts(web));
const bytes=fs.readFileSync(web);const atoms=[];for(let at=0;at<bytes.length;){const size=bytes.readUInt32BE(at),type=bytes.toString('ascii',at+4,at+8);atoms.push({type,offset:at,size});assert(size>0);at+=size;}
assert(atoms.find(a=>a.type==='moov').offset<atoms.find(a=>a.type==='mdat').offset);
const report={date:'2026-10-16',master:{path:master,...source},derivative:{path:web,...derivative},audioPacketsIdentical:true,all2100FramePresentationTimesAndDurationsIdentical:true,fastStart:true,atoms,poster:{path:'public/media/panoptes-os-showcase-poster.webp',bytes:fs.statSync('public/media/panoptes-os-showcase-poster.webp').size,sourceTimeSeconds:7.5},licenseMaterial:'../project-08-panoptes-video/docs/music-license.md'};
fs.writeFileSync('.qa/panoptes-video/release-check.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
