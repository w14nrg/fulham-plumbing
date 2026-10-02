import{esc}from'./util.mjs';
import{icon,waIcon}from'./icons.mjs';
import{schemaGraph,ldScript}from'./schema.mjs';

const areaLinks=[['/areas/fulham-broadway/','Fulham Broadway'],['/areas/sands-end-imperial-wharf/','Sands End & Imperial Wharf'],['/areas/chelsea-harbour/','Chelsea Harbour & Lots Road'],['/areas/putney/','Putney'],['/areas/wandsworth-town/','Wandsworth Town']];
const primaryNav=[['/plumbing-services/','Services'],['/pricing/','Prices'],['/landlords-agents/','Landlords'],['/areas-we-cover/','Areas'],['/about/','About']];

export const wordmark=(cls='')=>`<a class="wordmark ${cls}" href="/" aria-label="Fulham Plumbing home"><span class="wordmark__a">Fulham</span><span class="wordmark__b">Plumbing</span></a>`;

export const waHref=(c,msg='')=>{
  if(!c.contact.whatsapp)return'';
  const base=msg||c.contact.whatsappMessage||'Hi Fulham Plumbing, I need a plumber.';
  return`https://wa.me/${esc(c.contact.whatsapp)}?text=${encodeURIComponent(base)}`;
};

function acts(c,compact=false,waMessage=''){
  const x=[];
  if(c.contact.whatsapp)x.push(`<a class="btn btn--wa${compact?' btn--sm':''}" href="${waHref(c,waMessage)}" data-wa data-track="whatsapp_click">${waIcon()}<span>${compact?'WhatsApp':'WhatsApp a photo'}</span></a>`);
  if(c.contact.phone)x.push(`<a class="btn btn--call${compact?' btn--sm':''}" href="tel:${esc(c.contact.phone)}" data-track="call_click">${icon('phone')}<span>${compact?'Call':`Call ${esc(c.contact.phoneDisplay||c.contact.phone)}`}</span></a>`);
  if(!x.length)x.push('<a class="btn btn--ghost" href="/contact/">Contact Fulham Plumbing</a>');
  return x.join('');
}
export const actions=acts;
export const placeholderPhoto=()=>'';
export const breadcrumb=i=>`<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${i.map((b,n)=>`<li>${n===i.length-1?`<span aria-current="page">${esc(b.name)}</span>`:`<a href="${b.path}">${esc(b.name)}</a>`}</li>`).join('')}</ol></nav>`;
export function exclusions(){return`<aside class="exclusions" data-exclusions><h2>Specialist work</h2><p>Gas appliance work and specialist drainage jetting are outside this plumbing service.</p></aside>`}
export function sister(c){const n='Kensington Plumbing Services',v=c.links.kensingtonPlumbingServices?`<a href="${esc(c.links.kensingtonPlumbingServices)}">${n}</a>`:n;return`<p class="sister" data-sister>Outside our area? Our sister service ${v} may be able to help.</p>`}

function servicesDisclosure(c){
  const groups=[
    ['Leaks & water',['leak-repairs','low-water-pressure','stopcock-replacement','outside-taps']],
    ['Toilets, taps & showers',['toilet-repairs','tap-repairs','shower-repairs','shower-pumps']],
    ['Hot water, tanks & more',['hot-water-cylinders','cold-water-tanks','radiator-valves','blocked-sinks-wastes','appliance-plumbing']],
    ['Checks & general work',['plumbing-inspections','general-plumbing']]
  ];
  return`<div class="nav-drop"><a class="nav-drop__fallback" href="/plumbing-services/">Services</a><button type="button" class="nav-drop__btn" data-nav-toggle aria-expanded="false" aria-controls="services-menu">Services ${icon('arrow','icon icon--chev')}</button><div class="nav-drop__panel nav-drop__panel--wide" id="services-menu" hidden>${groups.map(([g,slugs])=>`<div><p class="nav-drop__label">${g}</p><ul>${slugs.map(slug=>{const s=c.services.find(x=>x.slug===slug&&x.enabled);return s?`<li><a href="/${slug}/">${esc(s.name)}</a></li>`:''}).join('')}</ul></div>`).join('')}<a class="nav-drop__all" href="/plumbing-services/">All plumbing services →</a></div></div>`;
}
function areasDisclosure(){
  return`<div class="nav-drop"><a class="nav-drop__fallback" href="/areas-we-cover/">Areas</a><button type="button" class="nav-drop__btn" data-nav-toggle aria-expanded="false" aria-controls="areas-menu">Areas ${icon('arrow','icon icon--chev')}</button><div class="nav-drop__panel" id="areas-menu" hidden><ul>${areaLinks.map(([u,n])=>`<li><a href="${u}">${n}</a></li>`).join('')}</ul><a class="nav-drop__all" href="/areas-we-cover/">All areas we cover →</a></div></div>`;
}
function header(c,p){
  const cur=u=>p===u?' aria-current="page"':'';
  const right=`${c.contact.phone?`<a class="header-phone" href="tel:${esc(c.contact.phone)}" data-track="call_click">${icon('phone')}<span>${esc(c.contact.phoneDisplay||c.contact.phone)}</span></a>`:''}${c.contact.whatsapp?`<a class="btn btn--wa btn--sm header-wa" href="${waHref(c)}" data-wa data-track="whatsapp_click">${waIcon()}<span>WhatsApp us</span></a>`:''}${!c.contact.phone&&!c.contact.whatsapp?'<a class="btn btn--ghost btn--sm" href="/contact/">Contact</a>':''}`;
  return`<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="shell site-header__inner">${wordmark()}<nav class="desktop-nav" aria-label="Primary">${servicesDisclosure(c)}<a href="/pricing/"${cur('/pricing/')}>Prices</a><a href="/landlords-agents/"${cur('/landlords-agents/')}>Landlords</a>${areasDisclosure()}<a href="/about/"${cur('/about/')}>About</a></nav><div class="site-header__right">${right}</div><div class="site-header__mobile">${c.contact.phone?`<a class="round-btn round-btn--call" href="tel:${esc(c.contact.phone)}" aria-label="Call Fulham Plumbing on ${esc(c.contact.phoneDisplay||c.contact.phone)}" data-track="call_click">${icon('phone')}</a>`:''}<a class="round-btn menu-fallback" href="#site-menu" aria-label="Menu">${icon('menu')}</a><button class="round-btn menu-button" type="button" data-menu-open aria-expanded="false" aria-controls="mobile-drawer" aria-label="Open menu">${icon('menu')}</button></div></div></header>`;
}
function drawer(c){
  const wa=c.contact.whatsapp?`<a class="drawer__cta" href="${waHref(c)}" data-wa data-track="whatsapp_click">${waIcon()}<span>WhatsApp a plumbing job</span></a>`:'<a class="drawer__cta drawer__cta--plain" href="/contact/">Contact Fulham Plumbing</a>';
  const call=c.contact.phone?`<a href="tel:${esc(c.contact.phone)}" data-track="call_click">Call ${esc(c.contact.phoneDisplay||c.contact.phone)}</a>`:'';
  return`<dialog class="drawer" id="mobile-drawer" aria-label="Menu"><div class="drawer__panel"><div class="drawer__head">${wordmark('wordmark--light')}<button type="button" class="drawer__close" data-menu-close aria-label="Close menu">${icon('close')}</button></div><nav class="drawer__nav" aria-label="Mobile">${primaryNav.map(([u,n])=>`<a href="${u}">${n}</a>`).join('')}</nav>${wa}<p class="drawer__small">${call}${call?'<span aria-hidden="true">·</span>':''}<a href="/guides/">Guides</a><span aria-hidden="true">·</span><a href="/contact/">Contact</a></p></div></dialog>`;
}
function footer(c){
  const ss=c.services.filter(s=>s.enabled).map(s=>`<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('');
  const phone=c.contact.phone?`<p><a href="tel:${esc(c.contact.phone)}">${esc(c.contact.phoneDisplay||c.contact.phone)}</a></p>`:'';
  const email=c.contact.email?`<p><a href="mailto:${esc(c.contact.email)}">${esc(c.contact.email)}</a></p>`:'';
  const wa=c.contact.whatsapp?`<p><a href="${waHref(c)}" data-wa>WhatsApp ${esc(c.contact.phoneDisplay||'')}</a></p>`:'';
  return`<nav class="noscript-nav" id="site-menu" aria-label="Site menu"><div class="shell"><p class="noscript-nav__title">Menu</p><div class="noscript-nav__grid">${[...primaryNav,['/guides/','Guides'],['/contact/','Contact']].map(([u,n])=>`<a href="${u}">${n}</a>`).join('')}</div></div></nav><footer class="site-footer"><div class="shell footer-grid"><div class="footer-brand">${wordmark('wordmark--light')}<p>Plumber in Fulham, SW6. Working base on Hurlingham Road — we come to you.</p>${phone}${wa}${email}</div><div><h2>Services</h2><ul>${ss}</ul></div><div><h2>Areas</h2><ul>${areaLinks.map(([u,n])=>`<li><a href="${u}">${n}</a></li>`).join('')}<li><a href="/areas-we-cover/">All areas</a></li></ul></div><div><h2>Fulham Plumbing</h2><ul><li><a href="/pricing/">Prices</a></li><li><a href="/landlords-agents/">Landlords & agents</a></li><li><a href="/about/">About</a></li><li><a href="/guides/">Guides</a></li><li><a href="/recent-jobs/">Recent jobs</a></li><li><a href="/contact/">Contact</a></li></ul></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Fulham Plumbing</span><span><a href="/privacy/">Privacy</a> · <a href="/cookies/">Cookies</a> · <a href="/terms/">Terms</a></span></div></footer>`;
}
function stickyBar(c){
  if(!c.contact.whatsapp)return'';
  return`<a class="sticky-wa" href="${waHref(c)}" data-wa data-sticky-wa data-track="whatsapp_click">${waIcon()}<span>WhatsApp a plumbing job</span><b aria-hidden="true">→</b></a>`;
}
function analytics(c){if(c.analytics?.provider==='plausible'&&c.analytics.domain)return`<script defer data-domain="${esc(c.analytics.domain)}" src="https://plausible.io/js/script.js"></script>`;return''}

export function pageShell({cfg,meta,path,css,scriptPath,main,faqs=[],breadcrumbs=[],service=null,article=null,area=null,offer=null,bodyClass=''}){
  const schema=schemaGraph({cfg,meta,path,faqs,breadcrumbs,service,article,area,offer});
  const noindex=!cfg.site.indexable||['/privacy/','/cookies/','/terms/','/thanks/','/404.html'].includes(path);
  const pageUrl=cfg.site.url+(path==='/404.html'?'/':path);
  const canon=path==='/404.html'?'':`<link rel="canonical" href="${cfg.site.url+path}">`;
  const ogImage=cfg.site.url+'/brand/og-default.png';
  const og=`<meta property="og:site_name" content="Fulham Plumbing"><meta property="og:locale" content="en_GB"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:type" content="${article?'article':'website'}"><meta property="og:url" content="${esc(pageUrl)}"><meta property="og:image" content="${esc(ogImage)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Fulham Plumbing — plumber in Fulham, SW6. £75 first hour."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(meta.title)}"><meta name="twitter:description" content="${esc(meta.description)}"><meta name="twitter:image" content="${esc(ogImage)}">`;
  const bar=stickyBar(cfg),classes=[bodyClass,bar?'has-sticky':''].filter(Boolean).join(' ');
  return`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#1652F0"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}">${canon}<meta name="robots" content="${noindex?'noindex,nofollow':'index,follow'}">${og}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/brand/apple-touch-icon.png"><style>${css}</style><script>document.documentElement.classList.add('js');try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')}catch(e){}</script>${ldScript(schema)}${analytics(cfg)}<script src="${scriptPath}" defer></script></head><body class="${classes}">${header(cfg,path)}${drawer(cfg)}<main id="main">${main}</main>${footer(cfg)}${bar}</body></html>`;
}
