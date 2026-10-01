
import{esc}from'./util.mjs';
import{areaProfiles}from'../content/area-profiles.mjs';

const href=a=>a.hasPage?`/areas/${a.slug}/`:a.home?`/#${a.slug}`:`/areas-we-cover/#${a.slug}`;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const labelForProblem=k=>({
  leak:'Leak',toilet:'Toilet',tap:'Tap',shower:'Shower','low-pressure':'Low pressure',
  'shower-pump':'Shower pump','hot-water':'Hot water','blocked-sink':'Blocked sink',stopcock:'Stopcock'
}[k]||k);

const svgArt=(viewBox)=>`<svg viewBox="${viewBox}" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="fp-map-title">
<title id="fp-map-title">Illustrated map of Fulham and nearby areas we cover</title>
<defs><pattern id="park-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="rgba(255,255,255,.15)"/></pattern></defs>
<rect width="1000" height="740" fill="#10263d"/>
<g class="map-parks" fill="#263d52" stroke="rgba(255,255,255,.14)" stroke-width="1.4">
<path d="M95 330C116 348 143 365 150 500L105 503 79 372Z"/><path d="M150 420C180 413 211 421 230 450L230 500 150 500Z"/><path d="M300 520C350 507 425 516 480 542L455 605 315 595Z"/><path d="M620 470C650 456 690 463 720 486L710 540 615 532Z"/><path d="M590 250C615 246 652 254 680 269L670 300 585 286Z"/><path d="M540 340 590 348 566 372Z"/></g>
<g class="map-parks" fill="url(#park-dots)"><path d="M95 330C116 348 143 365 150 500L105 503 79 372Z"/><path d="M150 420C180 413 211 421 230 450L230 500 150 500Z"/><path d="M300 520C350 507 425 516 480 542L455 605 315 595Z"/><path d="M620 470C650 456 690 463 720 486L710 540 615 532Z"/><path d="M590 250C615 246 652 254 680 269L670 300 585 286Z"/></g>
<path class="map-river" d="M60 0C72 150 92 330 120 500C145 560 195 592 360 632C520 652 650 630 780 580C900 500 950 465 1000 430" fill="none" stroke="var(--river)" stroke-width="48" stroke-linecap="round"/>
<path class="map-river-edge" d="M60 0C72 150 92 330 120 500C145 560 195 592 360 632C520 652 650 630 780 580C900 500 950 465 1000 430" fill="none" stroke="var(--river-edge)" stroke-width="1.6"/>
<g class="map-bridges" fill="none" stroke="#10263d" stroke-width="16"><path d="M125 518 151 598"/><path d="M642 598 660 672"/></g>
<g class="map-roads" fill="none" stroke="rgba(255,255,255,.30)" stroke-width="2.6">
<path d="M650 150C560 210 430 315 330 400C270 448 210 480 135 520"/><path d="M1000 250C830 270 680 323 560 380C445 432 300 475 160 520"/><path d="M130 0C132 150 137 330 140 500"/><path d="M330 60C340 140 360 240 380 330"/><path d="M660 0C657 55 654 105 650 150"/><path d="M590 380C608 470 630 555 650 630"/><path d="M550 385C520 420 480 462 440 500"/><path d="M700 560C760 535 835 500 900 470"/></g>
<g class="map-labels" fill="rgba(255,255,255,.64)" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700" letter-spacing=".08em">
<text x="420" y="315" transform="rotate(-34 420 315)">FULHAM ROAD</text><text x="590" y="356" transform="rotate(-16 590 356)">NEW KING'S ROAD</text><text x="118" y="250" transform="rotate(88 118 250)">FULHAM PALACE ROAD</text><text x="342" y="190" transform="rotate(78 342 190)">MUNSTER ROAD</text><text x="611" y="480" transform="rotate(76 611 480)">WANDSWORTH BRIDGE ROAD</text><text x="472" y="445" transform="rotate(-42 472 445)">HURLINGHAM ROAD</text><text x="335" y="665" fill="var(--river-edge)" font-style="italic">THE THAMES</text></g>
<g class="map-edge-labels" fill="rgba(255,255,255,.52)" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="800"><text x="55" y="690">PUTNEY</text><text x="565" y="710">WANDSWORTH TOWN</text><text x="825" y="390">CHELSEA HARBOUR</text></g></svg>`;

function profileBody(a,profile,cfg){
  const homes=profile?.homes?.length?`<h4>Homes and buildings</h4><ul>${profile.homes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
  const chips=profile?.problems?.length?`<h4>Quick help</h4><div class="symptom-row">${profile.problems.map(k=>`<a class="problem-chip" href="/${problemService(k)}/" data-problem-jump="${esc(k)}">${esc(labelForProblem(k))}</a>`).join('')}</div>`:'';
  const wa=cfg.contact.whatsapp?`<a class="button button--whatsapp button--compact" href="https://wa.me/${esc(cfg.contact.whatsapp)}?text=${encodeURIComponent(`Hi Fulham Plumbing, I'm in ${a.name}. My postcode is ____. I have a plumbing problem and I've attached a photo.`)}">WhatsApp us</a>`:'';
  return`<div class="map-list__body">${profile?.intro?`<p>${esc(profile.intro)}</p>`:''}${homes}${chips}<div class="map-list__actions"><a class="button button--secondary button--compact" href="${areaHref(a)}">Plumbing in ${esc(a.name)} →</a>${wa}</div></div>`;
}
function problemService(k){return({
  leak:'leak-repairs',toilet:'toilet-repairs',tap:'tap-repairs',shower:'shower-repairs','low-pressure':'low-water-pressure',
  'shower-pump':'shower-pumps','hot-water':'hot-water-cylinders','blocked-sink':'blocked-sinks-wastes',stopcock:'stopcock-replacement'
}[k]||'small-plumbing-jobs')}

function displayAreas(cfg){
  const all=[...cfg.areas.core,...cfg.areas.nearby].filter(a=>a.slug!=='crabtree-fulham-reach');
  const out=[];
  for(const a of all){
    if(a.slug==='sands-end-imperial-wharf'){
      out.push({...a,slug:'sands-end',name:'Sands End',pin:[76,58],profileKey:'sands-end',hrefOverride:'/areas/sands-end-imperial-wharf/'});
      out.push({...a,slug:'imperial-wharf',name:'Imperial Wharf',pin:[86,64],profileKey:'imperial-wharf',hrefOverride:'/areas/sands-end-imperial-wharf/'});
    }else out.push({...a,profileKey:a.slug});
  }
  return out.sort((a,b)=>a.pin[1]-b.pin[1]||a.pin[0]-b.pin[0]);
}
const areaHref=a=>a.hrefOverride||href(a);

export function renderMap({cfg,variant='full',focus=null}){
  const all=displayAreas(cfg);
  const focusArea=focus?all.find(a=>a.slug===focus||a.hrefOverride?.includes(focus)):null;
  let viewBox='0 0 1000 740';
  if(variant==='area'&&focusArea){const x=clamp(focusArea.pin[0]*10-340,0,320),y=clamp(focusArea.pin[1]*7.4-260,0,220);viewBox=`${x} ${y} 680 520`}
  if(variant==='about')viewBox='300 270 430 350';
  const showAreas=variant==='about'?[]:all;
  const panels=variant==='full';
  const pins=showAreas.map(a=>{
    const left=a.pin[0],top=a.pin[1],profile=areaProfiles[a.profileKey]||null;
    const classes=['map-pin-wrap',cfg.areas.nearby.some(x=>x.slug===a.slug)?'is-nearby':'is-core',focus===a.slug?'is-focus':''].filter(Boolean).join(' ');
    const panel=panels?`<section class="map-panel" id="panel-${a.slug}" tabindex="-1" hidden><button class="map-panel__close" type="button" data-map-close aria-label="Close area panel">×</button><p class="eyebrow">${esc(a.postcode||'Local area')}</p><h3 tabindex="-1">${esc(a.name)}</h3>${profileBody({...a,hasPage:a.hasPage},profile,cfg)}</section>`:'';
    return`<div class="${classes}" data-map-point style="left:${left}%;top:${top}%"><button type="button" class="map-pin" aria-label="${esc(a.name)}" aria-expanded="false"${panels?` aria-controls="panel-${a.slug}"`:''} data-map-trigger${panels?` data-area-target="list-${a.slug}"`:''}><span class="map-pin__shape" aria-hidden="true"></span><span class="map-pin__label" aria-hidden="true">${esc(a.name)}</span></button>${panel}</div>`;
  }).join('');
  const b=cfg.map.base;
  const base=variant==='about'
    ?`<div class="map-pin-wrap is-base" style="left:${b[0]}%;top:${b[1]}%"><span class="map-pin"><span class="map-pin__shape"></span><span class="map-pin__label">We're here</span></span></div>`
    :`<div class="map-pin-wrap is-base" data-map-point style="left:${b[0]}%;top:${b[1]}%"><button type="button" class="map-pin" aria-expanded="false"${panels?' aria-controls="panel-local-base"':''} data-map-trigger><span class="map-pin__shape"></span><span class="map-pin__label">We're here</span></button>${panels?'<section class="map-panel" id="panel-local-base" tabindex="-1" hidden><button class="map-panel__close" type="button" data-map-close aria-label="Close area panel">×</button><p class="eyebrow">Hurlingham Road · SW6</p><h3 tabindex="-1">Our Fulham base</h3><div class="map-list__body"><p>We are based on Hurlingham Road. This is a working base rather than a walk-in shop; plumbing visits are carried out at the customer’s property.</p><div class="map-list__actions"><a class="button button--secondary button--compact" href="/about/">About Fulham Plumbing →</a></div></div></section>':''}</div>`;
  const list=panels?all.map(a=>`<details class="map-list__item" id="list-${a.slug}"><summary><strong>${esc(a.name)}</strong>${a.postcode?` <span>${esc(a.postcode)}</span>`:''}</summary>${profileBody({...a,hasPage:a.hasPage},areaProfiles[a.profileKey],cfg)}</details>`).join(''):'';
  return`<div class="fp-map fp-map--${variant}" data-map data-map-variant="${variant}"><div class="fp-map__art">${svgArt(viewBox)}<div class="map-pins">${pins}${base}</div></div>${list?`<div class="map-list" aria-label="Areas we cover">${list}</div>`:''}</div>`;
}