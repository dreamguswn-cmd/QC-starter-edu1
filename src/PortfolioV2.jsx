import React, { useState } from 'react'
import {
  ArrowRight, Download, ExternalLink, Github, Mail,
  Menu, ShieldCheck, X
} from 'lucide-react'
import { publicUrl } from './portfolioApi'

export const qaProjects = [
  {
    id: 'voc', number: '01', label: '대표 프로젝트',
    title: 'VOC Improve 멀티 에이전트 QA',
    summary: '6개 AI Agent의 VOC 분석 결과를 독립 Judge로 평가하고, 배포 가능 여부까지 판정한 팀 프로젝트입니다.',
    role: '테스트 케이스 실행부터 Apache 장애 재현, 원인 확인, 복구 후 재테스트와 결과 증빙을 담당했습니다.',
    metrics: [['자동화 테스트', '5건'], ['테스트 결과', '5 PASS'], ['품질 평균', '99점'], ['실패', '0건']],
    tags: ['pytest', 'LLM Judge', 'AWS EC2', 'S3', 'Release Gate'],
    issue: 'Apache 서비스를 의도적으로 중지해 접속 장애를 재현하고, 상태와 원인을 확인했습니다.',
    action: '서비스 재시작 후 정상 접속을 재검증하고 S3 보안 설정과 결과물 업로드까지 확인했습니다.',
    result: '장애 복구 100점 · 전체 품질 평균 99점 · 자동화 테스트 5/5 통과',
    image: 'assets/voc-improve-cover.svg',
    evidence: 'downloads/VOC_Quality_Report_Team4.docx',
    detail: 'downloads/VOC_Presentation_v1.8.pptx',
  },
  {
    id: 'rag', number: '02', label: 'AI 응답 품질',
    title: 'RAG 챗봇 자동 평가 및 답변 개선',
    summary: '답변 생성에서 끝내지 않고 Judge 평가 결과를 Correction Agent에 연결해 실패 답변을 개선하는 품질 루프입니다.',
    role: 'AI 응답 평가 기준을 설계하고 품질 저하 원인을 식별한 뒤, 개선 답변을 같은 기준으로 재검증했습니다.',
    metrics: [['평가 항목', '4개'], ['자동 테스트', '5건'], ['평균 점수', '4.20/5'], ['자동화', '100%']],
    tags: ['RAG', 'LLM-as-a-Judge', 'Two-Stage Evaluation', 'Correction Agent'],
    issue: '근거 미사용, 출처 누락 등 낮은 품질의 응답을 평가 점수와 감점 사유로 식별했습니다.',
    action: '평가 JSON을 Correction Agent 입력으로 재사용해 개선 답변과 보고서를 자동 생성했습니다.',
    result: '검색→생성→평가→수정→보고의 9단계 품질 검증 흐름 완성',
    image: 'assets/rag-orange/page-1.webp',
    evidence: 'downloads/RAG_챗봇_QA_포트폴리오_오렌지.pdf',
    detail: 'downloads/RAG_챗봇_QA_포트폴리오_오렌지.docx',
  },
  {
    id: 'monitoring', number: '03', label: '성능 · 모니터링',
    title: 'AI Agent 품질관리·운영 모니터링',
    summary: '기능, 성능, 장애, 운영 지표를 하나의 검증 흐름으로 연결해 서비스 상태를 관찰했습니다.',
    role: 'pytest 기능 테스트와 k6 부하 테스트를 수행하고, 운영 지표 수집과 Grafana 대시보드 검증을 담당했습니다.',
    metrics: [['기능 검증', 'pytest'], ['성능 검증', 'k6'], ['지표 수집', 'Prometheus'], ['시각화', 'Grafana']],
    tags: ['FastAPI', 'pytest', 'k6', 'Prometheus', 'Grafana'],
    issue: '기능 성공 여부만으로는 지연과 운영 이상을 설명하기 어려운 문제를 정의했습니다.',
    action: '테스트 결과와 응답 시간·오류 지표를 연결하고 Grafana에서 한 화면으로 관찰했습니다.',
    result: '기능·성능·운영 상태를 함께 판단하는 통합 QA 흐름 구축',
    image: 'assets/page-1.webp', evidence: 'portfolio.pdf', detail: 'portfolio.pdf',
  },
  {
    id: 'aws', number: '04', label: '장애 복구',
    title: 'AWS 웹 서버 장애 재현 및 복구 검증',
    summary: 'EC2와 Apache 서비스의 정상 상태부터 장애 발생, 원인 확인, 복구와 자원 정리까지 검증했습니다.',
    role: 'AWS 환경과 보안 설정을 점검하고 장애 시나리오 실행, 원인 확인, 복구 후 재테스트를 담당했습니다.',
    metrics: [['복구 평가', '100점'], ['장애 탐지', '95점'], ['보안 점검', 'PASS'], ['리전', '서울']],
    tags: ['AWS EC2', 'Apache', 'S3', 'CloudTrail', 'MFA'],
    issue: '웹 서버 중지 시 접속 실패가 발생하는 상황을 재현하고 원인을 Apache 상태로 좁혔습니다.',
    action: '서비스 재시작, 브라우저 정상 접속, S3 퍼블릭 차단과 암호화를 순서대로 재검증했습니다.',
    result: '장애 탐지 95점 · 장애 복구 및 S3 보안 설정 각 100점',
    image: 'assets/aws-project/12_장애복구_정상화면_정보가림.png',
    evidence: 'downloads/AWS_VOC_Improve_Team4_Final.zip', detail: 'downloads/VOC_Quality_Report_Team4.docx',
  },
  {
    id: 'judge', number: '05', label: '평가 자동화',
    title: 'Fake Judge 기반 AI 서비스 품질평가',
    summary: '고객 VOC와 AI 개선안을 정해진 품질 기준으로 평가하고 PASS·FAIL 판정과 보고서를 생성했습니다.',
    role: 'AI 응답 평가 로직을 구현하고 pytest 자동화, 결과 시각화, PASS·FAIL 판정 보고서 작성을 담당했습니다.',
    metrics: [['평가 기준', '5개'], ['자동화', 'pytest'], ['분석', 'Jupyter'], ['시각화', 'Streamlit']],
    tags: ['Python', 'pytest', 'Jupyter', 'Streamlit'],
    issue: '평가자에 따라 달라질 수 있는 AI 응답 판정을 동일한 기준으로 반복할 필요가 있었습니다.',
    action: '5개 품질 항목과 분기 로직을 테스트하고 결과를 대시보드와 문서로 남겼습니다.',
    result: '반복 가능한 평가·판정·보고 프로세스 구축',
    image: 'assets/ai-quality-streamlit.png',
    evidence: 'downloads/AI_Service_Quality_Portfolio.pdf', detail: 'downloads/fake_judge_lab_source.zip',
  },
]

const capabilities = [
  ['Testing', 'Test Case Design · Functional · Regression · API Testing'],
  ['AI Quality', 'RAG · Prompt Evaluation · LLM-as-a-Judge'],
  ['Automation', 'pytest · GitHub Actions · 결과 보고서'],
  ['Performance', 'k6 · 응답 시간 · 오류율 검증'],
  ['Monitoring', 'Prometheus · Grafana · 장애 관찰'],
  ['Cloud & Ops', 'AWS EC2 · S3 · CloudTrail · Docker'],
]

export const portfolioV2Defaults = {
  copyRevision: 2,
  hero: {
    eyebrow: 'AI SOFTWARE QA PORTFOLIO',
    name: '유현주',
    role: 'AI Software QA Engineer',
    summary: '기능 테스트부터 AI 응답 품질평가, 성능 검증, 모니터링과 장애복구까지 수행하는 QA 엔지니어입니다.',
    evidence: '테스트 결과를 수치와 증빙으로 기록하고, 발견된 문제를 재현 가능한 개선 과정으로 연결합니다.',
  },
  about: {
    title: '안녕하세요,\nQA 엔지니어 유현주입니다.',
    paragraphs: [
      '테스트 기준을 세우고, 기대 결과와 실제 결과의 차이를 찾습니다. 결함은 재현 조건과 원인을 기록하고, 개선 후 같은 조건으로 다시 검증합니다.',
      'AI 응답의 정확성과 근거성부터 API 기능, 부하 성능, 운영 지표와 클라우드 장애 복구까지 하나의 QA 흐름으로 연결해 왔습니다.',
    ],
  },
  education: {
    institution: '대우능력개발원',
    course: 'AI 기반 소프트웨어 테스터(QA) 및 모니터링 실무 과정',
    period: '2026.05.27 – 2026.08.07',
    status: '수강 중',
    description: '아래 QA 성과와 대표 프로젝트는 이 교육 과정에서 직접 실행하고 결과를 기록한 실습입니다.',
    topics: ['기능·API·회귀 테스트와 테스트 케이스 작성', 'pytest 자동화 및 k6 성능 검증', 'AI 응답 품질평가와 RAG 검증', 'Prometheus·Grafana 운영 모니터링', 'AWS 보안 점검, 장애 재현과 복구', '팀 프로젝트 결과 보고와 증빙 관리'],
  },
  achievements: [
    { value: '5건', label: 'VOC/AWS 자동화 테스트 실행' },
    { value: '100%', label: '테스트 케이스 통과율' },
    { value: '99점', label: 'VOC/AWS 품질평가 평균' },
    { value: '5개', label: '검증 과정이 기록된 대표 QA 프로젝트' },
  ],
  projects: qaProjects,
  capabilities,
  sites: [
    { title: '유현주 교육 게임 LAB', category: 'EDUCATIONAL WEB GAME', summary: '수학, 영어, 타자 연습을 게임으로 학습하는 반응형 교육 사이트입니다.', image: 'assets/game-lab-cover.svg', live: 'https://dreamguswn-cmd.github.io/play-and-learn/', github: 'https://github.com/dreamguswn-cmd/play-and-learn' },
    { title: '우리 동네 매미 자연학습', category: 'NATURE LEARNING WEB', summary: '매미의 모습과 울음소리, 기온에 따른 활동을 체험하는 자연학습 사이트입니다.', image: 'assets/maeme-cover.png', live: 'https://dreamguswn-cmd.github.io/maeme/', github: 'https://github.com/dreamguswn-cmd/maeme' },
    { title: '모바일 청첩장', category: 'MOBILE FIRST WEB', summary: '모바일 우선 반응형 구성과 갤러리, 연락처·계좌 복사 기능을 구현한 웹사이트입니다.', image: 'assets/invitation/couple-wedding.png', live: 'invitation.html', github: 'https://github.com/dreamguswn-cmd/QC-starter-edu1' },
    { title: '초등돌봄교실 자료관리', category: 'PRIVATE EDUCATION OPERATIONS', summary: '돌봄교실 운영 자료를 정리하고 관리자만 내부 자료를 확인할 수 있도록 만든 비공개 관리 시스템입니다.', image: '', live: 'care-class-entrance.html', github: 'https://github.com/dreamguswn-cmd/QC-starter-edu1' },
  ],
}

export default function PortfolioV2({ data, openAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const email = data?.settings?.contact?.email || 'aa01057559209@gmail.com'
  const github = data?.settings?.contact?.github || 'https://github.com/dreamguswn-cmd'
  const base = import.meta.env.BASE_URL
  const local = (path) => `${base}${path}`
  const portraitUrl = publicUrl(data?.assets?.portrait?.path) || local(data?.assets?.portrait?.fallback || 'assets/profile-photo.jpg')
  const resumeUrl = publicUrl(data?.assets?.resume?.path) || local(data?.assets?.resume?.fallback || 'downloads/Yoo_Hyunju_Resume.pdf')
  const savedContent = data?.settings?.v2 || {}
  const refreshedProjects = savedContent.projects?.length
    ? savedContent.projects.map((project) => {
        const revised = qaProjects.find((item) => item.id === project.id)
        return savedContent.copyRevision >= 2 || !revised ? project : { ...project, role: revised.role }
      })
    : portfolioV2Defaults.projects
  const content = {
    ...portfolioV2Defaults,
    ...savedContent,
    hero: { ...portfolioV2Defaults.hero, ...savedContent.hero },
    about: { ...portfolioV2Defaults.about, ...savedContent.about },
    education: { ...portfolioV2Defaults.education, ...savedContent.education },
    achievements: savedContent.copyRevision >= 2 && savedContent.achievements?.length ? savedContent.achievements : portfolioV2Defaults.achievements,
    projects: refreshedProjects,
    capabilities: savedContent.capabilities?.length ? savedContent.capabilities : portfolioV2Defaults.capabilities,
    sites: savedContent.sites?.length ? savedContent.sites : portfolioV2Defaults.sites,
  }

  return <div className="qa-site">
    <header className="qa-header">
      <a href="#home" className="qa-brand"><b>YOO HYUNJU</b><span>AI SOFTWARE QA</span></a>
      <nav className={menuOpen ? 'is-open' : ''} aria-label="주요 메뉴">
        <a href="#about" onClick={() => setMenuOpen(false)}>소개</a>
        <a href="#education" onClick={() => setMenuOpen(false)}>교육</a>
        <a href="#achievements" onClick={() => setMenuOpen(false)}>QA 성과</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>대표 프로젝트</a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>기술 역량</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>연락처</a>
      </nav>
      <button className="qa-menu" aria-label="메뉴 열기" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section id="home" className="qa-hero">
        <div className="qa-hero-profile">
          <div className="qa-photo-wrap">
            <div className="qa-photo-copy">
              <small>{content.hero.eyebrow}</small>
              <b>{content.hero.name} <i>|</i> <strong>{content.hero.role}</strong></b>
              <span>{content.hero.summary}<br/><br/>{content.hero.evidence}</span>
              <div className="qa-photo-actions">
                <a href="#projects">대표 프로젝트 보기 <ArrowRight/></a>
                <a href={resumeUrl} target="_blank" rel="noreferrer"><Download/> 이력서 다운로드</a>
                <a href={github} target="_blank" rel="noreferrer"><Github/> GitHub 보기</a>
              </div>
            </div>
            <img src={portraitUrl} alt="AI Software QA Engineer 유현주 프로필"/>
          </div>
        </div>
      </section>

      <section id="about" className="qa-section qa-about">
        <div><h2>{content.about.title.split('\n').map((line, index) => <React.Fragment key={line}>{index > 0 && <br/>}{line}</React.Fragment>)}</h2></div>
        <div>{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section id="education" className="qa-section qa-education">
        <div className="qa-education-intro">
          <p className="qa-kicker">EDUCATION & TRAINING</p>
          <h2>{content.education.institution}</h2>
          <p>{content.education.course}</p>
          <div><b>{content.education.period}</b><span>{content.education.status}</span></div>
        </div>
        <div className="qa-education-detail">
          <p>{content.education.description}</p>
          <ul>{content.education.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
        </div>
      </section>

      <section id="achievements" className="qa-section">
        <div className="qa-heading"><p className="qa-kicker">QA ACHIEVEMENTS</p><h2>증빙으로 확인되는 결과</h2><p>확인되지 않은 합산 수치는 부풀리지 않고, 실제 제출 결과에서 검증된 대표 수치만 표시했습니다.</p></div>
        <div className="qa-stats">{content.achievements.map((item) => <article key={`${item.value}-${item.label}`}><b>{item.value}</b><span>{item.label}</span></article>)}</div>
      </section>

      <section id="projects" className="qa-section qa-project-section">
        <div className="qa-heading"><p className="qa-kicker">SELECTED QA PROJECTS</p><h2>테스트 → 결함 → 개선 → 결과 → 증빙</h2><p>각 프로젝트에서 제가 맡은 QA 역할과 검증 과정을 같은 형식으로 정리했습니다.</p></div>
        <div className="qa-projects">
          {content.projects.map((project) => <article className="qa-project" id={project.id} key={project.id}>
            <div className="qa-project-visual"><img src={local(project.image)} alt={`${project.title} 결과 화면`}/><span>{project.number}</span></div>
            <div className="qa-project-content">
              <p className="qa-project-label">{project.label}</p><h3>{project.title}</h3><p className="qa-project-summary">{project.summary}</p>
              <div className="qa-role"><b>개인 기여</b><span>{project.role}</span></div>
              <div className="qa-project-metrics">{project.metrics.map(([key, value]) => <div key={key}><small>{key}</small><b>{value}</b></div>)}</div>
              <div className="qa-improvement">
                <div><span>01 · 문제 정의</span><p>{project.issue}</p></div>
                <div><span>02 · 개선 및 재검증</span><p>{project.action}</p></div>
                <div><span>03 · 결과</span><p>{project.result}</p></div>
              </div>
              <div className="qa-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="qa-project-actions"><a href={local(project.evidence)} target="_blank" rel="noreferrer"><ShieldCheck/> 증빙 보기</a><a href={local(project.detail)} target="_blank" rel="noreferrer"><ExternalLink/> 상세 자료</a></div>
            </div>
          </article>)}
        </div>
      </section>

      <section id="skills" className="qa-section">
        <div className="qa-heading"><p className="qa-kicker">CORE CAPABILITIES</p><h2>QA 업무 기준으로 재분류한 기술</h2></div>
        <div className="qa-capabilities">{content.capabilities.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="qa-section qa-github">
        <div><p className="qa-kicker">GITHUB & EVIDENCE</p><h2>재현할 수 있도록<br/>과정과 결과를 남깁니다.</h2></div>
        <div><p>프로젝트 목적, 테스트 환경, 테스트 케이스, 결함과 개선 내용, 실행 결과와 증빙을 저장소에서 확인할 수 있습니다.</p><a className="qa-button primary" href={github} target="_blank" rel="noreferrer"><Github/> GitHub 저장소 보기</a></div>
      </section>

      <section id="sites" className="qa-section qa-made-sites">
        <div className="qa-heading"><p className="qa-kicker">WEB SITES BY YOO HYUNJU</p><h2>직접 만든 웹사이트</h2><p>QA 교육 프로젝트와 별도로 사용자 관점에서 직접 기획하고 구현한 웹사이트입니다.</p></div>
        <div className="qa-site-cards">{content.sites.map((site) => <article key={site.title}>
          {site.image ? <img src={site.image.startsWith('http') ? site.image : local(site.image)} alt={`${site.title} 대표 화면`}/> : <div className="qa-site-placeholder"><ShieldCheck/><span>PRIVATE CARE CLASS</span><b>아동 개인정보 보호</b></div>}
          <div><small>{site.category}</small><h3>{site.title}</h3><p>{site.summary}</p><div><a href={site.live?.startsWith('http') ? site.live : local(site.live)} target="_blank" rel="noreferrer">사이트 보기 <ExternalLink/></a><a href={site.github} target="_blank" rel="noreferrer"><Github/> GitHub</a></div></div>
        </article>)}</div>
      </section>

      <section id="contact" className="qa-contact">
        <p className="qa-kicker">CONTACT</p><h2>품질을 근거로 설명하는<br/>QA 엔지니어 유현주입니다.</h2>
        <div><a href={`mailto:${email}`}><Mail/> {email}</a><a href={github} target="_blank" rel="noreferrer"><Github/> GitHub</a><a href={resumeUrl} target="_blank" rel="noreferrer"><Download/> Resume</a></div>
        <button className="qa-admin-link" onClick={openAdmin}>Portfolio Admin</button>
      </section>
    </main>
    <footer className="qa-footer">© 2026 YOO HYUNJU · AI SOFTWARE QA ENGINEER</footer>
  </div>
}
