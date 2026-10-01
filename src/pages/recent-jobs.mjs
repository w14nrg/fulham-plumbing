import{pageShell,breadcrumb}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}){
 const crumbs=[{name:'Home',path:'/'},{name:'Recent jobs',path}];
 const main=`<div class="shell">${breadcrumb(crumbs)}</div><section class="hero"><div class="shell"><p class="eyebrow">Real work · no stock case studies</p><h1>${meta.h1}</h1><p class="lede">Real jobs from around Fulham, with photos, what was wrong and what we did.</p></div></section><section class="section section--alt"><div class="shell"><div class="placeholder-card">[PLACEHOLDER: recent job — photo, area, fault, fix, time]</div><p>Job write-ups with photos will be added here.</p><p>Until there are at least six real, permissioned, photographed jobs, this section stays out of the sitemap and remains noindex.</p></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs});
}