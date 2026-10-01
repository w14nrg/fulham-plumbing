
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
  'leak-repairs':'Pipes, joints, valves and accessible leaks traced and repaired.',
  'toilet-repairs':'Running cisterns, flush faults, fill valves, seals and leaks.',
  'tap-repairs':'Dripping, stiff or leaking taps and like-for-like replacements.',
  'shower-repairs':'Temperature swings, weak flow, dripping valves and cartridges.',
  'shower-pumps':'Noisy, weak or failed shower pumps diagnosed and replaced.',
  'low-water-pressure':'Find out whether the restriction is at an outlet, valve, pipe run or supply.',
  'hot-water-cylinders':'Vented cylinder faults, immersion issues and accessible leaks.',
  'cold-water-tanks':'Loft tanks, float valves, overflows, lids and replacement.',
  'stopcock-replacement':'Stiff, seized or leaking internal stopcocks and isolation.',
  'radiator-valves':'Leaking valves, TRVs, lockshields and radiator removal for decorating.',
  'blocked-sinks-wastes':'Local sink, basin and bath waste restrictions inside the property.',
  'outside-taps':'New outside taps and repairs to existing fittings.',
  'appliance-plumbing':'Water and waste connections for washing machines and dishwashers.',
  'plumbing-inspections':'A structured visual plumbing inspection and written findings.',
  'small-plumbing-jobs':'One small job or a list of them planned into one visit.'
};

function qaPayload(cfg,p){
  const problems={};
  for(const [key,def] of Object.entries(quickAnswers)){
    const symptoms={};
    for(const [skey,s] of Object.entries(def.symptoms||{})){
      symptoms[skey]={...s,cost:p.labourRange(s.minutes)};
    }
    problems[key]={
      label:def.label,icon:def.icon,
      serviceUrl:`/${def.service}/`,
      guideUrl:def.guide?`/guides/${def.guide}/`:null,
      symptoms,
      homeNotes:def.homeNotes||null
    };
  }
  return{
    problems,
    whatsapp:cfg.contact.whatsapp,
    callHref:cfg.contact.phone?`tel:${cfg.contact.phone}`:null,
    defaultMessage:cfg.contact.whatsappMessage,
    defaultCost:`£${cfg.pricing.firstHour} first hour; further time in ${cfg.pricing.incrementMinutes}-minute steps; parts at cost`
  };
}
const jsonForHtml=o=>JSON.stringify(o).replace(/</g,'\\u003c');

export async function render({cfg,meta,path,css,scriptPath}){
  const p=pricing(cfg),services=cfg.services.filter(s=>s.enabled);
  const examples=[['Toilet fill valve','toilet-repairs'],['Shower pump fault','shower-pumps'],['Several small jobs','small-plumbing-jobs']].map(([name,slug])=>{
    const s=services.find(x=>x.slug===slug);
    return`<div class="example"><strong>${name}</strong><span>${p.typicalTimeText(s.typicalMinutes)}</span><span>${p.labourRange(s.typicalMinutes)}</span></div>`
  }).join('');
  const trust=[];
  if(cfg.reviews.rating&&cfg.reviews.count)trust.push(`★ ${cfg.reviews.rating} · ${cfg.reviews.count} Google reviews`);
  if(cfg.plumber.since)trust.push(`Plumbing since ${cfg.plumber.since}`);
  if(cfg.plumber.insured===true)trust.push('Fully insured');

  const problemButtons=homeProblems.map(([key,url])=>{
    const def=quickAnswers[key];
    return`<a class="problem-choice" href="${url}" data-problem="${key}" aria-pressed="false" aria-controls="qa-panel"><span>${def.label}</span></a>`
  }).join('');

  const areaRows=[...cfg.areas.core,...cfg.areas.nearby].filter(a=>a.slug!=='crabtree-fulham-reach').slice(0,9).map(a=>`<a href="${a.hasPage?`/areas/${a.slug}/`:a.home?`/#${a.slug}`:`/areas-we-cover/#${a.slug}`}"><strong>${a.name}</strong><span>${a.postcode||''}</span></a>`).join('');

  const serviceRows=services.map(s=>`<a class="hairline-row" href="/${s.slug}/"><span><strong>${s.name}</strong><small>${serviceDesc[s.slug]||'View service details and what to expect.'}</small></span><span class="arrow">→</span></a>`);
  const mid=Math.ceil(serviceRows.length/2);

  const faq=[
    {q:'How much does a plumber cost in Fulham?',a:`£${cfg.pricing.firstHour} for the first hour, ${p.incrementText()}, with parts at cost. There is no separate call-out fee.`},
    {q:'Do you do small jobs?',a:'Yes. Small repairs are the core of the service: taps, toilets, valves, wastes, pumps and lists of smaller jobs.'},
    {q:'Can you come today?',a:cfg.contact.availabilityNote||'Availability varies. Contact us with the problem and postcode and we will tell you the earliest realistic time.'},
    {q:'Do you bring parts?',a:'Send a clear photo if you can. It helps identify the fitting and improves the chance of bringing the right parts on the first visit.'},
    {q:'Which areas do you cover?',a:'Fulham SW6 is the core area, with selected nearby work in Chelsea Harbour and Lots Road, Putney and Wandsworth Town.'},
    {q:'Do you work for landlords and agents?',a:'Yes. Access can be arranged with tenants, with photos and clear invoicing for the landlord or agent.'}
  ];

  const reviews=cfg.reviews.items?.length?`<section class="band"><div class="shell"><p class="eyebrow">Customer feedback</p><h2>What customers say</h2><div class="two-col">${cfg.reviews.items.slice(0,3).map(r=>`<blockquote><p>“${r.quote}”</p><footer>${r.firstName} · ${r.area} · ${r.date}</footer></blockquote>`).join('')}</div></div></section>`:'';
  const jobs=cfg.recentJobs?.items?.length?`<section class="band band--surface"><div class="shell"><p class="eyebrow">Recent work</p><h2>Jobs around Fulham</h2></div></section>`:'';

  const main=`<section class="hero hero--home"><div class="shell hero-home-grid">
    <div class="hero-copy">
      <p class="eyebrow">Local plumbing · Fulham SW6</p>
      <h1>${meta.h1}</h1>
      <p class="lede"><strong>Problem first. Answer fast.</strong> Leaks, toilets, taps, showers, pumps and the small jobs other plumbers turn down.</p>
      <div class="hero-price"><strong>£${cfg.pricing.firstHour} first hour</strong><span>No separate call-out fee · parts at cost</span></div>
      <div class="hero-actions">${actions(cfg)}</div><p class="muted" style="margin-top:14px">36 Hurlingham Road, Fulham, London SW6 3RQ</p>
      ${trust.length?`<div class="trust-row">${trust.map(x=>`<span>${x}</span>`).join('')}</div>`:''}
    </div>
    <section class="problem-console" data-problem-console aria-labelledby="problem-heading">
      <div class="problem-console__head"><div><p class="eyebrow">Quick answer</p><h2 id="problem-heading">What's the problem?</h2></div><p>Pick the closest match.</p></div>
      <div class="problem-grid">${problemButtons}</div>
      <div class="qa-wrap"><div class="qa-wrap__inner"><div class="qa-panel" id="qa-panel" data-qa-panel aria-live="polite" aria-label="Quick answer"></div></div></div>
    </section>
  </div></section>

  <section class="band band--navy"><div class="shell map-band-grid">
    <div><p class="eyebrow">Local where it matters</p><h2>Fulham street by street.</h2><p class="muted">Based on Hurlingham Road, SW6. Tap a pin to see the area, the type of homes around it and the plumbing problems we commonly deal with.</p><div class="area-index">${areaRows}</div><p style="margin-top:16px"><a href="/areas-we-cover/">Explore every area →</a></p></div>
    <div>${renderMap({cfg,variant:'full'})}</div>
  </div></section>

  <section class="band"><div class="shell"><p class="eyebrow">No mystery pricing</p><h2>Know what the visit starts at.</h2>
    <div class="pricing-grid"><div class="pricing-stat"><strong>£${cfg.pricing.firstHour}</strong><span>first hour</span></div><div class="pricing-stat"><strong>${cfg.pricing.incrementMinutes} min</strong><span>steps after the first hour</span></div><div class="pricing-stat"><strong>At cost</strong><span>parts shown on the invoice</span></div></div>
    <div class="work-examples">${examples}</div><p><a href="/pricing/">Full pricing and how time is counted →</a></p>
  </div></section>

  ${jobs}${reviews}

  <section class="band band--surface"><div class="shell two-col"><div><p class="eyebrow">Local to SW6</p><h2>Parsons Green and Hurlingham are on the doorstep.</h2><p>Fulham Plumbing is based on Hurlingham Road, close to Parsons Green. The area mixes period terraces, converted flats, mansion blocks and newer riverside apartments, so the right first question is often how the property is laid out and how the water is supplied.</p><p><a href="/areas-we-cover/">See the local map and area pages →</a></p></div><div>${renderMap({cfg,variant:'about'})}</div></div></section>

  <section class="band"><div class="shell"><p class="eyebrow">Services</p><h2>Find the job quickly.</h2><div class="two-col"><div class="hairline-list">${serviceRows.slice(0,mid).join('')}</div><div class="hairline-list">${serviceRows.slice(mid).join('')}</div></div></div></section>

  <section class="band band--surface"><div class="shell two-col"><div><p class="eyebrow">Useful guides</p><h2>Quick answers before you call.</h2><div class="hairline-list">
    <a class="hairline-row" href="/guides/shower-pressure-dropped/"><span><strong>Why has my shower pressure dropped?</strong><small>Separate an outlet problem from the supply or pump.</small></span><span class="arrow">→</span></a>
    <a class="hairline-row" href="/guides/toilet-keeps-running/"><span><strong>Why does my toilet keep running?</strong><small>Work out whether the fill or flush side is passing water.</small></span><span class="arrow">→</span></a>
    <a class="hairline-row" href="/guides/water-through-ceiling/"><span><strong>Water coming through the ceiling</strong><small>What to isolate first and how the source is traced.</small></span><span class="arrow">→</span></a>
    </div><p><a href="/guides/">All plumbing guides →</a></p></div>
    <div><p class="eyebrow">Questions</p><h2>What people ask first.</h2><div class="faq-list">${faq.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div>${exclusions(cfg)}</div>
  </div></section>

  <section class="cta-band"><div class="shell"><p class="eyebrow">Need help?</p><h2>Send us a photo of the problem.</h2><p>A clear photo and your postcode are often enough for us to tell you what the first visit is likely to involve.</p><div class="hero-actions">${actions(cfg)}</div></div></section>
  <script type="application/json" id="qa-data">${jsonForHtml(qaPayload(cfg,p))}</script>`;

  return pageShell({cfg,meta,path,css,scriptPath,main,faqs:faq,bodyClass:'home'});
}