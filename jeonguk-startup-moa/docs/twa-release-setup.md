# Android TWA 출시 설정 가이드

작성일: 2026-05-15

Google Play를 먼저 목표로 할 경우, 현재 Next.js 앱은 HTTPS 배포 후 TWA(Trusted Web Activity)로 감싸는 방식이 가장 빠르다.
TWA는 앱 안에서 Chrome 기반 PWA를 실행하므로, 웹앱을 유지하면서 Play Store에 올리기 좋다.

## 1. 운영 URL 확정

예시:

```text
https://app.jeongukstartupmoa.kr
```

필수 공개 URL:

```text
https://app.jeongukstartupmoa.kr/
https://app.jeongukstartupmoa.kr/manifest.webmanifest
https://app.jeongukstartupmoa.kr/privacy
https://app.jeongukstartupmoa.kr/account-deletion
https://app.jeongukstartupmoa.kr/support
```

## 2. PWA 체크

현재 프로젝트에 반영된 항목:

- `manifest.webmanifest`
- 앱 아이콘 192x192, 512x512
- `theme_color`, `background_color`
- 세로 화면 고정
- 서비스워커 `/sw.js`
- 오프라인 화면 `/offline.html`
- 앱 내 개인정보처리방침, 약관, 계정 삭제 요청, 고객지원

운영 배포 후 Lighthouse 또는 Chrome DevTools에서 PWA 설치 가능 여부를 확인한다.

## 3. Bubblewrap 후보 설정

패키지명 후보:

```text
kr.co.jeongukstartupmoa.app
```

앱 이름:

```text
전국창업모아
```

시작 URL:

```text
https://app.jeongukstartupmoa.kr/
```

## 4. Bubblewrap 명령 흐름

운영 도메인을 배포한 뒤 진행한다.

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://app.jeongukstartupmoa.kr/manifest.webmanifest
bubblewrap build
```

빌드 결과물은 Play Console에 Android App Bundle 형식으로 제출한다.

## 5. Digital Asset Links

TWA에서 주소창 없이 앱처럼 열리려면 웹 도메인과 Android 앱의 소유권 연결이 필요하다.
릴리스 서명키의 SHA-256 fingerprint를 얻은 뒤 아래 형식으로 배포해야 한다.

파일 위치:

```text
https://app.jeongukstartupmoa.kr/.well-known/assetlinks.json
```

템플릿:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "kr.co.jeongukstartupmoa.app",
      "sha256_cert_fingerprints": [
        "REPLACE_WITH_RELEASE_SHA256_FINGERPRINT"
      ]
    }
  }
]
```

주의:

- fingerprint는 디버그 키가 아니라 Play에 제출할 릴리스/앱 서명 키 기준이어야 한다.
- 이 값이 틀리면 TWA가 일반 브라우저 탭처럼 뜰 수 있다.

## 6. Android target SDK

Google Play 새 앱 제출 기준에 맞춰 최신 target SDK를 사용해야 한다.
2026년 5월 현재 신규 앱/업데이트는 Android 15(API 35) 이상 기준을 확인하고 맞춘다.

## 7. 내부 테스트 체크

- 앱 실행 시 홈 화면 진입
- 뒤로가기 버튼 동작
- 오프라인 상태에서 안내 화면 표시
- 상담 신청 제출
- 계정 삭제 요청 제출
- 커뮤니티 화면 스크롤
- 하단 탭/카테고리 고정바 동작
- 개인정보처리방침과 계정 삭제 URL 접근
