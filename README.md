# 유현주 AI Software QA Portfolio

React + Vite로 제작한 포트폴리오입니다. Supabase 설정 전에도 정적 콘텐츠가 정상 표시되며,
설정을 완료하면 `#/admin`에서 소개 문구, 프로젝트, 프로필 사진과 이력서를 관리할 수 있습니다.

## 로컬 실행

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

`.env`에는 본인의 Supabase Project URL과 Publishable Key만 입력하세요. `.env`와
`.env.production`은 Git에 포함되지 않습니다.

## Supabase 설정

1. Supabase 프로젝트를 만듭니다.
2. SQL Editor에서 `supabase/setup.sql`을 실행합니다.
3. Authentication에서 관리자 사용자를 만듭니다.
4. `setup.sql` 마지막의 관리자 등록 SQL에서 이메일을 바꾸어 실행합니다.
5. GitHub 저장소 `Settings → Secrets and variables → Actions`에 아래 Secrets를 등록합니다.
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

## 배포

`main`에 push하면 GitHub Actions가 빌드하고 GitHub Pages에 배포합니다.
관리 화면 주소는 배포 URL 뒤에 `#/admin`을 붙입니다.
