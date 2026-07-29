import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, Award, CheckCircle2, Cloud, Download, Gauge, Github, LogIn,
  LogOut, Mail, Menu, Plus, Save, Settings, ShieldCheck, Trash2, Upload, X
} from 'lucide-react'
import './styles.css'
import {
  currentSession, fallbackAssets, fallbackProjects, fallbackSettings, loadPortfolio,
  publicUrl, savePortfolio, signIn, signOut, uploadAsset
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
  return <>
    <header className="site-header">
      <a className="brand" href="#home"><b>YOO <i>HYUNJU</i></b><small>AI Software QA Portfolio</small></a>
      <nav className={menu ? 'open' : ''}>
        {['HOME', 'ABOUT', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item) =>
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}
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
        </div>
      </section>

      <section id="skills">
        <p className="eyebrow">CORE CAPABILITIES</p><h2>품질과 운영을 연결하는 역량</h2>
        <div className="skills">{skills.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
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

function App() {
  const [data, setData] = useState({ settings: fallbackSettings, projects: fallbackProjects, assets: fallbackAssets })
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(location.hash === '#/admin')
  useEffect(() => { loadPortfolio().then(setData).finally(() => setLoading(false)) }, [])
  useEffect(() => {
    const handler = () => setAdmin(location.hash === '#/admin')
    addEventListener('hashchange', handler)
    return () => removeEventListener('hashchange', handler)
  }, [])
  if (loading) return <div className="loading">포트폴리오를 불러오는 중입니다.</div>
  return admin
    ? <Admin data={data} saved={setData} close={() => { location.hash = ''; setAdmin(false) }}/>
    : <Portfolio data={data} openAdmin={() => { location.hash = '/admin'; setAdmin(true) }}/>
}

createRoot(document.getElementById('root')).render(<App/>)
