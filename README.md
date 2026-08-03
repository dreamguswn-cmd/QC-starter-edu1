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
- [프로젝트별 QA 기록](docs/projects/README.md)
- [AI 음악 제작·사용 안내](docs/audio-content.md)
- [저작권·출처 및 재사용 안내](COPYRIGHT.md)
- [시스템 구조와 공개·비공개 경계](docs/architecture.md)

## QA Summary

| 항목 | 검증 결과 |
|---|---:|
| AWS 개인 과제 테스트 | 5건 |
| 자동화 테스트 통과 | 5 PASS / 0 FAIL |
| 자동화 테스트 통과율 | 100% |
| AWS 개인 과제 품질 평균 | 99점 |
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

- 유형: 팀 프로젝트
- 개인 기여: 테스트 실행, AI 품질 결과 검토, 배포 판정 자료와 최종 증빙 정리
- 검증: 6개 Agent의 VOC 분석 결과를 독립 Judge 기준으로 비교
- 결과: Agent 분석 → 품질평가 → Release Gate로 이어지는 팀 QA 흐름 정리
- 기술: pytest, LLM Judge, Release Gate
- [상세 QA 기록](docs/projects/voc-improve/README.md)

### 2. RAG 챗봇 자동 품질평가 및 답변 개선

- 유형: 개인 프로젝트
- 역할: 평가 기준 설계, AI 응답 평가, 감점 원인 분석, 개선 답변 검증
- 테스트: 이해도·정확성·관련성·표현성 평가와 감점 규칙
- 개선 과정: 평가 JSON을 Correction Agent 입력으로 연결
- 기술: RAG, LLM-as-a-Judge, Two-Stage Evaluation, Correction Agent
- [상세 QA 기록](docs/projects/rag-chatbot-qa/README.md)

### 3. AI Agent 품질관리·운영 모니터링

- 유형: 교육 실습
- 역할: 기능 테스트, 부하 테스트, 지표 설계, 대시보드 모니터링
- 검증: pytest 기능 테스트, k6 성능 테스트, Prometheus 지표 수집
- 결과: 기능·성능·운영 상태를 함께 판단하는 통합 QA 흐름 구축
- 기술: FastAPI, pytest, k6, Prometheus, Grafana
- [상세 QA 기록](docs/projects/ai-monitoring/README.md)

### 4. AWS 웹 서버 장애 재현 및 복구 검증

- 유형: 개인 프로젝트
- 역할: 환경 구축, 시나리오 설계, 장애 재현, 원인 분석, 복구 재테스트, 보안 점검 전 과정 수행
- 결과: 장애 탐지 95점, 장애 복구 100점, S3 보안 설정 100점
- 기술: AWS EC2, Apache, S3, CloudTrail, MFA
- [상세 QA 기록](docs/projects/aws-recovery/README.md)

### 5. Fake Judge 기반 AI 서비스 품질평가

- 유형: 교육 실습
- 역할: 평가 로직 구현, pytest 자동화, 결과 시각화, 판정 보고서 작성
- 검증: 5개 품질 항목과 PASS·FAIL 분기 로직
- 기술: Python, pytest, Jupyter, Streamlit
- [상세 QA 기록](docs/projects/fake-judge/README.md)

## QA Workflow

각 프로젝트를 다음 형식으로 정리했습니다.

1. 테스트 대상과 문제 정의
2. 기대 결과 및 테스트 방법
3. 결함 재현과 원인 분석
4. 개선 조치
5. 동일 조건 재테스트
6. 수치화된 결과와 증빙 기록

## Skills

사이트에서는 교육 프로젝트 수행 근거를 기준으로 각 기술을 10점 만점으로 표시합니다. 점수는 회사 실무 연차가 아니라 직접 실행하고 증빙한 범위를 나타냅니다.

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
- AWS 구축·보안 점검·장애복구 개인 증빙 화면
- pytest 기반 평가 자동화 소스
- 병원명과 개별 근무 기간을 공개하지 않는 지원용 이력서 PDF
- AI Software QA 실무 경력이 없음을 명확히 밝힌 교육·프로젝트 기반 지원 이력서

## Web Sites by Yoo Hyunju

QA 교육 프로젝트 외에 직접 기획하고 구현한 웹사이트입니다.

| 사이트 | 설명 | Live | Repository |
|---|---|---|---|
| 유현주 교육 게임 LAB | 수학·영어·타자 학습 게임 | [사이트](https://dreamguswn-cmd.github.io/play-and-learn/) | [GitHub](https://github.com/dreamguswn-cmd/play-and-learn) |
| 우리 동네 매미 자연학습 | 매미 생태 체험형 학습 사이트 | [사이트](https://dreamguswn-cmd.github.io/maeme/) | [GitHub](https://github.com/dreamguswn-cmd/maeme) |
| 모바일 청첩장 | 모바일 우선 반응형 웹페이지 | [포트폴리오에서 보기](https://dreamguswn-cmd.github.io/QC-starter-edu1/invitation.html) | [GitHub](https://github.com/dreamguswn-cmd/QC-starter-edu1) |
| 초등돌봄교실 자료관리 | 아동 개인정보를 보호하는 비공개 운영 자료관리 시스템 | [공개 소개](https://dreamguswn-cmd.github.io/QC-starter-edu1/care-class-entrance.html) | [GitHub](https://github.com/dreamguswn-cmd/QC-starter-edu1) |

## AI Music Content

포트폴리오의 전문적인 분위기와 QA 용어 학습을 위해 생성형 AI 음악 콘텐츠를 직접 기획·제작했습니다.

| 콘텐츠 | 용도 | 재생 방식 | 파일 |
|---|---|---|---|
| Quality in Motion | 포트폴리오 메인 BGM | 방문자가 직접 재생, 낮은 음량으로 반복 | [`public/audio/quality-in-motion-bgm.mp3`](public/audio/quality-in-motion-bgm.mp3) |
| QA 용어 학습 노래 | QA 전문용어를 쉽게 설명하는 부가 학습 콘텐츠 | 페이지 하단에서 직접 재생, 1회 재생 | [`public/audio/qa-terms-learning-song.mp3`](public/audio/qa-terms-learning-song.mp3) |

- 두 음악은 동시에 재생되지 않습니다.
- 자동재생을 사용하지 않아 방문자의 선택과 열람 집중도를 우선합니다.
- [기획 목적과 재생 정책](docs/audio-content.md)

## Copyright & Reuse

- AI 음악은 Suno 유료 요금제 이용 기간에 생성했으며, 제작 과정과 사용 범위를 문서에 명시했습니다.
- 팀 프로젝트는 팀 과제 여부와 유현주의 개인 기여를 구분해 기록했습니다.
- 이미지, 프로젝트 증빙, 오픈소스와 글꼴의 권리 기준은 [저작권 및 출처 안내](COPYRIGHT.md)에서 확인할 수 있습니다.
- 이 저장소에는 별도의 오픈소스 라이선스를 부여하지 않았습니다. 포트폴리오 콘텐츠를 재사용하려면 저장소 소유자의 허락이 필요합니다.

## Project Structure

```text
src/
├─ PortfolioV2.jsx       # 공개 포트폴리오 화면과 콘텐츠
├─ portfolio-v2.css      # QA 포트폴리오 공통 디자인
├─ copyright-notice.css  # 음악 제작·권리 안내 표시
├─ hero-profile-v3.css   # 첫 화면 프로필 카드
├─ education-sites.css   # 교육 및 직접 만든 사이트 섹션
├─ portfolioApi.js       # 포트폴리오 데이터와 Supabase 연동
└─ main.jsx              # 앱 진입점과 관리자 화면

public/
├─ assets/               # 프로젝트 이미지와 증빙 화면
├─ audio/                # 메인 BGM과 QA 용어 학습 노래
└─ downloads/            # 이력서와 프로젝트 결과물

docs/
├─ qa/                   # 테스트·결함·결과·증빙 문서
├─ projects/             # 프로젝트별 문제·테스트·개선 기록
├─ audio-content.md      # AI 음악 제작 및 재생 정책
└─ architecture.md       # 공개 화면과 관리자 구조

.github/
├─ workflows/            # GitHub Pages 자동 배포
├─ ISSUE_TEMPLATE/       # 재현 가능한 결함 보고 양식
└─ pull_request_template.md

COPYRIGHT.md             # 저작권·출처 및 재사용 기준
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
