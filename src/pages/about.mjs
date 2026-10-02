import{pageShell,breadcrumb,exclusions,actions}from'../lib/layout.mjs';
import{renderMap}from'../lib/map.mjs';

export async function render({cfg,meta,path,css,scriptPath}){
 const crumbs=[{name:'Home',path:'/'},{name:'About',path}];
 const person=cfg.plumber.name?`<section class="section"><div class="shell inner-layout"><div class="content-column"><p class="eyebrow">The plumber</p><h2>${cfg.plumber.name}</h2>${cfg.plumber.bio?`<p>${cfg.plumber.bio}</p>`:''}${cfg.plumber.since?`<p>Working in plumbing since ${cfg.plumber.since}.</p>`:''}</div>${cfg.plumber.photo?`<aside class="inner-rail"><img src="${cfg.plumber.photo}" alt="${cfg.plumber.photoAlt||''}" width="720" height="900"></aside>`:''}</div></section>`:'';
 const local=[cfg.plumber.localStory,cfg.plumber.school?`School: ${cfg.plumber.school}.`:null,cfg.plumber.yearsInFulham?`${cfg.plumber.yearsInFulham} years connected to Fulham.`:null].filter(Boolean);
 const localSection=local.length?`<section class="section section--alt"><div class="shell narrow"><p class="eyebrow">Local roots</p><h2>Local to Fulham.</h2>${local.map(x=>`<p>${x}</p>`).join('')}</div></section>`:'';
 const creds=(cfg.plumber.qualifications?.length||cfg.plumber.insured===true)?`<section class="section"><div class="shell narrow"><p class="eyebrow">Background</p><h2>Plumbing experience and credentials.</h2>${cfg.plumber.qualifications?.length?`<ul>${cfg.plumber.qualifications.map(q=>`<li>${q}</li>`).join('')}</ul>`:''}${cfg.plumber.insured===true?`<p>Insured${cfg.plumber.publicLiabilityCover?` — ${cfg.plumber.publicLiabilityCover}`:''}.</p>`:''}</div></section>`:'';
 const principles=[
  ['Send the problem first','A clear photo and postcode help identify the likely parts and whether the visit needs more time.'],
  ['Clear price structure',`Labour starts at £${cfg.pricing.firstHour} for the first hour. Further time is charged in ${cfg.pricing.incrementMinutes}-minute steps. Parts are charged at cost.`],
  ['Explain before fixing','Where there is more than one sensible route, we explain what has failed and what each repair involves before continuing.'],
  ['Tidy and itemised','The aim is a sound repair, a clean work area and an invoice that separates labour from parts.'],
  ['All plumbing work considered','From one repair to larger plumbing work, we deal with the plumbing scope properly and explain what is involved before starting.']
 ];
 const main=`<div class="shell">${breadcrumb(crumbs)}</div>
 <section class="hero"><div class="shell"><p class="eyebrow">Local plumbing · Fulham SW6</p><h1>${meta.h1}</h1><p class="lede">A local plumber based on Hurlingham Road, SW6.</p><div class="hero-actions">${actions(cfg)}</div></div></section>
 ${person}${localSection}${creds}
 <section class="section"><div class="shell"><p class="eyebrow">How we work</p><h2>Simple, clear and local.</h2><div class="hairline-list">${principles.map(([h,t])=>`<div class="hairline-row"><span><strong>${h}</strong><small>${t}</small></span></div>`).join('')}</div></div></section>
 <section class="section section--alt"><div class="shell inner-layout"><div class="content-column"><p class="eyebrow">Based on Hurlingham Road</p><h2>In the middle of the SW6 service area.</h2><p>Fulham Plumbing is based at 36 Hurlingham Road, London SW6 3RQ. It is a working base, not a walk-in shop; all plumbing visits are carried out at the customer's property.</p><p><a href="/areas-we-cover/">See the full service-area map →</a></p></div><aside class="inner-rail"><div class="map-crop">${renderMap({cfg,variant:'about',focus:'hurlingham'})}</div></aside></div></section>
 <section class="section"><div class="shell narrow"><p class="eyebrow">What we do</p><h2>Plumbing work across Fulham.</h2><p>Leaks, toilets, taps, showers, pumps, water pressure, tanks, cylinders, stopcocks, radiator valves, internal wastes, appliance connections, outside taps and <a href="/general-plumbing/">general plumbing work</a>.</p><p><a href="/plumbing-services/">See every plumbing service →</a> · <a href="/pricing/">See pricing →</a></p>${exclusions(cfg)}</div></section>
 <section class="cta-band"><div class="shell"><p class="eyebrow">Need a plumber?</p><h2>Tell us what needs sorting.</h2><div class="hero-actions">${actions(cfg)}</div></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs,bodyClass:'about-page'});
}