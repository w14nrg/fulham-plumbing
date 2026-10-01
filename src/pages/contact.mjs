import{pageShell,breadcrumb,sister}from'../lib/layout.mjs';
const field=(label,name,type='text',extra='')=>`<label>${label}<input name="${name}" type="${type}" ${extra}></label>`;
export async function render({cfg,meta,path,css,scriptPath}){
 const crumbs=[{name:'Home',path:'/'},{name:'Contact',path}];
 const methods=[];
 if(cfg.contact.phone)methods.push(`<a class="contact-action" href="tel:${cfg.contact.phone}" data-track="call_click"><strong>Call</strong><span>${cfg.contact.phoneDisplay||cfg.contact.phone} →</span></a>`);
 if(cfg.contact.whatsapp)methods.push(`<a class="contact-action" href="https://wa.me/${cfg.contact.whatsapp}" data-wa data-track="whatsapp_click"><strong>WhatsApp a photo</strong><span>Start message →</span></a>`);
 if(cfg.contact.email)methods.push(`<a class="contact-action" href="mailto:${cfg.contact.email}"><strong>Email</strong><span>${cfg.contact.email} →</span></a>`);
 const availability=[cfg.contact.hours,cfg.contact.availabilityNote].filter(Boolean).join(' · ');
 const form=cfg.forms.endpoint?`<form action="${cfg.forms.endpoint}" method="post" enctype="multipart/form-data" data-track-form><div class="form-grid">${field('Name','name','text','required autocomplete="name"')}${field('Phone','phone','tel','required autocomplete="tel"')}${field('Postcode','postcode','text','required autocomplete="postal-code"')}<label>What's the problem?<textarea name="problem" rows="6" required></textarea></label><label>Photo (optional, image files up to 10 MB)<input name="photo" type="file" accept="image/*"></label><label class="hp" aria-hidden="true">Leave this empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label><p>We'll only use your details to reply to you. <a href="/privacy/">Privacy</a>.</p><button class="button button--primary" type="submit">Send message</button></div></form>`:'';
 const main=`<div class="shell">${breadcrumb(crumbs)}</div>
 <section class="hero"><div class="shell"><p class="eyebrow">Call · message · send a photo</p><h1>${meta.h1}</h1><p class="lede">Tell us the postcode, what is happening and what you can see. A photo often helps identify the likely part before the visit.</p></div></section>
 <section class="section"><div class="shell inner-layout"><div class="content-column">
  <p class="eyebrow">Contact</p><h2>Choose the quickest route.</h2>
  ${methods.length?`<div class="contact-actions">${methods.join('')}</div>`:`<p><strong>Phone and WhatsApp details coming soon.</strong></p>`}
  ${availability?`<p class="muted" style="margin-top:18px">${availability}</p>`:''}
  <section style="margin-top:34px"><p class="eyebrow">What to send us</p><h2>Help us understand the job.</h2><ul><li>Your postcode</li><li>What the problem is doing now</li><li>A clear photo of the fitting and surrounding pipework if possible</li><li>The best time to reach you</li></ul></section>
  ${form?`<section style="margin-top:34px"><h2>Send a message</h2>${form}</section>`:''}
 </div>
 <aside class="inner-rail"><p class="eyebrow">Our base</p><p><strong>Fulham Plumbing</strong><br>36 Hurlingham Road<br>London SW6 3RQ</p><p class="muted">Working base only. All jobs are carried out at the customer's property.</p><p><a href="/areas-we-cover/">See the full service area →</a></p></aside>
 </div></section>
 <section class="section section--alt"><div class="shell two-col"><div><p class="eyebrow">Areas</p><h2>Where we work.</h2><p>Fulham SW6, Chelsea Harbour &amp; Lots Road SW10, Putney SW15 and Wandsworth Town SW18.</p><p><a href="/areas-we-cover/">See every area →</a></p></div><div><p class="eyebrow">Pricing</p><h2>£${cfg.pricing.firstHour} first hour.</h2><p>No separate call-out fee. Parts at cost. Further time is charged in ${cfg.pricing.incrementMinutes}-minute steps.</p><p><a href="/pricing/">See pricing →</a></p></div></div></section>
 <section class="section"><div class="shell">${sister(cfg)}</div></section>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs,bodyClass:'contact-page'});
}