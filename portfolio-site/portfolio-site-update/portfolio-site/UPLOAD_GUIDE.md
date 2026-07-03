# 포트폴리오 업데이트 업로드 가이드
대상: `github.com/dreamguswn-cmd/QC-starter-edu1` → `portfolio-site/` 폴더

## 이번 업데이트 내용
1. **`index.html` 교체** — PROJECT 07 카드 추가 (기존 내용은 그대로 유지, 두 곳만 변경)
   - 히어로 상태 칩에 `PROJECT_07 · Rule vs API 비교 QA · PASS` 추가
   - PROJECT 06 카드 뒤에 `PROJECT 07 · TEAM FINAL` 카드 삽입 (기존 CSS 클래스만 사용 — style.css 수정 불필요)
2. **`assets/final_pipeline_dashboard.png` 추가** — 최종 비교 대시보드 캡처 (PROJECT 07 카드에서 사용)

## 방법 A. GitHub 웹에서 업로드 (가장 간단)
1. 저장소 → `portfolio-site` 폴더로 이동
2. `index.html` 클릭 → 연필(Edit) 아이콘 → 전체 선택·삭제 후 새 `index.html` 내용 붙여넣기 → **Commit changes**
   - 커밋 메시지 예: `feat: PROJECT 07 파이널 프로젝트(Rule vs API 비교 QA) 추가`
3. `portfolio-site/assets` 폴더로 이동 → **Add file > Upload files** → `final_pipeline_dashboard.png` 드래그 → Commit

## 방법 B. git 명령어
```bash
git clone https://github.com/dreamguswn-cmd/QC-starter-edu1.git
cd QC-starter-edu1
# 받은 파일 2개를 덮어쓰기/추가
cp /경로/index.html portfolio-site/index.html
cp /경로/final_pipeline_dashboard.png portfolio-site/assets/
git add portfolio-site/index.html portfolio-site/assets/final_pipeline_dashboard.png
git commit -m "feat: PROJECT 07 파이널 프로젝트(Rule vs API 비교 QA) 추가"
git push origin main
```

## 업로드 후 확인
- GitHub Pages를 쓰고 있다면 반영까지 1~2분 소요
- 확인 포인트 3곳:
  1. 히어로 하단 칩에 PROJECT_07 표시
  2. 프로젝트 섹션 맨 아래에 PROJECT 07 카드 (featured 스타일 — PROJECT 01과 같은 강조 테두리)
  3. 카드 내 대시보드 스크린샷 정상 로드 (안 보이면 assets 경로/파일명 확인: `assets/final_pipeline_dashboard.png`)

## 선택 사항
- PROJECT 07을 더 위(예: PROJECT 01 바로 뒤)로 올리고 싶으면 `<article ... id="project-rule-vs-api">` ~ `</article>` 블록을 통째로 잘라 원하는 위치에 붙여넣으면 됩니다. 클래스는 전부 기존 style.css 기준이라 위치 이동만으로 동작합니다.
- PROJECT 05 카드와 서사가 이어집니다(05: 검증기 오탐 발견 → 07: 재설계로 해결 + 비교 실험 확장). 자기소개(About)의 TEAM 항목을 "파이널 4인 팀 · 발표/시연 총괄"로 갱신하는 것도 추천합니다.
