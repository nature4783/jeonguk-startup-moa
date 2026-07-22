# 2026-07-22 Windows → Mac 인수인계 문서화 작업

## 작업 요약

Git 루트와 중첩 앱 구조를 확인하고, 후보 PWA의 실제 구현/스텁/배포 재현성 상태를 루트 `PROJECT_HANDOFF.md`에 기록했다. 기존 미추적 CSV·감사 산출물·중첩 저장소는 변경하거나 스테이징하지 않는다.

## 변경 파일

- `PROJECT_HANDOFF.md`
- `docs/handoffs/2026-07-22-windows-to-mac-handoff.md`
- `docs/handoffs/INDEX.md`

## 근거와 기준점

- 작성 전 HEAD: `e4e14c1`, 브랜치 `agent/macbook-migration-sync-20260721`.
- 앱 근거: `jeonguk-startup-moa/src`, `scripts`, `supabase`, `public`, `docs`, `package.json`, `vite.config.ts`, `worker.ts`.
- 상담/즐겨찾기/비교가 영속 구현처럼 보이지 않도록 스텁 상태를 명시했다.

## 검증과 제한

문서만 변경한다. 깨끗한 복제에서 필요한 로컬 Vinext/Sites 의존 파일이 Git에 없어 이 작업에서는 build를 실행하지 않았고, 운영 배포 완료로 판정하지 않았다.

## 다음 작업

배포 플랫폼/도메인, 공개 데이터 소스, Supabase 런타임 연결을 확정하고 누락된 빌드 의존성을 안전하게 재현한 뒤 Mac/CI build를 검증한다.
