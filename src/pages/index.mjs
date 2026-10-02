import{pageShell,exclusions,waHref}from'../lib/layout.mjs';
import{pricing}from'../lib/pricing.mjs';
import{renderMap}from'../lib/map.mjs';
import{icon,waIcon}from'../lib/icons.mjs';
import{esc}from'../lib/util.mjs';

const featured=[
  ['leak-repairs','Leak repair','Dripping pipes, leaking joints and valves, and water where it should not be.','a leak'],
  ['toilet-repairs','Toilet repair','Running cistern, weak flush, slow fill or a leak around the toilet.','a toilet problem'],
  ['tap-repairs','Tap repair & fitting','Dripping, stiff or loose taps repaired, or new taps fitted.','a tap'],
  ['shower-repairs','Shower repair','Weak flow, hot-and-cold surges, dripping heads and failed valves.','a shower problem'],
  ['shower-pumps','Shower pump','Noisy, weak, cutting out or completely stopped pumps.','a shower pump'],
  ['low-water-pressure','Low water pressure','Weak at one outlet, upstairs only, or throughout the property.','low water pressure']
];
const more=['hot-water-cylinders','cold-water-tanks','stopcock-replacement','radiator-valves','blocked-sinks-wastes','outside-taps','appliance-plumbing','plumbing-inspections','general-plumbing'];

function stripAreas(cfg){
  const short={'eel-brook-walham-green':'Eel Brook & Walham Green','bishops-park':"Bishop's Park",'crabtree-fulham-reach':'Crabtree & Fulham Reach'};
  const out=['Fulham'];
  for(const a of [...cfg.areas.core,...cfg.areas.nearby]){
    if(a.slug==='sands-end-imperial-wharf'){out.push('Sands End','Imperial Wharf');continue}
    out.push(short[a.slug]||a.name);
  }
  return out;
}

export async function render({cfg,meta,path,css,scriptPath}){
  const p=pricing(cfg),fh=cfg.pricing.firstHour,services=cfg.services.filter(s=>s.enabled);
  const msg=what=>`Hi Fulham Plumbing, I need a plumber for ${what}. My postcode is ____. The problem is: ____.`;
  const svc=slug=>services.find(s=>s.slug===slug);
  const card=([slug,title,text,what])=>{
    const s=svc(slug);if(!s)return'';
    const time=s.typicalMinutes?p.typicalTimeText(s.typicalMinutes):'';
    return`<article class="job-card"><div class="job-card__top"><span class="chip">Book direct</span>${time?`<span class="job-card__time">${icon('clock')}Typically ${esc(time)}</span>`:''}</div><h3><a href="/${slug}/">${esc(title)}</a></h3><p>${esc(text)}</p><div class="job-card__price"><strong>£${fh}</strong><span>first hour<br>then ${cfg.pricing.incrementMinutes}-min steps</span></div><div class="job-card__actions">${cfg.contact.whatsapp?`<a class="btn btn--wa btn--sm" href="${waHref(cfg,msg(what))}" data-track="whatsapp_click">${waIcon()}<span>Book this</span></a>`:''}<a class="text-link" href="/${slug}/">How we fix it →</a></div></article>`;
  };
  const faq=[
    {q:'How much does a plumber cost in Fulham?',a:`£${fh} for the first hour, then charged in ${cfg.pricing.incrementMinutes}-minute steps, with parts at cost. There is no separate call-out fee.`},
    {q:'What plumbing work do you undertake?',a:'General plumbing across Fulham: repairs and fault finding on leaks, toilets, taps, showers and pumps, plus water pressure, tanks, cylinders, stopcocks, valves, wastes and appliance connections. Several jobs can be planned into one visit.'},
    {q:'Can I send a photo or video of the problem?',a:'Yes. Send the postcode and a short description on WhatsApp, then attach a photo or short video in the chat. It helps us identify the fitting and the likely fault before the visit.'},
    {q:'Which areas do you cover?',a:'Fulham SW6 is our core area, including Parsons Green, Hurlingham, Fulham Broadway, Sands End and Imperial Wharf, with nearby work in Chelsea Harbour and Lots Road, Putney and Wandsworth Town.'}
  ];
  const quick=[['leak-repairs','Leak repair','a leak'],['toilet-repairs','Toilet repair','a toilet problem']].map(([slug,name,what])=>`<a class="quick-card" href="${cfg.contact.whatsapp?waHref(cfg,msg(what)):'/'+slug+'/'}" data-track="whatsapp_click"><span class="quick-card__kicker">Book direct</span><strong>${name}</strong><span class="quick-card__price">£${fh}<small>first hour</small></span><span class="quick-card__go" aria-hidden="true">→</span></a>`).join('');
  const checker=cfg.contact.whatsapp?`<form class="checker" data-checker action="https://wa.me/${esc(cfg.contact.whatsapp)}" method="get" novalidate>
    <div class="checker__head"><span class="checker__icon">${icon('pin')}</span><div><p class="checker__kicker">Instant plumbing check</p><h2>Send us the job.</h2></div></div>
    <label class="checker__label" for="ck-postcode">Your postcode</label>
    <div class="checker__postcode"><input id="ck-postcode" data-ck-postcode autocomplete="postal-code" autocapitalize="characters" spellcheck="false" placeholder="e.g. SW6" maxlength="9"><span class="checker__area" data-ck-area aria-live="polite"></span></div>
    <label class="checker__label" for="ck-problem">What's wrong?</label>
    <textarea id="ck-problem" name="text" data-ck-problem rows="3" placeholder="e.g. Toilet keeps filling and running into the pan"></textarea>
    <label class="checker__file" for="ck-file"><input id="ck-file" type="file" accept="image/*,video/*" data-ck-file><span class="checker__file-icon">${icon('camera')}</span><span class="checker__file-text" data-ck-file-text><strong>Add a photo or short video</strong><small>It helps us identify the fitting and fault.</small></span></label>
    <div class="checker__preview" data-ck-preview hidden></div>
    <button class="btn btn--wa btn--block checker__send" type="submit" data-ck-send>${waIcon()}<span>Send to WhatsApp</span><b aria-hidden="true">→</b></button>
    <p class="checker__note" data-ck-note>Opens WhatsApp to ${esc(cfg.contact.phoneDisplay||cfg.contact.whatsapp)} with your message written.</p>
    <div class="checker__steps" data-ck-steps hidden></div>
  </form>`:'';
  const main=`
<section class="hero-home">
  <div class="shell hero-home__grid">
    <div class="area-strip"><span class="area-strip__icon">${icon('pin')}</span><div class="area-strip__body"><strong>Fulham SW6 &amp; nearby</strong><span class="area-strip__ticker"><span class="area-strip__track"><span>${stripAreas(cfg).map(esc).join(' · ')} ·&nbsp;</span><span class="area-strip__dup" aria-hidden="true">${stripAreas(cfg).map(esc).join(' · ')} ·&nbsp;</span></span></span></div></div>
    <h1 class="hero-home__title"><span>Plumber in</span> <span class="accent">Fulham, SW6</span></h1>
    <div class="hero-home__rule" aria-hidden="true"></div>
    <p class="hero-home__lede"><strong>Plumbing playing up?</strong> Repairs, maintenance and general plumbing across Fulham. Tell us the postcode and the problem, and send it straight to WhatsApp.</p>
    ${checker}
    <div class="quick-cards">${quick}</div>
  </div>
</section>
<section class="trust-strip" aria-label="Why Fulham Plumbing"><div class="shell"><ul><li>${icon('check')}Based in Fulham SW6</li><li>${icon('check')}£${fh} first hour</li><li>${icon('check')}No call-out fee</li><li>${icon('check')}Parts at cost</li><li>${icon('check')}WhatsApp booking</li></ul></div></section>
<section class="section jobs"><div class="shell">
  <p class="kicker">The regular jobs</p>
  <div class="section-head"><h2>Clear prices before we start.</h2><p>Every job starts at £${fh} for the first hour with no separate call-out fee. After that, time is charged in ${cfg.pricing.incrementMinutes}-minute steps and parts are charged at cost.</p></div>
  <div class="job-grid">${featured.map(card).join('')}</div>
  <div class="more-services"><h3>More plumbing services</h3><ul>${more.map(slug=>{const s=svc(slug);return s?`<li><a href="/${slug}/"><span>${esc(s.name)}</span>${icon('arrow')}</a></li>`:''}).join('')}</ul></div>
  <div class="split-cards"><a class="split-card" href="/landlords-agents/"><span class="kicker">Landlords &amp; agents</span><strong>Tenant access, photos before and after, and invoices to the agent.</strong><span class="text-link">Plumbing for landlords →</span></a><a class="split-card" href="/plumbing-inspections/"><span class="kicker">Buying a home?</span><strong>A plumbing inspection with a clear written report before you exchange.</strong><span class="text-link">Plumbing inspections →</span></a></div>
  <p class="section-foot"><a class="text-link" href="/pricing/">See how our prices work →</a></p>
</div></section>
<section class="section local" id="our-base"><div class="shell">
  <p class="kicker kicker--light">Local where it matters</p>
  <div class="section-head section-head--light"><h2>Fulham, street by street.</h2><p>Tap a pin to see the homes, buildings and plumbing problems we commonly find in each part of Fulham.</p></div>
  <p class="base-line">${icon('pin')}<span>Our Fulham base: <strong>${esc(cfg.operatingAddress.streetAddress)}, ${esc(cfg.operatingAddress.locality)}, ${esc(cfg.operatingAddress.city)} ${esc(cfg.operatingAddress.postcode)}</strong>. A working base, not a shop — we come to you.</span></p>
  ${renderMap({cfg,variant:'full'})}
  <p class="section-foot"><a class="text-link text-link--light" href="/areas-we-cover/">Every area we cover →</a></p>
</div></section>
<section class="section answers"><div class="shell two-col">
  <div><p class="kicker">Quick answers</p><h2>Know what you're dealing with.</h2><div class="link-list"><a href="/guides/water-through-ceiling/"><span><strong>Water coming through the ceiling</strong><small>What to isolate first and how the source is traced.</small></span>${icon('arrow')}</a><a href="/guides/shower-pressure-dropped/"><span><strong>Why has my shower pressure dropped?</strong><small>Separate an outlet problem from the supply or pump.</small></span>${icon('arrow')}</a><a href="/guides/toilet-keeps-running/"><span><strong>Why does my toilet keep running?</strong><small>Work out whether the fill or flush side is passing water.</small></span>${icon('arrow')}</a><a href="/guides/lead-and-old-pipes/"><span><strong>Lead and old pipes in Fulham homes</strong><small>How to check, and what replacement involves.</small></span>${icon('arrow')}</a></div><p class="section-foot"><a class="text-link" href="/guides/">All plumbing guides →</a></p></div>
  <div><p class="kicker">Straight answers</p><h2>Before you book.</h2><div class="faq-list">${faq.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div>${exclusions(cfg)}</div>
</div></section>
<section class="final-cta"><div class="shell"><p class="kicker kicker--light">Need a plumber?</p><h2>Send us the postcode and problem.</h2><p>It opens WhatsApp to ${esc(cfg.contact.phoneDisplay||'')} with your message ready. Add a photo or short video in the chat before sending.</p><div class="final-cta__actions">${cfg.contact.whatsapp?`<a class="btn btn--wa btn--lg" href="${waHref(cfg)}" data-wa data-track="whatsapp_click">${waIcon()}<span>WhatsApp a plumbing job</span><b aria-hidden="true">→</b></a>`:''}${cfg.contact.phone?`<a class="btn btn--call btn--lg" href="tel:${esc(cfg.contact.phone)}" data-track="call_click">${icon('phone')}<span>Call ${esc(cfg.contact.phoneDisplay||cfg.contact.phone)}</span></a>`:''}</div></div></section>`;
  return pageShell({cfg,meta,path,css,scriptPath,main,faqs:faq,bodyClass:'home'});
}
