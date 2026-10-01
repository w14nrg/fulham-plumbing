import{pageShell,breadcrumb,actions}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}){
 const crumbs=[{name:'Home',path:'/'},{name:'Message received',path}];
 const extra=[cfg.contact.hours,cfg.contact.availabilityNote].filter(Boolean).join(' · ');
 const main=`<div class="shell">${breadcrumb(crumbs)}</div><section class="hero"><div class="shell"><p class="eyebrow">Message received</p><h1>${meta.h1}</h1><p class="lede">Thanks for contacting Fulham Plumbing. We've received your message and will reply as soon as we can.</p>${extra?`<p>${extra}</p>`:''}<div class="hero-actions">${actions(cfg)}</div><p><a href="/plumbing-services/">Browse plumbing services →</a></p></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs});
}