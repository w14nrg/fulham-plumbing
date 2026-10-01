import{pageShell,breadcrumb,actions}from'./layout.mjs';
import{pricing}from'./pricing.mjs';
import{renderMap}from'./map.mjs';
import{areaProfiles}from'../content/area-profiles.mjs';

const problemLabel=k=>({
 leak:'Leak',toilet:'Toilet',tap:'Tap',shower:'Shower','low-pressure':'Low pressure','shower-pump':'Shower pump','hot-water':'Hot water','blocked-sink':'Blocked sink',stopcock:'Stopcock'
}[k]||k);

export async function renderArea({cfg,meta,path,css,scriptPath,area,content}){
 const p=pricing(cfg),crumbs=[{name:'Home',path:'/'},{name:'Areas',path:'/areas-we-cover/'},{name:area.name,path}],faqs=content.faqs||[];
 const profile=areaProfiles[area.slug]||{};
 const homes=(profile.homes||[]).slice(0,2).join(' · ')||'See the local property notes below';
 const calls=(profile.problems||[]).slice(0,4).map(problemLabel).join(' · ')||content.jobs.slice(0,3).map(x=>x.name).join(' · ');
 const parking=(content.access?.[0]||'').split('. ')[0]+((content.access?.[0]||'').includes('.')?'.':'');
 const note=area.note?`<div class="local-note-inline"><h3>A local note</h3><p>${area.note}</p></div>`:'';
 const main=`<div class="shell">${breadcrumb(crumbs)}</div>
 <section class="hero"><div class="shell"><p class="eyebrow">${area.postcode||'Local area'} · Local plumber</p><h1>${meta.h1}</h1><p class="lede">${content.lede}</p><div class="hero-actions">${actions(cfg)}</div></div></section>
 <section class="section"><div class="shell">
  <div class="area-glance" aria-label="Area at a glance">
   <div><small>Typical homes</small><strong>${homes}</strong></div>
   <div><small>Getting here</small><strong>${content.distance}</strong></div>
   <div><small>Access & parking</small><strong>${parking}</strong></div>
   <div><small>Common calls</small><strong>${calls}</strong></div>
  </div>
 </div></section>
 <section class="area-main"><div class="shell inner-layout"><div class="content-column">
  <section><p class="eyebrow">Local property</p><h2>The homes here</h2>${content.homes.map(x=>`<p>${x}</p>`).join('')}</section>
  <section><p class="eyebrow">What we encounter</p><h2>What goes wrong here</h2>${content.faults.map(x=>`<p>${x}</p>`).join('')}</section>
  <section><p class="eyebrow">Getting here</p><h2>Access and parking</h2>${content.access.map(x=>`<p>${x}</p>`).join('')}<p><strong>${content.distance}</strong></p>${note}</section>
 </div><aside class="inner-rail"><p class="eyebrow">Local map</p>${renderMap({cfg,variant:'area',focus:area.slug})}<p style="margin-top:14px"><strong>£${cfg.pricing.firstHour} first hour</strong><br><span class="muted">${p.incrementText()} · parts at cost</span></p><div class="rail-actions">${actions(cfg)}</div></aside></div></section>
 <section class="section section--alt"><div class="shell"><p class="eyebrow">Common work</p><h2>Jobs we do most here</h2><div class="hairline-list">${content.jobs.map(j=>`<a class="hairline-row" href="/${j.slug}/"><span><strong>${j.name}</strong><small>${j.text}</small></span><span class="arrow">→</span></a>`).join('')}</div></div></section>
 <section class="section"><div class="shell narrow"><p class="eyebrow">Questions</p><h2>Local questions</h2><div class="faq-list">${faqs.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div><p style="margin-top:22px"><a href="${content.guide.path}">Useful guide: ${content.guide.name} →</a></p><p><a href="/areas-we-cover/">All areas we cover →</a> · <a href="/pricing/">Pricing →</a></p></div></section>
 <section class="cta-band"><div class="shell"><p class="eyebrow">Need help in ${area.name}?</p><h2>Send us the problem and postcode.</h2><div class="hero-actions">${actions(cfg)}</div></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,faqs,breadcrumbs:crumbs,service:{name:`Plumbing in ${area.name}`,slug:null},area,bodyClass:'area-page'});
}