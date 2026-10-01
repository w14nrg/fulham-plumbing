import{pageShell}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}) {
 const main=`<section class="section"><div class="shell legal"><h1>${meta.h1}</h1><p>Thanks for contacting Fulham Plumbing. We've received your message and will reply as soon as we can during working hours.</p><p><a href="/">Return to the homepage</a> · <a href="/plumbing-services/">See plumbing services</a></p></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main});
}