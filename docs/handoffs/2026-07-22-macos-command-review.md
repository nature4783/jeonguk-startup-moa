# 2026-07-22 macOS 명령 호환성 검토

## 목적

Windows 원본에서 Mac Terminal(zsh)로 이전할 때 clone 경로, Node 버전, 누락된 로컬 빌드 파일 때문에 발생할 오류를 사전 차단했다.

## 수정 내용

- Git 루트와 중첩 앱 폴더를 구분하는 clone/`cd` 명령을 추가했다.
- Node.js 22.13 이상 preflight를 추가했다.
- Git 미추적 `.openai/hosting.json`, `build/sites-vite-plugin.ts`가 없으면 build 전에 설명과 함께 중단한다.
- 존재하지 않는 `npm test`를 실행하지 않도록 실제 package scripts와 맞췄다.

## 변경 범위와 검증

`PROJECT_HANDOFF.md`, `docs/handoffs/INDEX.md`, 이 문서만 변경한다. 기능 코드와 기존 미추적 작업물은 건드리지 않는다. 기준 커밋은 `d310eb6`다.
