# 보안/공개 정책

## 원칙

- 고객 앱은 `public_listings`만 읽습니다.
- `raw_listings`는 관리자 전용이며 RLS 정책으로 차단합니다.
- 원본 CSV, 포스 원본, 매출표 원본은 클라이언트 번들, `public/` 폴더, 공개 Storage에 두지 않습니다.
- 금액 정보는 월매출, 권리금, 예상 순수익 모두 범위형으로만 공개합니다.

## 공개 금지 필드

- 동 이름
- 상세주소
- 번지
- 지점명
- 점주 연락처
- 고객명
- 내부 메모
- 포스 원본
- 매출표 원본
- 원본 주소 전체

## 관리자 접근

프로덕션에서는 `ADMIN_ACCESS_TOKEN`이 필요합니다. `/admin/*`, `/api/admin/*` 요청은 `src/proxy.ts`에서 토큰을 확인합니다.

Supabase 전환 후에는 토큰 방식 대신 Supabase Auth의 `profiles.role = 'admin'` 확인으로 바꾸는 것이 좋습니다.
