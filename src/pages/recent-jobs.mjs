import{pageShell,breadcrumb}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}) {
 const crumbs=[{name:'Home',path:'/'},{name:'Recent jobs',path}];
 const main=`<div class="shell">${breadcrumb(crumbs)}</div><section class="hero"><div class="shell"><p class="eyebrow">Real work only</p><h1>${meta.h1}</h1><p class="lede">This section will contain real plumbing jobs completed around Fulham SW6, with permissioned photographs, the fault found, the repair and the actual time taken.</p></div></section><section class="section section--alt"><div class="shell"><div class="placeholder-card">[PLACEHOLDER: recent job — photo, area, fault, fix, time]</div><p>Job write-ups with photos will be added here.</p><p>The hub remains out of the sitemap until there are enough real, permissioned jobs to make it useful.</p></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs});
}