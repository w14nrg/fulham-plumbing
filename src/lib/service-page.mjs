import{pageShell,breadcrumb,actions}from'./layout.mjs';
import{pricing}from'./pricing.mjs';
import{quickAnswers}from'../content/quick-answers.mjs';

const keyBySlug={
 'leak-repairs':'leak','toilet-repairs':'toilet','tap-repairs':'tap','shower-repairs':'shower',
 'shower-pumps':'shower-pump','low-water-pressure':'low-pressure','hot-water-cylinders':'hot-water',
 'blocked-sinks-wastes':'blocked-sink','stopcock-replacement':'stopcock','small-plumbing-jobs':'other'
};
const ul=xs=>`<ul>${xs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const json=o=>JSON.stringify(o).replace(/</g,'\\u003c');
function qaPayload(cfg,p,key){
 const d=quickAnswers[key];if(!d)return null;const symptoms={};
 for(const [k,s] of Object.entries(d.symptoms||{}))symptoms[k]={label:s.label,wa:s.wa,causes:s.causes,checks:s.checks,cost:p.labourRange(s.minutes)};
 return{problems:{[key]:{label:d.label,serviceUrl:`/${d.service}/`,guideUrl:d.guide?`/guides/${d.guide}/`:null,symptoms,homeNotes:d.homeNotes||null}},whatsapp:cfg.contact.whatsapp,callHref:cfg.contact.phone?`tel:${cfg.contact.phone}`:null,defaultMessage:cfg.contact.whatsappMessage,defaultCost:`£${cfg.pricing.firstHour} first hour; further time in ${cfg.pricing.incrementMinutes}-minute steps; parts at cost`};
}
function subline(slug){return{
 'toilet-repairs':"Running on, won't flush, leaking or slow to fill?",'leak-repairs':'Dripping pipe, water through a ceiling, or a leak you cannot trace?',
 'tap-repairs':'Dripping, stiff, loose or leaking around the base?','shower-repairs':'Weak flow, temperature swings, dripping or not working?',
 'shower-pumps':"Won't start, very noisy, weak or cutting in and out?",'low-water-pressure':'Weak at one outlet, upstairs, on the hot side or throughout the property?',
 'hot-water-cylinders':'No hot water, lukewarm water or a leak in the airing cupboard?','blocked-sinks-wastes':'Slow, blocked, gurgling or smelling from the waste?',
 'stopcock-replacement':"Stiff, leaking, won't close or you cannot find it?",'small-plumbing-jobs':'One small job or a list of things you want sorted in one visit?'
}[slug]||''}

export async function renderService({cfg,meta,path,css,scriptPath,service,content}){
 const p=pricing(cfg),r=service.typicalMinutes,time=p.typicalTimeText(r);
 const lab=service.slug==='plumbing-inspections'?(p.inspectionPriceText()||'Price confirmed before booking'):p.labourRange(r);
 const crumbs=[{name:'Home',path:'/'},{name:'Services',path:'/plumbing-services/'},{name:service.name,path}],faqs=content.faqs||[];
 const guides=[content.guide,...(content.guides||[])].filter(Boolean).filter((g,i,a)=>a.findIndex(x=>x.path===g.path)===i);
 const answer=content.answer.replaceAll('{labourRange}',lab||'').replaceAll('{typicalTimeText}',time||'').replaceAll('{inspectionPriceText}',p.inspectionPriceText()||'price confirmed before booking').replaceAll('{firstHour}',cfg.pricing.firstHour).replaceAll('{incrementText}',p.incrementText());
 const key=keyBySlug[service.slug],qa=key?qaPayload(cfg,p,key):null;
 const safeCostNote=content.costNote?.includes('[PLACEHOLDER')?(service.slug==='plumbing-inspections'?'The report price is confirmed before booking.':''):content.costNote;
 const symptomBlock=qa?`<section class="service-symptoms" data-problem-console data-fixed-problem="${key}" aria-label="Quick answer for ${service.name}"><p class="eyebrow">Quick answer</p><h2>What is yours doing?</h2><div class="qa-panel" data-qa-panel aria-live="polite"></div></section>`:'';
 const causes=content.causes.map(c=>`<h3>${c[0]}</h3><p>${c[1]}</p>`).join('');
 const checks=content.steps.map(s=>`<h3>${s[0]}</h3><p>${s[1]}</p>`).join('')+`<p>${content.scopeNote}</p>`;
 const signs=`${ul(content.signs)}<p>${content.signNote}</p><div class="callout"><strong>Before we arrive</strong><p>${content.safety}</p></div>`;
 const priceText=service.slug==='plumbing-inspections'?(cfg.pricing.inspectionFixedPrice!=null?`This inspection is ${p.inspectionPriceText()}.`:`The inspection price is confirmed before booking. General plumbing labour starts at £${cfg.pricing.firstHour} for the first hour.`):`${time?`${time}. `:''}Labour is ${lab}. Parts are charged at cost and shown on the invoice.`;
 const railGuide=guides[0]?`<p><a href="${guides[0].path}">Read: ${guides[0].name} →</a></p>`:'';
 const main=`<div class="shell">${breadcrumb(crumbs)}</div>
 <section class="service-hero"><div class="shell"><p class="eyebrow">Service · Fulham SW6</p><h1>${meta.h1}</h1>${subline(service.slug)?`<p class="service-subline">${subline(service.slug)}</p>`:''}<div class="hero-actions">${actions(cfg)}</div></div></section>
 <section class="service-body"><div class="shell inner-layout"><div class="content-column">
  <div class="answer-box"><h2>Short answer</h2><p>${answer}</p></div>
  ${symptomBlock}
  <div class="service-details">
   <details open><summary><h2>Common signs</h2></summary><div class="service-details__body">${signs}</div></details>
   <details open><summary><h2>Common causes</h2></summary><div class="service-details__body">${causes}</div></details>
   <details><summary><h2>What we check and do</h2></summary><div class="service-details__body">${checks}</div></details>
   <details open><summary><h2>Pricing</h2></summary><div class="service-details__body"><p>${priceText}</p>${content.costExample?`<p><strong>${content.costExample}</strong>${time?` — ${time}`:''}.</p>`:''}${safeCostNote?`<p>${safeCostNote}</p>`:''}<p><a href="/pricing/">Full pricing and how time is counted →</a></p></div></details>
  </div>
  <section class="local-note"><p class="eyebrow">In Fulham homes</p><h2>Local context matters.</h2><p>${content.local}</p></section>
  <section><p class="eyebrow">Questions</p><h2>Common questions</h2><div class="faq-list">${faqs.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div></section>
  <section style="margin-top:34px"><p class="eyebrow">Related</p><div class="related-grid">${content.related.map(x=>`<a class="related-link" href="/${x.slug}/"><strong>${x.name}</strong><span>${x.text}</span></a>`).join('')}</div>${guides.length?`<div class="hairline-list" style="margin-top:22px">${guides.map(g=>`<a class="hairline-row" href="${g.path}"><span><strong>${g.name}</strong><small>Practical guide</small></span><span class="arrow">→</span></a>`).join('')}</div>`:''}</section>
 </div>
 <aside class="service-rail" aria-label="Price and contact"><p class="eyebrow">Pricing</p><div class="rail-price">${service.slug==='plumbing-inspections'?(p.inspectionPriceText()||`£${cfg.pricing.firstHour}`):`£${cfg.pricing.firstHour}`}</div><p class="rail-note">${service.slug==='plumbing-inspections'?(p.inspectionPriceText()?'inspection':'general plumbing first hour; inspection price confirmed before booking'):`first hour · then ${cfg.pricing.incrementMinutes}-minute steps · parts at cost`}</p><div class="rail-actions">${actions(cfg)}</div>${railGuide}</aside>
 </div></section>
 <section class="cta-band"><div class="shell"><p class="eyebrow">Need help?</p><h2>${content.cta||'Send us a photo of the problem.'}</h2><p>${cfg.contact.whatsapp?'Show us what you can see and tell us the postcode. We can explain what to expect from the visit.':'Contact details will appear here as soon as the Fulham Plumbing number is live.'}</p><div class="hero-actions">${actions(cfg)}</div></div></section>
 ${qa?`<script type="application/json" id="qa-data">${json(qa)}</script>`:''}`;
 return pageShell({cfg,meta,path,css,scriptPath,main,faqs,breadcrumbs:crumbs,service:{...service,slug:service.slug},bodyClass:'service-page'});
}