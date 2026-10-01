import{pageShell,breadcrumb,actions,placeholderPhoto}from'./layout.mjs';
export async function renderJob({cfg,meta,path,css,scriptPath,content}) {
  const crumbs=[{name:'Home',path:'/'},{name:'Recent jobs',path:'/recent-jobs/'},{name:meta.h1,path}];
  const body=`<div class="shell">${breadcrumb(crumbs)}</div>
  <article class="job-page">
    <header class="hero"><div class="shell"><p class="eyebrow">Real plumbing job</p><h1>${meta.h1}</h1><p class="lede">${content.problem}</p></div></header>
    <section class="section section--alt"><div class="shell content-grid"><div><h2>What we found</h2><p>${content.findings}</p><h2>What we did</h2><p>${content.fix}</p><p><strong>Time:</strong> ${content.time}</p><p><strong>Cost band:</strong> ${content.costBand}</p></div><aside><p><strong>Area:</strong> ${content.area}</p><p><strong>Road:</strong> ${content.road}</p><p><strong>Property:</strong> ${content.propertyType}</p></aside></div></section>
    <section class="section"><div class="shell"><h2>Photos</h2><div class="cards">${content.photos?.length?content.photos.map(x=>`<img src="${x.src}" alt="${x.alt}" width="${x.width}" height="${x.height}" loading="lazy">`).join(''):placeholderPhoto('job photos', '3 / 2')}</div></div></section>
    <section class="section section--alt"><div class="shell"><p><a href="/${content.service}/">Related service →</a> · <a href="${content.areaPath}">Area page →</a></p></div></section>
    <section class="section cta-band"><div class="shell"><h2>Send us a photo of the problem</h2>${actions(cfg)}</div></section>
  </article>`;
  return pageShell({cfg,meta,path,css,scriptPath,main:body,breadcrumbs:crumbs,article:content});
}