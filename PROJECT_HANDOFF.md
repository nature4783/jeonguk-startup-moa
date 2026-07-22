# jeonguk-startup-moa 프로젝트 인수인계

> 기준: 2026-07-22, `agent/macbook-migration-sync-20260721`, `e4e14c1`
> Git 루트는 `C:\Users\AXE\Documents\New project`, 애플리케이션 루트는 그 아래 `jeonguk-startup-moa/`다. 현재 Git 루트의 다른 미추적 CSV·감사 산출물·중첩 저장소는 이 프로젝트 문서 작업과 무관하므로 건드리거나 스테이징하지 않는다.

## 1. `jeong-startup-site`와의 차이

`jeong-startup-site`가 실제 CSV와 생성 캐시를 사용해 운영 중인 공개 매물·상담 사이트라면, `jeonguk-startup-moa`는 별도 고객 앱/PWA 및 관리자 변환 흐름을 검증하는 후보 구현이다. 이 저장소의 공개 매물은 현재 소수의 코드 내 샘플이고, 상담·즐겨찾기·비교·관리자 변환 API 다수가 메모리 응답 또는 미완성 스텁이다. 두 프로젝트를 같은 운영 데이터 소스로 착각하면 안 된다.

## 2. 목적, 사용자, 관리자

- 일반 사용자: 매물 목록/상세를 보고 지역·업종·가격 조건으로 찾으며 즐겨찾기, 비교, 상담을 시도하는 모바일 우선 경험.
- 관리자: 원본 매물을 검토하고 공개 DTO로 변환·게시하는 흐름의 UI/API 후보.
- 제품 방향: PWA, Android TWA/Google Play 준비, 지역/브랜드/가이드 SEO 진입점, 향후 Supabase 영속화.
- 현재 성격: 운영 서비스가 아니라 프로덕션 후보/실험 브랜치. 실제 고객·상담 데이터를 넣기 전에 영속화, 인증, 배포 파일을 완성해야 한다.

## 3. 구조

| 위치 | 역할 | 상태 |
|---|---|---|
| `jeonguk-startup-moa/src/app/` | 공개/관리자 페이지와 API, robots, sitemap | 구현됨; 일부 API는 스텁 |
| `jeonguk-startup-moa/src/lib/public-listings.ts` | 공개 목록 샘플과 검색/필터 기반 데이터 | 샘플 6건 |
| `jeonguk-startup-moa/src/lib/server/raw-listings.ts` | 마스킹된 원본 샘플과 공개 변환 | 미게시 샘플 |
| `jeonguk-startup-moa/scripts/transform_raw_to_public.py` | CSV → 비식별 공개 JSON 변환 참고 구현 | 오프라인 도구 |
| `jeonguk-startup-moa/supabase/` | 프로필·원본/공개 매물·즐겨찾기·비교·상담 스키마/RLS | 마이그레이션 존재, 런타임 연결 미완성 |
| `jeonguk-startup-moa/public/` | PWA/브랜드/매물 이미지 및 매니페스트 | 추적 |
| `jeonguk-startup-moa/docs/` | PWA/TWA/배포 운영 문서 | 후보 절차 |
| `jeonguk-startup-moa/vite.config.ts`, `worker.ts` | Vinext/Cloudflare 빌드·Worker 진입점 | 최근 전환 |

## 4. 목록·상세와 검색/필터/추천

공개 목록과 상세는 `src/lib/public-listings.ts`의 안전한 샘플 배열을 사용한다. 목록 API는 텍스트, 지역, 업종, 가격/매출 조건과 정렬을 메모리에서 처리하고, 상세는 공개 ID로 같은 배열을 찾는다. 추천은 같은 공개 속성의 관련성 규칙을 사용하며 별도의 개인화 모델이나 운영 추천 시스템은 아니다.

즐겨찾기·비교 API는 현재 빈 목록 또는 요청 내용을 되돌리는 스텁이다. 화면 동작이 보여도 계정별 영속 저장이 완료됐다고 판단하면 안 된다. Supabase 스키마와 RLS는 향후 연결 대상이다.

## 5. 공개 데이터 생성과 개인정보 보호

서버 샘플과 Python 변환기는 원본의 동/상세 주소/지점, 점주·고객·담당자 연락처, 내부 메모, POS/정밀 매출, 원본 주소 같은 필드를 제거하고 가격·매출·수익·임대료를 버킷화한다. 변환 결과의 `isPublic`/`is_public` 기본값은 `false`여서 관리자 승인 없이 자동 공개하지 않는 설계다.

실제 운영 전 반드시 다음 계약을 하나로 통일한다.

1. 원본 스키마와 공개 DTO 스키마.
2. 공개 승인 필드와 게시 주체.
3. 버킷 경계 및 지역 비식별 수준.
4. Supabase 원본 테이블의 접근권한과 공개 테이블 RLS.
5. `jeong-startup-site` 생성 캐시와 연동할지, 독립 파이프라인으로 유지할지.

실제 전화번호, 상세 주소, 상담 본문, 원본 CSV, 인증 토큰은 Git과 클라이언트 번들에 넣지 않는다.

## 6. 상담 흐름

상담 화면과 POST API가 있으나 현재 API는 입력을 받아 상태/시각과 함께 되돌리는 수준이며 데이터베이스 저장이나 운영 알림이 연결되지 않았다. Supabase에는 상담 테이블과 RLS 마이그레이션이 있지만 런타임 코드가 이를 운영 플로우로 사용하지 않는다. 따라서 현재 상담 제출을 고객 데이터 수집 채널로 공개하면 안 된다.

운영 후보로 승격하려면 입력 검증, 스팸 방지, 동의 문구, 서버 전용 저장, 알림, 관리자 상태 변경, 보존/삭제 정책, 실패 재시도를 구현하고 테스트해야 한다.

## 7. SEO와 구조화 데이터

robots와 sitemap은 관리자, 로그인, API, 개인 영역을 검색에서 제외하고 공개 정적 페이지와 샘플 매물/지역 페이지를 노출하는 방향이다. 목록 API는 `s-maxage=300`, `stale-while-revalidate=3600` 캐시 헤더를 사용한다. 메타데이터와 구조화 데이터가 있으나 샘플 데이터/후보 도메인 기반이므로 배포 전 canonical, sitemap URL, 실제 공개 매물 수, `noindex` 경계를 다시 검증한다.

캐시를 적용한 API는 게시 취소나 개인정보 수정이 최대 캐시 시간 동안 남을 수 있다. 운영 데이터 연결 시 즉시 무효화 경로가 필요하다.

## 8. 이미지와 PWA

`public/`에는 앱 아이콘, 매니페스트, 매물/브랜드 자산이 있고 PWA 설치 경험과 Android TWA/Google Play 준비 문서가 있다. 이미지는 현재 샘플/브랜딩 자산 중심이다. 운영 전 저작권, 실제 매물 일치 여부, 모바일 크롭, 캐시 갱신, 삭제 요청 대응을 확인한다. TWA 자산과 후보 도메인의 소유권 검증은 실제 배포 환경에서 별도로 필요하다.

## 9. 배포 상태

현재 패키지는 Node.js 22.13 이상, Vinext, Vite, Cloudflare Worker/Wrangler 방향으로 전환돼 있다. 과거 문서에는 Vercel 일반 절차와 Android 후보 도메인도 섞여 있다. 확정된 단일 프로덕션 배포 경로가 아니라 배포 후보가 공존한다.

중요한 재현성 결함이 있다. `vite.config.ts`가 로컬 `.openai/hosting.json`과 `build/sites-vite-plugin.ts`를 참조하지만 두 파일은 현재 Git 추적 대상이 아니다. 깨끗한 Mac 복제본은 이 파일을 승인된 방식으로 복원하거나 빌드 구성을 수정하기 전까지 동일 빌드가 보장되지 않는다. 비밀값을 임의로 커밋해 해결하면 안 된다.

## 10. 최근 Git 이력

전체 이력이 50개보다 적으며 현재 확인되는 주요 커밋은 다음과 같다.

- `e4e14c1` — Vinext 빌드 전환과 명함/브랜드 자산 준비.
- `604491f` — SEO 및 캐시 개선(현재 `origin/main`).
- `1b330e3` — SEO 페이지 확장.
- `249b506` — 초기 백업/기반 구현.

현재 브랜치는 `origin/agent/macbook-migration-sync-20260721`을 추적한다. `main`과 후보 브랜치의 배포 설정 차이를 병합 전에 비교한다.

## 11. 완료·실험·미완성

구현됨:

- 모바일 우선 공개 목록/상세 UI, 메모리 검색·필터·정렬·관련 추천.
- PWA 자산과 설치 방향, 관리자 화면 골격.
- 공개 DTO 마스킹 예제, Supabase 스키마/RLS 초안.
- robots/sitemap/메타데이터/구조화 데이터와 API 캐시 헤더.

실험/미완성:

- 공개 데이터는 운영 소스가 아닌 코드 내 샘플.
- 상담, 즐겨찾기, 비교, 관리자 변환/게시의 영속화가 연결되지 않음.
- Supabase 스키마와 런타임 데이터 흐름이 연결되지 않음.
- Vinext/Cloudflare 빌드가 추적되지 않은 로컬 파일에 의존.
- 프로덕션 도메인·플랫폼·배포 파이프라인이 확정되지 않음.
- 실제 사용자 인증/관리자 권한 및 운영 데이터 검증이 필요.

## 12. 환경 변수 이름과 목적

| 이름 | 목적 |
|---|---|
| `ADMIN_ACCESS_TOKEN` | 관리자 API/화면 접근 토큰. 프로덕션에서 필수 |
| `NEXT_PUBLIC_SITE_URL` | canonical, sitemap, 공유 URL 기준 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 공개 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 브라우저용 익명 키; RLS가 보안 경계 |
| `WRANGLER_LOG_PATH`, `WRANGLER_WRITE_LOGS` | 로컬 Wrangler 진단 |
| `MINIFLARE_REGISTRY_PATH` | 로컬 Worker 상태/레지스트리 경로 |

값은 `.env` 또는 배포 플랫폼 비밀 저장소에서만 관리한다. 관리자 토큰이나 Supabase 서버 권한 키를 `NEXT_PUBLIC_*`로 만들지 않는다.

## 13. Mac 이전

### 실행 경계

- Windows 원본 PC에서 현재 로컬 전용 파일의 출처와 민감정보 포함 여부를 먼저 확인한다.
- Mac에서는 Git에 있는 파일만으로 build가 된다고 가정하지 않는다.
- Windows `.env`, 브라우저 프로필, 배포 토큰을 복사하지 않고 Mac/배포 플랫폼에서 새로 발급·구성한다.

아래 명령은 Git 접근 권한, Git, Node.js 22.13 이상, npm이 설치된 **Mac Terminal(zsh)** 에서 실행한다. Git 저장소와 앱 폴더 이름이 같으므로 clone 대상 폴더를 `jeonguk-startup-moa-repo`로 구분한다.

```zsh
test "$(uname -s)" = "Darwin" || { echo "이 블록은 macOS 전용입니다."; exit 1; }

mkdir -p "$HOME/Projects"
cd "$HOME/Projects"
git clone --branch agent/macbook-migration-sync-20260721 --single-branch \
  https://github.com/nature4783/jeonguk-startup-moa.git \
  jeonguk-startup-moa-repo
cd jeonguk-startup-moa-repo/jeonguk-startup-moa

node -e 'const [a,b]=process.versions.node.split(".").map(Number); if(a<22 || (a===22 && b<13)){console.error("Node.js 22.13 이상이 필요합니다."); process.exit(1)}'
npm ci

missing=0
for file in .openai/hosting.json build/sites-vite-plugin.ts; do
  if [[ ! -f "$file" ]]; then
    echo "누락: $file — Windows 원본/호스팅 설정에서 안전하게 복원한 뒤 계속하세요."
    missing=1
  fi
done
[[ "$missing" -eq 0 ]] || exit 1

npm run lint
npm run build
git status --short
```

현재 두 필수 파일은 Git에 추적되지 않으므로 깨끗한 clone에서는 preflight가 의도적으로 중단된다. Windows 원본에서 파일을 가져오기 전에 비밀값을 검사하고, Git에 강제로 추가하지 않는다. 출처를 확인할 수 없다면 build 설정을 공식적으로 재구성하는 작업이 먼저다.

이 패키지에는 `test` 스크립트가 없다. `npm test`를 실행하지 않는다. 확인 가능한 표준 명령은 `npm run lint`, `npm run build`, 필요 시 `npm run dev`다. 상담·즐겨찾기·비교는 UI 표시만 확인하지 말고 실제 Supabase 왕복이 구현된 뒤 별도로 검증한다.

Mac에서 가능한 일은 React/Vinext 코드, 공개 DTO, PWA, Supabase 마이그레이션, 정적 SEO 작업이다. Windows에서 확인할 일은 로컬 전용 빌드 파일의 출처, 기존 브라우저/PWA 설치 상태, 실제 배포 자격 증명과 운영 데이터 연계다.

## 14. `jeong-startup-site`와의 통합 가능성

통합은 가능하지만 지금 바로 데이터 파이프라인을 합치면 안 된다. 현실적인 선택지는 다음 두 가지다.

- 읽기 전용 통합: `jeong-startup-site`의 검증된 `publicListings.json` 또는 공개 API만 이 앱이 소비한다.
- 공유 패키지: 공개 DTO 타입·마스킹·가격 버킷 규칙을 별도 패키지로 추출하고 두 앱이 같은 테스트를 사용한다.

원본 CSV나 `directListingsInternal.json`을 이 앱의 브라우저/Worker에 전달하는 통합은 금지한다. 공개 승인, 캐시 무효화, 상담 소유권, canonical 중복 문제를 먼저 결정해야 한다.

## 15. 위험과 다음 우선순위

주요 위험:

- 샘플 UI를 운영 완료로 오인할 수 있음.
- 로컬 미추적 빌드 파일 때문에 Mac/CI 재현이 안 됨.
- 개발 환경에서는 관리자 토큰이 없어도 허용되는 경로가 있어 프로덕션 환경 판별 오류가 위험함.
- 캐시된 공개 데이터의 긴 삭제 반영 시간.
- 두 사이트가 같은 콘텐츠로 서로 다른 canonical/구조화 데이터를 내보낼 가능성.

우선순위:

1. 배포 플랫폼과 도메인을 하나로 확정하고 모든 빌드 의존 파일을 안전하게 재현 가능하게 만든다.
2. 운영 공개 데이터 소스를 결정하고 공개 DTO 계약 테스트를 추가한다.
3. 상담 저장·알림·동의·관리자 처리 흐름을 완성한다.
4. 즐겨찾기/비교/관리자 변환을 Supabase RLS와 연결한다.
5. 깨끗한 Mac 및 CI에서 설치/빌드/Worker 테스트를 통과시킨다.
6. `jeong-startup-site`와의 중복 SEO·데이터 소유권을 결정한다.
