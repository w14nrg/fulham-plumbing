import{pageShell,breadcrumb,actions}from'./layout.mjs';
import{pricing}from'./pricing.mjs';
import{quickAnswers}from'../content/quick-answers.mjs';

const keyByGuide={
 'shower-pressure-dropped':'low-pressure','shower-pump-not-working':'shower-pump','toilet-keeps-running':'toilet',
 'water-through-ceiling':'leak','no-hot-water-cylinder':'hot-water'
};
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
export async function renderGuide({cfg,meta,path,css,scriptPath,content}){
 const p=pricing(cfg),crumbs=[{name:'Home',path:'/'},{name:'Guides',path:'/guides/'},{name:meta.h1,path}],faqs=content.faqs||[],by=cfg.plumber.name?`By ${cfg.plumber.name}, Fulham Plumbing`:'By Fulham Plumbing';
 const guideSlug=path.split('/').filter(Boolean).pop(),key=keyByGuide[guideSlug],qa=key?quickAnswers[key]:null;
 const symptoms=qa?`<div class="symptom-row" aria-label="Which problem sounds closest?">${Object.values(qa.symptoms||{}).slice(0,4).map(s=>`<a class="tag" href="/${qa.service}/">${s.label}</a>`).join('')}</div>`:'';
 const toc=content.sections.map((s,i)=>({id:`section-${i+1}-${slug(s.title)}`,title:s.title}));
 const tocLinks=toc.map(x=>`<a href="#${x.id}">${x.title}</a>`).join('');
 const sections=content.sections.map((s,i)=>`<section id="${toc[i].id}"><h2>${s.title}</h2>${s.paragraphs.map(x=>`<p>${x}</p>`).join('')}${s.list?`<ul>${s.list.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}</section>`).join('');
 const main=`<div class="shell">${breadcrumb(crumbs)}</div><article class="guide-body">
 <header class="hero"><div class="shell"><p class="eyebrow">Practical plumbing guide</p><h1>${meta.h1}</h1><div class="meta-row"><span>${by}</span><span>Last updated ${content.updated}</span></div></div></header>
 <section class="section"><div class="shell"><div class="answer-box narrow"><h2>Short answer</h2><p>${content.shortAnswer}</p>${symptoms}</div></div></section>
 <div class="shell guide-layout"><div class="article-shell"><details class="guide-toc guide-toc--mobile"><summary>On this page</summary>${tocLinks}</details>${sections}
  <aside class="callout"><h2>When to call a plumber</h2><p>${content.whenToCall}</p><p><strong>${p.priceLine()}</strong> Parts at cost. <a href="/pricing/">See how our pricing works →</a></p><div class="hero-actions">${actions(cfg)}</div></aside>
  <section><h2>Questions</h2><div class="faq-list">${faqs.map(f=>`<details><summary><h3>${f.q}</h3></summary><p>${f.a}</p></details>`).join('')}</div></section>
  <section><h2>Related</h2><div class="hairline-list">${content.relatedGuides.map(g=>`<a class="hairline-row" href="${g.path}"><span><strong>${g.name}</strong><small>Related guide</small></span><span class="arrow">→</span></a>`).join('')}${content.primary?`<a class="hairline-row" href="${content.primary.path}"><span><strong>${content.primary.label}</strong><small>Relevant plumbing service</small></span><span class="arrow">→</span></a>`:''}${content.secondary?.map(g=>`<a class="hairline-row" href="${g.path}"><span><strong>${g.label}</strong><small>Relevant service</small></span><span class="arrow">→</span></a>`).join('')||''}</div></section>
 </div><aside class="inner-rail guide-toc guide-toc--desktop"><p class="eyebrow">On this page</p>${tocLinks}<p style="margin-top:18px"><a href="${content.primary.path}">${content.primary.label} →</a></p></aside></div>
 </article>
 <section class="cta-band"><div class="shell"><p class="eyebrow">Need help?</p><h2>Send us a photo of the problem.</h2><div class="hero-actions">${actions(cfg)}</div></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,faqs,breadcrumbs:crumbs,article:content,bodyClass:'guide-page'});
}