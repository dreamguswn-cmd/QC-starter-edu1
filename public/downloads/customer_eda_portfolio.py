"""고객 데이터 탐색적 분석(EDA) 포트폴리오 예제."""

import matplotlib.pyplot as plt
import pandas as pd


df = pd.read_csv("customer.csv")

print(df.head())
print(df.shape)
print(df.info())
print(df.describe(include="all"))
print(df.isnull().sum())

# 결측값 처리 예시: 숫자형 변수는 중앙값으로 대체
for column in ["age", "monthly_spend", "satisfaction_score"]:
    df[column] = df[column].fillna(df[column].median())

# 숫자형 변수 분포 확인
df[["age", "monthly_spend"]].hist(bins=20, figsize=(10, 4))
plt.tight_layout()
plt.show()

df[["age", "monthly_spend"]].plot(kind="box", subplots=True, figsize=(10, 4))
plt.tight_layout()
plt.show()


def iqr_outliers(data, column):
    q1 = data[column].quantile(0.25)
    q3 = data[column].quantile(0.75)
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    upper = q3 + 1.5 * iqr
    return data[(data[column] < lower) | (data[column] > upper)]


age_outliers = iqr_outliers(df, "age")
spend_outliers = iqr_outliers(df, "monthly_spend")

# Z-score 기반 이상값 탐지
for column in ["age", "monthly_spend"]:
    z_score = (df[column] - df[column].mean()) / df[column].std()
    print(f"{column} Z-score outliers")
    print(df.loc[z_score.abs() > 3, ["customer_id", column, "membership", "satisfaction_score", "churn"]])

print("Age IQR outliers")
print(age_outliers)
print("Monthly spend IQR outliers")
print(spend_outliers)
