# QC-starter-edu1 GitHub Pages 업데이트 파일

이 폴더의 `docs/` 내용을 GitHub 저장소 `dreamguswn-cmd/QC-starter-edu1`에 업로드하면 교육 포트폴리오 사이트로 사용할 수 있습니다.

## 업로드 방법

1. 이 ZIP을 압축 해제합니다.
2. GitHub 저장소 `QC-starter-edu1`에 접속합니다.
3. 저장소 루트에 `docs/` 폴더를 업로드합니다.
4. GitHub > Settings > Pages에서 Source를 `Deploy from a branch`, Branch를 `main`, Folder를 `/docs`로 설정합니다.
5. 사이트 주소에서 `index.html`이 첫 화면으로 열리는지 확인합니다.

## 포함 파일

- `docs/index.html` : 포트폴리오 메인 페이지
- `docs/day6-fault-scenario.html` : 어제 교육자료 기반 장애 시나리오 실습 페이지
- `docs/education-10days.html` : 10일 교육과정 정리 페이지
- `docs/assets/style.css` : 사이트 디자인 CSS

## Git 명령어 예시

```bash
git clone https://github.com/dreamguswn-cmd/QC-starter-edu1.git
cd QC-starter-edu1
cp -r ../github_site_update_QC-starter-edu1/docs ./docs
git add docs
git commit -m "Update GitHub Pages portfolio site"
git push origin main
```
