import{pageShell,actions,exclusions}from'../lib/layout.mjs';
import{pricing}from'../lib/pricing.mjs';
import{renderMap}from'../lib/map.mjs';
import{quickAnswers}from'../content/quick-answers.mjs';

const jobChoices=[
 ['leak','Leak repair'],['toilet','Toilet repair'],['tap','Tap problem'],['shower','Shower problem'],
 ['low-pressure','Low water pressure'],['shower-pump','Shower pump'],['hot-water','Hot water'],
 ['blocked-sink','Blocked sink / waste'],['stopcock','Stopcock'],['other','Something else']
];
const featured=[
 ['toilet-repairs','Toilet repair','Running cistern, poor flush or leaking around the toilet.'],
 ['tap-repairs','Tap repair','Dripping, stiff, loose or leaking around the base.'],
 ['shower-pumps','Shower pump','Noisy, weak, intermittent or completely stopped.'],
 ['small-plumbing-jobs','Small jobs visit','Several smaller plumbing jobs sorted in one planned visit.']
];
const small=[
 ['leak-repairs','Leak repair','Accessible pipework, joints and valves.'],
 ['low-water-pressure','Low pressure','Work out whether the issue is local, stored-water or supply-side.']
];
const json=o=>JSON.stringify(o).replace(/</g,'\\u003c');

function qaPayload(cfg){
 const problems={};
 for(const [key] of jobChoices){
   const d=quickAnswers[key];if(!d)continue;
   problems[key]={label:d.label,serviceUrl:`/${d.service}/`,symptoms:Object.fromEntries(Object.entries(d.symptoms||{}).map(([k,s])=>[k,{label:s.label,wa:s.wa}]))};
 }
 return{problems,whatsapp:cfg.contact.whatsapp,callHref:cfg.contact.phone?`tel:${cfg.contact.phone}`:null,defaultMessage:cfg.contact.whatsappMessage};
}

export async function render({cfg,meta,path,css,scriptPath}){
 const p=pricing(cfg),services=cfg.services.filter(s=>s.enabled);
 const faq=[
  {q:'How much does a plumber cost in Fulham?',a:`£${cfg.pricing.firstHour} for the first hour, then charged in ${cfg.pricing.incrementMinutes}-minute steps, with parts at cost. There is no separate call-out fee.`},
  {q:'Do you do small plumbing jobs?',a:'Yes. Small repairs and lists of smaller plumbing jobs are the core of the service.'},
  {q:'Which areas do you cover?',a:'Fulham SW6 is the core area, with selected nearby work in Chelsea Harbour and Lots Road, Putney and Wandsworth Town.'}
 ];
 const card=s=>{
   const service=services.find(x=>x.slug===s[0]);
   return `<article class="v5-job-card"><div><span class="v5-kicker">PLUMBING JOB</span><h3>${s[1]}</h3><p>${s[2]}</p></div><div class="v5-job-meta"><strong>£${cfg.pricing.firstHour}</strong><span>FIRST HOUR</span>${service?.typicalMinutes?`<small>${p.typicalTimeText(service.typicalMinutes)}</small>`:''}</div><a class="v5-card-cta" href="/${s[0]}/">See this job <span>→</span></a></article>`;
 };
 const main=`
 <section class="v5-hero">
  <div class="shell v5-hero__grid">
   <div class="v5-hero__copy">
    <div class="v5-badge">LOCAL PLUMBER · FULHAM SW6</div>
    <h1><span>PLUMBER IN</span><strong>FULHAM, SW6</strong></h1>
    <div class="v5-rule"></div>
    <p class="v5-hero__lede">Small plumbing jobs, repairs and fault finding. Based on Hurlingham Road, right in SW6.</p>
    <div class="v5-hero__actions">${cfg.contact.phone||cfg.contact.whatsapp?actions(cfg):`<a class="v5-main-cta" href="#quick-job">Tell us the problem <span>→</span></a>`}<a class="v5-text-link" href="/pricing/">See pricing</a></div>
    <div class="v5-proof"><span>✓ £${cfg.pricing.firstHour} first hour</span><span>✓ No separate call-out fee</span><span>✓ Parts at cost</span></div>
   </div>
   <aside class="v5-checker" id="quick-job" data-problem-tool>
    <div class="v5-checker__head"><span>QUICK JOB CHECK</span><h2>What needs fixing?</h2></div>
    <div class="v5-checker__row"><select aria-label="Choose a plumbing problem" data-problem-select><option value="">Choose a plumbing problem</option>${jobChoices.map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select><button type="button" class="v5-checker__go" data-problem-go>Go</button></div>
    <div class="v5-checker__stage" data-problem-stage aria-live="polite"></div>
   </aside>
  </div>
 </section>

 <section class="v5-trustbar"><div class="shell"><span>FULHAM SW6</span><span>£${cfg.pricing.firstHour} FIRST HOUR</span><span>SMALL JOBS WELCOME</span><span>PARTS AT COST</span></div></section>

 <section class="v5-jobs"><div class="shell">
  <p class="v5-kicker v5-kicker--accent">THE REGULAR JOBS</p><div class="v5-heading-row"><h2>Plumbing jobs without the fuss.</h2><p>Pick the job, see what we do and know how the visit is charged before anyone arrives.</p></div>
  <div class="v5-job-grid">${featured.map(card).join('')}</div>
  <div class="v5-mini-grid">${small.map(s=>`<a class="v5-mini-card" href="/${s[0]}/"><span><strong>${s[1]}</strong><small>${s[2]}</small></span><b>£${cfg.pricing.firstHour}</b></a>`).join('')}</div>
 </div></section>

 <section class="v5-map-section"><div class="shell"><p class="v5-kicker">LOCAL WHERE IT MATTERS</p><h2>Fulham, street by street.</h2><p class="v5-map-intro">Tap a pin or choose an area. You’ll see the type of homes there, the plumbing setup we commonly find and the jobs we’re usually called for.</p>${renderMap({cfg,variant:'full'})}<p class="v5-map-link"><a href="/areas-we-cover/">Explore every area →</a></p></div></section>

 <section class="v5-guides"><div class="shell two-col"><div><p class="v5-kicker v5-kicker--accent">QUICK ANSWERS</p><h2>Know what you’re dealing with.</h2><div class="hairline-list"><a class="hairline-row" href="/guides/water-through-ceiling/"><span><strong>Water coming through the ceiling</strong><small>What to isolate first and how the source is traced.</small></span><span class="arrow">→</span></a><a class="hairline-row" href="/guides/shower-pressure-dropped/"><span><strong>Why has my shower pressure dropped?</strong><small>Separate an outlet problem from the supply or pump.</small></span><span class="arrow">→</span></a><a class="hairline-row" href="/guides/toilet-keeps-running/"><span><strong>Why does my toilet keep running?</strong><small>Work out whether the fill or flush side is passing water.</small></span><span class="arrow">→</span></a></div><p><a href="/guides/">All plumbing guides →</a></p></div>
  <div><p class="v5-kicker v5-kicker--accent">STRAIGHT ANSWERS</p><h2>Before you book.</h2><div class="faq-list">${faq.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div>${exclusions(cfg)}</div></div></section>

 <section class="v5-final-cta"><div class="shell"><p class="v5-kicker">NEED A PLUMBER?</p><h2>Start with the problem.</h2><p>${cfg.contact.whatsapp?'Send a photo and postcode and we’ll take it from there.':'Use the quick job checker now. Call and WhatsApp buttons will appear here when the Fulham Plumbing number is live.'}</p><a class="v5-main-cta" href="#quick-job">Tell us the problem <span>→</span></a></div></section>

 <script type="application/json" id="qa-data">${json(qaPayload(cfg))}</script>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,faqs:faq,bodyClass:'home v5-home'});
}