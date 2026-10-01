
(()=>{'use strict';
const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const dataNode=q('#qa-data');
let qaData=null;
try{qaData=dataNode?JSON.parse(dataNode.textContent):null}catch{}
let state={problem:null,symptom:null,home:null};
try{const saved=JSON.parse(sessionStorage.getItem('fp-context')||'null');if(saved&&typeof saved==='object')state={...state,...saved}}catch{}

function save(){try{sessionStorage.setItem('fp-context',JSON.stringify(state))}catch{}}
function track(n){try{window.plausible?.(n)}catch{}}
function waText(){
  if(!qaData)return null;
  const p=state.problem&&qaData.problems?.[state.problem];
  const s=p&&state.symptom&&p.symptoms?.[state.symptom];
  if(s?.wa)return`Hi Fulham Plumbing, ${s.wa}. My postcode is ____. I've attached a photo.`;
  if(p)return`Hi Fulham Plumbing, I have a problem with my ${p.label.toLowerCase()}. My postcode is ____. I've attached a photo.`;
  return qaData.defaultMessage||null
}
function updateWA(){
  if(!qaData?.whatsapp)return;
  const text=waText()||qaData.defaultMessage||'Hi Fulham Plumbing, I have a plumbing problem. My postcode is: ';
  qa('[data-wa]').forEach(a=>a.href=`https://wa.me/${qaData.whatsapp}?text=${encodeURIComponent(text)}`)
}
function costText(s){
  if(!s)return'';
  return s.cost||qaData?.defaultCost||''
}
function answerMarkup(p,s){
  const home=state.home&&p.homeNotes?.[state.home]?`<p><em><strong>In a ${esc(state.homeLabel||state.home)}:</strong> ${esc(p.homeNotes[state.home])}</em></p>`:'';
  const causes=(s.causes||[]).map(x=>esc(x)).join(' · ');
  const links=[
    p.serviceUrl?`<a href="${esc(p.serviceUrl)}">Full ${esc(p.label.toLowerCase())} service →</a>`:'',
    p.guideUrl?`<a href="${esc(p.guideUrl)}">Read the guide →</a>`:''
  ].filter(Boolean).join(' · ');
  return`<div class="quick-answer"><h3>${esc(p.label)} · ${esc(s.label)}</h3><dl><dt>Likely causes</dt><dd>${causes}</dd><dt>What we check</dt><dd>${esc(s.checks)}</dd><dt>Typical labour</dt><dd>${esc(costText(s))}</dd></dl>${home}<div class="quick-answer__actions">${qaData.callHref?`<a class="button button--primary button--compact" href="${esc(qaData.callHref)}">Call</a>`:''}${qaData.whatsapp?`<a class="button button--whatsapp button--compact" href="#" data-wa>WhatsApp a photo</a>`:''}</div>${links?`<p class="quick-answer__links">${links}</p>`:''}</div>`
}
function symptomMarkup(p){
  const items=Object.entries(p.symptoms||{});
  if(!items.length)return'';
  return`<p class="qa-step-label">What's it doing?</p><div class="symptom-row">${items.map(([k,v])=>`<button type="button" class="qa-pill" data-symptom="${esc(k)}" aria-pressed="${state.symptom===k?'true':'false'}">${esc(v.label)}</button>`).join('')}</div>`
}
function homeMarkup(p){
  if(!p.homeNotes)return'';
  const opts=[['house','House'],['converted','Converted flat'],['purpose','Purpose-built flat'],['newer','Newer apartment'],['not-sure','Not sure']];
  return`<p class="qa-step-label">Your home <span class="muted">· optional</span></p><div class="home-row">${opts.map(([k,n])=>`<button type="button" class="qa-pill" data-home="${k}" data-home-label="${esc(n.toLowerCase())}" aria-pressed="${state.home===k?'true':'false'}">${n}</button>`).join('')}</div>`
}
function renderConsole(consoleEl){
  const panel=q('[data-qa-panel]',consoleEl);if(!panel||!qaData)return;
  const p=state.problem&&qaData.problems?.[state.problem];
  if(!p){panel.innerHTML='';panel.closest('.qa-wrap')?.classList.remove('is-open');return}
  if(state.problem==='other'){
    panel.innerHTML=`<div class="quick-answer"><h3>Tell us what's happening</h3><p>Send a photo and a short description. Small plumbing jobs are welcome.</p><div class="quick-answer__actions">${qaData.callHref?`<a class="button button--primary button--compact" href="${esc(qaData.callHref)}">Call</a>`:''}${qaData.whatsapp?`<a class="button button--whatsapp button--compact" href="#" data-wa>WhatsApp a photo</a>`:''}</div><p class="quick-answer__links"><a href="${esc(p.serviceUrl)}">Small plumbing jobs →</a></p></div>`;
    panel.closest('.qa-wrap')?.classList.add('is-open');updateWA();return
  }
  const urgent=state.problem==='leak'?`<div class="quick-answer" style="margin-bottom:14px"><strong>Water coming through now?</strong> Isolate the affected water supply if it is safe to do so. <a href="/stopcock-replacement/">Where's my stopcock?</a></div>`:'';
  const s=state.symptom&&p.symptoms?.[state.symptom];
  panel.innerHTML=urgent+symptomMarkup(p)+(s?homeMarkup(p)+answerMarkup(p,s):'');
  panel.closest('.qa-wrap')?.classList.add('is-open');
  updateWA();
  bindDynamic(consoleEl);
}
function bindDynamic(consoleEl){
  qa('[data-symptom]',consoleEl).forEach(b=>b.addEventListener('click',()=>{
    state.symptom=b.dataset.symptom;state.home=null;state.homeLabel=null;save();renderConsole(consoleEl)
  }));
  qa('[data-home]',consoleEl).forEach(b=>b.addEventListener('click',()=>{
    state.home=b.dataset.home==='not-sure'?null:b.dataset.home;
    state.homeLabel=b.dataset.homeLabel||b.textContent.toLowerCase();
    save();renderConsole(consoleEl)
  }));
}
qa('[data-problem-console]').forEach(consoleEl=>{
  qa('[data-problem]',consoleEl).forEach(a=>a.addEventListener('click',e=>{
    if(!qaData)return;
    e.preventDefault();
    const key=a.dataset.problem;
    state.problem=key;state.symptom=null;state.home=null;state.homeLabel=null;
    qa('[data-problem]',consoleEl).forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.problem===key)));
    save();renderConsole(consoleEl);
    if(matchMedia('(max-width:899px)').matches)q('[data-qa-panel]',consoleEl)?.scrollIntoView({block:'nearest',behavior:reduce.matches?'auto':'smooth'})
  }));
  if(consoleEl.dataset.fixedProblem){
    state.problem=consoleEl.dataset.fixedProblem;
    qa('[data-problem]',consoleEl).forEach(x=>x.setAttribute('aria-pressed','true'));
    renderConsole(consoleEl)
  }else if(state.problem&&qaData?.problems?.[state.problem]){
    const a=q(`[data-problem="${CSS.escape(state.problem)}"]`,consoleEl);
    if(a){a.setAttribute('aria-pressed','true');renderConsole(consoleEl)}
  }
});

qa('[data-problem-jump]').forEach(a=>a.addEventListener('click',e=>{
  if(!qaData)return;
  const key=a.dataset.problemJump;if(!qaData.problems?.[key])return;
  e.preventDefault();state.problem=key;state.symptom=null;state.home=null;save();updateWA();
  const target=q('[data-problem-console]');if(target){
    qa('[data-problem]',target).forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.problem===key)));
    renderConsole(target);target.scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'start'})
  }
}));

const open=q('[data-menu-open]'),drawer=q('#mobile-drawer'),close=q('[data-menu-close]');
if(open&&drawer){
  const focusables=()=>qa('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled])',drawer).filter(x=>!x.hasAttribute('hidden'));
  open.addEventListener('click',()=>{drawer.showModal();open.setAttribute('aria-expanded','true');focusables()[0]?.focus()});
  close?.addEventListener('click',()=>drawer.close());
  drawer.addEventListener('close',()=>{open.setAttribute('aria-expanded','false');open.focus()});
  drawer.addEventListener('keydown',e=>{if(e.key==='Escape'){drawer.close();return}if(e.key!=='Tab')return;const f=focusables();if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}})
}

const disclosures=qa('.nav-disclosure');
function closeDisclosures(except){disclosures.forEach(w=>{if(w===except)return;const b=q('[data-nav-toggle]',w),m=b&&q('#'+b.getAttribute('aria-controls'));if(b)b.setAttribute('aria-expanded','false');if(m)m.hidden=true})}
disclosures.forEach(w=>{const b=q('[data-nav-toggle]',w),m=b&&q('#'+b.getAttribute('aria-controls'));if(!b||!m)return;b.addEventListener('click',()=>{const on=b.getAttribute('aria-expanded')==='true';closeDisclosures(w);b.setAttribute('aria-expanded',String(!on));m.hidden=on})});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-disclosure'))closeDisclosures()});

qa('[data-track]').forEach(a=>a.addEventListener('click',()=>track(a.dataset.track)));

qa('[data-map]').forEach(map=>{
  const variant=map.dataset.mapVariant;
  if(!reduce.matches&&'IntersectionObserver'in window){new IntersectionObserver((es,ob)=>es.forEach(e=>{if(e.isIntersecting){map.classList.add('is-drawn');ob.unobserve(map)}}),{threshold:.25}).observe(map)}else map.classList.add('is-drawn');
  if(variant!=='full')return;
  const points=qa('[data-map-point]',map),mobile=matchMedia('(max-width:899px)');
  let current=-1;
  function closeAll(returnFocus=false){
    points.forEach((p,i)=>{const b=q('[data-map-trigger]',p),panel=b?.getAttribute('aria-controls')?q('#'+b.getAttribute('aria-controls'),map):null;p.classList.remove('is-open');b?.setAttribute('aria-expanded','false');if(panel)panel.hidden=true;if(returnFocus&&i===current)b?.focus()})
  }
  function openPoint(i){
    const p=points[i],b=q('[data-map-trigger]',p);if(!b)return;
    if(mobile.matches){const id=b.dataset.areaTarget,row=id?q('#'+id,map):null;if(row){row.open=true;row.scrollIntoView({block:'nearest',behavior:reduce.matches?'auto':'smooth'})}return}
    closeAll();current=i;const panel=q('#'+b.getAttribute('aria-controls'),map);if(!panel)return;
    p.classList.add('is-open');b.setAttribute('aria-expanded','true');panel.hidden=false;q('h3',panel)?.focus()
  }
  points.forEach((p,i)=>{const b=q('[data-map-trigger]',p);if(!b)return;b.tabIndex=i===0?0:-1;b.addEventListener('click',()=>openPoint(i));b.addEventListener('keydown',e=>{
    let next=null;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%points.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i-1+points.length)%points.length;if(e.key==='Home')next=0;if(e.key==='End')next=points.length-1;
    if(next!==null){e.preventDefault();qa('[data-map-trigger]',map).forEach((x,j)=>x.tabIndex=j===next?0:-1);q('[data-map-trigger]',points[next])?.focus()}
  })});
  qa('[data-map-close]',map).forEach(b=>b.addEventListener('click',()=>closeAll(true)));
  map.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll(true)}})
});

updateWA();
})();