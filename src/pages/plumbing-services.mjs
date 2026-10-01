import{pageShell,breadcrumb,actions,exclusions}from'../lib/layout.mjs';
import{pricing}from'../lib/pricing.mjs';

export async function render({cfg,meta,path,css,scriptPath}){
  const p=pricing(cfg),crumbs=[{name:'Home',path:'/'},{name:'Services',path}];
  const groups=[
    ['Leaks & water',['leak-repairs','stopcock-replacement','low-water-pressure']],
    ['Toilets, taps & showers',['toilet-repairs','tap-repairs','shower-repairs','shower-pumps']],
    ['Hot & cold water',['hot-water-cylinders','cold-water-tanks']],
    ['Around the home',['radiator-valves','blocked-sinks-wastes','outside-taps','appliance-plumbing']],
    ['Checks & small jobs',['plumbing-inspections','small-plumbing-jobs']]
  ];
  const desc={
    'leak-repairs':'Pipes, joints, valves and accessible leaks.',
    'stopcock-replacement':'Stiff, seized or leaking internal stopcocks.',
    'low-water-pressure':'Find the restriction and work out the right fix.',
    'toilet-repairs':'Running cisterns, flush faults, fill valves and leaks.',
    'tap-repairs':'Dripping, stiff or leaking taps and replacements.',
    'shower-repairs':'Temperature, flow, valve and cartridge faults.',
    'shower-pumps':'Noisy, weak or failed shower pumps.',
    'hot-water-cylinders':'Vented cylinder and immersion-related faults.',
    'cold-water-tanks':'Loft tanks, float valves, overflows and replacement.',
    'radiator-valves':'TRVs, lockshields and leaking valves.',
    'blocked-sinks-wastes':'Local sink, basin and bath waste restrictions.',
    'outside-taps':'New outside taps and repairs.',
    'appliance-plumbing':'Water and waste connections for appliances.',
    'plumbing-inspections':'Structured visual inspection and written findings.',
    'small-plumbing-jobs':'One small job or a list planned into one visit.'
  };
  const main=`
  <div class="shell">${breadcrumb(crumbs)}</div>
  <section class="hero"><div class="shell"><p class="eyebrow">Small jobs welcome</p><h1>${meta.h1}</h1><p class="lede">Pick the problem. See what we do. Get the useful answer without digging through a long list.</p><div class="hero-price-card"><strong>£${cfg.pricing.firstHour}</strong><span>first hour · no separate call-out fee · parts at cost</span></div><div class="hero-actions">${actions(cfg)}</div></div></section>
  <section class="compact-page"><div class="shell">
    <div class="directory-grid">
      ${groups.map(([name,slugs])=>`<section class="directory-group"><p class="eyebrow">${name}</p><div class="directory-list">${slugs.map(slug=>{const s=cfg.services.find(x=>x.slug===slug);return`<a class="directory-link" href="/${slug}/"><span><strong>${s.name}</strong><small>${desc[slug]||'See what the visit involves.'}</small></span><span>→</span></a>`}).join('')}</div></section>`).join('')}
    </div>
    <section class="feature-strip"><div><p class="eyebrow">Landlords & agents</p><h2>Repairs without the chasing.</h2><p>Tenant access, photos, repair lists and clear invoices for managed properties.</p></div><a class="button button--secondary" href="/landlords-agents/">Landlord plumbing →</a></section>
    <div class="exclusion-wrap">${exclusions(cfg)}</div>
  </div></section>
  <section class="cta-band"><div class="shell"><p class="eyebrow">Not sure which service?</p><h2>Show us the problem.</h2><p>A photo and postcode are the quickest way to explain what needs attention.</p><div class="hero-actions">${actions(cfg)}</div></div></section>`;
  return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs});
}