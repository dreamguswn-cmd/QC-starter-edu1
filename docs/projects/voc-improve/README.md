# VOC Improve × AWS 결과관리·운영감사 QA

## 프로젝트 정보

- 유형: 4팀 공동 최종 프로젝트
- 개인 기여: 테스트 실행, AI 품질 결과 검토, 단계형 AWS CLI 결과관리, S3 보안·무결성 및 CloudTrail 감사 확인, 배포 판정 자료와 최종 증빙 정리
- 기술: pytest, OpenAI LLM Judge, AWS CLI, S3, CloudTrail, SHA-256, Release Gate

## 문제 정의

기능 자동화의 성공과 AI 응답 품질의 충족 여부를 분리해서 판단해야 했습니다. 또한 로컬에서 생성한 QA 결과물을 AWS에 안전하게 저장하고, 파일이 변조되지 않았는지 검증하며, 작업 이력을 감사한 뒤 지속 노출과 과금 없이 삭제해야 했습니다.

## 테스트 설계와 실행

1. pytest 89건을 실행해 기능·E2E·장애 허용·MCP 흐름을 확인했습니다.
2. 실제 OpenAI LLM Judge로 E2E 응답 70건을 독립 평가했습니다.
3. AWS CLI로 QA 산출물 7개를 S3에 업로드하고 개수를 재확인했습니다.
4. S3 퍼블릭 접근 차단 4개 항목과 SSE-S3 AES256 암호화를 점검했습니다.
5. 원본과 다운로드본의 SHA-256을 비교해 `diff=0`을 확인했습니다.
6. CloudTrail에서 PutObject·GetObject·DeleteObject 등 객체 이벤트를 확인했습니다.
7. QA 버킷·Trail·로그 버킷을 삭제하고 작업 전후 비용 USD 0.00을 확인했습니다.

## 발견한 결함과 판단

- pytest: 84 PASS / 5 FAIL
- 실제 LLM 호출: 70/70 성공, API 오류 0건
- 품질 판정: PASS 25건 / FAIL 45건
- 평균 품질 점수: 66.8점
- Critical Failure: 9건
- 주요 개선 대상: 모호한 질문, 신규 VOC, 장애 상황 응답

API 호출 성공을 품질 PASS로 해석하지 않았습니다. 품질 게이트인 평균 90점, PASS율 95%, Critical 0건을 충족하지 못했기 때문에 운영 배포를 보류했습니다.

## AWS 검증 결과

- 산출물 7개 업로드 및 목록 확인
- 퍼블릭 접근 차단 4개 항목 `true`
- 객체 암호화 AES256
- SHA-256 해시 비교 `diff=0`
- CloudTrail 관리·S3 데이터 이벤트 확인
- 프로젝트 리소스 전체 삭제
- 작업 전후 비용 USD 0.00

## 증빙

- [팀 품질 결과 보고서](../../../public/downloads/VOC_Quality_Report_Team4.docx)
- 비공개 증빙: 38장 최종 완료보고서와 12분 수행 영상 보유
- 공개 제한 사유: 원본 화면에 포함된 AWS 계정 ID와 IAM 사용자명 보호
