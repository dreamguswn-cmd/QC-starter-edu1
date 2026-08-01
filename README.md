# 유현주 | AI Software QA Engineer Portfolio

기능 테스트부터 AI 응답 품질평가, 성능 검증, 모니터링과 장애복구까지 수행한 QA 과정과 결과를 정리한 취업용 포트폴리오입니다.

테스트 결과를 수치와 증빙으로 기록하고, 발견된 문제를 재현 가능한 개선 과정으로 연결합니다.

## Portfolio

- 공개 사이트: <https://dreamguswn-cmd.github.io/QC-starter-edu1/>
- GitHub: <https://github.com/dreamguswn-cmd>
- 지원 직무: AI Software QA Engineer

## Quick Navigation

- [QA 목표와 범위](docs/qa/README.md)
- [테스트 케이스](docs/qa/test-cases.md)
- [품질 발견사항과 개선 기록](docs/qa/quality-findings.md)
- [테스트 결과](docs/qa/test-results.md)
- [QA 증빙 색인](docs/qa/evidence-index.md)
- [시스템 구조와 공개·비공개 경계](docs/architecture.md)

## QA Summary

| 항목 | 검증 결과 |
|---|---:|
| VOC/AWS 자동화 테스트 | 5건 |
| 자동화 테스트 통과 | 5 PASS / 0 FAIL |
| 자동화 테스트 통과율 | 100% |
| VOC/AWS 품질 평균 | 99점 |
| 대표 QA 프로젝트 | 5개 |

> 위 수치는 저장소에 포함된 실제 테스트 결과와 제출 보고서에서 확인한 값만 사용했습니다.

## Education & Training

**대우능력개발원**<br>
AI 기반 소프트웨어 테스터(QA) 및 모니터링 실무 과정<br>
2026.05.27 – 2026.08.07 · 수강 중

교육 과정에서 다음 실습과 프로젝트를 수행했습니다.

- 기능·API·회귀 테스트와 테스트 케이스 작성
- pytest 테스트 자동화
- AI 응답 품질평가 및 RAG 검증
- k6 성능 테스트
- Prometheus·Grafana 모니터링
- AWS 보안 점검과 장애 재현·복구
- 테스트 결과 보고와 증빙 관리

## Selected QA Projects

### 1. VOC Improve 멀티 에이전트 QA

- 역할: 테스트 실행, AWS 운영 검증, 장애 재현·복구, 결과 증빙
- 테스트: EC2 상태, 웹 서비스, 장애 탐지, 장애 복구, S3 보안
- 결과: 5 PASS / 0 FAIL, 품질 평균 99점
- 개선 과정: Apache 중지로 장애 재현 → 원인 확인 → 재시작 → 정상 접속 재검증
- 기술: pytest, LLM Judge, AWS EC2, S3, CloudTrail

### 2. RAG 챗봇 자동 품질평가 및 답변 개선

- 역할: 평가 기준 설계, AI 응답 평가, 감점 원인 분석, 개선 답변 검증
- 테스트: 이해도·정확성·관련성·표현성 평가와 감점 규칙
- 개선 과정: 평가 JSON을 Correction Agent 입력으로 연결
- 기술: RAG, LLM-as-a-Judge, Two-Stage Evaluation, Correction Agent

### 3. AI Agent 품질관리·운영 모니터링

- 역할: 기능 테스트, 부하 테스트, 지표 설계, 대시보드 모니터링
- 검증: pytest 기능 테스트, k6 성능 테스트, Prometheus 지표 수집
- 결과: 기능·성능·운영 상태를 함께 판단하는 통합 QA 흐름 구축
- 기술: FastAPI, pytest, k6, Prometheus, Grafana

### 4. AWS 웹 서버 장애 재현 및 복구 검증

- 역할: 환경 점검, 보안 설정 확인, 장애 시나리오 실행, 복구 재테스트
- 결과: 장애 탐지 95점, 장애 복구 100점, S3 보안 설정 100점
- 기술: AWS EC2, Apache, S3, CloudTrail, MFA

### 5. Fake Judge 기반 AI 서비스 품질평가

- 역할: 평가 로직 구현, pytest 자동화, 결과 시각화, 판정 보고서 작성
- 검증: 5개 품질 항목과 PASS·FAIL 분기 로직
- 기술: Python, pytest, Jupyter, Streamlit

## QA Workflow

각 프로젝트를 다음 형식으로 정리했습니다.

1. 테스트 대상과 문제 정의
2. 기대 결과 및 테스트 방법
3. 결함 재현과 원인 분석
4. 개선 조치
5. 동일 조건 재테스트
6. 수치화된 결과와 증빙 기록

## Skills

| 구분 | 기술 및 역량 |
|---|---|
| Testing | Test Case Design, Functional, Regression, API Testing |
| AI Quality | RAG, Prompt Evaluation, LLM-as-a-Judge |
| Automation | pytest, GitHub Actions |
| Performance | k6 |
| Monitoring | Prometheus, Grafana |
| Cloud & Operations | AWS EC2, S3, CloudTrail, Docker |
| Language & Version Control | Python, Git, GitHub |

## Evidence & Downloads

포트폴리오의 `증빙 보기`와 `상세 자료` 버튼을 통해 다음 자료를 확인할 수 있습니다.

- 테스트 및 품질 결과 보고서
- 프로젝트 발표 자료
- AI 응답 품질평가 포트폴리오
- AWS 구축·보안 점검·장애복구 결과물
- pytest 기반 평가 자동화 소스
- 이력서 PDF

## Web Sites by Yoo Hyunju

QA 교육 프로젝트 외에 직접 기획하고 구현한 웹사이트입니다.

| 사이트 | 설명 | Live | Repository |
|---|---|---|---|
| 유현주 교육 게임 LAB | 수학·영어·타자 학습 게임 | [사이트](https://dreamguswn-cmd.github.io/play-and-learn/) | [GitHub](https://github.com/dreamguswn-cmd/play-and-learn) |
| 우리 동네 매미 자연학습 | 매미 생태 체험형 학습 사이트 | [사이트](https://dreamguswn-cmd.github.io/maeme/) | [GitHub](https://github.com/dreamguswn-cmd/maeme) |
| 모바일 청첩장 | 모바일 우선 반응형 웹페이지 | [포트폴리오에서 보기](https://dreamguswn-cmd.github.io/QC-starter-edu1/invitation.html) | [GitHub](https://github.com/dreamguswn-cmd/QC-starter-edu1) |
| 초등돌봄교실 자료관리 | 아동 개인정보를 보호하는 비공개 운영 자료관리 시스템 | [공개 소개](https://dreamguswn-cmd.github.io/QC-starter-edu1/care-class-entrance.html) | [GitHub](https://github.com/dreamguswn-cmd/QC-starter-edu1) |

## Project Structure

```text
src/
├─ PortfolioV2.jsx       # 공개 포트폴리오 화면과 콘텐츠
├─ portfolio-v2.css      # QA 포트폴리오 공통 디자인
├─ hero-profile-v3.css   # 첫 화면 프로필 카드
├─ education-sites.css   # 교육 및 직접 만든 사이트 섹션
├─ portfolioApi.js       # 포트폴리오 데이터와 Supabase 연동
└─ main.jsx              # 앱 진입점과 관리자 화면

public/
├─ assets/               # 프로젝트 이미지와 증빙 화면
└─ downloads/            # 이력서와 프로젝트 결과물

docs/
├─ qa/                   # 테스트·결함·결과·증빙 문서
└─ architecture.md       # 공개 화면과 관리자 구조

.github/
├─ workflows/            # GitHub Pages 자동 배포
├─ ISSUE_TEMPLATE/       # 재현 가능한 결함 보고 양식
└─ pull_request_template.md
```

## Local Development

Node.js와 pnpm을 준비한 뒤 다음 명령을 실행합니다.

```bash
pnpm install
pnpm run dev
```

프로덕션 빌드:

```bash
pnpm run build
```

## Deployment

GitHub Actions의 `.github/workflows/deploy.yml`이 Vite 프로젝트를 빌드하고 GitHub Pages에 배포합니다.

## Contact

- Email: <aa01057559209@gmail.com>
- GitHub: <https://github.com/dreamguswn-cmd>
