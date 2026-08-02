# VOC Improve 멀티 에이전트 QA

## 프로젝트 정보

- 유형: 팀 프로젝트
- 개인 기여: 테스트 실행, AI 품질 결과 검토, 배포 판정 자료와 최종 증빙 정리
- 기술: pytest, LLM Judge, Release Gate

## 문제 정의

6개 Agent가 생성한 VOC 분석 결과를 일관된 기준으로 평가하고, 배포 가능한 품질인지 판단할 필요가 있었습니다.

## 테스트와 개선

1. Agent별 분석 결과와 기대 품질 기준을 비교했습니다.
2. 독립 Judge 평가 결과와 실패 사유를 확인했습니다.
3. PASS·FAIL 결과가 배포 판정에 연결되는지 검토했습니다.
4. 팀 보고서와 발표자료의 최종 판정 및 증빙을 교차 확인했습니다.

## 결과

Agent 분석 → 독립 품질평가 → Release Gate로 이어지는 팀 QA 흐름을 정리했습니다.

## 증빙

- [팀 품질 결과 보고서](../../../public/downloads/VOC_Quality_Report_Team4.docx)
- [팀 발표자료](../../../public/downloads/VOC_Presentation_v1.8.pptx)
- [프로젝트 소스](../../../public/downloads/VOC_Improve_Source_v1.8.zip)
