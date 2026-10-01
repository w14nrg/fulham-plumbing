
import{esc}from'./util.mjs';
import{icon}from'./icons.mjs';
import{schemaGraph,ldScript}from'./schema.mjs';

const nav=[['/plumbing-services/','Services'],['/pricing/','Pricing'],['/areas-we-cover/','Areas'],['/guides/','Guides'],['/about/','About'],['/contact/','Contact']];

const word=()=>'<a class="wordmark" href="/" aria-label="Fulham Plumbing home"><span class="wordmark__mark" aria-hidden="true">FP</span><span class="wordmark__text"><strong>Fulham Plumbing</strong><small>Local · SW6</small></span></a>';

const waHref=(c,msg='')=>{
  if(!c.contact.whatsapp)return'';
  const base=msg||c.contact.whatsappMessage||'Hi Fulham Plumbing, I have a plumbing problem. My postcode is: ';
  return `https://wa.me/${esc(c.contact.whatsapp)}?text=${encodeURIComponent(base)}`;
};

function acts(c,compact=false,waMessage=''){
  const x=[];
  if(c.contact.phone)x.push(`<a class="button button--primary${compact?' button--compact':''}" href="tel:${esc(c.contact.phone)}" data-track="call_click">${icon('phone')}${compact?'Call':`Call ${esc(c.contact.phoneDisplay||c.contact.phone)}`}</a>`);
  if(c.contact.whatsapp)x.push(`<a class="button button--whatsapp${compact?' button--compact':''}" href="${waHref(c,waMessage)}" data-wa data-whatsapp data-track="whatsapp_click">${icon('chat')}${compact?'WhatsApp':'WhatsApp a photo'}</a>`);
  if(!x.length)x.push('<a class="button button--secondary" href="/contact/">Contact Fulham Plumbing</a>');
  return x.join('');
}
export const actions=acts;
export const breadcrumb=i=>`<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${i.map((b,n)=>`<li>${n===i.length-1?`<span aria-current="page">${esc(b.name)}</span>`:`<a href="${b.path}">${esc(b.name)}</a>`}</li>`).join('')}</ol></nav>`;
export function exclusions(c){const n='En-Suites & Bathrooms',v=c.links.enSuitesAndBathrooms?`<a href="${esc(c.links.enSuitesAndBathrooms)}">${n}</a>`:n;return`<aside class="exclusions" data-exclusions><h2>What we don't do</h2><p>We don't work on boilers or gas appliances, we don't do drain jetting, and we don't fit new bathrooms. For a complete new bathroom or en-suite, see ${v}.</p></aside>`}
export function sister(c){const n='Kensington Plumbing Services',v=c.links.kensingtonPlumbingServices?`<a href="${esc(c.links.kensingtonPlumbingServices)}">${n}</a>`:n;return`<p class="sister" data-sister>Outside our area? Our sister service ${v} may be able to help.</p>`}

function servicesDisclosure(c){
  const items=c.services.filter(s=>s.enabled).map(s=>`<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('');
  return`<div class="nav-disclosure services-disclosure"><a class="nav-fallback" href="/plumbing-services/">Services</a><button type="button" data-nav-toggle aria-expanded="false" aria-controls="services-menu">Services ${icon('arrow')}</button><div class="nav-menu" id="services-menu" hidden><ul>${items}</ul><a class="services-menu__all" href="/plumbing-services/">All services →</a></div></div>`;
}
function areasDisclosure(){
  const items=[['/areas/fulham-broadway/','Fulham Broadway'],['/areas/sands-end-imperial-wharf/','Sands End & Imperial Wharf'],['/areas/chelsea-harbour/','Chelsea Harbour & Lots Road'],['/areas/putney/','Putney'],['/areas/wandsworth-town/','Wandsworth Town']].map(([u,n])=>`<li><a href="${u}">${n}</a></li>`).join('');
  return`<div class="nav-disclosure areas-disclosure"><a class="nav-fallback" href="/areas-we-cover/">Areas</a><button type="button" data-nav-toggle aria-expanded="false" aria-controls="areas-menu">Areas ${icon('arrow')}</button><div class="nav-menu" id="areas-menu" hidden><ul>${items}</ul><a class="services-menu__all" href="/areas-we-cover/">All areas →</a></div></div>`;
}
function header(c,p){
  const current=u=>p===u?' aria-current="page"':'';
  const contact=c.contact.phone||c.contact.whatsapp?`${c.contact.phone?`<a class="header-phone" href="tel:${esc(c.contact.phone)}">${esc(c.contact.phoneDisplay||c.contact.phone)}</a>`:''}${c.contact.whatsapp?`<a class="button button--whatsapp button--compact" href="${waHref(c)}" data-wa>${icon('chat')}WhatsApp</a>`:''}${c.contact.phone?`<a class="button button--primary button--compact" href="tel:${esc(c.contact.phone)}">${icon('phone')}Call</a>`:''}`:`<a class="button button--secondary button--compact" href="/contact/">Contact</a>`;
  return`<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="shell site-header__inner">${word()}<nav class="desktop-nav" aria-label="Primary">${servicesDisclosure(c)}<a href="/pricing/"${current('/pricing/')}>Pricing</a>${areasDisclosure()}<a href="/guides/"${current('/guides/')}>Guides</a><a href="/about/"${current('/about/')}>About</a></nav><div class="site-header__actions">${contact}</div>${c.contact.phone?`<a class="mobile-call" href="tel:${esc(c.contact.phone)}" aria-label="Call Fulham Plumbing">${icon('phone')}</a>`:''}<a class="menu-link" href="#site-menu">Menu</a><button class="menu-button" type="button" data-menu-open aria-expanded="false" aria-controls="mobile-drawer">Menu</button></div></header>`;
}
function footer(c){
  const ss=c.services.filter(s=>s.enabled).map(s=>`<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('');
  const phone=c.contact.phone?`<p><a href="tel:${esc(c.contact.phone)}">${esc(c.contact.phoneDisplay||c.contact.phone)}</a></p>`:'';
  const email=c.contact.email?`<p><a href="mailto:${esc(c.contact.email)}">${esc(c.contact.email)}</a></p>`:'';
  return`<nav class="noscript-nav" id="site-menu" aria-label="Site menu"><div class="shell"><h2>Menu</h2><div class="noscript-nav__grid">${nav.map(([u,n])=>`<a href="${u}">${n}</a>`).join('')}</div></div></nav><footer class="site-footer"><div class="shell footer-grid"><div>${word()}<p>Based on Hurlingham Road, Fulham SW6. We come to you.</p>${phone}${email}</div><div><h2>Services</h2><ul>${ss}</ul></div><div><h2>Areas</h2><ul><li><a href="/areas/fulham-broadway/">Fulham Broadway</a></li><li><a href="/areas/sands-end-imperial-wharf/">Sands End & Imperial Wharf</a></li><li><a href="/areas/chelsea-harbour/">Chelsea Harbour & Lots Road</a></li><li><a href="/areas/putney/">Putney</a></li><li><a href="/areas/wandsworth-town/">Wandsworth Town</a></li><li><a href="/areas-we-cover/">All areas</a></li></ul></div><div><h2>Fulham Plumbing</h2><ul><li><a href="/pricing/">Pricing</a></li><li><a href="/about/">About</a></li><li><a href="/guides/">Guides</a></li><li><a href="/recent-jobs/">Recent jobs</a></li><li><a href="/contact/">Contact</a></li></ul></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Fulham Plumbing</span><span><a href="/privacy/">Privacy</a> · <a href="/cookies/">Cookies</a> · <a href="/terms/">Terms</a></span></div></footer>`;
}
function drawer(c){
  const areas=[['/areas/fulham-broadway/','Fulham Broadway'],['/areas/sands-end-imperial-wharf/','Sands End & Imperial Wharf'],['/areas/chelsea-harbour/','Chelsea Harbour & Lots Road'],['/areas/putney/','Putney'],['/areas/wandsworth-town/','Wandsworth Town']];
  return`<dialog class="mobile-drawer" id="mobile-drawer"><div class="mobile-drawer__head">${word()}<button type="button" data-menu-close aria-label="Close menu">${icon('close')}</button></div><div class="mobile-drawer__actions">${acts(c)}</div><nav aria-label="Mobile"><h2>Services</h2>${c.services.filter(s=>s.enabled).map(s=>`<a href="/${s.slug}/">${esc(s.name)}</a>`).join('')}<h2>Areas</h2>${areas.map(([u,n])=>`<a href="${u}">${n}</a>`).join('')}<a href="/areas-we-cover/">All areas</a><h2>Explore</h2><a href="/pricing/">Pricing</a><a href="/guides/">Guides</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav></dialog>`;
}
function mobileBar(c){
  if(!c.contact.phone&&!c.contact.whatsapp)return'';
  const call=c.contact.phone?`<a class="mobile-bar__call" href="tel:${esc(c.contact.phone)}">${icon('phone')}Call</a>`:'';
  const wa=c.contact.whatsapp?`<a class="mobile-bar__wa" href="${waHref(c)}" data-wa>${icon('chat')}WhatsApp</a>`:'';
  return`<nav class="mobile-bar" data-mobile-bar aria-label="Quick contact">${call}${wa}</nav>`;
}
function analytics(c){if(c.analytics?.provider==='plausible'&&c.analytics.domain)return`<script defer data-domain="${esc(c.analytics.domain)}" src="https://plausible.io/js/script.js"></script>`;return''}

export function pageShell({cfg,meta,path,css,scriptPath,main,faqs=[],breadcrumbs=[],service=null,article=null,area=null,offer=null,bodyClass=''}) {
  const schema=schemaGraph({cfg,meta,path,faqs,breadcrumbs,service,article,area,offer});
  const noindex=!cfg.site.indexable||['/privacy/','/cookies/','/terms/','/thanks/','/404.html'].includes(path);
  const canon=path==='/404.html'?'':`<link rel="canonical" href="${cfg.site.url+path}">`;
  const og=`<meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:type" content="${article?'article':'website'}"><meta property="og:url" content="${esc(cfg.site.url+(path==='/404.html'?'/':path))}"><meta name="twitter:card" content="summary">`;
  return`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}">${canon}<meta name="robots" content="${noindex?'noindex,nofollow':'index,follow'}">${og}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><style>${css}</style><script>document.documentElement.classList.add('js');try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}</script>${ldScript(schema)}${analytics(cfg)}<script src="${scriptPath}" defer></script></head><body class="${bodyClass}">${header(cfg,path)}${drawer(cfg)}<main id="main">${main}</main>${footer(cfg)}${mobileBar(cfg)}</body></html>`;
}