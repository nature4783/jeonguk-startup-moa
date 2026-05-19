# 데이터베이스 설계

초기 마이그레이션은 `database/migrations/001_initial_schema.sql`에 있습니다.

## 핵심 테이블

- `profiles`: 사용자와 관리자 role
- `raw_listings`: 원본 CSV/민감 데이터 저장, 관리자 전용
- `public_listings`: 고객 공개 DTO
- `favorite_listings`: 관심 매물
- `compare_items`: 비교함
- `consultation_requests`: 상담 신청

## 권한

- `raw_listings`: admin only
- `public_listings`: `is_public = true`만 고객 조회 가능
- `favorite_listings`: 본인 데이터만 접근
- `compare_items`: 본인 데이터만 접근
- `consultation_requests`: 고객은 본인 신청, 관리자는 전체
