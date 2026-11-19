(async function(){
"use strict";
await window.LAB_READY;
const $=id=>document.getElementById(id);
const clone=o=>JSON.parse(JSON.stringify(o));
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const allowedSrc=s=>/^(?:https?:\/\/|assets\/|media\/|data:image\/(?:png|jpeg|webp);base64,)/i.test(String(s||"").trim());
const srcOf=s=>{const v=String(s||"").trim();return !allowedSrc(v)?"":v.startsWith("media/")?(window.LAB_MEDIA_BASE||"")+v:v;};
const validLink=s=>/^https?:\/\//i.test(String(s||"").trim());
const clamp=v=>{const n=Number(v);return Number.isFinite(n)?Math.max(25,Math.min(100,Math.round(n))):100;};
let data=clone(window.LAB_DATA),active=0,dirty=false,revision=window.LAB_REVISION;
const original=clone(data);
if(!data||!Array.isArray(data.research)){$("editor-status").textContent="연구분야 데이터를 불러올 수 없습니다.";return;}
const status=(s)=>{$("editor-status").textContent=s;};
function selected(){return data.research[active];}
function ensure(r){
 if(!Array.isArray(r.images))r.images=r.image?[{src:r.image,alt:r.imageAlt||"",caption:"",width:100}]:[];
 if(!Array.isArray(r.papers))r.papers=[];
 return r;
}
function changed(){
 dirty=true;
 status("● 아직 공개 홈페이지에 반영되지 않았습니다. 편집이 끝나면 JSON을 다운로드하고 기존 편집기에서 백업 불러오기를 사용하세요.");
 updatePreview();
}
function input(label,kind,i,key,value,placeholder="",type="text"){
 const attributes='data-kind="'+kind+'" data-i="'+i+'" data-key="'+key+'"';
 return '<label class="rm-field"><span>'+esc(label)+'</span><input '+attributes+' type="'+type+'" value="'+esc(value??"")+'" placeholder="'+esc(placeholder)+'"></label>';
}
function fieldsImage(im,i){
 return '<div class="rm-record" data-img-index="'+i+'"><div class="rm-record-head"><strong>사진 '+(i+1)+'</strong><div class="rm-buttons"><button type="button" data-move="images" data-i="'+i+'" data-step="-1" aria-label="사진 위로">↑</button><button type="button" data-move="images" data-i="'+i+'" data-step="1" aria-label="사진 아래로">↓</button><button type="button" data-remove="images" data-i="'+i+'">삭제 ×</button></div></div>'+
 input("사진 주소", "images",i,"src",im.src||"","https:// 또는 assets/파일명.jpg")+
 '<label class="rm-field"><span>내 사진 업로드 (JPG · PNG · WebP, 8 MB 이하)</span><input type="file" accept="image/png,image/jpeg,image/webp" data-upload="'+i+'"></label>'+
 input("사진 설명 (대체 텍스트)","images",i,"alt",im.alt||"")+
 input("사진 아래 짧은 설명 (선택)","images",i,"caption",im.caption||"")+
 '<label class="rm-field"><span>가로 크기</span><input type="range" min="25" max="100" step="5" data-kind="images" data-i="'+i+'" data-key="width" value="'+clamp(im.width)+'"><output data-width-label="'+i+'">'+clamp(im.width)+'%</output></label></div>';
}
function fieldsPaper(p,i){
 return '<div class="rm-record" data-paper-index="'+i+'"><div class="rm-record-head"><strong>관련 논문 '+(i+1)+'</strong><div class="rm-buttons"><button type="button" data-move="papers" data-i="'+i+'" data-step="-1" aria-label="논문 위로">↑</button><button type="button" data-move="papers" data-i="'+i+'" data-step="1" aria-label="논문 아래로">↓</button><button type="button" data-remove="papers" data-i="'+i+'">삭제 ×</button></div></div>'+
 input("논문 제목","papers",i,"title",p.title||"")+
 input("링크 또는 DOI 주소","papers",i,"url",p.url||"","https://doi.org/10.xxxx/xxxxx")+
 input("저자 (선택)","papers",i,"authors",p.authors||"")+
 input("연도 (선택)","papers",i,"year",p.year||"","2026")+'</div>';
}
function populateSelect(){
 $("research-choice").innerHTML=data.research.map((r,i)=>'<option value="'+i+'">'+esc((i+1)+". "+(r.title||r.category||"연구 항목"))+"</option>").join("");
 $("research-choice").value=String(active);
}
function render(){
 const r=ensure(selected());
 $("image-fields").innerHTML=r.images.map(fieldsImage).join("");
 $("paper-fields").innerHTML=r.papers.map(fieldsPaper).join("");
 populateSelect();updatePreview();
}
function updatePreview(){
 const r=ensure(selected());
 $("preview-research-name").textContent=r.title||r.category||"선택한 연구";
 const photos=r.images.filter(x=>x&&allowedSrc(x.src));
 $("preview-images").innerHTML=photos.length?photos.map(x=>'<figure class="rm-image-preview" style="--w:'+clamp(x.width)+'%"><img src="'+esc(srcOf(x.src))+'" alt="'+esc(x.alt||"연구 사진")+'">'+(x.caption?'<figcaption>'+esc(x.caption)+'</figcaption>':"")+'</figure>').join(""):'<p class="rm-muted">사진을 추가하면 여기에 나타납니다.</p>';
 $("preview-papers").innerHTML=r.papers.filter(p=>p&&(p.title||p.url)).map(p=>'<li>'+(validLink(p.url)?'<a href="'+esc(p.url)+'" target="_blank" rel="noopener noreferrer">'+esc(p.title||"논문 보기")+"</a>":esc(p.title||"논문 링크를 입력하세요"))+(p.year?' <small>('+esc(p.year)+')</small>':"")+'</li>').join("")||'<li class="rm-muted">등록된 관련 논문이 없습니다.</li>';
}
$("research-choice").addEventListener("change",e=>{active=Number(e.target.value)||0;render();});
$("research-reload").addEventListener("click",()=>{if(!dirty||confirm("저장하지 않은 수정사항이 사라집니다. 최신 데이터를 다시 불러올까요?"))location.reload();});
function onInput(e){
 const el=e.target;if(!el.dataset.kind)return;
 const r=ensure(selected()),entry=r[el.dataset.kind]?.[Number(el.dataset.i)];
 if(!entry)return;
 entry[el.dataset.key]=el.dataset.key==="width"?clamp(el.value):el.value;
 if(el.dataset.key==="width"){const out=document.querySelector('[data-width-label="'+el.dataset.i+'"]');if(out)out.value=clamp(el.value)+"%";}
 changed();
}
$("image-fields").addEventListener("input",onInput);
$("paper-fields").addEventListener("input",onInput);
$("add-image").addEventListener("click",()=>{ensure(selected()).images.push({src:"",alt:"",caption:"",width:50});changed();render();});
$("add-paper").addEventListener("click",()=>{ensure(selected()).papers.push({title:"",url:"",authors:"",year:""});changed();render();});
function listAction(e){
 const remove=e.target.closest("[data-remove]"),move=e.target.closest("[data-move]");
 if(!remove&&!move)return;
 const btn=remove||move,which=btn.dataset.remove||btn.dataset.move,index=Number(btn.dataset.i),list=ensure(selected())[which];
 if(!Array.isArray(list)||index<0||index>=list.length)return;
 if(remove){if(!confirm("이 항목을 삭제할까요?"))return;list.splice(index,1);}
 else{const next=index+Number(btn.dataset.step);if(next<0||next>=list.length)return;[list[index],list[next]]=[list[next],list[index]];}
 changed();render();
}
$("image-fields").addEventListener("click",listAction);
$("paper-fields").addEventListener("click",listAction);
async function webpFromFile(file){
 if(!/^image\/(?:png|jpeg|webp)$/.test(file.type))throw Error("JPG, PNG, WebP 사진만 업로드할 수 있습니다.");
 if(file.size>8*1024*1024)throw Error("8 MB 이하 파일을 선택해 주세요.");
 const url=URL.createObjectURL(file);
 try{
   const picture=new Image();
   await new Promise((resolve,reject)=>{picture.onload=resolve;picture.onerror=()=>reject(new Error("사진을 읽을 수 없습니다."));picture.src=url;});
   const ratio=Math.min(1,1400/Math.max(picture.naturalWidth,picture.naturalHeight));
   const canvas=document.createElement("canvas");
   canvas.width=Math.max(1,Math.round(picture.naturalWidth*ratio));
   canvas.height=Math.max(1,Math.round(picture.naturalHeight*ratio));
   canvas.getContext("2d").drawImage(picture,0,0,canvas.width,canvas.height);
   let result=canvas.toDataURL("image/webp",.82);
   if(result.length>2.8*1024*1024)result=canvas.toDataURL("image/webp",.65);
   if(result.length>3.5*1024*1024)throw Error("압축 후에도 사진이 너무 큽니다. 원본 크기를 줄여 주세요.");
   return result;
 }finally{URL.revokeObjectURL(url);}
}
$("image-fields").addEventListener("change",async e=>{
 const fileInput=e.target.closest("[data-upload]");
 if(!fileInput||!fileInput.files?.[0])return;
 const idx=Number(fileInput.dataset.upload);
 const r=ensure(selected()),record=r.images[idx];
 if(!record)return;
 const file=fileInput.files[0];
 status("사진을 변환하는 중입니다…");
 try{
   record.src=await webpFromFile(file);
   if(!record.alt)record.alt=file.name.replace(/\.[^.]+$/,"");
   changed();render();
 }catch(err){status("업로드 실패: "+err.message);}
});
$("export-backup").addEventListener("click",async()=>{
 const payload=JSON.stringify(data,null,2);
 if(payload.length>15*1024*1024&&!confirm("백업이 15 MB보다 큽니다. 사진을 줄여야 저장 서버가 받을 수 있습니다. 그래도 다운로드할까요?"))return;
 try{
   if(window.LAB_SERVER_CONNECTED&&revision>=0){
     const res=await fetch(window.LAB_CONTENT_URL,{cache:"no-store",credentials:"omit",signal:AbortSignal.timeout(5000)});
     if(res.ok){const live=await res.json();if(live.revision!==revision&&!confirm("편집을 시작한 뒤 홈페이지 데이터가 다른 사람에 의해 변경되었습니다. 이 백업을 가져오면 그 변경 내용을 덮어쓸 수 있습니다. 그래도 다운로드할까요?"))return;}
   }
 }catch(e){}
 const url=URL.createObjectURL(new Blob([payload],{type:"application/json;charset=utf-8"}));
 const a=document.createElement("a");
 a.href=url;a.download="lab-research-with-images-papers.json";document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),30000);
 status("✓ JSON 파일을 다운로드했습니다. 이제 기존 콘텐츠 편집기를 열어 ‘백업 불러오기’를 선택하고, 저장 완료 표시를 확인해 주세요.");
});
$("import-backup").addEventListener("change",async e=>{
 const file=e.target.files?.[0];if(!file)return;
 try{
   const imported=JSON.parse(await file.text()),d=imported.data&&Array.isArray(imported.data.research)?imported.data:imported;
   if(!d.site||!d.professor||!Array.isArray(d.research))throw Error("연구실 백업 JSON 구조가 아닙니다.");
   if(!confirm("현재 작성 중인 내용을 선택한 백업으로 바꿀까요?"))return;
   data=clone(d);active=0;dirty=true;render();status("기존 백업을 불러왔습니다. 수정 후 JSON으로 저장하세요.");
 }catch(err){status("백업 읽기 실패: "+err.message);}
});
render();
status(window.LAB_SERVER_CONNECTED?"현재 홈페이지 저장 데이터를 불러왔습니다. 이 화면의 수정사항은 JSON 백업으로 반영해야 합니다.":"저장 서버가 연결되지 않아 GitHub 초기 사본으로 시작했습니다. 백업을 가져오기 전에 기존 편집기의 최신 백업을 사용하는 것이 안전합니다.");
})();