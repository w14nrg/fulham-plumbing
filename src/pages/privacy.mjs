import{pageShell,breadcrumb}from'../lib/layout.mjs';
export async function render({cfg,meta,path,css,scriptPath}){
 const crumbs=[{name:'Home',path:'/'},{name:'Privacy',path}];
 const main=`<div class="shell legal">${breadcrumb(crumbs)}<section class="hero"><h1>${meta.h1}</h1><p>This policy explains what information Fulham Plumbing may receive when you contact us and how it is used.</p></section>
 <section><h2>Who is responsible</h2><p>Fulham Plumbing is responsible for the information received through this website and through enquiries made to the service. Current contact routes are shown on the <a href="/contact/">contact page</a>.</p></section>
 <section><h2>Information you send</h2><p>If you call, send a message or use a future online form, you may provide your name, phone number, address or postcode, photographs and details of the plumbing problem. We use that information to answer the enquiry, arrange work, carry out the job and keep normal business records.</p></section>
 <section><h2>Phone and WhatsApp</h2><p>Calls and WhatsApp messages are handled through the relevant communications providers. Their own privacy terms apply to their services.</p></section>
 <section><h2>Online forms</h2><p>${cfg.forms.endpoint?'The contact form sends the details you enter to the configured form-processing service so that we can reply.':'There is currently no online contact form configured on this site.'}</p></section>
 <section><h2>Analytics and cookies</h2><p>${cfg.analytics.provider?'A privacy-friendly analytics service is configured to understand general site use. The cookie policy explains the active setup.':'No analytics service is currently configured, and this site does not set analytics cookies.'}</p></section>
 <section><h2>Keeping information</h2><p>Business records are kept only for as long as there is a practical, contractual or legal reason to keep them. Access is limited to people who need the information for the work.</p></section>
 <section><h2>Your choices</h2><p>You can ask what personal information we hold about you, ask for an inaccurate detail to be corrected, or raise a privacy question using the contact route shown on this site once it is configured.</p></section></div>`;
 return pageShell({cfg,meta,path,css,scriptPath,main,breadcrumbs:crumbs});
}