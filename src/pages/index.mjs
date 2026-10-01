import{pageShell,exclusions}from'../lib/layout.mjs';
import{pricing}from'../lib/pricing.mjs';
import{renderMap}from'../lib/map.mjs';

const featured=[
 ['toilet-repairs','Toilet repair','Running cistern, poor flush or leaking around the toilet.'],
 ['tap-repairs','Tap repair','Dripping, stiff, loose or leaking around the base.'],
 ['shower-pumps','Shower pump','Noisy, weak, intermittent or completely stopped.'],
 ['small-plumbing-jobs','Small jobs visit','Several smaller plumbing jobs sorted in one planned visit.']
];
const mini=[
 ['leak-repairs','Leak repair','Accessible pipework, joints and valves.'],
 ['low-water-pressure','Low pressure','Trace whether it is local, stored-water or supply-side.']
];

const wa=(cfg,msg)=>`https://wa.me/${cfg.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

export async function render({cfg,meta,path,css,scriptPath}){
 const p=pricing(cfg),services=cfg.services.filter(s=>s.enabled);
 const card=s=>{
   const service=services.find(x=>x.slug===s[0]);
   const msg=`Hi Fulham Plumbing, I'd like to book help with ${s[1].toLowerCase()}. My postcode is ____ and the problem is: `;
   return `<article class="bb-job-card">
     <div class="bb-job-card__top"><span class="bb-round-mark">FP</span><span class="bb-chip">BOOK DIRECT</span></div>
     <h3>${s[1]}</h3><p>${s[2]}</p>
     <div class="bb-job-card__price"><strong>£${cfg.pricing.firstHour}</strong><span>FIRST HOUR</span>${service?.typicalMinutes?`<small>${p.typicalTimeText(service.typicalMinutes)}</small>`:''}</div>
     <a class="bb-book-btn" href="${wa(cfg,msg)}">Book this <span>→</span></a>
   </article>`;
 };
 const faq=[
  {q:'How much does a plumber cost in Fulham?',a:`£${cfg.pricing.firstHour} for the first hour, then charged in ${cfg.pricing.incrementMinutes}-minute steps, with parts at cost. There is no separate call-out fee.`},
  {q:'Do you do small plumbing jobs?',a:'Yes. Small repairs and lists of smaller plumbing jobs are the core of the service.'},
  {q:'Which areas do you cover?',a:'Fulham SW6 is the core area, with selected nearby work in Chelsea Harbour and Lots Road, Putney and Wandsworth Town.'}
 ];
 const main=`
 <section class="bb-hero">
  <div class="shell bb-hero__grid">
   <div class="bb-hero__copy">
    <div class="bb-area-pill">FULHAM · PARSONS GREEN · HURLINGHAM · SANDS END</div>
    <h1><span>IS YOUR PLUMBING</span><strong>PLAYING UP?</strong></h1>
    <div class="bb-white-rule"></div>
    <p class="bb-hero__lede">Small plumbing jobs and repairs in Fulham. Check your postcode and send the problem straight to WhatsApp in seconds.</p>
    <div class="bb-hero__actions">
      <a class="bb-primary-cta" href="${wa(cfg,'Hi Fulham Plumbing, I need a plumber. My postcode is ____ and the problem is: ')}">WhatsApp a plumbing job <span>→</span></a>
      <a class="bb-text-link" href="/pricing/">See every price</a>
    </div>
    <div class="bb-proof"><span>✓ £${cfg.pricing.firstHour} first hour</span><span>✓ No separate call-out fee</span><span>✓ Parts at cost</span></div>
   </div>

   <aside class="bb-checker" data-whatsapp-checker>
    <div class="bb-checker__title"><span class="bb-checker__icon">◎</span><div><b>INSTANT PLUMBING CHECK</b><h2>Send us the job.</h2></div></div>
    <label class="sr-only" for="bb-postcode">Postcode</label>
    <div class="bb-checker__inputrow">
      <input id="bb-postcode" data-wa-postcode inputmode="text" autocomplete="postal-code" placeholder="E.G. SW6 3RQ">
      <span class="bb-checker__search">⌕</span>
    </div>
    <label class="sr-only" for="bb-problem">What's wrong?</label>
    <textarea id="bb-problem" data-wa-problem rows="3" placeholder="WHAT'S WRONG? E.G. TOILET KEEPS RUNNING"></textarea>
    <a class="bb-checker__send" data-wa-send href="${wa(cfg,'Hi Fulham Plumbing, I need a plumber. My postcode is ____ and the problem is: ')}">Send to WhatsApp <span>→</span></a>
   </aside>

   <div class="bb-book-direct">
     <a href="${wa(cfg,'Hi Fulham Plumbing, I need help with a leak. My postcode is ____ and the problem is: ')}"><span>BOOK DIRECT</span><strong>Leak repair</strong><b>£${cfg.pricing.firstHour}</b><small>first hour</small></a>
     <a href="${wa(cfg,'Hi Fulham Plumbing, I need help with a toilet problem. My postcode is ____ and the problem is: ')}"><span>BOOK DIRECT</span><strong>Toilet repair</strong><b>£${cfg.pricing.firstHour}</b><small>first hour</small></a>
   </div>
  </div>
 </section>

 <section class="bb-trustbar"><div class="shell"><span>FULHAM SW6</span><span>£${cfg.pricing.firstHour} FIRST HOUR</span><span>EASY WHATSAPP BOOKING</span><span>PARTS AT COST</span></div></section>

 <section class="bb-jobs"><div class="shell">
  <p class="bb-kicker">THE REGULAR JOBS</p>
  <div class="bb-heading-row"><h2>Prices that don’t play up.</h2><p>Pick the job, see how it is charged and send the details straight to WhatsApp without waiting for a callback.</p></div>
  <div class="bb-job-grid">${featured.map(card).join('')}</div>
  <div class="bb-mini-grid">${mini.map(s=>`<a class="bb-mini-card" href="/${s[0]}/"><span><strong>${s[1]}</strong><small>${s[2]}</small></span><b>£${cfg.pricing.firstHour}</b></a>`).join('')}</div>
 </div></section>

 <section class="bb-local">
  <div class="shell"><p class="bb-kicker bb-kicker--light">LOCAL WHERE IT MATTERS</p><h2>Fulham, street by street.</h2><p class="bb-local__intro">Tap a pin or choose an area to see the homes, buildings and plumbing problems we commonly find there.</p>${renderMap({cfg,variant:'full'})}<p class="bb-local__more"><a href="/areas-we-cover/">Explore every area →</a></p></div>
 </section>

 <section class="bb-guides"><div class="shell two-col"><div><p class="bb-kicker">QUICK ANSWERS</p><h2>Know what you’re dealing with.</h2><div class="hairline-list"><a class="hairline-row" href="/guides/water-through-ceiling/"><span><strong>Water coming through the ceiling</strong><small>What to isolate first and how the source is traced.</small></span><span class="arrow">→</span></a><a class="hairline-row" href="/guides/shower-pressure-dropped/"><span><strong>Why has my shower pressure dropped?</strong><small>Separate an outlet problem from the supply or pump.</small></span><span class="arrow">→</span></a><a class="hairline-row" href="/guides/toilet-keeps-running/"><span><strong>Why does my toilet keep running?</strong><small>Work out whether the fill or flush side is passing water.</small></span><span class="arrow">→</span></a></div><p><a href="/guides/">All plumbing guides →</a></p></div>
  <div><p class="bb-kicker">STRAIGHT ANSWERS</p><h2>Before you book.</h2><div class="faq-list">${faq.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div>${exclusions(cfg)}</div></div></section>

 <section class="bb-final-cta"><div class="shell"><p class="bb-kicker bb-kicker--light">NEED A PLUMBER?</p><h2>Send us the postcode and problem.</h2><p>It opens straight in WhatsApp to 07340 274956.</p><a class="bb-primary-cta" href="${wa(cfg,'Hi Fulham Plumbing, I need a plumber. My postcode is ____ and the problem is: ')}">WhatsApp a plumbing job <span>→</span></a></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,faqs:faq,bodyClass:'home bb-home'});
}