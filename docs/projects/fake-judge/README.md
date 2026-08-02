# Fake Judge 기반 AI 서비스 품질평가

## 프로젝트 정보

- 유형: 교육 실습
- 수행 역할: 평가 로직 구현, pytest 자동화, 결과 시각화, PASS·FAIL 판정 보고서 작성
- 기술: Python, pytest, Jupyter, Streamlit

## 문제 정의

평가자에 따라 달라질 수 있는 AI 응답 판정을 동일한 품질 기준으로 반복할 필요가 있었습니다.

## 테스트와 개선

1. 5개 품질 항목과 판정 기준을 정의했습니다.
2. PASS·FAIL 분기 로직을 pytest로 반복 검증했습니다.
3. Jupyter에서 결과를 분석하고 Streamlit 화면으로 확인했습니다.
4. 평가 결과를 최종 판정 보고서로 정리했습니다.

## 결과

반복 가능한 AI 응답 평가 → 판정 → 보고 프로세스를 구축했습니다.

## 증빙

- [품질평가 포트폴리오](../../../public/downloads/AI_Service_Quality_Portfolio.pdf)
- [실행 소스](../../../public/downloads/fake_judge_lab_source.zip)
- [Streamlit 실행 화면](../../../public/assets/ai-quality-streamlit.png)
- [Jupyter 분석 화면](../../../public/assets/ai-quality-jupyter.png)
