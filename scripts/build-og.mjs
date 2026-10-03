import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
const asset = async (path,mime) => "data:"+mime+";base64,"+(await readFile(path)).toString("base64");
const [roman,italic,body,logo,screen] = await Promise.all([
  asset("app/fonts/playfair-roman.woff2","font/woff2"),asset("app/fonts/playfair-italic.woff2","font/woff2"),asset("app/fonts/dm-sans.woff2","font/woff2"),asset("public/logo.png","image/png"),asset("public/images/mockup-home-grid.png","image/png")
]);
const html = `<!doctype html><html><head><style>
@font-face{font-family:Playfair;src:url("${roman}");font-weight:400 900}
@font-face{font-family:Playfair;src:url("${italic}");font-style:italic;font-weight:400 900}
@font-face{font-family:DM;src:url("${body}");font-weight:100 1000}
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#d9d9d9;color:#374933;font-family:DM}
header{height:88px;margin:0 60px;display:flex;align-items:center;border-bottom:1px solid #a4ada2;justify-content:space-between}
.brand{display:flex;align-items:center;gap:8px;font:500 33px Playfair;letter-spacing:-1px}.brand img{width:36px;height:36px;mix-blend-mode:multiply}.small{font-size:11px}
.left{position:absolute;left:60px;top:132px;width:560px}.eyebrow{font-size:11px;letter-spacing:.4px;display:flex;align-items:center;gap:8px}.dot{width:6px;height:6px;border-radius:50%;background:#374933}
h1{font:400 90px/.97 Playfair;letter-spacing:-5px;margin:30px 0 27px}h1 em{font-size:99px}
.promise{font:400 28px/1.2 Playfair;letter-spacing:-1px;margin:0}.body{font:14px/1.65 DM;max-width:365px;margin-top:16px;color:#50564c}
.voice{position:absolute;left:686px;top:172px;width:176px}.voice-label{font-size:10px;display:flex;justify-content:space-between;border-bottom:1px solid #a4ada2;padding-bottom:13px}.voice p{font-size:16px;line-height:1.55;letter-spacing:-.3px;margin:20px 0}.wave{height:42px;display:flex;gap:5px;align-items:center}.wave span{width:2px;background:#374933}
.device{position:absolute;right:79px;top:121px;width:215px;aspect-ratio:445/880;border-radius:33px;overflow:hidden;transform:rotate(7deg);background:#242724}.device img{position:absolute;width:345.17%;height:auto;max-width:none;left:-124.045%;top:-11.932%}
.thread{position:absolute;left:703px;top:324px;width:350px;height:180px;opacity:.6}
footer{position:absolute;bottom:33px;left:60px;right:60px;font-size:11px;display:flex;justify-content:space-between;align-items:center}.link{border-bottom:1px solid #374933;padding-bottom:8px;font-size:12px}
</style></head><body><header><span class="brand"><img src="${logo}" alt="">Quill.</span><span class="small">Voice → Notes → Recall</span></header>
<div class="left"><div class="eyebrow"><span class="dot"></span>For people who think out loud</div><h1>Go off on<br><em>a tangent.</em></h1><p class="promise">↳ We’ll keep the thread.</p><p class="body">Talk it through. Clear notes, key ideas and flashcards for the parts you want to remember.</p></div>
<div class="voice"><div class="voice-label"><span>Your voice</span><span>00:24</span></div><p>“Okay, the review is Thursday. Start with onboarding. Oh, send Priya the roadmap before then…”</p><div class="wave">${[11,23,35,17,28,41,19,32,15,39,25,13,30,18].map(h=>'<span style="height:'+h+'px"></span>').join('')}</div></div>
<svg class="thread" viewBox="0 0 350 180" fill="none"><path d="M8 49C97 29 60 147 161 143C242 139 177 52 307 73" stroke="#374933" stroke-width="1.2"/></svg>
<div class="device"><img src="${screen}" alt="Real Quill app screen"></div><footer><span class="link">Join the waitlist ↗</span><span>Closed beta · iOS & Android</span></footer></body></html>`;
const browser = await chromium.launch({channel:"chrome",headless:true});
const page = await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
await page.setContent(html,{waitUntil:"load"});await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:"public/opengraph.png"});await browser.close();console.log("Rendered the revised Quill sharing image.");
