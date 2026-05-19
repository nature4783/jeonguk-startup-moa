# 전국창업모아 Google Play 출시 준비

작성일: 2026-05-15

## 현재 반영 완료

- PWA 매니페스트 기본 정리: 앱 이름, 테마 색상, 세로 화면, 주요 바로가기.
- 앱 아이콘 SVG 추가: `/app-icon.svg`.
- 앱 아이콘 PNG 추가: `/icons/icon-192.png`, `/icons/icon-512.png`.
- 서비스워커 추가: `/sw.js`.
- 오프라인 안내 화면 추가: `/offline.html`.
- 개인정보처리방침 페이지 추가: `/privacy`.
- 이용약관 페이지 추가: `/terms`.
- 고객지원 페이지 추가: `/support`.
- 계정 및 데이터 삭제 요청 페이지 추가: `/account-deletion`.
- 상담 신청 폼에 개인정보 수집·이용 동의 체크 추가.
- 폼 제출 후 JSON 화면으로 떨어지지 않도록 내부 리다이렉트 처리 추가.
- Google Play Console 입력 초안 추가: `docs/google-play-console-answers.md`.
- Android TWA 출시 설정 가이드 추가: `docs/twa-release-setup.md`.

## Google Play 먼저 갈 때 추천 순서

1. 운영 도메인 확정
   - 예: `https://app.jeongukstartupmoa.kr`
   - 개인정보처리방침 URL과 계정 삭제 URL은 Google Play Console에 그대로 입력해야 한다.

2. PWA 품질 고정
   - 모바일 홈, 커뮤니티, 매물, 상담, 마이페이지가 모두 앱처럼 동작해야 한다.
   - 뒤로가기, 스크롤, 하단 탭, 로그인 유지, 네트워크 오류 화면을 점검한다.
   - 서비스워커와 오프라인 화면이 등록되는지 확인한다.

3. Android 패키징 방식 선택
   - Google Play만 먼저면 PWA 기반 TWA가 빠르다.
   - 푸시 알림, 카메라, 생체 인증 같은 네이티브 기능을 빨리 붙일 계획이면 Capacitor를 검토한다.
   - 현재 Next.js API Routes와 동적 페이지를 쓰고 있으므로, 정적 export 기반 Capacitor보다 배포된 HTTPS 앱을 감싸는 방식이 현실적이다.

4. Play Console 준비
   - 개발자 계정 생성 및 신원 확인.
   - 앱 이름: 전국창업모아.
   - 카테고리 후보: 비즈니스 또는 소셜.
   - 개인정보처리방침: `/privacy`.
   - 계정 삭제 URL: `/account-deletion`.
   - 고객지원 URL: `/support`.

5. 내부 테스트
   - 실제 Android 기기에서 상담 신청, 커뮤니티, 관심 매물, 비교함, 알림 화면을 확인한다.
   - Play Console 비공개 테스트 후 프로덕션 심사를 진행한다.

## Data safety 초안

Google Play Console의 Data safety 입력 전, 실제 구현 기준으로 최종 확인해야 한다.

### 수집 가능성이 있는 데이터

- 개인 정보: 이름, 연락처, 이메일 또는 로그인 식별자.
- 앱 활동: 관심 매물, 비교함, 커뮤니티 글/댓글, 상담 신청 내역.
- 앱 정보 및 성능: 오류 로그, 접속 일시, 기기 정보.

### 수집 목적

- 앱 기능 제공.
- 고객지원.
- 보안, 부정 이용 방지.
- 서비스 개선.

### 공유 여부

- 원칙적으로 제3자 판매 또는 임의 제공 없음.
- 호스팅, 인증, 데이터 저장, 알림 등 운영 위탁 도구는 실제 사용 업체 확정 후 고지.

### 삭제 요청

- 앱 내 `/account-deletion`에서 요청 접수.
- 회원 탈퇴 또는 삭제 요청 시 법령 보관 대상 외 정보 삭제 또는 비식별 처리.

## 출시 전 반드시 바꿀 값

- 실제 운영 도메인.
- 고객센터 이메일.
- 사업자명, 대표자명, 주소, 전화번호.
- Android 패키지명. 후보: `kr.co.jeongukstartupmoa.app`
- 512x512 PNG 앱 아이콘, 피처 그래픽, 스토어 스크린샷.
- 개인정보처리방침의 처리 위탁 업체 목록.

## 참고 공식 문서

- Google Play Console 시작: https://support.google.com/googleplay/android-developer/answer/9859062
- Google Play Data safety: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play 사용자 데이터 정책: https://support.google.com/googleplay/android-developer/answer/10144311
- Android target API 요구사항: https://developer.android.com/google/play/requirements/target-sdk
