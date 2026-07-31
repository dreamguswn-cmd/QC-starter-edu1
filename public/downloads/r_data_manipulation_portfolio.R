# R 기초 및 데이터 조작 포트폴리오 예제

sales <- data.frame(
  customer = c("C001", "C002", "C003"),
  region = c("서울", "부산", "대전"),
  product = c("노트북", "모니터", "키보드"),
  quantity = c(1, 2, 3),
  price = c(1200000, 350000, 50000)
)

# 파생변수와 고객등급 생성
sales$amount <- sales$quantity * sales$price
sales$grade <- ifelse(sales$amount >= 100000, "우수", "일반")

# 추가 데이터 행 결합
new_sales <- data.frame(
  customer = "C004",
  region = "광주",
  product = "마우스",
  quantity = 1,
  price = 45000,
  amount = 45000,
  grade = "일반"
)

combined_sales <- rbind(sales, new_sales)
print(combined_sales)

# CSV 저장
write.csv(combined_sales, "sales_result.csv", row.names = FALSE)

# dplyr를 활용한 지역별 구매금액 요약
library(dplyr)

region_summary <- combined_sales %>%
  group_by(region) %>%
  summarise(total_amount = sum(amount), .groups = "drop")

print(region_summary)
