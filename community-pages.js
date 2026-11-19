(function(){
  const has=s=>typeof s==='string'&&!!s.trim();
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const web=s=>{const value=String(s??'').trim();return /^https?:\/\//i.test(value)?esc(value):/^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[/?#]|$)/i.test(value)?esc('https://'+value):'';};
  const silhouette='<svg class="person-silhouette" viewBox="0 0 240 280" role="img" aria-label="사진 미등록 · 기본 인물 이미지"><rect width="240" height="280" fill="#fff"/><circle cx="120" cy="103" r="42" fill="#e8ece8"/><path d="M38 269v-34c0-48 37-83 82-83s82 35 82 83v34" fill="#e8ece8"/></svg>';

  function profileLinks(data,attr){
    const f=data.professor||{},entries=Array.isArray(f.links)?f.links:[],name=String(f.nameEn||f.name||'').trim();
    const query=[name,data.site?.university==='충남대학교'?'Chungnam National University':data.site?.university].filter(has).join(' ');
    return entries.map((r,i)=>{
      const label=String(r?.label??'').trim();
      if(!label)return '';
      let url=web(r?.url),isSearch=false;
      if(!url&&/google\s*scholar|구글\s*스칼라|학술\s*검색/i.test(label)){url='https://scholar.google.com/scholar?q='+encodeURIComponent(query);isSearch=true;}
      if(!url&&/research\s*gate|리서치\s*게이트/i.test(label)){url='https://www.researchgate.net/search/researcher?q='+encodeURIComponent(name);isSearch=true;}
      if(!url)return '';
      return `<a class="academic-link" href="${url}" target="_blank" rel="noopener noreferrer"${attr('professor.links.'+i+'.url')}${isSearch?' title="프로필 주소가 없어 연구자 검색 결과를 엽니다"':''}>${esc(label)}${isSearch?'<small class="profile-search-hint">연구자 검색</small>':''} <span aria-hidden="true">↗</span></a>`;
    }).join('');
  }
  const yearOf=value=>(String(value).match(/^\s*(\d{4})/)||[])[1]||'';
  function render(ctx){
    const {d,page,p,visible,attr,txt,cp,top,pageTop,image}=ctx;
    const empty=key=>`<div class="archive-empty">${cp('p',key)}</div>`;
    let html=pageTop();
    if(page==='members'){
      if(visible(page,'current')){
        const members=d.members.map((r,i)=>({r,i})).filter(({r})=>[r.name,r.nameEn,r.role,r.image,r.intro,r.email,r.affiliation].some(has));
        const memberGroup=r=>{
          const value=String(r.group||r.level||r.role||'').trim().toLowerCase();
          if(/박사후|석사후|post[\s-]?doc|postdoctoral|post[\s-]?master|^(staff|researchers?)$/.test(value))return 'staff';
          if(/학부|undergrad|bachelor/.test(value))return 'undergrad';
          if(/석사|master|m\.?s\.?|m\.?sc|graduate\s*student/.test(value))return 'master';
          if(/연구원|연구직|researcher|research\s+(associate|fellow|staff|assistant)/.test(value))return 'staff';
          return 'other';
        };
        const memberCard=({r,i})=>{const k='members.'+i+'.';return `<article class="member-card"><div class="member-photo"${attr(k+'image')}>${has(r.image)?image(r.image,r.name||r.nameEn,'','lazy',k+'image'):silhouette}</div><div class="member-copy"><div class="member-name-row">${web(r.link)&&has(r.name)?`<h4><a href="${web(r.link)}" target="_blank" rel="noopener noreferrer"${attr(k+'name')}>${esc(r.name)}</a></h4>`:txt('h4',r.name,'',k+'name')}${txt('span',r.role,'member-role',k+'role')}</div>${txt('p',r.nameEn,'member-name-en',k+'nameEn')}${txt('p',r.affiliation,'member-affiliation',k+'affiliation')}${txt('p',r.intro,'member-intro',k+'intro')}${txt('p',r.period,'member-period',k+'period')}${has(r.email)?`<a class="member-email" href="mailto:${esc(r.email)}"${attr(k+'email')}>${esc(r.email)}</a>`:''}</div></article>`;};
        const tiers=[
          {key:'staff',number:'01',label:'연구원',english:'Research staff'},
          {key:'master',number:'02',label:'석사과정',english:"Master's students"},
          {key:'undergrad',number:'03',label:'학부연구생',english:'Undergraduate researchers'},
          {key:'other',number:'04',label:'기타 구성원',english:'Other members'}
        ];
        const tierHTML=tiers.map(g=>{
          const items=members.filter(({r})=>memberGroup(r)===g.key);
          if(!items.length)return '';
          return `<section class="member-tier member-tier-${g.key}" aria-label="${g.label}"><div class="member-tier-heading"><span class="member-tier-number" aria-hidden="true">${g.number}</span><div class="member-tier-titles"><h3>${g.label}</h3><span>${g.english}</span></div><span class="member-tier-count">${items.length} PEOPLE</span></div><div class="members-grid">${items.map(memberCard).join('')}</div></section>`;
        }).join('');
        html+=`<section class="section members-section"><div class="container">${top('',p.currentTitle,'','','copy.members.currentTitle')}${members.length?`<div class="members-tiers">${tierHTML}</div>`:empty('empty')}</div></section>`;
      }
      if(visible(page,'alumni')){
        const rows=d.alumni.map((r,i)=>({r,i})).filter(({r})=>[r.name,r.nameEn,r.role,r.period,r.affiliation].some(has));
        html+=`<section class="section alumni-section"><div class="container">${top('',p.alumniTitle,'','','copy.members.alumniTitle')}${rows.length?`<div class="alumni-table-wrap"><table class="alumni-table"><thead><tr>${['nameLabel','roleLabel','periodLabel','affiliationLabel'].map(k=>`<th scope="col"${attr('copy.members.'+k)}>${txt('span',p[k])}</th>`).join('')}</tr></thead><tbody>${rows.map(({r,i})=>{const k='alumni.'+i+'.';return `<tr><td>${txt('strong',r.name,'',k+'name')}${txt('span',r.nameEn,'alumni-name-en',k+'nameEn')}</td><td>${txt('span',r.role,'member-role',k+'role')}</td><td>${txt('span',r.period,'',k+'period')}</td><td>${web(r.link)&&has(r.affiliation)?`<a href="${web(r.link)}" target="_blank" rel="noopener noreferrer"${attr(k+'affiliation')}>${esc(r.affiliation)} ↗</a>`:txt('span',r.affiliation,'',k+'affiliation')}</td></tr>`;}).join('')}</tbody></table></div>`:empty('alumniEmpty')}</div></section>`;
      }
    }
    if(page==='publications'){
      const profiles=profileLinks(d,attr);
      if(visible(page,'profiles')&&profiles)html+=`<section class="section research-profiles"><div class="container">${top('',p.profilesTitle,'','','copy.publications.profilesTitle')}<div class="academic-links">${profiles}</div></div></section>`;
      if(visible(page,'papers')){
        const papers=d.publications.map((r,i)=>({r,i})).filter(({r})=>[r.title,r.authors,r.journal,r.citation,r.note].some(has));
        const years=[...new Set(papers.map(({r})=>r.year.trim()))].sort((a,b)=>b.localeCompare(a,'en',{numeric:true}));
        html+=`<section class="section publications-section"><div class="container">${papers.length?`<div class="archive-toolbar"><label class="archive-search">${cp('span','searchLabel','sr-only')}<input id="paper-search" type="search" placeholder="${esc(p.searchPlaceholder)}" aria-label="${esc(p.searchLabel||'논문 검색')}"></label><label>${cp('span','yearLabel','sr-only')}<select id="paper-year" aria-label="${esc(p.yearLabel||'발표 연도')}"><option value="">${esc(p.allYears)}</option>${years.filter(has).map(y=>`<option value="${esc(y)}">${esc(y)}</option>`).join('')}</select></label><span id="paper-result-count" class="archive-count" role="status" aria-live="polite">${papers.length}</span></div><div class="publication-years">${years.map(y=>`<section class="publication-year" data-paper-group><div class="publication-year-heading">${txt('h2',y||p.unknownYear,'',y?'':'copy.publications.unknownYear')}</div><ol class="publication-list">${papers.filter(({r})=>r.year.trim()===y).map(({r,i})=>{const k='publications.'+i+'.',doi=r.doi.trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,''),doiUrl=doi.startsWith('10.')?'https://doi.org/'+encodeURIComponent(doi).replace(/%2F/g,'/'):'';return `<li class="publication-item" data-paper-index="${i}" data-year="${esc(y)}"><span class="paper-number">${String(i+1).padStart(2,'0')}</span><article>${txt('h3',r.title,'paper-title',k+'title')}${txt('p',r.authors,'paper-authors',k+'authors')}${txt('p',r.journal,'paper-journal',k+'journal')}${txt('p',r.citation,'paper-citation',k+'citation')}${txt('p',r.note,'paper-note',k+'note')}<div class="paper-links">${doiUrl&&has(p.doiLink)?`<a href="${esc(doiUrl)}" target="_blank" rel="noopener noreferrer"${attr(k+'doi')}>${esc(p.doiLink)} ↗</a>`:''}${web(r.url)&&has(p.paperLink)?`<a href="${web(r.url)}" target="_blank" rel="noopener noreferrer"${attr(k+'url')}>${esc(p.paperLink)} ↗</a>`:''}</div></article></li>`;}).join('')}</ol></section>`).join('')}</div><p id="paper-no-results" class="archive-empty" role="status" hidden>${esc(p.noResults)}</p>`:empty('empty')}</div></section>`;
      }
    }
    if(page==='gallery'&&visible(page,'photos')){
      const photos=d.gallery.map((r,i)=>({r,i})).filter(({r})=>has(r.image));
      const years=[...new Set(photos.map(({r})=>yearOf(r.date)).filter(has))].sort().reverse();
      html+=`<section class="section gallery-section"><div class="container">${photos.length?`<div class="archive-toolbar gallery-toolbar"><span class="archive-count">${photos.length} PHOTOS</span><label>${cp('span','yearLabel','sr-only')}<select id="gallery-year" aria-label="${esc(p.yearLabel||'활동 연도')}"><option value="">${esc(p.allYears)}</option>${years.map(y=>`<option value="${esc(y)}">${esc(y)}</option>`).join('')}</select></label></div><div class="gallery-grid">${photos.map(({r,i})=>`<article class="gallery-card" data-gallery-year="${esc(yearOf(r.date))}"><button class="gallery-open" data-gallery-index="${i}" aria-label="${esc(r.title||r.date||'활동 사진')} 확대"><span class="gallery-photo">${image(r.image,r.imageAlt||r.title,'','lazy','gallery.'+i+'.image')}<span class="gallery-expand" aria-hidden="true">↗</span></span><span class="gallery-meta">${txt('span',r.date,'gallery-date','gallery.'+i+'.date')}${txt('strong',r.title,'gallery-title','gallery.'+i+'.title')}${txt('span',r.caption,'gallery-caption','gallery.'+i+'.caption')}</span></button></article>`).join('')}</div><p id="gallery-no-results" class="archive-empty" role="status" hidden>${esc(p.noResults)}</p>`:empty('empty')}</div></section>`;
    }
    return html;
  }
  function bind({d,page,dialog}){
    document.querySelectorAll('.member-photo img').forEach(img=>img.addEventListener('error',()=>{img.parentElement.innerHTML=silhouette;},{once:true}));
    if(page==='publications'){
      const search=document.getElementById('paper-search'),year=document.getElementById('paper-year');
      const filter=()=>{const terms=(search?.value||'').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean),selected=year?.value||'';let count=0;document.querySelectorAll('[data-paper-index]').forEach(el=>{const r=d.publications[Number(el.dataset.paperIndex)],haystack=[r.title,r.authors,r.journal,r.citation,r.year,r.doi,r.note].join(' ').toLocaleLowerCase();el.hidden=!!((selected&&r.year.trim()!==selected)||!terms.every(t=>haystack.includes(t)));if(!el.hidden)count++;});document.querySelectorAll('[data-paper-group]').forEach(el=>{el.hidden=![...el.querySelectorAll('[data-paper-index]')].some(item=>!item.hidden);});const countEl=document.getElementById('paper-result-count'),empty=document.getElementById('paper-no-results');if(countEl)countEl.textContent=String(count);if(empty)empty.hidden=count!==0;};
      search?.addEventListener('input',filter);year?.addEventListener('change',filter);
    }
    if(page==='gallery'){
      const year=document.getElementById('gallery-year');year?.addEventListener('change',()=>{let count=0;document.querySelectorAll('[data-gallery-year]').forEach(el=>{el.hidden=!!(year.value&&el.dataset.galleryYear!==year.value);if(!el.hidden)count++;});document.getElementById('gallery-no-results').hidden=count!==0;});
      if(!dialog)return;
      let current=0;
      const active=()=>[...document.querySelectorAll('.gallery-card:not([hidden]) [data-gallery-index]')].map(el=>Number(el.dataset.galleryIndex));
      const previous=document.createElement('button'),next=document.createElement('button'),counter=document.createElement('span');previous.type=next.type='button';previous.className='gallery-previous';next.className='gallery-next';counter.className='gallery-counter';previous.textContent='←';next.textContent='→';previous.setAttribute('aria-label','이전 사진');next.setAttribute('aria-label','다음 사진');dialog.append(previous,next,counter);
      const show=index=>{const indices=active(),item=d.gallery[index];if(!item||!indices.length)return;current=index;const source=document.querySelector('[data-gallery-index="'+index+'"] img');dialog.querySelector('img').src=source.src;dialog.querySelector('img').alt=item.imageAlt||item.title||'연구실 활동 사진';dialog.querySelector('p').textContent=[item.date,item.title,item.caption].filter(has).join(' · ');counter.textContent=(indices.indexOf(index)+1)+' / '+indices.length;previous.hidden=next.hidden=indices.length<2;if(!dialog.open)dialog.showModal();};
      const move=direction=>{const list=active(),at=list.indexOf(current);if(list.length)show(list[(at+direction+list.length)%list.length]);};
      document.querySelectorAll('[data-gallery-index]').forEach(btn=>btn.addEventListener('click',()=>show(Number(btn.dataset.galleryIndex))));previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}});
    }
  }
  window.LAB_COMMUNITY={render,bind,profileLinks};
})();
