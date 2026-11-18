(function () {
  const fields = {
    members: [
      ['eyebrow','페이지 상단 · 작은 제목','OUR PEOPLE'],['title','페이지 상단 · 큰 제목','Members'],['description','페이지 소개문','','textarea'],['currentTitle','현재 구성원 제목','Current members'],['alumniTitle','졸업자 목록 제목','Alumni'],['empty','구성원이 없을 때 문구','구성원 정보를 준비하고 있습니다.'],['alumniEmpty','졸업자 목록이 비었을 때 문구','졸업자 정보를 준비하고 있습니다.'],['nameLabel','졸업자 표 · 이름','이름'],['roleLabel','졸업자 표 · 학위·직위','학위 · 직위'],['periodLabel','졸업자 표 · 졸업연도','졸업연도 · 재학 기간'],['affiliationLabel','졸업자 표 · 현재 소속','현재 소속']
    ],
    publications: [
      ['eyebrow','페이지 상단 · 작은 제목','RESEARCH OUTPUT'],['title','페이지 상단 · 큰 제목','Publications'],['description','페이지 소개문','','textarea'],['profilesTitle','교수님 프로필 링크 영역 제목','Research profiles'],['searchPlaceholder','검색 칸 안내','논문 제목 · 저자 · 학술지 검색'],['searchLabel','검색 칸 이름','논문 검색'],['allYears','연도 필터 · 전체','전체 연도'],['yearLabel','연도 필터 이름','발표 연도'],['unknownYear','연도 미입력 묶음 제목','Other publications'],['empty','논문 목록이 비었을 때 문구','연구 논문 목록을 준비하고 있습니다.'],['noResults','검색 결과가 없을 때 문구','검색 조건에 맞는 논문이 없습니다.'],['doiLink','DOI 버튼 문구','DOI'],['paperLink','논문 링크 버튼 문구','논문 보기']
    ],
    gallery: [
      ['eyebrow','페이지 상단 · 작은 제목','LAB LIFE'],['title','페이지 상단 · 큰 제목','Gallery'],['description','페이지 소개문','','textarea'],['allYears','연도 필터 · 전체','전체 연도'],['yearLabel','연도 필터 이름','활동 연도'],['empty','사진이 없을 때 문구','연구실의 활동 사진을 준비하고 있습니다.'],['noResults','해당 연도에 사진이 없을 때 문구','선택한 연도에 등록된 사진이 없습니다.']
    ],
    common: [
      ['utilityTagline','상단 오른쪽 문구','Crop science, connected.'],['navHome','메뉴 · 연구실 소개','연구실 소개'],['navResearch','메뉴 · 연구분야','연구분야'],['navProfessor','메뉴 · 지도교수','지도교수'],['navMembers','메뉴 · 구성원','Members'],['navPublications','메뉴 · 논문','Publications'],['navGallery','메뉴 · 갤러리','Gallery'],['navContact','메뉴 · 연락처','Contact'],['cropLabel','연구 작물 목록 아래 문구','OUR CROPS / 우리의 연구 대상'],
      ['contactEyebrow','하단 문의 영역 · 작은 제목',''],['contactTitle','하단 문의 영역 · 큰 제목','','textarea'],['copyright','저작권 안내 문구','All rights reserved.'],['guideLink','하단 · 편집 안내 링크','편집 안내'],['editorLink','하단 · 콘텐츠 편집 링크','콘텐츠 편집'],['enlarge','이미지 확대 버튼','크게 보기']
    ],
    home: [
      ['researchButton','첫 화면 · 연구분야 버튼','연구분야 살펴보기'],['professorButton','첫 화면 · 교수님 소개 버튼','교수님 소개'],['imageEyebrow','메인 사진 위 문구','OBSERVE. UNDERSTAND. IMPROVE.'],['imageIndex','메인 사진 위 번호 문구','01 / CGBL'],['imageQuote','메인 사진 위 큰 영문 문구','From genome\nto better crops.','textarea'],['aboutEyebrow','연구실 소개 · 작은 제목','ABOUT OUR LAB'],
      ['researchEyebrow','연구분야 미리보기 · 작은 제목','RESEARCH AREAS'],['researchTitle','연구분야 미리보기 · 큰 제목','데이터로 연결하는\n작물 연구의 가능성','textarea'],['allResearch','연구분야 전체 보기 버튼','전체 연구분야'],['approachEyebrow','연구 과정 · 작은 제목','OUR APPROACH'],['approachTitle','연구 과정 · 큰 제목','관찰에서 발견으로,\n발견에서 새로운 작물로.','textarea'],['approachDescription','연구 과정 · 설명','현장의 질문을 데이터로 읽고,\n육종의 가능성으로 연결합니다.','textarea'],
      ['focusEyebrow','주요 연구 · 작은 제목 (RESEARCH FOCUS)',''],['focusTitle','주요 연구 · 큰 제목','','textarea'],['professorEyebrow','교수님 소개 카드 · 작은 제목','PRINCIPAL INVESTIGATOR'],['professorLink','교수님 약력 보기 버튼','약력과 연구 관심분야'],['professorQuote','교수님 소개 카드 · 장식 문구','People\n& ideas.','textarea']
    ],
    research: [
      ['eyebrow','페이지 상단 · 작은 제목','OUR RESEARCH'],['title','페이지 상단 · 큰 제목','작물을 깊이 이해하고,\n가능성을 넓히는 연구.','textarea'],['description','페이지 상단 · 소개문','유전자원부터 정밀 표현체와 다차원 오믹스까지.\n서로 다른 데이터를 연결해 작물 개량의 길을 탐색합니다.','textarea'],['allFilter','연구분야 전체 필터','전체 연구'],['imageLink','연구 그림 확대 버튼','연구자료 크게 보기'],['resourcesEyebrow','연구자료 · 작은 제목','LAB RESOURCES'],['resourcesTitle','연구자료 · 큰 제목','연구실을 한눈에.','textarea'],['resourceCategory','연구자료 카드 · 작은 영문 문구','LAB INTRODUCTION'],['sourceNote','연구자료 아래 안내문','그림과 연구 내용은 제공된 연구실 소개자료를 바탕으로 구성했습니다.','textarea']
    ],
    professor: [
      ['eyebrow','페이지 상단 · 작은 제목','PRINCIPAL INVESTIGATOR'],['title','페이지 상단 · 큰 제목','연구의 질문을,\n함께 풀어갑니다.','textarea'],['profileLabel','교수님 사진 아래 분류','CGBL / PI'],['printButton','약력 인쇄 버튼','약력 인쇄 · PDF 저장'],['interestsEyebrow','연구 관심분야 · 작은 제목','RESEARCH INTERESTS'],['interestsTitle','연구 관심분야 · 큰 제목','작물의 유전적 이해에서\n더 나은 육종으로.','textarea'],['careerEyebrow','경력 · 작은 제목','EXPERIENCE'],['careerTitle','경력 · 큰 제목','주요 경력'],['educationEyebrow','학력 · 작은 제목','EDUCATION'],['educationTitle','학력 · 큰 제목','학력'],['activitiesEyebrow','주요활동 · 작은 제목','ACTIVITIES'],['activitiesTitle','주요활동 · 큰 제목','주요활동']
    ],
    contact: [
      ['eyebrow','페이지 상단 · 작은 제목','CONTACT US'],['title','페이지 상단 · 큰 제목','새로운 연결,\n여기에서 시작합니다.','textarea'],['emailEyebrow','이메일 위 작은 제목','GET IN TOUCH'],['quote','연락처 옆 장식 문구','From questions\nto possibilities.','textarea'],['locationEyebrow','위치 안내 · 작은 제목','FIND OUR LAB'],['affiliationLabel','소속 항목 이름','소속'],['officeLabel','교수 연구실 항목 이름','교수 연구실'],['labLabel','실험실 항목 이름','실험실'],['addressLabel','주소 항목 이름','주소'],['mapLink','지도 검색 버튼','네이버 지도에서 위치 검색']
    ]
  };
  const sections = {
    members:[['heading','페이지 상단 제목 영역'],['current','현재 구성원'],['alumni','졸업자 목록'],['contact','하단 문의 영역']],
    publications:[['heading','페이지 상단 제목 영역'],['profiles','교수님 연구자 프로필 링크'],['papers','논문 목록'],['contact','하단 문의 영역']],
    gallery:[['heading','페이지 상단 제목 영역'],['photos','활동 사진'],['contact','하단 문의 영역']],
    common:[['utility','상단 보조 정보줄'],['footer','하단 정보']],
    home:[['hero','첫 화면 메인 영역'],['about','연구실 소개'],['research','연구분야 미리보기'],['approach','연구 과정'],['highlights','주요 연구 목록'],['professor','교수님 소개 카드'],['contact','하단 문의 영역']],
    research:[['heading','페이지 상단 제목 영역'],['research','연구분야 목록'],['resources','연구자료 목록'],['contact','하단 문의 영역']],
    professor:[['heading','페이지 상단 제목 영역'],['profile','사진·성함·연락처'],['interests','연구 관심분야'],['career','경력'],['education','학력'],['activities','주요활동'],['contact','하단 문의 영역']],
    contact:[['heading','페이지 상단 제목 영역'],['email','이메일·전화 영역'],['location','위치·주소 영역']]
  };
  const steps=[{title:'관찰하다',description:'표현형 · 센서 데이터'},{title:'읽어내다',description:'유전체 · 전사체 · 대사체'},{title:'연결하다',description:'통계 · 인공지능 모델링'},{title:'선발하다',description:'유용 형질 · 우량 계통'}];
  function normalize(data) {
    data.copy ||= {}; data.sections ||= {}; data.blocks ||= {};
    for(const group of Object.keys(fields)) {
      data.copy[group] ||= {}; data.sections[group] ||= {};
      for(const [key,,value] of fields[group]) if(data.copy[group][key] === undefined) data.copy[group][key]=value;
      for(const [key] of sections[group]) if(data.sections[group][key] === undefined) data.sections[group][key]=true;
      if(group!=='common') data.blocks[group] ||= [];
    }
    if(!Array.isArray(data.methodSteps))data.methodSteps=JSON.parse(JSON.stringify(steps));
    for(const key of ['members','alumni','publications','gallery'])if(!Array.isArray(data[key]))data[key]=[];
    if(!Array.isArray(data.professor.links))data.professor.links=[{label:'Google Scholar',url:''},{label:'ResearchGate',url:''}];
    return data;
  }
  window.LAB_MODEL={fields,sections,normalize};
})();
