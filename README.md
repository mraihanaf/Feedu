# Feedu

> **Feedu** is a community-driven platform that empowers students by combining _shared notes_ and _curated competitions_.  
> With Feedu, students can upload and browse study materials while staying updated on competitions aggregated from various sources (instagram competitions account)

---

## Features

### 1. Competitions Aggregator

### 2. Events Aggregator

### 2. Notes Sharing

## Developments
```bash
cp .env.example .env.local
```
```
BETTER_AUTH_SECRET="pirDTqonOR8Xayxt6x7UpTFgKFzjiQgW"
BETTER_AUTH_URL="http://localhost:3000"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/main"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

SMTP_HOST="localhost"
SMTP_PORT="8025"
SMTP_USER="testuser"
SMTP_PASS="testuser"

S3_ENDPOINT="localhost:9000"      
S3_REGION="us-west-1"
S3_BUCKET="feedu"
S3_ACCESS_KEY_ID="minioadmin"
S3_SECRET_ACCESS_KEY="minioadmin"
S3_FORCE_PATH_STYLE="true" # Needed for MinIO or some S3-compatible APIs

NODE_ENV="development"
```
```bash
docker compose up
```