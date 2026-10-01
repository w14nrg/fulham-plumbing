import{pageShell,breadcrumb}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}){
 const crumbs=[{name:'Home',path:'/'},{name:'Recent jobs',path}];
 const items=cfg.recentJobs?.items||[];
 const body=items.length?`<div class="hairline-list">${items.map(j=>`<article class="hairline-row"><span><strong>${j.title||j.area||'Plumbing job'}</strong><small>${j.summary||''}</small></span></article>`).join('')}</div>`:`<p>Real job write-ups will be added here once there are enough permissioned, photographed jobs to make the page useful.</p><p>This page remains out of the sitemap and noindex until then.</p>`;
 const main=`<div class="shell">${breadcrumb(crumbs)}</div><section class="hero"><div class="shell"><p class="eyebrow">Real work · no stock case studies</p><h1>${meta.h1}</h1><p class="lede">Real jobs from around Fulham, with photos, what was wrong and what we did.</p></div></section><section class="section"><div class="shell narrow">${body}</div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs,bodyClass:'recent-jobs-page'});
}