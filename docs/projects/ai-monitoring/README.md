# AI Agent 품질관리·운영 모니터링

## 프로젝트 정보

- 유형: 교육 실습
- 수행 역할: pytest 기능 테스트, k6 부하 테스트, 운영 지표 수집과 Grafana 화면 검증
- 기술: FastAPI, pytest, k6, Prometheus, Grafana

## 문제 정의

기능 테스트의 성공 여부만으로는 응답 지연과 운영 이상을 설명하기 어려웠습니다.

## 테스트와 개선

1. pytest로 주요 기능 동작을 검증했습니다.
2. k6로 부하 상황의 응답 시간과 오류 여부를 확인했습니다.
3. Prometheus에서 서비스 지표가 수집되는지 확인했습니다.
4. Grafana에서 기능·성능·운영 상태를 함께 관찰했습니다.

## 결과

기능 결과와 성능·운영 지표를 연결해 서비스 상태를 함께 판단하는 QA 흐름을 구축했습니다.

## 증빙

- [운영 대시보드](../../../public/assets/final_pipeline_dashboard.png)
- [통합 포트폴리오 PDF](../../../public/portfolio.pdf)
