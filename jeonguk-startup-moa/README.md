# 전국창업모아 고객용 웹앱/PWA

KREAM 같은 마켓앱 UI 흐름을 참고한 프랜차이즈 양도양수 창업 매물 MVP입니다.

## 포함된 기능

- 고객 홈
- 매물 리스트
- 검색/필터/정렬
- 매물 상세
- 관심 매물 저장 MVP
- 매물 비교함
- 상담 신청 폼
- 마이페이지
- 관리자 원본 매물 화면
- 관리자 공개 매물 화면
- `raw_listings` → `public_listings` 변환 미리보기
- Supabase용 SQL/RLS 마이그레이션
- pandas 기반 CSV 정제 스크립트

## 실행

```bash
npm install
npm run dev
```

개발 환경에서는 `ADMIN_ACCESS_TOKEN`이 없으면 `/admin` 접근을 허용합니다. 프로덕션 배포 전에는 반드시 `.env.example`을 참고해 `ADMIN_ACCESS_TOKEN`을 설정하세요.

## 보안 경계

고객 화면은 `src/lib/public-listings.ts`의 공개 DTO만 사용합니다. 원본 샘플과 변환 함수는 `src/lib/server/raw-listings.ts`에 있으며 `server-only`로 분리했습니다.

자세한 정책은 `docs/security-policy.md`를 확인하세요.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
