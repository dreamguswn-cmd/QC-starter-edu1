# AWS 웹 서버 장애 재현 및 복구 검증

## 프로젝트 정보

- 유형: 개인 프로젝트
- 개인 기여: AWS 환경 구축, 테스트 시나리오 설계, 장애 재현, 원인 분석, 서비스 복구, 보안 점검과 증빙 전 과정
- 기술: AWS EC2, Apache, S3, CloudTrail, MFA

## 문제 정의

정상 운영 중인 웹 서버가 중지되었을 때 장애를 탐지하고 원인을 좁힌 뒤, 복구와 보안 설정까지 같은 순서로 재검증해야 했습니다.

## 테스트와 개선

1. 서울 리전 EC2와 Apache 웹 서버의 정상 동작을 확인했습니다.
2. Apache를 중지하고 브라우저 접속 실패를 재현했습니다.
3. 서비스 상태를 확인해 원인을 Apache 중지로 좁혔습니다.
4. Apache 재시작 후 같은 URL에서 정상 복구를 확인했습니다.
5. S3 퍼블릭 차단·암호화와 CloudTrail 기록을 확인했습니다.

## 결과

| 지표 | 결과 |
|---|---:|
| 실행 테스트 | 5건 |
| PASS / FAIL | 5 / 0 |
| 장애 탐지 | 95점 |
| 장애 복구 | 100점 |
| S3 보안 설정 | 100점 |
| 품질 평균 | 99점 |

## 개인 수행 증빙

- [웹 서버 정상 화면](../../../public/assets/aws-project/07_웹서버_정상화면.png)
- [EC2 보안그룹](../../../public/assets/aws-project/08_EC2_보안그룹_정보가림.png)
- [장애 발생 화면](../../../public/assets/aws-project/11_장애발생_접속실패_정보가림.png)
- [장애 복구 화면](../../../public/assets/aws-project/12_장애복구_정상화면_정보가림.png)
- [S3 업로드 성공](../../../public/assets/aws-project/14_S3_8개파일_업로드성공_정보가림.png)
- [CloudTrail 이벤트](../../../public/assets/aws-project/18_CloudTrail_CreateBucket_이벤트.png)

> 팀 프로젝트 ZIP과 팀 품질보고서는 이 개인 프로젝트의 증빙으로 사용하지 않습니다.
