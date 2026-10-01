(()=>{'use strict';

const q=(s,c=document)=>c.querySelector(s);
const qa=(s,c=document)=>Array.from(c.querySelectorAll(s));
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopMap=window.matchMedia('(min-width:1024px)');
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

let qaData=null;
const qaNode=q('#qa-data');
try{qaData=qaNode?JSON.parse(qaNode.textContent):null}catch(e){qaData=null}

const state={problem:null,symptom:null};
const waHref=(message)=>{
  if(!qaData?.whatsapp)return'';
  return`https://wa.me/${qaData.whatsapp}?text=${encodeURIComponent(message)}`;
};
const messageFor=(problem,symptom)=>{
  const p=qaData?.problems?.[problem];
  const s=p?.symptoms?.[symptom];
  if(s?.wa)return`Hi Fulham Plumbing, ${s.wa}. My postcode is ____. I've attached a photo.`;
  if(p)return`Hi Fulham Plumbing, I have a problem with my ${p.label.toLowerCase()}. My postcode is ____. I've attached a photo.`;
  return qaData?.defaultMessage||'Hi Fulham Plumbing, I have a plumbing problem. My postcode is: ';
};
const symptomButtons=p=>Object.entries(p?.symptoms||{}).map(([key,item])=>`<button type="button" class="qa-pill" data-symptom="${esc(key)}">${esc(item.label)}</button>`).join('');

function renderHomeChecker(root){
  const select=q('[data-problem-select]',root);
  const stage=q('[data-problem-stage]',root);
  const go=q('[data-problem-go]',root);
  if(!select||!stage)return;

  const problem=select.value;
  const p=qaData?.problems?.[problem];
  state.problem=problem||null;
  state.symptom=null;

  if(!p){
    stage.innerHTML='';
    if(go)go.disabled=true;
    return;
  }

  if(go){
    go.disabled=false;
    go.onclick=()=>{
      if(qaData?.whatsapp){
        window.location.href=waHref(messageFor(problem,null));
      }else if(p.serviceUrl){
        window.location.href=p.serviceUrl;
      }
    };
  }

  if(problem==='other'){
    stage.innerHTML=`<div class="v5-checker__result"><strong>Not sure what to call it?</strong><p>Use the small-jobs page and tell us what needs sorting.</p><a class="v5-inline-link" href="${esc(p.serviceUrl)}">See small plumbing jobs →</a></div>`;
    return;
  }

  stage.innerHTML=`<div class="v5-checker__symptoms"><span>Which sounds closest?</span><div class="v5-symptom-list">${symptomButtons(p)}</div></div><div class="v5-checker__result" data-checker-result hidden></div>`;

  qa('[data-symptom]',stage).forEach(btn=>btn.addEventListener('click',()=>{
    qa('[data-symptom]',stage).forEach(x=>x.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.symptom=btn.dataset.symptom;
    const item=p.symptoms?.[state.symptom];
    const result=q('[data-checker-result]',stage);
    if(!result)return;
    const primary=qaData?.whatsapp
      ? `<a class="v5-main-cta v5-main-cta--small" href="${waHref(messageFor(problem,state.symptom))}">WhatsApp this problem <span>→</span></a>`
      : `<a class="v5-main-cta v5-main-cta--small" href="${esc(p.serviceUrl)}">See ${esc(p.label.toLowerCase())} help <span>→</span></a>`;
    result.hidden=false;
    result.innerHTML=`<strong>${esc(item?.label||'Selected problem')}</strong><div class="v5-checker__result-actions">${primary}<a class="v5-inline-link" href="${esc(p.serviceUrl)}">Read the service page →</a></div>`;
  }));
}

qa('[data-problem-tool]').forEach(root=>{
  const select=q('[data-problem-select]',root);
  if(!select)return;
  select.addEventListener('change',()=>renderHomeChecker(root));
  renderHomeChecker(root);
});



/* Homepage postcode + problem -> WhatsApp */
qa('[data-whatsapp-checker]').forEach(box=>{
  const postcode=q('[data-wa-postcode]',box);
  const problem=q('[data-wa-problem]',box);
  const send=q('[data-wa-send]',box);
  if(!send||!qaData?.whatsapp)return;
  const refresh=()=>{
    const pc=(postcode?.value||'').trim()||'____';
    const pr=(problem?.value||'').trim()||'____';
    const message=\`Hi Fulham Plumbing, I need a plumber. My postcode is \${pc}. The problem is: \${pr}\`;
    send.href=waHref(message);
  };
  postcode?.addEventListener('input',refresh);
  problem?.addEventListener('input',refresh);
  send.addEventListener('click',refresh);
  refresh();
});

/* Service-page symptom helper */
qa('[data-problem-console][data-fixed-problem]').forEach(root=>{
  const problem=root.dataset.fixedProblem;
  const p=qaData?.problems?.[problem];
  const panel=q('[data-qa-panel]',root);
  if(!p||!panel)return;
  panel.innerHTML=`<div class="v5-symptom-list">${symptomButtons(p)}</div><div data-service-result></div>`;
  qa('[data-symptom]',panel).forEach(btn=>btn.addEventListener('click',()=>{
    qa('[data-symptom]',panel).forEach(x=>x.classList.remove('is-active'));
    btn.classList.add('is-active');
    const item=p.symptoms?.[btn.dataset.symptom];
    const result=q('[data-service-result]',panel);
    if(!result)return;
    const causes=(item?.causes||[]).join(' · ');
    const wa=qaData?.whatsapp?`<a class="button button--whatsapp button--compact" href="${waHref(messageFor(problem,btn.dataset.symptom))}">WhatsApp this problem</a>`:'';
    result.innerHTML=`<div class="quick-answer"><dl><dt>Likely causes</dt><dd>${esc(causes)}</dd><dt>What we check</dt><dd>${esc(item?.checks||'')}</dd><dt>Typical cost</dt><dd>${esc(item?.cost||qaData?.defaultCost||'')}</dd></dl><div class="problem-actions">${wa}<a class="problem-advice" href="${esc(p.serviceUrl)}">Service details →</a></div></div>`;
  }));
});

/* Mobile drawer */
const open=q('[data-menu-open]');
const drawer=q('#mobile-drawer');
const close=q('[data-menu-close]');
if(open&&drawer){
  open.addEventListener('click',()=>{
    if(typeof drawer.showModal==='function')drawer.showModal();
    else drawer.setAttribute('open','');
    open.setAttribute('aria-expanded','true');
  });
  close?.addEventListener('click',()=>drawer.close?.());
  drawer.addEventListener('close',()=>open.setAttribute('aria-expanded','false'));
}

/* Desktop dropdowns */
qa('.nav-disclosure').forEach(w=>{
  const b=q('[data-nav-toggle]',w);
  const m=b?q('#'+b.getAttribute('aria-controls')):null;
  if(!b||!m)return;
  b.addEventListener('click',()=>{
    const on=b.getAttribute('aria-expanded')==='true';
    qa('.nav-disclosure').forEach(other=>{
      if(other===w)return;
      const ob=q('[data-nav-toggle]',other);
      const om=ob?q('#'+ob.getAttribute('aria-controls')):null;
      if(ob)ob.setAttribute('aria-expanded','false');
      if(om)om.hidden=true;
    });
    b.setAttribute('aria-expanded',String(!on));
    m.hidden=on;
  });
});
document.addEventListener('click',e=>{
  if(e.target.closest('.nav-disclosure'))return;
  qa('.nav-disclosure').forEach(w=>{
    const b=q('[data-nav-toggle]',w);
    const m=b?q('#'+b.getAttribute('aria-controls')):null;
    if(b)b.setAttribute('aria-expanded','false');
    if(m)m.hidden=true;
  });
});

/* Interactive map */
qa('[data-map]').forEach(map=>{
  map.classList.add('is-drawn');
  if(map.dataset.mapVariant!=='full')return;

  let items=[];
  try{items=JSON.parse(q('.map-data',map)?.textContent||'[]')}catch(e){items=[]}
  const byKey=Object.fromEntries(items.map(x=>[x.key,x]));
  const desktopDefault=q('[data-map-default]',map);
  const desktopState=q('[data-map-state]',map);
  const mobileSelect=q('[data-map-mobile-select]',map);
  const mobileCard=q('[data-map-mobile-card]',map);

  const serviceHref=k=>({
    leak:'leak-repairs',toilet:'toilet-repairs',tap:'tap-repairs',shower:'shower-repairs',
    'low-pressure':'low-water-pressure','shower-pump':'shower-pumps','hot-water':'hot-water-cylinders',
    'blocked-sink':'blocked-sinks-wastes',stopcock:'stopcock-replacement'
  }[k]||'small-plumbing-jobs');

  const detailHtml=d=>{
    const homes=d.homes?.length?`<div class="map-detail-block"><h4>Homes and buildings</h4><ul>${d.homes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:'';
    const probs=d.problems?.length?`<div class="map-detail-block"><h4>Common plumbing calls</h4><div class="area-tags">${d.problems.map(k=>`<a class="tag" href="/${serviceHref(k)}/">${esc(k.replaceAll('-',' '))}</a>`).join('')}</div></div>`:'';
    const wa=d.wa?`<a class="button button--whatsapp button--compact" href="${esc(d.wa)}">WhatsApp us</a>`:'';
    return`<p>${esc(d.intro||'')}</p>${homes}${probs}<div class="map-info__actions"><a class="button button--secondary button--compact" href="${esc(d.href)}">Plumbing in ${esc(d.name)} →</a>${wa}</div>`;
  };

  const selectPoint=key=>{
    const d=byKey[key];
    if(!d)return;
    qa('[data-map-point]',map).forEach(p=>p.classList.toggle('is-selected',p.dataset.areaKey===key));

    if(desktopMap.matches&&desktopState){
      q('[data-map-postcode]',desktopState).textContent=d.postcode||'Local area';
      q('[data-map-name]',desktopState).textContent=d.name;
      q('[data-map-copy]',desktopState).innerHTML=detailHtml(d);
      if(desktopDefault)desktopDefault.hidden=true;
      desktopState.hidden=false;
    }else if(mobileCard){
      if(mobileSelect&&mobileSelect.value!==key)mobileSelect.value=key;
      mobileCard.innerHTML=`<p class="eyebrow">${esc(d.postcode||'Local area')}</p><h3>${esc(d.name)}</h3>${detailHtml(d)}`;
      mobileCard.scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'nearest'});
    }
  };

  qa('[data-map-trigger]',map).forEach(btn=>{
    btn.addEventListener('click',()=>selectPoint(btn.dataset.areaKey));
    btn.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();selectPoint(btn.dataset.areaKey)}
    });
  });
  qa('[data-area-row]',map).forEach(btn=>btn.addEventListener('click',()=>selectPoint(btn.dataset.areaKey)));
  mobileSelect?.addEventListener('change',()=>selectPoint(mobileSelect.value));
  q('[data-map-back]',map)?.addEventListener('click',()=>{
    qa('[data-map-point]',map).forEach(p=>p.classList.remove('is-selected'));
    if(desktopState)desktopState.hidden=true;
    if(desktopDefault)desktopDefault.hidden=false;
  });

  const first=mobileSelect?.value||items.find(x=>x.key==='parsons-green')?.key||items[0]?.key;
  if(first&&!desktopMap.matches)selectPoint(first);
});

/* Reveal animation is decorative only; content is visible by default. */
if(!reduce.matches&&'IntersectionObserver'in window){
  const targets=qa('[data-reveal]');
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}
  }),{threshold:.08});
  targets.forEach(el=>io.observe(el));
}

})();