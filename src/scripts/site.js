(()=>{'use strict';
const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const desktopMap=matchMedia('(min-width:1024px)');
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const dataNode=q('#qa-data');let qaData=null;
try{qaData=dataNode?JSON.parse(dataNode.textContent):null}catch{}
let state={problem:null,symptom:null,home:null,homeLabel:null};
try{const saved=JSON.parse(sessionStorage.getItem('fp-context')||'null');if(saved&&typeof saved==='object')state={...state,...saved}}catch{}
const save=()=>{try{sessionStorage.setItem('fp-context',JSON.stringify(state))}catch{}};
const track=n=>{try{window.plausible?.(n)}catch{}};

function waText(){
  if(!qaData)return null;
  const p=state.problem&&qaData.problems?.[state.problem],s=p&&state.symptom&&p.symptoms?.[state.symptom];
  if(s?.wa)return`Hi Fulham Plumbing, ${s.wa}. My postcode is ____. I've attached a photo.`;
  if(p)return`Hi Fulham Plumbing, I have a problem with my ${p.label.toLowerCase()}. My postcode is ____. I've attached a photo.`;
  return qaData.defaultMessage||null
}
function updateWA(){
  if(!qaData?.whatsapp)return;
  const text=waText()||qaData.defaultMessage||'Hi Fulham Plumbing, I have a plumbing problem. My postcode is: ';
  qa('[data-wa]').forEach(a=>a.href=`https://wa.me/${qaData.whatsapp}?text=${encodeURIComponent(text)}`);
}
function symptomButtons(p){
  return Object.entries(p.symptoms||{}).map(([k,v])=>`<button type="button" class="qa-pill" data-symptom="${esc(k)}" aria-pressed="${state.symptom===k?'true':'false'}">${esc(v.label)}</button>`).join('')
}
function adviceLink(p){return p.serviceUrl?`<a class="problem-advice" href="${esc(p.serviceUrl)}">See ${esc(p.label.toLowerCase())} advice →</a>`:''}
function homeRow(p){
  if(!['low-pressure','shower','hot-water'].includes(state.problem)||!p.homeNotes)return'';
  const opts=[['house','House'],['converted','Converted flat'],['purpose','Purpose-built flat'],['newer','Newer apartment'],['not-sure','Not sure']];
  return`<p class="qa-step-label">Your home <span class="muted">· optional</span></p><div class="home-row">${opts.map(([k,n])=>`<button type="button" class="qa-pill" data-home="${k}" data-home-label="${esc(n.toLowerCase())}" aria-pressed="${state.home===k?'true':'false'}">${n}</button>`).join('')}</div>`
}
function fullAnswer(p,s){
  const home=state.home&&p.homeNotes?.[state.home]?`<p><strong>In a ${esc(state.homeLabel||state.home)}:</strong> ${esc(p.homeNotes[state.home])}</p>`:'';
  const causes=(s.causes||[]).map(esc).join(' · ');
  return`<div class="quick-answer"><dl><dt>Likely causes</dt><dd>${causes}</dd><dt>What we check</dt><dd>${esc(s.checks||'')}</dd><dt>Typical cost</dt><dd>${esc(s.cost||qaData.defaultCost||'')}</dd></dl>${home}<div class="problem-actions">${qaData.callHref?`<a class="button button--primary button--compact" href="${esc(qaData.callHref)}">Call</a>`:''}${qaData.whatsapp?`<a class="button button--whatsapp button--compact" href="#" data-wa>WhatsApp this problem</a>`:''}${adviceLink(p)}</div></div>`
}
function bindDynamic(root,render){
  qa('[data-symptom]',root).forEach(b=>b.addEventListener('click',()=>{state.symptom=b.dataset.symptom;state.home=null;state.homeLabel=null;save();render()}));
  qa('[data-home]',root).forEach(b=>b.addEventListener('click',()=>{state.home=b.dataset.home==='not-sure'?null:b.dataset.home;state.homeLabel=b.dataset.homeLabel||b.textContent.toLowerCase();save();render()}));
}
function renderTool(root){
  const stage=q('[data-problem-stage]',root),select=q('[data-problem-select]',root),p=state.problem&&qaData?.problems?.[state.problem];
  if(!stage)return;
  if(!p){stage.innerHTML='';return}
  if(select&&select.value!==state.problem)select.value=state.problem;
  const urgent=state.problem==='leak'?'<p class="problem-urgent">Water coming through now? Turn off the stopcock if you can do so safely. <a href="/stopcock-replacement/">Where is it?</a></p>':'';
  if(state.problem==='other'){
    stage.innerHTML=\`\${urgent}<div class="problem-tool__result"><p><strong>Not sure what to call it?</strong> A photo is usually enough to start.</p><div class="problem-actions">\${qaData.whatsapp?\`<a class="button button--whatsapp" href="#" data-wa>WhatsApp a photo</a>\`:''}\${adviceLink(p)}</div></div>\`;
    updateWA();return;
  }
  const symptom=state.symptom&&p.symptoms?.[state.symptom];
  stage.innerHTML=\`\${urgent}<div class="problem-tool__symptoms"><p class="qa-step-label">Which sounds closest?</p><div class="symptom-row">\${symptomButtons(p)}</div></div>\${symptom?\`<div class="problem-tool__result"><p><strong>\${esc(symptom.label)}</strong></p><div class="problem-actions">\${qaData.whatsapp?\`<a class="button button--whatsapp" href="#" data-wa>WhatsApp this problem</a>\`:''}\${adviceLink(p)}</div></div>\`:\`<div class="problem-actions">\${adviceLink(p)}</div>\`}\`;
  updateWA();bindDynamic(root,()=>renderTool(root))
}
qa('[data-problem-tool]').forEach(root=>{
  const select=q('[data-problem-select]',root);
  if(!select)return;
  select.addEventListener('change',()=>{state.problem=select.value||null;state.symptom=null;state.home=null;state.homeLabel=null;save();renderTool(root)});
  if(state.problem&&qaData?.problems?.[state.problem]){select.value=state.problem;renderTool(root)}
});
qa('[data-problem-console][data-fixed-problem]').forEach(root=>{
  state.problem=root.dataset.fixedProblem;renderService(root)
});
qa('[data-problem-jump]').forEach(a=>a.addEventListener('click',e=>{
  if(!qaData?.problems?.[a.dataset.problemJump])return;e.preventDefault();state.problem=a.dataset.problemJump;state.symptom=null;save();updateWA();
  const target=q('[data-problem-tool]');if(target){const select=q('[data-problem-select]',target);if(select)select.value=state.problem;renderTool(target);target.scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'start'})}
}));

/* menu */
const open=q('[data-menu-open]'),drawer=q('#mobile-drawer'),close=q('[data-menu-close]');
if(open&&drawer){
  const focusables=()=>qa('a[href],button:not([disabled]),summary,input:not([disabled]),textarea:not([disabled]),select:not([disabled])',drawer).filter(x=>!x.hasAttribute('hidden'));
  open.addEventListener('click',()=>{drawer.showModal();open.setAttribute('aria-expanded','true');focusables()[0]?.focus()});
  close?.addEventListener('click',()=>drawer.close());drawer.addEventListener('close',()=>{open.setAttribute('aria-expanded','false');open.focus()});
  drawer.addEventListener('keydown',e=>{if(e.key==='Escape'){drawer.close();return}if(e.key!=='Tab')return;const f=focusables();if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}})
}
const disclosures=qa('.nav-disclosure');
const closeMenus=except=>disclosures.forEach(w=>{if(w===except)return;const b=q('[data-nav-toggle]',w),m=b&&q('#'+b.getAttribute('aria-controls'));b?.setAttribute('aria-expanded','false');if(m)m.hidden=true});
disclosures.forEach(w=>{const b=q('[data-nav-toggle]',w),m=b&&q('#'+b.getAttribute('aria-controls'));if(!b||!m)return;b.addEventListener('click',()=>{const on=b.getAttribute('aria-expanded')==='true';closeMenus(w);b.setAttribute('aria-expanded',String(!on));m.hidden=on});w.addEventListener('focusout',()=>setTimeout(()=>{if(!w.contains(document.activeElement)){b.setAttribute('aria-expanded','false');m.hidden=true}},0))});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-disclosure'))closeMenus()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenus()});

/* map */
qa('[data-map]').forEach(map=>{
  if(!reduce.matches&&'IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){map.classList.add('is-drawn');ob.disconnect()}}),{threshold:.2});ob.observe(map)}else map.classList.add('is-drawn');
  if(map.dataset.mapVariant!=='full')return;
  let data=[];try{data=JSON.parse(q('.map-data',map)?.textContent||'[]')}catch{}
  const byKey=Object.fromEntries(data.map(x=>[x.key,x])),points=qa('[data-map-trigger]',map),rows=qa('[data-area-row]',map),defaultPanel=q('[data-map-default]',map),statePanel=q('[data-map-state]',map);
  let selected=null,previewTimer=null,lastFocus=null;
  const setSelected=k=>{selected=k;qa('[data-map-point]',map).forEach(p=>p.classList.toggle('is-selected',p.dataset.areaKey===k))};
  const copy=(d,detail=false)=>{
    if(!statePanel||!d)return;
    q('[data-map-postcode]',statePanel).textContent=d.postcode||'Local area';q('[data-map-name]',statePanel).textContent=d.name;
    const homes=d.homes?.length?`<p><strong>${detail?'Homes and buildings':'Common homes'}:</strong> ${d.homes.map(esc).join(detail?'</p><p>':' · ')}</p>`:'';
    const probs=detail&&d.problems?.length?`<p><strong>Common plumbing calls</strong></p><div class="area-tags">${d.problems.map(k=>`<a class="tag" href="/${({leak:'leak-repairs',toilet:'toilet-repairs',tap:'tap-repairs',shower:'shower-repairs','low-pressure':'low-water-pressure','shower-pump':'shower-pumps','hot-water':'hot-water-cylinders','blocked-sink':'blocked-sinks-wastes',stopcock:'stopcock-replacement'}[k]||'small-plumbing-jobs')}/" data-problem-jump="${esc(k)}">${esc(k.replaceAll('-',' '))}</a>`).join('')}</div>`:'';
    const actions=detail?`<div class="map-info__actions"><a class="button button--secondary button--compact" href="${esc(d.href)}">Plumbing in ${esc(d.name)} →</a>${d.wa?`<a class="button button--whatsapp button--compact" href="${esc(d.wa)}" data-wa>WhatsApp us</a>`:''}</div>`:'<p><strong>Click for more →</strong></p>';
    q('[data-map-copy]',statePanel).innerHTML=`<p>${esc(d.intro||'')}</p>${homes}${probs}${actions}`;
    defaultPanel.hidden=true;statePanel.hidden=false
  };
  const reset=()=>{selected=null;setSelected(null);if(statePanel)statePanel.hidden=true;if(defaultPanel)defaultPanel.hidden=false};
  const preview=k=>{if(selected||!desktopMap.matches)return;clearTimeout(previewTimer);copy(byKey[k],false)};
  const leave=()=>{if(selected||!desktopMap.matches)return;clearTimeout(previewTimer);previewTimer=setTimeout(reset,300)};
  const detail=k=>{const d=byKey[k];if(!d)return;lastFocus=document.activeElement;if(!desktopMap.matches){const row=q(`[data-area-detail][data-area-key="${CSS.escape(k)}"]`,map);if(row){row.open=true;row.scrollIntoView({block:'nearest',behavior:reduce.matches?'auto':'smooth'})}setSelected(k);return}selected=k;setSelected(k);copy(d,true)};
  points.forEach((b,i)=>{b.tabIndex=i===0?0:-1;b.addEventListener('pointerenter',()=>preview(b.dataset.areaKey));b.addEventListener('pointerleave',leave);b.addEventListener('focus',()=>preview(b.dataset.areaKey));b.addEventListener('click',()=>detail(b.dataset.areaKey));b.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();let n=i;if(e.key==='Home')n=0;else if(e.key==='End')n=points.length-1;else n=(i+(e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1)+points.length)%points.length;points.forEach((x,j)=>x.tabIndex=j===n?0:-1);points[n].focus()}else if(e.key==='Enter'||e.key===' '){e.preventDefault();detail(b.dataset.areaKey)}})});
  rows.forEach(b=>{b.addEventListener('pointerenter',()=>preview(b.dataset.areaKey));b.addEventListener('pointerleave',leave);b.addEventListener('focus',()=>preview(b.dataset.areaKey));b.addEventListener('click',()=>detail(b.dataset.areaKey))});
  q('[data-map-back]',map)?.addEventListener('click',()=>{reset();lastFocus?.focus()});map.addEventListener('keydown',e=>{if(e.key==='Escape'&&selected){reset();lastFocus?.focus()}});
});

/* safe decorative reveal */
const reveal=qa('main > section:not(.hero--home):not(.problem-section),main article > section');
if(!reduce.matches&&'IntersectionObserver'in window){
  const ob=new IntersectionObserver((entries,observer)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -4% 0px'});
  reveal.forEach(el=>{el.dataset.reveal='';ob.observe(el)});setTimeout(()=>reveal.forEach(el=>el.classList.add('is-visible')),1500)
}else reveal.forEach(el=>el.classList.add('is-visible'));
qa('[data-track]').forEach(a=>a.addEventListener('click',()=>track(a.dataset.track)));
updateWA();
})();