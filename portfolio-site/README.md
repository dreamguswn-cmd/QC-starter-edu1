# AI QA & Python Portfolio

AI 기반 소프트웨어 품질관리 과정에서 직접 구현한 프로젝트를 정리한 포트폴리오입니다.

🔗 **웹사이트**: https://<your-username>.github.io/<repo-name>/
📄 **PDF**: [portfolio.pdf](./portfolio.pdf)

## 담긴 내용

- **자기소개** — Python / AI QA / 웹 개발 학습 배경, 4인 팀 RAG QA 프로젝트 협업 경험
- **Project 01** — RAG 챗봇 자동 품질평가 & 답변 개선 시스템 (Judge Agent + Correction Agent, 개인 프로젝트)
- **Project 02** — BERTScore 기반 AI 답변 품질 평가 시스템 (Python, bert-score, pandas)
- **Project 03** — 기준 모델 기반 BERTScore 회귀 평가 (모델 교체 전 배포 안정성 점검)
- **Project 04** — Routing Classifier 기반 AI Agent 자동 분류 품질평가 (scikit-learn, Confusion Matrix)
- **Project 05** — 모바일 청첩장 웹페이지 (HTML/CSS/JS, 반응형 UI)
- **보유 기술** — Python · AI QA (RAG/LLM-as-a-Judge/회귀테스트/scikit-learn 포함) · Web
- **목표** — LLM 기반 AI 서비스를 평가하는 AI QA 엔지니어로 성장

## 로컬에서 보기

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## GitHub Pages로 배포하기

1. 이 저장소를 GitHub에 push 합니다.
2. **Settings → Pages** 로 이동합니다.
3. **Source**를 `Deploy from a branch`로 설정하고, 브랜치는 `main`, 폴더는 `/ (root)`를 선택합니다.
4. 잠시 후 `https://<your-username>.github.io/<repo-name>/` 에서 확인할 수 있습니다.

## 파일 구조

```
.
├── index.html        # 메인 페이지
├── style.css         # 스타일 (오렌지 테마)
├── script.js         # 스크롤 인터랙션
├── portfolio.pdf     # 제출용 PDF 버전
└── README.md
```

## 기술 스택

`HTML5` `CSS3` `JavaScript` — 외부 프레임워크 없이 순수 웹 기술로 제작했습니다.
