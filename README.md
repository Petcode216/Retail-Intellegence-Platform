# Retail Intelligence Platform

An end-to-end Machine Learning platform built from the **UCI Online Retail Dataset**, transforming raw e-commerce transactions into customer intelligence, predictive analytics, recommendations, and sales forecasting.

The project combines **Machine Learning, Backend Engineering, Data Engineering, MLOps, and Full-Stack Development** into a single production-oriented system.

> **Project Status:** 🚧 In Development

---

## Overview

The Retail Intelligence Platform analyzes historical online retail transactions and provides actionable insights across:

* Customer behavior
* Customer segmentation
* Customer churn risk
* Customer lifetime value
* Product analytics
* Product recommendations
* Sales forecasting
* ML model performance and monitoring

---

## Dataset

**Online Retail Dataset**

Chen, D. (2015). *Online Retail [Dataset]. UCI Machine Learning Repository.*

Source:

https://doi.org/10.24432/C5BW33

The dataset contains transactional data from a UK-based online retailer between **December 2010 and December 2011**.

Key fields include:

| Field         | Description                    |
| ------------- | ------------------------------ |
| `InvoiceNo`   | Transaction/invoice identifier |
| `StockCode`   | Product identifier             |
| `Description` | Product description            |
| `Quantity`    | Number of items purchased      |
| `InvoiceDate` | Transaction timestamp          |
| `UnitPrice`   | Price per item                 |
| `CustomerID`  | Customer identifier            |
| `Country`     | Customer country               |

---

# System Architecture

The target architecture is:

```text
                         RETAIL INTELLIGENCE PLATFORM
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
                CUSTOMERS         PRODUCTS            SALES
                    │                 │                 │
              ┌─────┼─────┐           │          ┌─────┼─────┐
              ▼     ▼     ▼           ▼          ▼     ▼     ▼
             RFM   CLV   Churn   Recommendations Trends Forecast
              │     │     │           │          │     │     │
              └─────┴─────┴───────────┴──────────┴─────┴─────┘
                                      │
                                      ▼
                                ML SERVICES
                                      │
                                      ▼
                                  PostgreSQL
                                      │
                                      ▼
                                  FastAPI
                                      │
                                      ▼
                             Web Application
```

---

# Application

The web application will provide the following modules:

### 1. Overview

Executive-level retail intelligence:

* Revenue
* Orders
* Customers
* Average Order Value
* Revenue trends
* Customer distribution
* Top products
* Geographic analysis

### 2. Customers

Customer-level analytics:

* Customer search
* Customer profile
* Purchase history
* RFM metrics
* Customer segment
* Churn probability
* Predicted customer lifetime value

### 3. Segmentation

Customer segmentation using behavioral features such as:

* Recency
* Frequency
* Monetary value
* Order behavior
* Product diversity

Initial approach:

* RFM analysis
* K-Means clustering

Potential future approaches:

* Hierarchical clustering
* Gaussian Mixture Models
* DBSCAN

### 4. Products

Product intelligence:

* Best-selling products
* Revenue by product
* Product popularity
* Product relationships
* Frequently purchased together
* Product recommendations

### 5. Sales & Forecasting

Historical and predicted sales:

* Revenue trends
* Order trends
* Quantity trends
* 7-day forecast
* 30-day forecast
* Forecast confidence intervals

### 6. Predictions

Centralized ML predictions:

* Customer churn
* Customer lifetime value
* Customer segmentation
* Product recommendations
* Sales forecasting

### 7. Model Monitoring

ML engineering and MLOps information:

* Model versions
* Training dates
* Evaluation metrics
* Prediction volume
* Inference latency
* Data drift
* Prediction distribution
* Model health

---

# Machine Learning Components

## Customer Segmentation

**Problem:** Identify groups of customers with similar purchasing behavior.

Potential features:

```text
Recency
Frequency
Monetary
Average Order Value
Total Items
Unique Products
Average Order Interval
Country
```

Initial model:

```text
K-Means
```

---

## Churn / Inactivity Prediction

**Problem:** Estimate the probability that a customer will become inactive.

Potential features:

```text
Recency
Frequency
Monetary
Purchase frequency trend
Average order value
Product diversity
Historical purchase intervals
```

Potential models:

```text
Logistic Regression
Random Forest
XGBoost / LightGBM
```

Primary evaluation metrics:

```text
ROC-AUC
Precision
Recall
F1
PR-AUC
Calibration
```

---

## Customer Lifetime Value

**Problem:** Estimate future customer value over a defined horizon.

Potential approaches:

```text
Baseline regression
Random Forest
Gradient Boosting
XGBoost / LightGBM
```

Possible prediction horizon:

```text
90 days
```

---

## Product Recommendation

Potential progression:

```text
Popularity Baseline
        ↓
Association Rules
        ↓
Collaborative Filtering
        ↓
Matrix Factorization
        ↓
Embedding-based recommendation
```

Potential algorithms:

* Apriori
* FP-Growth
* Collaborative Filtering
* Matrix Factorization

---

## Sales Forecasting

Forecast:

* Revenue
* Orders
* Quantity

Potential progression:

```text
Moving Average
      ↓
ARIMA
      ↓
XGBoost
      ↓
LSTM / Transformer
```

Evaluation:

```text
MAE
RMSE
MAPE
```

---

# Technology Stack

## Frontend

Initial product prototyping:

* React
* TypeScript

## Backend

* Python
* FastAPI
* Pydantic

## Machine Learning

* NumPy
* Pandas
* SciPy
* scikit-learn
* XGBoost / LightGBM

Potential future:

* PyTorch
* Hugging Face

## Database

* PostgreSQL

## MLOps

Potential:

* MLflow
* Docker
* Docker Compose
* Model versioning
* Data/model monitoring

## Infrastructure

Potential future:

* GitHub Actions
* Cloud deployment
* Container registry

---

# Repository Structure

Target structure:

```text
retail-intelligence/
│
├── frontend/
│   └── lovable-generated-app/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── services/
│   │   └── schemas/
│   │
│   └── tests/
│
├── ml/
│   ├── data/
│   │   ├── raw/
│   │   ├── processed/
│   │   └── features/
│   │
│   ├── notebooks/
│   │
│   ├── src/
│   │   ├── ingestion/
│   │   ├── preprocessing/
│   │   ├── feature_engineering/
│   │   ├── segmentation/
│   │   ├── churn/
│   │   ├── clv/
│   │   ├── recommendation/
│   │   └── forecasting/
│   │
│   ├── models/
│   └── evaluation/
│
├── database/
│
├── tests/
│
├── docker/
│
├── docker-compose.yml
├── pyproject.toml
├── README.md
└── PROGRESS.md
```

---

# Development Workflow

```text
1. Product Design
       ↓
2. Lovable Frontend
       ↓
3. Dataset Exploration
       ↓
4. Data Pipeline
       ↓
5. Feature Engineering
       ↓
6. ML Development
       ↓
7. Model Evaluation
       ↓
8. FastAPI
       ↓
9. PostgreSQL
       ↓
10. Frontend Integration
       ↓
11. Docker
       ↓
12. MLOps
       ↓
13. Deployment
```

---

# Project Goals

By completion, this project should demonstrate the ability to:

* Work with real-world transactional data
* Design an ML problem from a business requirement
* Build reproducible data pipelines
* Perform feature engineering
* Train and evaluate ML models
* Serve models through APIs
* Integrate ML with a full-stack application
* Store and retrieve prediction data
* Containerize ML applications
* Monitor deployed models
* Design a maintainable ML system

---


# License

This project is for educational and portfolio purposes.

The dataset is provided by the UCI Machine Learning Repository and should be used according to its associated dataset terms.
