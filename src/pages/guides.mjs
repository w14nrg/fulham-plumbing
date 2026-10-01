import{pageShell,breadcrumb}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}){
 const crumbs=[{name:'Home',path:'/'},{name:'Guides',path}];
 const groups=[
  ['Showers',[['shower-pressure-dropped','Why has my shower pressure dropped?','Low flow, pump issues and what to check first.'],['shower-pump-not-working','Shower pump not working: what to check','Noisy, weak or silent pump? Start here.']]],
  ['Toilets',[['toilet-keeps-running','Why does my toilet keep running?','Fill valve or flush valve? Work out which side is passing.']]],
  ['Leaks',[['water-through-ceiling','Water coming through the ceiling','What to isolate first and how the source is traced.']]],
  ['Water supply & tanks',[['lead-and-old-pipes','Lead and old pipes in Fulham homes','How to recognise older pipework and what replacement involves.'],['loft-water-tank','Do I still need a cold water tank in the loft?','What the tank does and when it can be changed.']]],
  ['Hot water',[['no-hot-water-cylinder','No hot water from the cylinder','Safe checks before a plumber visits.']]],
  ['Buying a home',[['plumbing-checks-before-buying','Plumbing checks before you buy','Pressure, pipe materials, tanks, cylinders and visible leaks.']]]
 ];
 const main=`<div class="shell">${breadcrumb(crumbs)}</div><section class="hero"><div class="shell"><p class="eyebrow">Quick answers first</p><h1>${meta.h1}</h1><p class="lede">Useful answers for the plumbing problems people actually search for — short answer first, detail when you need it.</p></div></section>
 <section class="compact-page"><div class="shell"><div class="directory-grid">${groups.map(([name,items])=>`<section class="directory-group"><p class="eyebrow">${name}</p><div class="directory-list">${items.map(([slug,title,desc])=>`<a class="directory-link" href="/guides/${slug}/"><span><strong>${title}</strong><small>${desc}</small></span><span>→</span></a>`).join('')}</div></section>`).join('')}</div></div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs,bodyClass:'guides-hub'});
}