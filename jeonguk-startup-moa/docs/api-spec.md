# API 목록

## 고객용

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/public-listings` | 공개 매물 목록, 검색/필터/정렬 |
| GET | `/api/public-listings/:listingId` | 공개 매물 상세 |
| GET | `/api/favorites` | 관심 매물 목록 |
| POST | `/api/favorites` | 관심 등록 |
| DELETE | `/api/favorites` | 관심 삭제 |
| GET | `/api/compare` | 비교함 목록 |
| POST | `/api/compare` | 비교함 추가 |
| DELETE | `/api/compare` | 비교함 삭제 |
| GET | `/api/consultations` | 내 상담 신청 |
| POST | `/api/consultations` | 상담 신청, 상세자료 요청, 희망 조건 남기기 |

## 관리자용

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/admin/transform` | raw to public 변환 미리보기 |
| POST | `/api/admin/transform` | public DTO 생성 |

관리자 CSV import, 공개/비공개 update, 상담 상태 변경 API는 Supabase 연결 단계에서 추가합니다.
