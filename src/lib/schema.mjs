const clean=v=>Array.isArray(v)?v.map(clean).filter(x=>x!=null):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,clean(x)]).filter(([,x])=>x!=null&&!(Array.isArray(x)&&!x.length))):v==null?null:v;
const abs=(cfg,path)=>cfg.site.url+path;
const pageType=path=>path==='/about/'?'AboutPage':path==='/contact/'?'ContactPage':['/plumbing-services/','/guides/','/areas-we-cover/'].includes(path)?'CollectionPage':'WebPage';

export function schemaGraph({cfg,meta,path,faqs=[],breadcrumbs=[],service=null,article=null,area=null,offer=null}){
  const businessId=cfg.site.url+'/#business',websiteId=cfg.site.url+'/#website',pageId=abs(cfg,path)+'#page';
  const all=[...cfg.areas.core,...cfg.areas.nearby].map(a=>a.name);
  const same=[cfg.links.googleBusinessProfile,cfg.links.reviewPlatform].filter(Boolean);
  const business=clean({
    '@type':'Plumber','@id':businessId,name:cfg.brand.name,url:cfg.site.url,logo:cfg.site.url+'/brand/mark.svg',
    description:'Plumbing repairs, maintenance and general plumbing work in Fulham SW6.',
    address:{'@type':'PostalAddress',streetAddress:cfg.operatingAddress.streetAddress,addressLocality:cfg.operatingAddress.locality,addressRegion:cfg.operatingAddress.city,postalCode:cfg.operatingAddress.postcode,addressCountry:'GB'},
    geo:cfg.operatingAddress.geo?{'@type':'GeoCoordinates',latitude:cfg.operatingAddress.geo.lat,longitude:cfg.operatingAddress.geo.lng}:null,
    telephone:cfg.contact.phone,email:cfg.contact.email,priceRange:'£75 first hour',
    areaServed:['Fulham, London',...all].map(name=>({'@type':'Place',name})),sameAs:same,
    hasOfferCatalog:{'@type':'OfferCatalog',name:'Plumbing services',itemListElement:cfg.services.filter(s=>s.enabled).map(s=>({'@type':'Offer',itemOffered:{'@type':'Service',name:s.name,url:cfg.site.url+'/'+s.slug+'/'}}))}
  });
  const website={'@type':'WebSite','@id':websiteId,url:cfg.site.url,name:cfg.brand.name,publisher:{'@id':businessId}};
  const breadcrumbId=breadcrumbs.length?abs(cfg,path)+'#breadcrumb':null;
  const webpage=clean({
    '@type':pageType(path),'@id':pageId,url:abs(cfg,path),name:meta.title,description:meta.description,
    isPartOf:{'@id':websiteId},about:{'@id':businessId},breadcrumb:breadcrumbId?{'@id':breadcrumbId}:null
  });
  const g=[];
  if(['/','/about/','/contact/'].includes(path))g.push(business);else g.push({'@type':'Plumber','@id':businessId,name:cfg.brand.name,url:cfg.site.url});
  if(path==='/')g.push(website);else g.push({'@type':'WebSite','@id':websiteId,url:cfg.site.url,name:cfg.brand.name});
  g.push(webpage);
  if(service){
    const serviceUrl=area?abs(cfg,path):abs(cfg,service.slug?'/'+service.slug+'/':path);
    const serviceName=service.name||meta.h1;
    g.push(clean({
      '@type':'Service','@id':serviceUrl+'#service',url:serviceUrl,name:serviceName,serviceType:serviceName,
      description:meta.description,provider:{'@id':businessId},
      areaServed:{'@type':'Place',name:area?area.name:'Fulham, London'},
      offers:{'@type':'Offer',name:'First hour of plumbing labour',price:String(cfg.pricing.firstHour),priceCurrency:'GBP',availability:'https://schema.org/InStock',eligibleRegion:{'@type':'Place',name:area?area.name:'Fulham, London'}}
    }));
  }
  if(offer)g.push(clean(offer));
  if(breadcrumbs.length)g.push({'@type':'BreadcrumbList','@id':breadcrumbId,itemListElement:breadcrumbs.map((b,i)=>({'@type':'ListItem',position:i+1,name:b.name,item:cfg.site.url+b.path}))});
  if(faqs.length)g.push({'@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))});
  if(article)g.push(clean({
    '@type':'Article','@id':abs(cfg,path)+'#article',headline:meta.h1,description:meta.description,
    author:cfg.plumber.name?{'@type':'Person',name:cfg.plumber.name,jobTitle:'Plumber',worksFor:{'@id':businessId}}:{'@id':businessId},
    publisher:{'@id':businessId},datePublished:article.published||article.updated,dateModified:article.updated,
    mainEntityOfPage:{'@id':pageId},image:article.image||cfg.site.url+'/brand/og-default.png'
  }));
  if(path==='/about/'&&cfg.plumber.name)g.push(clean({
    '@type':'Person','@id':cfg.site.url+'/#plumber',name:cfg.plumber.name,jobTitle:'Plumber',worksFor:{'@id':businessId},
    image:cfg.plumber.photo?cfg.site.url+cfg.plumber.photo:null,knowsAbout:cfg.services.filter(s=>s.enabled).map(s=>s.name)
  }));
  return JSON.stringify({'@context':'https://schema.org','@graph':g});
}
export const ldScript=d=>`<script type="application/ld+json">${d}</script>`;