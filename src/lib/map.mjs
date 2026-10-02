import{esc}from'./util.mjs';
import{areaProfiles}from'../content/area-profiles.mjs';

const SERVICE={leak:'leak-repairs',toilet:'toilet-repairs',tap:'tap-repairs',shower:'shower-repairs','low-pressure':'low-water-pressure','shower-pump':'shower-pumps','hot-water':'hot-water-cylinders','blocked-sink':'blocked-sinks-wastes',stopcock:'stopcock-replacement'};
const LABEL={leak:'Leaks',toilet:'Toilets',tap:'Taps',shower:'Showers','low-pressure':'Low pressure','shower-pump':'Shower pumps','hot-water':'Hot water','blocked-sink':'Blocked sinks',stopcock:'Stopcocks'};
const serviceFor=k=>SERVICE[k]||'general-plumbing';
const labelFor=k=>LABEL[k]||k;

/* Pin layout for the illustrated map. Positions are percentages of the 1000x740 artwork.
   side = where the label sits relative to the pin; chosen by hand so labels never overlap. */
const LAYOUT={
  'fulham-broadway':{pin:[64,22],side:'right',mside:'left',short:'Fulham Broadway',anchor:true},
  'munster-village':{pin:[34,30],side:'left',short:'Munster Village'},
  'eel-brook-walham-green':{pin:[62,36],side:'right',short:'Eel Brook'},
  'parsons-green':{pin:[56,47],side:'left',short:'Parsons Green',anchor:true},
  'bishops-park':{pin:[18,50],side:'right',short:"Bishop's Park"},
  'peterborough-estate':{pin:[65,59],side:'right',short:'Peterborough'},
  'sands-end':{pin:[77,55],side:'above',short:'Sands End',anchor:true},
  'imperial-wharf':{pin:[86,66],side:'below',mside:'left',short:'Imperial Wharf',anchor:true},
  'hurlingham':{pin:[43,69],side:'left',short:'Hurlingham',anchor:true},
  'chelsea-harbour':{pin:[90,42],side:'above',mside:'left',short:'Chelsea Harbour'},
  'putney':{pin:[12,88],side:'right',short:'Putney'},
  'wandsworth-town':{pin:[67,90],side:'right',mside:'left',short:'Wandsworth Town'}
};
const BASE={pin:[50,56],side:'below'};

function areaList(cfg){
  const out=[];
  for(const a of[...cfg.areas.core,...cfg.areas.nearby]){
    if(a.slug==='crabtree-fulham-reach')continue;
    if(a.slug==='sands-end-imperial-wharf'){
      out.push({...a,key:'sands-end',name:'Sands End',href:'/areas/sands-end-imperial-wharf/'});
      out.push({...a,key:'imperial-wharf',name:'Imperial Wharf',href:'/areas/sands-end-imperial-wharf/'});
      continue;
    }
    out.push({...a,key:a.slug,href:a.hasPage?`/areas/${a.slug}/`:a.home?`/#our-base`:`/areas-we-cover/#${a.slug}`});
  }
  return out.filter(a=>LAYOUT[a.key]).map(a=>({...a,...LAYOUT[a.key]})).sort((x,y)=>x.pin[1]-y.pin[1]||x.pin[0]-y.pin[0]);
}

function cardData(a,cfg){
  const p=areaProfiles[a.key]||{};
  return{key:a.key,name:a.name,postcode:a.postcode||'',nearby:cfg.areas.nearby.some(n=>n.slug===a.slug),href:a.href,intro:p.intro||'',homes:p.homes||[],problems:(p.problems||[]).map(k=>({label:labelFor(k),href:`/${serviceFor(k)}/`})),wa:cfg.contact.whatsapp?`https://wa.me/${cfg.contact.whatsapp}?text=${encodeURIComponent(`Hi Fulham Plumbing, I'm in ${a.name}. My postcode is ____. The problem is: ____.`)}`:''};
}

const art=`<svg class="map-art" viewBox="0 0 1000 740" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="map-title-svg"><title id="map-title-svg">Illustrated map of Fulham and the nearby areas Fulham Plumbing covers</title><defs><pattern id="mapdots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,.16)"/></pattern></defs><rect width="1000" height="740" fill="#0F2A57"/><g class="map-parks"><path d="M95 330C116 348 143 365 150 500L105 503 79 372Z"/><path d="M150 420C180 413 211 421 230 450L230 500 150 500Z"/><path d="M300 520C350 507 425 516 480 542L455 605 315 595Z"/><path d="M620 470C650 456 690 463 720 486L710 540 615 532Z"/><path d="M590 250C615 246 652 254 680 269L670 300 585 286Z"/><path d="M548 330L585 338 566 362Z"/></g><g fill="url(#mapdots)"><path d="M95 330C116 348 143 365 150 500L105 503 79 372Z"/><path d="M150 420C180 413 211 421 230 450L230 500 150 500Z"/><path d="M300 520C350 507 425 516 480 542L455 605 315 595Z"/><path d="M620 470C650 456 690 463 720 486L710 540 615 532Z"/><path d="M590 250C615 246 652 254 680 269L670 300 585 286Z"/></g><path class="map-river" d="M60 -10C72 150 92 330 120 500C145 560 195 592 360 632C520 652 650 630 780 580C900 500 950 465 1010 425" pathLength="1"/><path class="map-river-edge" d="M60 -10C72 150 92 330 120 500C145 560 195 592 360 632C520 652 650 630 780 580C900 500 950 465 1010 425"/><g class="map-roads"><path pathLength="1" d="M650 150C560 210 430 315 330 400C270 448 210 480 135 520"/><path pathLength="1" d="M1000 250C830 270 680 323 560 380C445 432 300 475 160 520"/><path pathLength="1" d="M590 380C608 470 630 555 650 640"/><path pathLength="1" d="M135 0C138 160 140 330 142 505"/><path pathLength="1" d="M330 40C345 160 360 270 372 395"/><path pathLength="1" d="M660 0C658 60 655 110 650 150"/><path pathLength="1" d="M560 372C520 420 480 470 440 520"/><path pathLength="1" d="M705 560C760 530 830 500 905 470"/></g><g class="map-roadnames"><text x="404" y="318" transform="rotate(-34 404 318)">FULHAM ROAD</text><text x="700" y="300" transform="rotate(-12 700 300)">NEW KING'S ROAD</text><text x="626" y="500" transform="rotate(76 626 500)">WANDSWORTH BRIDGE RD</text><text x="128" y="250" transform="rotate(88 128 250)">FULHAM PALACE RD</text></g><text class="map-thames" x="330" y="676">The Thames</text></svg>`;

function pin(a,i,{selectable=true,selected=false}={}){
  const cls=['map-pin',`side-${a.side}`,`mside-${a.mside||a.side}`,a.anchor?'is-anchor':'',a.nearby?'is-nearby':'',selected?'is-selected':''].filter(Boolean).join(' ');
  const inner=`<span class="map-pin__dot" aria-hidden="true"></span>${a.short?`<span class="map-pin__label">${esc(a.short)}</span>`:''}`;
  const style=`left:${a.pin[0]}%;top:${a.pin[1]}%;--i:${i}`;
  return selectable
    ?`<button type="button" class="${cls}" style="${style}" data-map-pin="${esc(a.key)}" aria-pressed="${selected}" aria-label="${esc(a.name)}${a.postcode?`, ${esc(a.postcode)}`:''}">${inner}</button>`
    :`<span class="${cls}" style="${style}" aria-hidden="true">${inner}</span>`;
}
const basePin=(i,label="We're here")=>`<span class="map-pin map-pin--base side-${BASE.side}" style="left:${BASE.pin[0]}%;top:${BASE.pin[1]}%;--i:${i}" aria-hidden="true"><span class="map-pin__dot"></span><span class="map-pin__label">${label}</span></span>`;

export function renderMap({cfg,variant='full',focus=null}){
  const all=areaList(cfg).map(a=>({...a,nearby:cfg.areas.nearby.some(n=>n.slug===a.slug)}));
  if(variant==='area'||variant==='about'){
    const isFocus=a=>focus&&(a.slug===focus||a.key===focus);
    const pins=variant==='about'?'':all.map((a,i)=>pin({...a,short:isFocus(a)?a.short:''},i,{selectable:false,selected:isFocus(a)})).join('');
    return`<div class="fp-map fp-map--${variant}" data-map data-map-variant="${variant}"><div class="map-frame">${art}<div class="map-pins">${pins}${basePin(all.length)}</div></div></div>`;
  }
  const data=all.map(a=>cardData(a,cfg));
  const base={key:'base',name:'Our Fulham base',postcode:'SW6',href:'/about/',intro:`Fulham Plumbing works from ${cfg.operatingAddress.streetAddress}, between Parsons Green and Hurlingham. It is a working base rather than a shop, so every visit is at your property.`,homes:['Period terraces and converted flats','Larger family houses towards the river','Mansion blocks and newer apartments across SW6'],problems:[],wa:''};
  const chips=all.map(a=>`<a class="map-chip${a.nearby?' is-nearby':''}" href="${a.href}" data-map-chip="${esc(a.key)}">${esc(a.name)}</a>`).join('');
  const defaultCard=`<p class="map-card__kicker">SW6 · Our doorstep</p><h3>Pick a pin to explore an area</h3><p>Fulham Plumbing works from ${esc(cfg.operatingAddress.streetAddress)}, between Parsons Green and Hurlingham. Each pin shows the kind of homes in that part of Fulham and the plumbing calls we see most there.</p>`;
  return`<div class="map-explorer" data-map data-map-variant="full"><div class="map-frame">${art}<div class="map-pins">${all.map((a,i)=>pin(a,i)).join('')}${basePin(all.length)}</div><p class="map-legend" aria-hidden="true"><span></span>Our base</p></div><div class="map-side"><article class="map-card" data-map-card aria-live="polite" tabindex="-1">${defaultCard}</article><div class="map-index"><p class="map-index__label">Choose an area</p><div class="map-index__list">${chips}</div></div></div><script type="application/json" class="map-data">${JSON.stringify({areas:data,base}).replace(/</g,'\\u003c')}</script></div>`;
}
