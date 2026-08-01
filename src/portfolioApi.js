import { supabase, supabaseConfigured } from './supabase'

export const STORAGE_BUCKET = 'portfolio-public'
export const CARE_BUCKET = 'care-private'
export const CARE_VIEWER_EMAIL = import.meta.env.VITE_CARE_VIEWER_EMAIL || ''

export const fallbackSettings = {
  hero: {
    eyebrow: 'AI SOFTWARE QA · CLOUD OPERATIONS',
    title: '품질을 확인하고,\n안정적인 운영을 지원합니다',
    description: '기능과 품질을 꼼꼼하게 검증하고 IT 인프라의 상태를 관찰하며, 문제를 빠르게 발견하는 QA 테스터 유현주입니다.',
  },
  about: {
    title: '검증 결과를 근거로 설명하는 QA',
    description: 'RAG 답변 품질평가, AI Agent 기능·성능·운영 모니터링, AWS 웹 서버 구축과 장애복구를 수행했습니다. 테스트 결과를 수치와 증빙으로 남기고 재현 가능한 개선 과정으로 연결합니다.',
  },
  contact: {
    email: 'aa01057559209@gmail.com',
    github: 'https://github.com/dreamguswn-cmd',
  },
}

export const fallbackProjects = [
  { id: 'p1', sort_order: 1, title: 'RAG 챗봇 답변 자동 평가·개선', subtitle: 'Judge Agent 결과를 Correction Agent에 연결한 품질 개선 루프', role: 'QA 설계·평가', stack: 'RAG · LLM Judge', image: 'assets/rag-orange/page-1.webp', href: 'downloads/RAG_챗봇_QA_포트폴리오_오렌지.pdf' },
  { id: 'p2', sort_order: 2, title: 'RAG 챗봇 자동 품질평가', subtitle: 'Two-Stage Evaluation 기반 루브릭·감점 평가 자동화', role: '품질평가', stack: 'TSE · Report', image: 'assets/rag-blue/page-1.webp', href: 'downloads/RAG_챗봇_품질평가_포트폴리오.pdf' },
  { id: 'p3', sort_order: 3, title: 'AI Agent 운영 모니터링', subtitle: '기능·성능·장애·운영 지표를 하나의 검증 흐름으로 통합', role: '테스트·모니터링', stack: 'pytest · k6 · Grafana', image: 'assets/page-1.webp', href: 'portfolio.pdf' },
  { id: 'p4', sort_order: 4, title: 'VOC Improve 멀티 에이전트 QA', subtitle: '6개 Agent와 독립 Judge를 활용한 배포 품질 판정', role: '팀 프로젝트', stack: 'Multi-Agent · Release Gate', image: 'assets/voc-improve-cover.svg', href: 'downloads/VOC_Presentation_v1.8.pptx' },
  { id: 'p5', sort_order: 5, title: 'AI 서비스 품질평가 실습', subtitle: 'Fake Judge·Jupyter·Streamlit 기반 평가 결과 시각화', role: '분석·구현', stack: 'Python · Streamlit', image: 'assets/ai-quality-streamlit.png', href: 'downloads/AI_Service_Quality_Portfolio.pdf' },
  { id: 'p6', sort_order: 6, title: '챗봇 비교 QA 파이프라인', subtitle: 'Rule 기반과 API 기반 응답을 동일 테스트케이스로 비교', role: '검증 자동화', stack: 'Validator · Dashboard', image: 'assets/final_pipeline_dashboard.png', href: 'downloads/기존_AI_QA_Python_포트폴리오.pdf' },
  { id: 'p7', sort_order: 7, title: 'AWS 웹 서버 구축·장애복구', subtitle: 'EC2·Apache·S3·CloudTrail 점검과 장애 재현·복구 검증', role: '클라우드 운영', stack: 'AWS · EC2 · S3', image: 'assets/aws-project/07_웹서버_정상화면.png', href: 'downloads/AWS_VOC_Improve_Team4_Final.zip' },
]

export const fallbackAssets = {
  portrait: { path: null, fallback: 'assets/profile-photo.jpg' },
  resume: { path: null, fallback: 'downloads/Yoo_Hyunju_Resume.pdf' },
}

function fail(error) {
  if (error) throw error
}

export function publicUrl(path) {
  if (!path || !supabaseConfigured) return null
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl
}

export async function loadPortfolio() {
  if (!supabaseConfigured) {
    return { settings: fallbackSettings, projects: fallbackProjects, assets: fallbackAssets }
  }
  const [settings, projects, assets] = await Promise.all([
    supabase.from('site_settings').select('content').eq('id', 1).maybeSingle(),
    supabase.from('projects').select('*').order('sort_order'),
    supabase.from('site_assets').select('*'),
  ])
  fail(settings.error); fail(projects.error); fail(assets.error)
  const assetMap = { ...fallbackAssets }
  for (const item of assets.data || []) assetMap[item.asset_key] = item
  return {
    settings: settings.data?.content || fallbackSettings,
    projects: projects.data?.length ? projects.data : fallbackProjects,
    assets: assetMap,
  }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  fail(error)
  const { data: allowed, error: adminError } = await supabase.rpc('is_admin')
  fail(adminError)
  if (!allowed) {
    await supabase.auth.signOut()
    throw new Error('관리자 권한이 없는 계정입니다.')
  }
  return data.session
}

export async function signInCareViewer(password) {
  if (!CARE_VIEWER_EMAIL) throw new Error('열람용 계정 설정이 필요합니다.')
  const { data, error } = await supabase.auth.signInWithPassword({
    email: CARE_VIEWER_EMAIL,
    password,
  })
  fail(error)
  const { data: allowed, error: accessError } = await supabase.rpc('can_read_care_files')
  fail(accessError)
  if (!allowed) {
    await supabase.auth.signOut()
    throw new Error('자료 열람 권한이 없는 계정입니다.')
  }
  return data.session
}

export async function canReadCareFiles() {
  if (!supabaseConfigured) return false
  const { data, error } = await supabase.rpc('can_read_care_files')
  fail(error)
  return Boolean(data)
}

export async function currentSession() {
  if (!supabaseConfigured) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function currentAdminSession() {
  const session = await currentSession()
  if (!session) return null
  const { data, error } = await supabase.rpc('is_admin')
  fail(error)
  return data ? session : null
}

export async function signOut() {
  if (supabaseConfigured) await supabase.auth.signOut()
}

export async function savePortfolio(settings, projects) {
  const { error: settingError } = await supabase
    .from('site_settings')
    .upsert({ id: 1, content: settings, updated_at: new Date().toISOString() })
  fail(settingError)
  const { error: deleteError } = await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  fail(deleteError)
  if (projects.length) {
    const payload = projects.map((project, index) => ({
      title: project.title, subtitle: project.subtitle, role: project.role,
      stack: project.stack || '', image: project.image || '', href: project.href || '',
      sort_order: index + 1,
    }))
    const { error } = await supabase.from('projects').insert(payload)
    fail(error)
  }
}

export async function saveSettings(settings) {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ id: 1, content: settings, updated_at: new Date().toISOString() })
  fail(error)
}

export async function uploadAsset(assetKey, file, previousPath) {
  const extension = (file.name.split('.').pop() || 'bin').replace(/[^a-z0-9]/gi, '')
  const path = `${assetKey}/${Date.now()}.${extension}`
  const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET)
    .upload(path, file, { contentType: file.type || undefined })
  fail(uploadError)
  const { error: assetError } = await supabase.from('site_assets').upsert({
    asset_key: assetKey, path, original_name: file.name, mime_type: file.type || null,
    updated_at: new Date().toISOString(),
  })
  fail(assetError)
  if (previousPath) await supabase.storage.from(STORAGE_BUCKET).remove([previousPath])
  return { asset_key: assetKey, path, original_name: file.name }
}

export async function listCareFiles() {
  const { data, error } = await supabase.storage.from(CARE_BUCKET)
    .list('uploads', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } })
  fail(error)
  return data || []
}

export async function uploadCareFiles(files) {
  for (const file of files) {
    const safeName = file.name.normalize('NFC').replace(/[^\p{L}\p{N}._()-]+/gu, '_')
    const path = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`
    const { error } = await supabase.storage.from(CARE_BUCKET)
      .upload(path, file, { contentType: file.type || undefined, upsert: false })
    fail(error)
  }
}

export async function openCareFile(name) {
  const { data, error } = await supabase.storage.from(CARE_BUCKET)
    .createSignedUrl(`uploads/${name}`, 60)
  fail(error)
  return data.signedUrl
}

export async function deleteCareFile(name) {
  const { error } = await supabase.storage.from(CARE_BUCKET).remove([`uploads/${name}`])
  fail(error)
}
