import React, { useEffect, useState } from 'react'
import { ArrowLeft, LogIn, LogOut, Plus, Save, Trash2, Upload } from 'lucide-react'
import { currentAdminSession, loadPortfolio, saveSettings, signIn, signOut, uploadAsset, uploadCareFiles } from './portfolioApi'
import { supabaseConfigured } from './supabase'
import { portfolioV2Defaults, qaProjects } from './PortfolioV2'

const clone = (value) => structuredClone(value)
const lines = (value) => (value || []).join('\n')
const fromLines = (value) => value.split('\n').map((item) => item.trim()).filter(Boolean)
const metricsText = (items) => (items || []).map(([label, value]) => `${label} = ${value}`).join('\n')
const fromMetrics = (value) => fromLines(value).map((row) => {
  const [label, ...rest] = row.split('=')
  return [label.trim(), rest.join('=').trim()]
}).filter(([label, value]) => label && value)

function Field({ label, children }) {
  return <label className="admin-v2-field"><span>{label}</span>{children}</label>
}

export default function AdminV2({ data, close, saved }) {
  const [session, setSession] = useState(undefined)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [settings, setSettings] = useState(clone(data.settings))
  const [assets, setAssets] = useState({ ...data.assets })
  const stored = data.settings?.v2 || {}
  const [content, setContent] = useState(clone({
    ...portfolioV2Defaults,
    ...stored,
    hero: { ...portfolioV2Defaults.hero, ...stored.hero },
    about: {
      ...portfolioV2Defaults.about,
      ...stored.about,
      title: stored.copyRevision >= 3 && stored.about?.title
        ? stored.about.title
        : portfolioV2Defaults.about.title,
    },
    education: { ...portfolioV2Defaults.education, ...stored.education },
    achievements: stored.copyRevision >= 2 && stored.achievements?.length ? stored.achievements : portfolioV2Defaults.achievements,
    projects: stored.projects?.length ? stored.projects.map((project) => {
      const revised = qaProjects.find((item) => item.id === project.id)
      return stored.copyRevision >= 2 || !revised ? project : { ...project, role: revised.role }
    }) : portfolioV2Defaults.projects,
    capabilities: stored.capabilities?.length ? stored.capabilities : portfolioV2Defaults.capabilities,
    sites: stored.sites?.length ? stored.sites : portfolioV2Defaults.sites,
  }))

  useEffect(() => { currentAdminSession().then(setSession).catch(() => setSession(null)) }, [])

  const login = async () => {
    try {
      setBusy(true); setMessage('')
      setSession(await signIn(email, password))
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }

  const save = async () => {
    try {
      setBusy(true); setMessage('')
      const nextSettings = { ...settings, v2: content }
      await saveSettings(nextSettings)
      const fresh = await loadPortfolio()
      setSettings(clone(fresh.settings)); saved(fresh)
      setMessage('공개 포트폴리오 내용이 저장되었습니다.')
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }

  const upload = async (key, file) => {
    try {
      setBusy(true); setMessage('')
      const item = await uploadAsset(key, file, assets[key]?.path)
      setAssets((current) => ({ ...current, [key]: item }))
      const fresh = await loadPortfolio(); saved(fresh)
      setMessage(`${file.name} 업로드를 완료했습니다.`)
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }

  const uploadCare = async (selected) => {
    if (!selected.length) return
    try {
      setBusy(true); setMessage(`${selected.length}개 초등돌봄 자료를 보호 저장소에 올리는 중입니다.`)
      await uploadCareFiles(selected)
      setMessage(`${selected.length}개 초등돌봄 자료 업로드를 완료했습니다. 자료 열람은 보호 화면에서만 가능합니다.`)
    } catch (error) { setMessage(error.message) } finally { setBusy(false) }
  }

  const setSection = (section, key, value) => setContent((current) => ({ ...current, [section]: { ...current[section], [key]: value } }))
  const setAchievement = (index, key, value) => setContent((current) => ({ ...current, achievements: current.achievements.map((item, i) => i === index ? { ...item, [key]: value } : item) }))
  const setProject = (index, key, value) => setContent((current) => ({ ...current, projects: current.projects.map((item, i) => i === index ? { ...item, [key]: value } : item) }))
  const setSite = (index, key, value) => setContent((current) => ({ ...current, sites: current.sites.map((item, i) => i === index ? { ...item, [key]: value } : item) }))
  const setCapability = (index, key, value) => setContent((current) => ({ ...current, capabilities: current.capabilities.map((item, i) => i === index ? item.map((cell, j) => j === key ? value : cell) : item) }))

  if (!supabaseConfigured) return <div className="admin-v2-login"><div><h1>관리자 설정이 필요합니다</h1><p>Supabase 연결 후 관리자 화면을 사용할 수 있습니다.</p><button onClick={close}><ArrowLeft/> 포트폴리오로 돌아가기</button></div></div>
  if (session === undefined) return <div className="admin-v2-loading">관리자 정보를 확인하고 있습니다.</div>
  if (!session) return <div className="admin-v2-login"><div><p>PORTFOLIO ADMIN</p><h1>유현주 QA 포트폴리오 관리</h1><input type="email" placeholder="관리자 이메일" value={email} onChange={(event) => setEmail(event.target.value)}/><input type="password" placeholder="비밀번호" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && login()}/><button disabled={busy} onClick={login}><LogIn/> 로그인</button>{message && <span>{message}</span>}<button className="ghost" onClick={close}><ArrowLeft/> 공개 포트폴리오</button></div></div>

  return <div className="admin-v2">
    <button className="admin-v2-care-shortcut" onClick={() => { location.hash = '/care-admin' }}>보호 자료 열람</button>
    <header><div><p>AI SOFTWARE QA PORTFOLIO</p><h1>콘텐츠 관리자</h1></div><div><button className="ghost" onClick={close}><ArrowLeft/> 공개 화면</button><button disabled={busy} onClick={save}><Save/> 전체 저장</button><button className="ghost" onClick={async () => { await signOut(); setSession(null) }}><LogOut/> 로그아웃</button></div></header>
    {message && <div className="admin-v2-message">{message}</div>}
    <main>
      <section><div className="section-title"><span>01</span><div><h2>첫 화면</h2><p>사진 옆에 표시되는 이름, 지원 직무와 소개를 수정합니다.</p></div></div><div className="admin-v2-grid">
        <Field label="이름"><input value={content.hero.name} onChange={(event) => setSection('hero', 'name', event.target.value)}/></Field>
        <Field label="지원 직무"><input value={content.hero.role} onChange={(event) => setSection('hero', 'role', event.target.value)}/></Field>
        <Field label="상단 영문 문구"><input value={content.hero.eyebrow} onChange={(event) => setSection('hero', 'eyebrow', event.target.value)}/></Field>
        <Field label="핵심 소개"><textarea rows="3" value={content.hero.summary} onChange={(event) => setSection('hero', 'summary', event.target.value)}/></Field>
        <Field label="증빙 소개"><textarea rows="3" value={content.hero.evidence} onChange={(event) => setSection('hero', 'evidence', event.target.value)}/></Field>
      </div><div className="admin-v2-upload-row">
        {[['portrait', '프로필 사진', 'image/*'], ['resume', '이력서', '.pdf,.doc,.docx']].map(([key, label, accept]) => <label key={key}><Upload/><span><b>{label}</b><small>{assets[key]?.original_name || '파일 선택'}</small></span><input type="file" accept={accept} onChange={(event) => event.target.files?.[0] && upload(key, event.target.files[0])}/></label>)}
      </div></section>

      <section><div className="section-title"><span>02</span><div><h2>자기소개와 연락처</h2><p>소개 문장과 연락 정보를 관리합니다.</p></div></div><div className="admin-v2-grid">
        <Field label="소개 제목"><textarea rows="2" value={content.about.title} onChange={(event) => setSection('about', 'title', event.target.value)}/></Field>
        <Field label="소개 본문 (문단마다 줄바꿈)"><textarea rows="5" value={lines(content.about.paragraphs)} onChange={(event) => setSection('about', 'paragraphs', fromLines(event.target.value))}/></Field>
        <Field label="이메일"><input value={settings.contact?.email || ''} onChange={(event) => setSettings((current) => ({ ...current, contact: { ...current.contact, email: event.target.value } }))}/></Field>
        <Field label="GitHub 주소"><input value={settings.contact?.github || ''} onChange={(event) => setSettings((current) => ({ ...current, contact: { ...current.contact, github: event.target.value } }))}/></Field>
      </div></section>

      <section><div className="section-title"><span>03</span><div><h2>교육 과정</h2><p>대우능력개발원 교육 정보와 학습 항목을 수정합니다.</p></div></div><div className="admin-v2-grid">
        {['institution','course','period','status','description'].map((key) => <Field key={key} label={{institution:'교육기관',course:'과정명',period:'교육 기간',status:'상태',description:'교육 설명'}[key]}>{key === 'description' ? <textarea rows="3" value={content.education[key]} onChange={(event) => setSection('education', key, event.target.value)}/> : <input value={content.education[key]} onChange={(event) => setSection('education', key, event.target.value)}/>}</Field>)}
        <Field label="학습 항목 (한 줄에 하나)"><textarea rows="7" value={lines(content.education.topics)} onChange={(event) => setSection('education', 'topics', fromLines(event.target.value))}/></Field>
      </div></section>

      <section><div className="section-title"><span>04</span><div><h2>QA 성과</h2><p>첫 화면 아래 성과 카드의 숫자와 설명을 수정합니다.</p></div></div><div className="admin-v2-repeat small">{content.achievements.map((item, index) => <article key={index}><b>성과 {index + 1}</b><Field label="수치"><input value={item.value} onChange={(event) => setAchievement(index, 'value', event.target.value)}/></Field><Field label="설명"><input value={item.label} onChange={(event) => setAchievement(index, 'label', event.target.value)}/></Field></article>)}</div></section>

      <section><div className="section-title"><span>05</span><div><h2>대표 QA 프로젝트</h2><p>프로젝트별 역할, 수치, 문제와 개선 결과를 관리합니다.</p></div></div><div className="admin-v2-repeat projects">{content.projects.map((project, index) => <article key={project.id || index}><div className="repeat-title"><b>{String(index + 1).padStart(2, '0')} · {project.title}</b><button onClick={() => setContent((current) => ({ ...current, projects: current.projects.filter((_, i) => i !== index) }))}><Trash2/> 삭제</button></div><div className="admin-v2-grid">
        <Field label="프로젝트명"><input value={project.title} onChange={(event) => setProject(index, 'title', event.target.value)}/></Field><Field label="분류"><input value={project.label} onChange={(event) => setProject(index, 'label', event.target.value)}/></Field><Field label="요약"><textarea rows="3" value={project.summary} onChange={(event) => setProject(index, 'summary', event.target.value)}/></Field><Field label="개인 기여"><textarea rows="2" value={project.role} onChange={(event) => setProject(index, 'role', event.target.value)}/></Field><Field label="성과 수치 (항목 = 값)"><textarea rows="5" value={metricsText(project.metrics)} onChange={(event) => setProject(index, 'metrics', fromMetrics(event.target.value))}/></Field><Field label="기술 태그 (쉼표 구분)"><textarea rows="2" value={(project.tags || []).join(', ')} onChange={(event) => setProject(index, 'tags', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))}/></Field><Field label="문제 정의"><textarea rows="3" value={project.issue} onChange={(event) => setProject(index, 'issue', event.target.value)}/></Field><Field label="개선 및 재검증"><textarea rows="3" value={project.action} onChange={(event) => setProject(index, 'action', event.target.value)}/></Field><Field label="결과"><textarea rows="2" value={project.result} onChange={(event) => setProject(index, 'result', event.target.value)}/></Field><Field label="대표 이미지 경로"><input value={project.image} onChange={(event) => setProject(index, 'image', event.target.value)}/></Field><Field label="증빙 링크"><input value={project.evidence} onChange={(event) => setProject(index, 'evidence', event.target.value)}/></Field><Field label="상세 자료 링크"><input value={project.detail} onChange={(event) => setProject(index, 'detail', event.target.value)}/></Field>
      </div></article>)}<button className="admin-v2-add" onClick={() => setContent((current) => ({ ...current, projects: [...current.projects, { id: crypto.randomUUID(), number: String(current.projects.length + 1).padStart(2, '0'), label: 'QA PROJECT', title: '새 프로젝트', summary: '', role: '', metrics: [], tags: [], issue: '', action: '', result: '', image: 'assets/page-1.webp', evidence: '', detail: '' }] }))}><Plus/> 프로젝트 추가</button></div></section>

      <section><div className="section-title"><span>06</span><div><h2>기술 역량</h2><p>QA 기술 분류와 설명을 수정합니다.</p></div></div><div className="admin-v2-repeat small">{content.capabilities.map(([title, text], index) => <article key={index}><b>역량 {index + 1}</b><Field label="분류"><input value={title} onChange={(event) => setCapability(index, 0, event.target.value)}/></Field><Field label="기술"><textarea rows="2" value={text} onChange={(event) => setCapability(index, 1, event.target.value)}/></Field></article>)}</div></section>

      <section><div className="section-title"><span>07</span><div><h2>직접 만든 사이트</h2><p>마지막 사이트 카드의 설명과 연결 주소를 관리합니다.</p></div></div><div className="admin-v2-repeat projects">{content.sites.map((site, index) => <article key={index}><div className="repeat-title"><b>{site.title}</b><button onClick={() => setContent((current) => ({ ...current, sites: current.sites.filter((_, i) => i !== index) }))}><Trash2/> 삭제</button></div><div className="admin-v2-grid">{['title','category','summary','image','live','github'].map((key) => <Field key={key} label={{title:'사이트명',category:'분류',summary:'설명',image:'대표 이미지',live:'공개 주소',github:'GitHub 주소'}[key]}>{key === 'summary' ? <textarea rows="3" value={site[key]} onChange={(event) => setSite(index, key, event.target.value)}/> : <input value={site[key]} onChange={(event) => setSite(index, key, event.target.value)}/>}</Field>)}</div></article>)}<button className="admin-v2-add" onClick={() => setContent((current) => ({ ...current, sites: [...current.sites, { title: '새 사이트', category: 'WEB SITE', summary: '', image: 'assets/page-1.webp', live: '', github: '' }] }))}><Plus/> 사이트 추가</button></div></section>
      <section className="admin-v2-care-upload"><div className="section-title"><span>08</span><div><h2>초등돌봄 자료 업로드</h2><p>관리자 화면에서는 자료를 올릴 수 있고, 파일 목록과 내용 열람은 보호된 화면에서만 가능합니다.</p></div></div><label><Upload/><span><b>{busy ? '업로드 처리 중' : '초등돌봄 자료 선택'}</b><small>사진, PDF, 문서, 엑셀, 프레젠테이션 파일을 여러 개 선택할 수 있습니다.</small></span><input disabled={busy} multiple type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp" onChange={(event) => { const selected = [...event.target.files]; event.target.value = ''; uploadCare(selected) }}/></label><button className="care-view-button" onClick={() => { location.hash = '/care-admin' }}>비밀번호 보호 자료 열람</button></section>
    </main>
    <div className="admin-v2-savebar"><span>{message || '수정 후 전체 저장 버튼을 눌러주세요.'}</span><button disabled={busy} onClick={save}><Save/> {busy ? '저장 중' : '전체 저장'}</button></div>
  </div>
}
