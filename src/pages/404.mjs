import{pageShell}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}) {
 const main=`<section class="section"><div class="shell legal"><p class="eyebrow">404</p><h1>${meta.h1}</h1><p>Sorry, that page doesn't exist. You can browse the plumbing services, check the £${cfg.pricing.firstHour} first-hour price or contact Fulham Plumbing.</p><p><a href="/">Home</a> · <a href="/plumbing-services/">Plumbing services</a> · <a href="/pricing/">Pricing</a> · <a href="/contact/">Contact</a></p></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main});
}