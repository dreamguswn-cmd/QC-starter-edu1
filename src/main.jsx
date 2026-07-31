import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, Award, CheckCircle2, Cloud, Download, Gauge, Github, LogIn,
  LogOut, Mail, Menu, Plus, Save, Settings, ShieldCheck, Trash2, Upload, X
} from 'lucide-react'
import './styles.css'
import {
  currentSession, fallbackAssets, fallbackProjects, fallbackSettings, loadPortfolio,
  publicUrl, savePortfolio, signIn, signOut, uploadAsset,
  deleteCareFile, listCareFiles, openCareFile, uploadCareFiles
} from './portfolioApi'
import { supabaseConfigured } from './supabase'

const base = import.meta.env.BASE_URL
const local = (path) => base + path
const assetUrl = (item, fallback) => publicUrl(item?.path) || local(item?.fallback || fallback)

function Portfolio({ data, openAdmin }) {
  const [menu, setMenu] = useState(false)
  const { settings, projects, assets } = data
  const portrait = assetUrl(assets.portrait, fallbackAssets.portrait.fallback)
  const resume = assetUrl(assets.resume, fallbackAssets.resume.fallback)
  const skills = [
    ['QA Strategy', '기능·회귀·성능 테스트 설계'],
    ['AI Quality', 'RAG·LLM Judge 품질평가'],
    ['Monitoring', 'pytest·k6·Prometheus·Grafana'],
    ['Cloud Ops', 'AWS EC2·S3·CloudTrail'],
    ['Evidence', '재현 절차·스크린샷·결과 보고'],
    ['Collaboration', '팀 발표·시연·품질 판정'],
  ]
  const supplementalProjects = [
    { title: 'BERTScore 기반 AI 답변 품질평가', subtitle: '문자열 일치가 아닌 의미적 유사도로 AI 답변을 자동 채점하고 모델별 결과를 비교했습니다.', stack: 'BERTScore · NLP', image: 'assets/rag_chatbot_ui.png' },
    { title: '기준 모델 기반 BERTScore 회귀평가', subtitle: '새 모델이 기존 모델의 응답 특성을 유지하는지 배포 전에 자동 점검했습니다.', stack: 'Regression · F1', image: 'assets/page-4.webp' },
    { title: 'Routing Classifier 자동 분류 품질평가', subtitle: '질문을 담당 Agent로 연결하는 분류기의 정확도와 오분류 원인을 분석했습니다.', stack: 'Classifier · Confusion Matrix', image: 'assets/confusion_matrix.png' },
    { title: '교육과정 안내 챗봇 QA 자동화', subtitle: 'Rule Validator와 Judge Agent를 결합해 테스트·리포트·대시보드·모니터링을 연결했습니다.', stack: 'Validator · Dashboard', image: 'assets/edu_chatbot_qa_dashboard.png' },
  ]
  const downloads = [
    ['AWS 웹 서버·장애복구 프로젝트', 'ZIP · 보고서·증빙·S3 결과물', 'downloads/AWS_VOC_Improve_Team4_Final.zip'],
    ['RAG 답변 개선 포트폴리오', 'PDF · 자동 평가와 답변 개선', 'downloads/RAG_챗봇_QA_포트폴리오_오렌지.pdf'],
    ['RAG 품질평가 포트폴리오', 'PDF · Two-Stage Evaluation', 'downloads/RAG_챗봇_품질평가_포트폴리오.pdf'],
    ['AI Agent 운영 모니터링', 'PDF · 기능·성능·장애·운영', 'portfolio.pdf'],
    ['VOC Improve 발표자료', 'PPTX · 멀티 에이전트 QA', 'downloads/VOC_Presentation_v1.8.pptx'],
    ['VOC Improve 종합 품질보고서', 'DOCX · 테스트·결함·배포 판정', 'downloads/VOC_Quality_Report_Team4.docx'],
    ['AI 서비스 품질평가 실습', 'PDF · Fake Judge·Jupyter·Streamlit', 'downloads/AI_Service_Quality_Portfolio.pdf'],
    ['기존 AI QA · Python 포트폴리오', 'PDF · 추가 프로젝트 전체', 'downloads/기존_AI_QA_Python_포트폴리오.pdf'],
    ['이력서', 'PDF', 'downloads/Yoo_Hyunju_Resume.pdf'],
  ]
  return <>
    <header className="site-header">
      <a className="brand" href="#home"><b>YOO <i>HYUNJU</i></b><small>AI Software QA Portfolio</small></a>
      <nav className={menu ? 'open' : ''}>
        {['HOME', 'ABOUT', 'PROJECTS', 'SKILLS', 'DOWNLOADS', 'CONTACT'].map((item) =>
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}
        <a className="invitation-nav" href={local('invitation.html')} target="_blank" rel="noreferrer">모바일 청첩장</a>
        <button className="admin-link" onClick={openAdmin}><Settings size={15}/>관리</button>
      </nav>
      <button className="menu" aria-label="메뉴" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section id="home" className="hero hero-cover">
        <img className="hero-cover-image" src={local('assets/hyunju-hero.png')} alt="유현주 QA 엔지니어 포트폴리오"/>
        <div className="hero-light" aria-hidden="true"/>
        <a className="hero-scroll" href="#about" aria-label="포트폴리오 내용 보기">
          <span>SCROLL</span><ArrowDown/>
        </a>
      </section>

      <section className="stats" aria-label="핵심 역량">
        <article><CheckCircle2/><div><b>7+</b><small>대표 프로젝트</small></div></article>
        <article><Gauge/><div><b>기능·성능</b><small>통합 품질검증</small></div></article>
        <article><ShieldCheck/><div><b>재현·증빙</b><small>근거 기반 보고</small></div></article>
        <article><Cloud/><div><b>AWS</b><small>구축·장애복구</small></div></article>
      </section>

      <section id="about" className="about">
        <div><p className="eyebrow">ABOUT ME</p><h2>{settings.about.title}</h2></div>
        <p>{settings.about.description}</p>
      </section>

      <section id="projects">
        <p className="eyebrow">PROJECT EXPERIENCE</p>
        <h2>검증 과정과 결과를 보여주는 프로젝트</h2>
        <div className="projects">
          {projects.map((project, index) => <article key={project.id || `${project.title}-${index}`}>
            <a href={project.href?.startsWith('http') ? project.href : local(project.href || '')} target="_blank" rel="noreferrer">
              <div className="project-image"><img src={project.image?.startsWith('http') ? project.image : local(project.image || 'assets/page-1.webp')} alt=""/><strong>{String(index + 1).padStart(2, '0')}</strong></div>
              <div className="project-body"><span>{project.role}</span><h3>{project.title}</h3><p>{project.subtitle}</p><footer><b>{project.stack}</b><small>자세히 보기 →</small></footer></div>
            </a>
          </article>)}
          <article className="invitation-project">
            <a href={local('invitation.html')} target="_blank" rel="noreferrer">
              <div className="project-image"><img src={local('assets/invitation/couple-wedding.png')} alt="모바일 청첩장 프로젝트 대표 화면"/><strong>♥</strong></div>
              <div className="project-body"><span>WEB PROJECT</span><h3>모바일 청첩장 웹페이지</h3><p>모바일 우선 반응형 청첩장과 갤러리, 연락·계좌 복사 기능을 구현했습니다.</p><footer><b>Mobile First · JavaScript</b><small>청첩장 보기 →</small></footer></div>
            </a>
          </article>
        </div>
      </section>

      <section id="skills">
        <p className="eyebrow">CORE CAPABILITIES</p><h2>품질과 운영을 연결하는 역량</h2>
        <div className="skills">{skills.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="more-projects">
        <p className="eyebrow">MORE PROJECTS · EDUCATION & QA</p><h2>추가 프로젝트</h2>
        <div className="projects supplemental-projects">
          {supplementalProjects.map((project, index) => <article key={project.title}>
            <a href={local('downloads/기존_AI_QA_Python_포트폴리오.pdf')} target="_blank" rel="noreferrer">
              <div className="project-image"><img src={local(project.image)} alt=""/><strong>{String(index + 1).padStart(2, '0')}</strong></div>
              <div className="project-body"><span>ADDITIONAL PROJECT</span><h3>{project.title}</h3><p>{project.subtitle}</p><footer><b>{project.stack}</b><small>자료 보기 →</small></footer></div>
            </a>
          </article>)}
          <article className="education-project maeme-project">
            <div className="project-image"><img src={local('assets/maeme-cover.png')} alt="우리 동네 매미 탐험대 참매미"/><strong>07</strong></div>
            <div className="project-body"><span>PERSONAL PROJECT · EDUCATION WEB</span><h3>우리 동네 매미 탐험대</h3><p>초등학생이 우리나라 매미 7종의 모습과 울음소리, 기온에 따른 활동 변화를 직접 탐구하는 체험형 자연 학습 웹사이트입니다.</p><div className="feature-chips"><em>매미 7종 도감</em><em>울음소리</em><em>온도 실험</em><em>퀴즈</em></div><footer className="project-buttons"><a href="https://dreamguswn-cmd.github.io/maeme/" target="_blank" rel="noopener noreferrer">사이트 보기</a><a href="https://github.com/dreamguswn-cmd/maeme" target="_blank" rel="noopener noreferrer">GitHub</a></footer></div>
          </article>
          <article className="education-project care-project">
            <div className="care-cover" aria-label="초등돌봄교실 자료관리 시스템 공개용 입구"><ShieldCheck/><span>PRIVATE CARE CLASS</span><b>보호된 자료관리 공간</b><small>아동 개인정보 비공개</small></div>
            <div className="project-body"><span>EDUCATION OPERATIONS · PRIVATE SYSTEM</span><h3>초등돌봄교실 자료관리 시스템</h3><p>돌봄교실 운영 자료를 업로드하고 분류·관리할 수 있도록 만든 비공개 운영 시스템입니다. 아동 사진과 내부 자료는 공개하지 않습니다.</p><div className="feature-chips"><em>자료 업로드</em><em>분류·검색</em><em>운영 관리</em><em>접근 제한</em></div><footer className="project-buttons"><a href="https://neulbom-class-portfolio.dreamguswn161822.chatgpt.site/" target="_blank" rel="noreferrer">초등돌봄 포트폴리오 보기</a><span><ShieldCheck/> 내부 자료 비공개</span></footer></div>
          </article>
        </div>
      </section>

      <section id="downloads">
        <p className="eyebrow">PORTFOLIO ARCHIVE</p><h2>프로젝트 자료 다운로드</h2>
        <div className="download-grid">
          {downloads.map(([title, description, href]) => <a href={local(href)} target="_blank" rel="noreferrer" key={title}><span><b>{title}</b><small>{description}</small></span><Download/></a>)}
        </div>
      </section>

      <section className="training">
        <div><p className="eyebrow">CURRENT TRAINING</p><h2>AI 기반 소프트웨어 테스터(QA) 및 모니터링 실무 과정</h2><p>대우능력개발원 · 2026.05.27 – 2026.08.07</p></div>
        <Award/>
      </section>

      <section id="contact" className="contact">
        <div><p className="eyebrow">CONTACT</p><h2>새로운 품질 과제를 함께 해결하겠습니다.</h2></div>
        <div><a href={`mailto:${settings.contact.email}`}><Mail/>{settings.contact.email}</a><a href={settings.contact.github} target="_blank" rel="noreferrer"><Github/>GitHub</a></div>
      </section>
    </main>
    <footer className="bottom">© 2026 YOO HYUNJU · AI Software QA Portfolio</footer>
  </>
}

function Admin({ data, close, saved }) {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [settings, setSettings] = useState(structuredClone(data.settings))
  const [projects, setProjects] = useState(data.projects.map((project) => ({ ...project })))
  const [assets, setAssets] = useState({ ...data.assets })
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => { currentSession().then(setSession) }, [])
  const login = async () => {
    try { setBusy(true); setMessage(''); setSession(await signIn(email, password)) }
    catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }
  const save = async () => {
    try {
      setBusy(true); await savePortfolio(settings, projects)
      const fresh = await loadPortfolio(); saved(fresh); setMessage('저장되었습니다.')
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }
  const upload = async (key, file) => {
    try {
      setBusy(true)
      const item = await uploadAsset(key, file, assets[key]?.path)
      setAssets((value) => ({ ...value, [key]: item }))
      setMessage(`${file.name} 업로드 완료`)
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }
  if (!supabaseConfigured) return <div className="admin-shell"><div className="login-card"><Settings size={42}/><h1>Supabase 설정이 필요합니다</h1><p>저장소의 GitHub Secrets에 <code>VITE_SUPABASE_URL</code>과 <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>를 등록하면 관리 화면을 사용할 수 있습니다.</p><button onClick={close}>포트폴리오로 돌아가기</button></div></div>
  if (!session) return <div className="admin-shell"><div className="login-card"><LogIn size={42}/><h1>포트폴리오 관리자</h1><input type="email" placeholder="관리자 이메일" value={email} onChange={(event) => setEmail(event.target.value)}/><input type="password" placeholder="비밀번호" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && login()}/><button disabled={busy} onClick={login}>로그인</button>{message && <p className="error">{message}</p>}<button className="ghost" onClick={close}>돌아가기</button></div></div>

  const updateProject = (index, key, value) => setProjects((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row))
  return <div className="admin-page">
    <aside><div><h2>YOO HYUNJU</h2><p>Portfolio Admin</p></div><button onClick={save}><Save/>전체 저장</button><button onClick={async () => { await signOut(); setSession(null) }}><LogOut/>로그아웃</button><button onClick={close}>사이트 보기</button></aside>
    <main>
      <div className="admin-top"><div><p>SUPABASE ADMINISTRATION</p><h1>포트폴리오 관리</h1></div><button disabled={busy} onClick={save}><Save/>저장</button></div>
      {message && <div className="notice">{message}</div>}
      <section className="admin-panel">
        <h2>메인 콘텐츠</h2>
        <div className="form-stack">
          <label>상단 문구<input value={settings.hero.eyebrow} onChange={(event) => setSettings((value) => ({ ...value, hero: { ...value.hero, eyebrow: event.target.value } }))}/></label>
          <label>메인 제목<textarea rows="3" value={settings.hero.title} onChange={(event) => setSettings((value) => ({ ...value, hero: { ...value.hero, title: event.target.value } }))}/></label>
          <label>소개 문구<textarea rows="4" value={settings.hero.description} onChange={(event) => setSettings((value) => ({ ...value, hero: { ...value.hero, description: event.target.value } }))}/></label>
          <label>ABOUT 제목<input value={settings.about.title} onChange={(event) => setSettings((value) => ({ ...value, about: { ...value.about, title: event.target.value } }))}/></label>
          <label>ABOUT 설명<textarea rows="5" value={settings.about.description} onChange={(event) => setSettings((value) => ({ ...value, about: { ...value.about, description: event.target.value } }))}/></label>
          <label>이메일<input value={settings.contact.email} onChange={(event) => setSettings((value) => ({ ...value, contact: { ...value.contact, email: event.target.value } }))}/></label>
          <label>GitHub 주소<input value={settings.contact.github} onChange={(event) => setSettings((value) => ({ ...value, contact: { ...value.contact, github: event.target.value } }))}/></label>
        </div>
      </section>
      <section className="admin-panel">
        <h2>사진·이력서 교체</h2>
        <div className="upload-grid">
          {[['portrait', '메인 프로필 사진', 'image/*'], ['resume', '이력서', '.pdf,.doc,.docx']].map(([key, label, accept]) => <label className="upload-box" key={key}><Upload/><span><b>{label}</b><small>{assets[key]?.original_name || '파일 선택'}</small></span><input type="file" accept={accept} onChange={(event) => event.target.files?.[0] && upload(key, event.target.files[0])}/></label>)}
        </div>
      </section>
      <section className="admin-panel">
        <div className="panel-title"><h2>프로젝트 관리</h2><button onClick={() => setProjects((rows) => [...rows, { id: crypto.randomUUID(), title: '새 프로젝트', subtitle: '', role: '', stack: '', image: '', href: '' }])}><Plus/>추가</button></div>
        {projects.map((project, index) => <div className="project-edit" key={project.id || index}>
          <b>{String(index + 1).padStart(2, '0')}</b>
          <div className="form-grid">{[['title', '프로젝트명'], ['subtitle', '설명'], ['role', '역할'], ['stack', '기술'], ['image', '이미지 경로'], ['href', '자료 링크']].map(([key, label]) => <label key={key}>{label}<input value={project[key] || ''} onChange={(event) => updateProject(index, key, event.target.value)}/></label>)}</div>
          <button className="danger" onClick={() => setProjects((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}><Trash2/>삭제</button>
        </div>)}
      </section>
    </main>
  </div>
}

function CareAdmin({ close }) {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const refresh = async () => {
    try { setFiles(await listCareFiles()) }
    catch (error) { setMessage(error.message) }
  }
  useEffect(() => {
    currentSession().then((value) => {
      setSession(value)
      if (value) refresh()
    })
  }, [])
  const login = async () => {
    try {
      setBusy(true); setMessage('')
      const value = await signIn(email, password)
      setSession(value); await refresh()
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }
  const upload = async (selected) => {
    if (!selected.length) return
    try {
      setBusy(true); setMessage(`${selected.length}개 파일을 올리는 중입니다.`)
      await uploadCareFiles(selected)
      await refresh(); setMessage('자료 업로드가 완료되었습니다.')
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }
  const openFile = async (name) => {
    try { window.open(await openCareFile(name), '_blank', 'noopener,noreferrer') }
    catch (error) { setMessage(error.message) }
  }
  const removeFile = async (name) => {
    if (!confirm('이 자료를 삭제할까요? 삭제 후에는 복구할 수 없습니다.')) return
    try { setBusy(true); await deleteCareFile(name); await refresh(); setMessage('삭제했습니다.') }
    catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }

  if (!supabaseConfigured) return <div className="admin-shell"><div className="login-card"><ShieldCheck size={42}/><h1>비공개 자료실 설정이 필요합니다</h1><p>Supabase 연결 후 사용할 수 있습니다.</p><button onClick={close}>돌아가기</button></div></div>
  if (!session) return <div className="care-admin-shell"><div className="care-login">
    <ShieldCheck size={46}/><p className="eyebrow">PRIVATE CARE CLASS</p><h1>초등돌봄교실 자료관리</h1><p>관리자만 들어갈 수 있는 비공개 자료실입니다.</p>
    <input type="email" autoComplete="username" placeholder="관리자 이메일" value={email} onChange={(event) => setEmail(event.target.value)}/>
    <input type="password" autoComplete="current-password" placeholder="비밀번호" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && login()}/>
    <button disabled={busy} onClick={login}><LogIn/>로그인</button>{message && <p className="error">{message}</p>}<button className="care-ghost" onClick={close}>공개용 입구로 돌아가기</button>
  </div></div>

  return <div className="care-admin-page">
    <header><div><p>PRIVATE EDUCATION OPERATIONS</p><h1>초등돌봄교실 자료관리</h1></div><div><button onClick={close}>공개용 입구</button><button onClick={async () => { await signOut(); setSession(null) }}><LogOut/>로그아웃</button></div></header>
    <main>
      <section className="care-upload-panel">
        <div><p className="eyebrow">MOBILE UPLOAD</p><h2>휴대폰에서 바로 자료 올리기</h2><p>사진, PDF, 워드, 엑셀 파일을 선택하면 비공개 저장공간에 보관됩니다.</p></div>
        <label className={busy ? 'care-upload-button disabled' : 'care-upload-button'}><Upload/><span>{busy ? '처리 중…' : '파일 선택 및 업로드'}</span><input disabled={busy} multiple type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp" onChange={(event) => { const selected = [...event.target.files]; event.target.value = ''; upload(selected) }}/></label>
      </section>
      {message && <div className="care-message">{message}</div>}
      <section className="care-file-panel">
        <div className="panel-title"><div><p className="eyebrow">PRIVATE FILES</p><h2>내 자료 <small>{files.length}개</small></h2></div><button onClick={refresh}>새로고침</button></div>
        {!files.length ? <div className="care-empty"><Upload/><b>아직 올린 자료가 없습니다.</b><span>위 버튼으로 첫 자료를 올려보세요.</span></div> :
          <div className="care-file-list">{files.map((file) => <article key={file.name}><div><b>{file.name.replace(/^\d+-[0-9a-f-]+-/i, '')}</b><small>{file.metadata?.size ? `${(file.metadata.size / 1024 / 1024).toFixed(1)} MB` : '자료'} · {file.created_at ? new Date(file.created_at).toLocaleDateString('ko-KR') : ''}</small></div><div><button onClick={() => openFile(file.name)}>열기</button><button className="danger" disabled={busy} onClick={() => removeFile(file.name)}><Trash2/>삭제</button></div></article>)}</div>}
      </section>
    </main>
  </div>
}

function App() {
  const [data, setData] = useState({ settings: fallbackSettings, projects: fallbackProjects, assets: fallbackAssets })
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(location.hash === '#/admin')
  const [careAdmin, setCareAdmin] = useState(location.hash === '#/care-admin')
  useEffect(() => { loadPortfolio().then(setData).finally(() => setLoading(false)) }, [])
  useEffect(() => {
    const handler = () => {
      setAdmin(location.hash === '#/admin')
      setCareAdmin(location.hash === '#/care-admin')
    }
    addEventListener('hashchange', handler)
    return () => removeEventListener('hashchange', handler)
  }, [])
  if (loading) return <div className="loading">포트폴리오를 불러오는 중입니다.</div>
  if (careAdmin) return <CareAdmin close={() => { location.href = local('care-class-entrance.html') }}/>
  return admin
    ? <Admin data={data} saved={setData} close={() => { location.hash = ''; setAdmin(false) }}/>
    : <Portfolio data={data} openAdmin={() => { location.hash = '/admin'; setAdmin(true) }}/>
}

createRoot(document.getElementById('root')).render(<App/>)
