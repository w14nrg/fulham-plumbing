import{pageShell,actions,exclusions}from'../lib/layout.mjs';
import{pricing}from'../lib/pricing.mjs';
import{renderMap}from'../lib/map.mjs';
import{quickAnswers}from'../content/quick-answers.mjs';

const homeProblems=[
 ['leak','/leak-repairs/'],['toilet','/toilet-repairs/'],['tap','/tap-repairs/'],['shower','/shower-repairs/'],
 ['low-pressure','/low-water-pressure/'],['shower-pump','/shower-pumps/'],['hot-water','/hot-water-cylinders/'],
 ['blocked-sink','/blocked-sinks-wastes/'],['stopcock','/stopcock-replacement/'],['other','/small-plumbing-jobs/']
];
const serviceDesc={
 'leak-repairs':'Pipes, joints, valves and accessible leaks.','toilet-repairs':'Running cisterns, flush faults, fill valves and leaks.',
 'tap-repairs':'Dripping, stiff or leaking taps and replacements.','shower-repairs':'Temperature, flow, valve and cartridge faults.',
 'shower-pumps':'Noisy, weak or failed shower pumps.','low-water-pressure':'Find the restriction and work out the right fix.',
 'hot-water-cylinders':'Vented cylinder and immersion-related faults.','cold-water-tanks':'Loft tanks, float valves, overflows and replacement.',
 'stopcock-replacement':'Stiff, seized or leaking internal stopcocks.','radiator-valves':'TRVs, lockshields and leaking valves.',
 'blocked-sinks-wastes':'Local sink, basin and bath waste restrictions.','outside-taps':'New outside taps and repairs.',
 'appliance-plumbing':'Water and waste connections for appliances.','plumbing-inspections':'Structured visual inspection and written findings.',
 'small-plumbing-jobs':'One small job or a list planned into one visit.'
};
const json=o=>JSON.stringify(o).replace(/</g,'\\u003c');

function homeQa(cfg){
 const problems={};
 for(const [key] of homeProblems){
  const d=quickAnswers[key];if(!d)continue;
  problems[key]={label:d.label,serviceUrl:`/${d.service}/`,symptoms:Object.fromEntries(Object.entries(d.symptoms||{}).map(([k,s])=>[k,{label:s.label,wa:s.wa}]))};
 }
 return{problems,whatsapp:cfg.contact.whatsapp,callHref:cfg.contact.phone?`tel:${cfg.contact.phone}`:null,defaultMessage:cfg.contact.whatsappMessage};
}

export async function render({cfg,meta,path,css,scriptPath}){
 const p=pricing(cfg),services=cfg.services.filter(s=>s.enabled);
 const trust=[];if(cfg.plumber.since)trust.push(`Plumbing since ${cfg.plumber.since}`);if(cfg.plumber.insured===true)trust.push('Fully insured');if(cfg.reviews.rating&&cfg.reviews.count)trust.push(`★ ${cfg.reviews.rating} (${cfg.reviews.count} Google reviews)`);
 const problemButtons=homeProblems.map(([key,url])=>`<a class="problem-choice" href="${url}" data-problem="${key}" aria-pressed="false">${quickAnswers[key].label}</a>`).join('');
 const examples=[['Toilet fill valve','toilet-repairs'],['Shower pump fault','shower-pumps'],['Several small jobs','small-plumbing-jobs']].map(([name,slug])=>{const s=services.find(x=>x.slug===slug);return`<div class="example"><strong>${name}</strong><span>${p.typicalTimeText(s.typicalMinutes)}</span><span>${p.labourRange(s.typicalMinutes)}</span></div>`}).join('');
 const serviceRows=services.map(s=>`<a class="hairline-row" href="/${s.slug}/"><span><strong>${s.name}</strong><small>${serviceDesc[s.slug]||'View service details and what to expect.'}</small></span><span class="arrow">→</span></a>`);
 const mid=Math.ceil(serviceRows.length/2);
 const faq=[
  {q:'How much does a plumber cost in Fulham?',a:`£${cfg.pricing.firstHour} for the first hour, then charged in ${cfg.pricing.incrementMinutes}-minute steps, with parts at cost. There is no separate call-out fee.`},
  {q:'Do you do small jobs?',a:'Yes. Small repairs are the core of the service: taps, toilets, valves, wastes, pumps and lists of smaller jobs.'},
  {q:'Can you come today?',a:cfg.contact.availabilityNote||'Availability varies. Use the contact page with the problem and postcode and we will tell you the earliest realistic time once contact details are live.'},
  {q:'Do you bring parts?',a:'A clear photo helps identify the fitting and improves the chance of bringing the right parts on the first visit.'},
  {q:'Which areas do you cover?',a:'Fulham SW6 is the core area, with selected nearby work in Chelsea Harbour and Lots Road, Putney and Wandsworth Town.'},
  {q:'Do you work for landlords and agents?',a:'Yes. Access can be arranged with tenants, with photos and clear invoicing for the landlord or agent. See our landlord and agent plumbing page for details.'}
 ];
 const jobs=cfg.recentJobs?.items?.length?`<section class="band"><div class="shell"><p class="eyebrow">Recent work</p><h2>Jobs around Fulham.</h2></div></section>`:'';
 const reviews=cfg.reviews.items?.length?`<section class="band band--pale"><div class="shell"><p class="eyebrow">Customer feedback</p><h2>What customers say.</h2></div></section>`:'';
 const main=`
 <section class="hero hero--home"><div class="shell hero-home-grid">
  <div>
   <p class="eyebrow">Local plumber · Fulham SW6</p>
   <h1>${meta.h1}</h1>
   <p class="lede">Leaks, toilets, taps, showers and pumps. Small jobs welcome. Based on Hurlingham Road.</p>
   <div class="hero-actions">${actions(cfg)}</div><p class="trust-line">36 Hurlingham Road, Fulham, London SW6 3RQ</p>
   ${trust.length?`<p class="trust-line">${trust.join(' · ')}</p>`:''}
  </div>
  <aside class="home-price-ticket" aria-label="Pricing">
   <strong>£${cfg.pricing.firstHour}</strong><div class="first-hour">first hour</div>
   ${cfg.pricing.increment!=null?`<p>Then £${cfg.pricing.increment} per ${cfg.pricing.incrementMinutes} minutes</p>`:`<p>Then charged in ${cfg.pricing.incrementMinutes}-minute steps</p>`}
   <p>No separate call-out fee</p><p>Parts at cost, shown on your invoice</p>
   <div class="ticket-actions hero-actions">${actions(cfg,true)}</div>
  </aside>
 </div></section>

 <section class="problem-section" data-problem-strip><div class="shell">
  <div class="problem-head"><div><p class="eyebrow">Got a plumbing problem?</p><h2>Tell us what's wrong.</h2></div><p>${cfg.contact.whatsapp?'Tap the problem. We’ll open WhatsApp with your message ready — just add a photo.':'Tap the problem to get straight to the right advice.'}</p></div>
  <div class="problem-strip">${problemButtons}</div>
  <div class="qa-wrap"><div class="qa-wrap__inner"><div class="qa-panel" data-qa-panel aria-live="polite"></div></div></div>
 </div></section>

 <section class="band band--pale"><div class="shell"><p class="eyebrow">How pricing works</p><h2>Clear from the first hour.</h2>
  <div class="pricing-hero-grid"><article class="price-block price-block--blue"><small>First hour</small><strong>£${cfg.pricing.firstHour}</strong><span>No separate call-out fee</span></article><article class="price-block"><small>After that</small><strong>${cfg.pricing.incrementMinutes} min</strong><span>Charging steps</span></article><article class="price-block"><small>Parts</small><strong>At cost</strong><span>Shown on the invoice</span></article></div>
  <div class="work-examples">${examples}</div><p><a href="/pricing/">Full pricing and how time is counted →</a></p>
 </div></section>

 <section class="band band--navy"><div class="shell"><h2 class="sr-only">Areas we cover</h2>${renderMap({cfg,variant:'full'})}<p style="margin-top:18px"><a href="/areas-we-cover/">Explore every area →</a></p></div></section>

 ${jobs}${reviews}

 <section class="band"><div class="shell"><p class="eyebrow">Services</p><h2>Find the job quickly.</h2><div class="two-col"><div class="hairline-list">${serviceRows.slice(0,mid).join('')}</div><div class="hairline-list">${serviceRows.slice(mid).join('')}</div></div></div></section>

 <section class="band band--pale"><div class="shell two-col"><div><p class="eyebrow">Useful guides</p><h2>Quick answers before you call.</h2><div class="hairline-list">
  <a class="hairline-row" href="/guides/shower-pressure-dropped/"><span><strong>Why has my shower pressure dropped?</strong><small>Separate an outlet problem from the supply or pump.</small></span><span class="arrow">→</span></a>
  <a class="hairline-row" href="/guides/toilet-keeps-running/"><span><strong>Why does my toilet keep running?</strong><small>Work out whether the fill or flush side is passing water.</small></span><span class="arrow">→</span></a>
  <a class="hairline-row" href="/guides/water-through-ceiling/"><span><strong>Water coming through the ceiling</strong><small>What to isolate first and how the source is traced.</small></span><span class="arrow">→</span></a>
 </div><p><a href="/guides/">All plumbing guides →</a></p></div>
 <div><p class="eyebrow">Questions</p><h2>What people ask first.</h2><div class="faq-list">${faq.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div>${exclusions(cfg)}</div></div></section>

 <section class="cta-band"><div class="shell"><p class="eyebrow">Need help?</p><h2>Send us a photo of the problem.</h2><p>${cfg.contact.whatsapp?'A clear photo and your postcode are often enough for us to tell you what the first visit is likely to involve.':'Contact details will appear here as soon as the Fulham Plumbing number is live.'}</p><div class="hero-actions">${actions(cfg)}</div></div></section>
 <script type="application/json" id="qa-data">${json(homeQa(cfg))}</script>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,faqs:faq,bodyClass:'home'});
}