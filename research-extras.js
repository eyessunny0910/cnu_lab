(function(){
"use strict";
const has=s=>typeof s==="string"&&!!s.trim();
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const http=s=>/^https?:\/\//i.test(String(s??"").trim())?esc(String(s).trim()):"";
function imagesOf(r){const a=Array.isArray(r.images)?r.images:has(r.image)?[{src:r.image,alt:r.imageAlt||"",width:100}]:[];return a.map((x,i)=>({x:x||{},i})).filter(({x})=>has(x.src||x.image));}
function previewImage(r){const it=imagesOf(r)[0]?.x;return {src:it?.src||it?.image||"",alt:it?.alt||r.imageAlt||""};}
function renderMedia(r,index,{safeURL,image,attr}){
const pics=imagesOf(r).filter(({x})=>!!safeURL(x.src||x.image));if(!pics.length)return "";
return '<div class="research-media-panel" aria-label="'+esc((r.title||"연구")+" 이미지")+'">'+pics.map(({x,i})=>{
const src=x.src||x.image,alt=x.alt||x.imageAlt||r.imageAlt||r.title||"연구 사진",caption=x.caption||"";
const num=Number(x.width??x.size??100),width=Number.isFinite(num)?Math.max(25,Math.min(100,num)):100;
const key=Array.isArray(r.images)?'research.'+index+'.images.'+i+'.src':'research.'+index+'.image';
return '<button type="button" class="research-media-tile image-open" style="--tile-width:'+width+'%" data-image="'+safeURL(src)+'" data-caption="'+esc(caption||alt)+'" aria-label="'+esc(alt)+' 확대"'+attr(key)+'><span class="research-media-image">'+image(src,alt,"","lazy",key)+'</span>'+(has(caption)?'<span class="research-media-caption">'+esc(caption)+'</span>':"")+'</button>';
}).join("")+"</div>";
}
function renderPapers(r,index,{attr}){
const arr=Array.isArray(r.papers)?r.papers:[];
const papers=arr.map((v,i)=>({p:v||{},i})).filter(({p})=>has(p.title)||has(p.url));
if(!papers.length)return "";
return '<section class="research-papers"><h3>관련 논문 <span>Related publications</span></h3><ul>'+papers.map(({p,i})=>{
const key='research.'+index+'.papers.'+i+'.',raw=String(p.url||"").trim(),url=http(raw)||(raw.startsWith("10.")?"https://doi.org/"+esc(encodeURI(raw)):"")||(String(p.doi||"").startsWith("10.")?"https://doi.org/"+esc(encodeURI(p.doi)):"");
const title=esc(p.title||"논문 보기");return '<li class="research-paper"><span class="research-paper-icon" aria-hidden="true">↗</span><div>'+(url?'<a href="'+url+'" target="_blank" rel="noopener noreferrer"'+attr(key+'url')+'>'+title+'</a>':'<span'+attr(key+'title')+'>'+title+'</span>')+([p.authors,p.year].some(has)?'<small>'+esc([p.authors,p.year].filter(has).join(" · "))+'</small>':'')+'</div></li>';
}).join("")+'</ul></section>';
}
window.LAB_RESEARCH={imagesOf,previewImage,renderMedia,renderPapers};
})();