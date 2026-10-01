import{esc}from'./util.mjs';
import{areaProfiles}from'../content/area-profiles.mjs';

const problemService=k=>({
  leak:'leak-repairs',toilet:'toilet-repairs',tap:'tap-repairs',shower:'shower-repairs',
  'low-pressure':'low-water-pressure','shower-pump':'shower-pumps','hot-water':'hot-water-cylinders',
  'blocked-sink':'blocked-sinks-wastes',stopcock:'stopcock-replacement'
}[k]||'small-plumbing-jobs');
const problemLabel=k=>({
  leak:'Leak',toilet:'Toilet',tap:'Tap',shower:'Shower','low-pressure':'Low pressure',
  'shower-pump':'Shower pump','hot-water':'Hot water','blocked-sink':'Blocked sink',stopcock:'Stopcock'
}[k]||k);
const href=a=>a.hrefOverride||(a.hasPage?`/areas/${a.slug}/`:a.home?`/#${a.slug}`:`/areas-we-cover/#${a.slug}`);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const shortName=a=>({
  'eel-brook-walham-green':'Eel Brook',
  'peterborough-estate':'Peterborough',
  'bishops-park':"Bishop's Park",
  'chelsea-harbour':'Chelsea Harbour',
  'wandsworth-town':'Wandsworth'
}[a.slug]||a.name);

function areas(cfg){
  const raw=[...cfg.areas.core,...cfg.areas.nearby].filter(a=>a.slug!=='crabtree-fulham-reach');
  const out=[];
  for(const a of raw){
    if(a.slug==='sands-end-imperial-wharf'){
      out.push({...a,slug:'sands-end',name:'Sands End',pin:[75,58],profileKey:'sands-end',hrefOverride:'/areas/sands-end-imperial-wharf/',anchor:true,labelSide:'left'});
      out.push({...a,slug:'imperial-wharf',name:'Imperial Wharf',pin:[85,64],profileKey:'imperial-wharf',hrefOverride:'/areas/sands-end-imperial-wharf/',anchor:true,labelSide:'right'});
    }else{
      const adjusted=a.slug==='putney'?{pin:[12,87]}:a.slug==='wandsworth-town'?{pin:[67,88]}:a.slug==='chelsea-harbour'?{pin:[88,43]}:{};
      out.push({...a,...adjusted,profileKey:a.slug});
    }
  }
  return out.sort((a,b)=>a.pin[1]-b.pin[1]||a.pin[0]-b.pin[0]);
}

const svgArt=viewBox=>`<svg viewBox="${viewBox}" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="fp-map-title">
<title id="fp-map-title">Illustrated map of Fulham and nearby areas covered by Fulham Plumbing</title>
<defs><pattern id="park-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="rgba(255,255,255,.13)"/></pattern></defs>
<rect width="1000" height="740" fill="#102A4D"/>
<g fill="#263D52" stroke="rgba(255,255,255,.12)" stroke-width="1.2">
<path d="M95 330C116 348 143 365 150 500L105 503 79 372Z"/><path d="M150 420C180 413 211 421 230 450L230 500 150 500Z"/><path d="M300 520C350 507 425 516 480 542L455 605 315 595Z"/><path d="M620 470C650 456 690 463 720 486L710 540 615 532Z"/><path d="M590 250C615 246 652 254 680 269L670 300 585 286Z"/></g>
<g fill="url(#park-dots)"><path d="M95 330C116 348 143 365 150 500L105 503 79 372Z"/><path d="M150 420C180 413 211 421 230 450L230 500 150 500Z"/><path d="M300 520C350 507 425 516 480 542L455 605 315 595Z"/><path d="M620 470C650 456 690 463 720 486L710 540 615 532Z"/><path d="M590 250C615 246 652 254 680 269L670 300 585 286Z"/></g>
<path class="map-river" d="M60 0C72 150 92 330 120 500C145 560 195 592 360 632C520 652 650 630 780 580C900 500 950 465 1000 430" fill="none" stroke="var(--river)" stroke-width="48" stroke-linecap="round"/>
<path d="M60 0C72 150 92 330 120 500C145 560 195 592 360 632C520 652 650 630 780 580C900 500 950 465 1000 430" fill="none" stroke="#D5E5FF" stroke-width="1.5"/>
<g fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2.4" class="map-roads">
<path d="M650 150C560 210 430 315 330 400C270 448 210 480 135 520"/><path d="M1000 250C830 270 680 323 560 380C445 432 300 475 160 520"/><path d="M590 380C608 470 630 555 650 630"/></g>
<g fill="rgba(255,255,255,.48)" font-family="system-ui,Arial,sans-serif" font-size="10" font-weight="650" letter-spacing=".06em">
<text x="420" y="315" transform="rotate(-34 420 315)">FULHAM ROAD</text><text x="590" y="356" transform="rotate(-16 590 356)">NEW KING'S ROAD</text><text x="611" y="480" transform="rotate(76 611 480)">WANDSWORTH BRIDGE ROAD</text><text x="350" y="665" fill="#D5E5FF" font-style="italic">THE THAMES</text></g></svg>`;

function displayData(a,cfg){
  const p=areaProfiles[a.profileKey]||{};
  return{
    key:a.slug,name:a.name,shortName:shortName(a),postcode:a.postcode||'',href:href(a),
    intro:p.intro||'',homes:p.homes||[],problems:p.problems||[],
    anchor:!!a.anchor,labelSide:a.labelSide||'right',
    wa:cfg.contact.whatsapp?`https://wa.me/${esc(cfg.contact.whatsapp)}?text=${encodeURIComponent(`Hi Fulham Plumbing, I'm in ${a.name}. My postcode is ____. I have a plumbing problem and I've attached a photo.`)}`:''
  };
}
const json=o=>JSON.stringify(o).replace(/</g,'\\u003c');

function detailBody(d){
  return`${d.intro?`<p>${esc(d.intro)}</p>`:''}${d.homes.length?`<h4>Homes and buildings</h4><ul>${d.homes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}${d.problems.length?`<h4>Common plumbing calls</h4><div class="area-tags">${d.problems.map(k=>`<a class="tag" href="/${problemService(k)}/" data-problem-jump="${esc(k)}">${esc(problemLabel(k))}</a>`).join('')}</div>`:''}<div class="map-info__actions"><a class="button button--secondary button--compact" href="${d.href}">Plumbing in ${esc(d.name)} →</a>${d.wa?`<a class="button button--whatsapp button--compact" href="${d.wa}" data-wa>WhatsApp us</a>`:''}</div>`;
}

export function renderMap({cfg,variant='full',focus=null}){
  const all=areas(cfg),data=all.map(a=>displayData(a,cfg));
  const focusArea=focus?all.find(a=>a.slug===focus||a.hrefOverride?.includes(focus)):null;
  let viewBox='0 0 1000 740';
  if(variant==='area'&&focusArea){
    const x=clamp(focusArea.pin[0]*10-340,0,320),y=clamp(focusArea.pin[1]*7.4-260,0,220);
    viewBox=`${x} ${y} 680 520`;
  }
  if(variant==='about')viewBox='300 260 440 360';
  const show=variant==='about'?[]:all;
  const pins=show.map((a,i)=>{
    const d=displayData(a,cfg),selected=variant==='area'&&(a.slug===focus||a.hrefOverride?.includes(focus));
    const cls=['map-pin-wrap',d.anchor?'is-anchor':'',selected?'is-selected':'',`label-${d.labelSide}`].filter(Boolean).join(' ');
    return`<div class="${cls}" style="left:${a.pin[0]}%;top:${a.pin[1]}%;--pin-order:${i}" data-map-point data-area-key="${esc(d.key)}"><button type="button" class="map-pin" aria-label="${esc(d.name)}" data-map-trigger data-area-key="${esc(d.key)}"><span class="map-pin__shape" aria-hidden="true"></span></button><span class="map-pin__label" aria-hidden="true">${esc(d.shortName)}</span></div>`;
  }).join('');
  const b=cfg.map.base;
  const base=`<div class="map-pin-wrap is-base label-top" style="left:${b[0]}%;top:${b[1]}%;--pin-order:20" data-map-point data-area-key="local-base"><button type="button" class="map-pin" aria-label="Our Fulham base" data-map-trigger data-area-key="local-base"><span class="map-pin__shape" aria-hidden="true"></span></button><span class="map-pin__label" aria-hidden="true">We're here</span></div>`;
  if(variant!=='full'){
    return`<div class="fp-map fp-map--${variant}" data-map data-map-variant="${variant}"><div class="fp-map__art">${svgArt(viewBox)}<div class="map-pins">${pins}${base}</div></div></div>`;
  }
  const rows=data.map(d=>`<button class="map-info__row" type="button" data-area-row data-area-key="${esc(d.key)}"><strong>${esc(d.name)}</strong><span>${esc(d.postcode)}</span></button>`).join('');
  const mobile=data.map(d=>`<details id="area-${esc(d.key)}" data-area-detail data-area-key="${esc(d.key)}"><summary>${esc(d.name)} ${d.postcode?`<span>${esc(d.postcode)}</span>`:''}</summary><div class="map-mobile-list__body">${detailBody(d)}</div></details>`).join('');
  const baseData={key:'local-base',name:'Our Fulham base',shortName:"We're here",postcode:'SW6',href:'/about/',intro:'Fulham Plumbing is based on Hurlingham Road. This is a working base rather than a walk-in shop; plumbing visits are carried out at the customer’s property.',homes:[],problems:[],anchor:true,labelSide:'top',wa:''};
  return`<div class="map-explorer" data-map data-map-variant="full">
    <section class="map-info" aria-live="polite" aria-label="Area information">
      <div class="map-info__default" data-map-default>
        <p class="eyebrow">Our doorstep</p><h2>Fulham, street by street.</h2>
        <p>Fulham Plumbing is based on Hurlingham Road, close to Parsons Green and the centre of SW6.</p>
        <p>Around Parsons Green and Hurlingham, period houses, converted flats and larger family homes sit alongside mansion blocks and newer riverside apartments across the wider area.</p>
        <div class="map-info__areas">${rows}</div>
      </div>
      <div class="map-info__state" data-map-state hidden><button class="map-info__back" type="button" data-map-back>← All areas</button><p class="eyebrow" data-map-postcode></p><h3 data-map-name></h3><div data-map-copy></div></div>
    </section>
    <div class="fp-map fp-map--full"><div class="fp-map__art">${svgArt(viewBox)}<div class="map-pins">${pins}${base}</div></div></div>
    <div class="map-mobile-list" aria-label="Areas we cover">${mobile}</div>
    <script type="application/json" class="map-data">${json([...data,baseData])}</script>
  </div>`;
}