# 인수인계 문서 인덱스

| 작업명 | 문서 링크 | 작업 목적 | 현재 상태 | 관련 파일 | 관련 커밋 | 다음 작업 | Mac 가능? | Windows 확인 필요? | 다른 작업과의 구분 |
|---|---|---|---|---|---|---|---|---|---|
| Windows → Mac 전체 프로젝트 인수인계 | [작업 문서](./2026-07-22-windows-to-mac-handoff.md), [프로젝트 문서](../../PROJECT_HANDOFF.md) | PWA 후보의 사용자/관리자/데이터/배포 상태와 Mac 재현성 기록 | 완료(문서 전용); 제품은 후보/실험 상태 | `jeonguk-startup-moa/src/`, `scripts/`, `supabase/`, `vite.config.ts`, `worker.ts` | 기준 `e4e14c1`; `604491f`, `1b330e3`, `249b506` | 누락 빌드 의존성 복원, DB 영속화, 배포 확정 | 조건부: 누락 파일 복원 후 | 예: 기존 로컬 빌드 파일/배포 출처 확인 | 샘플 PWA/관리자 후보. 실제 운영 CSV 사이트와 다름 |
| macOS 명령 호환성 검토 | [작업 문서](./2026-07-22-macos-command-review.md) | 중첩 폴더·Node 버전·미추적 빌드 파일 preflight 추가 | 완료(문서 전용) | `package.json`, `vite.config.ts`, `PROJECT_HANDOFF.md` | 기준 `d310eb6` | Windows 원본에서 누락 파일의 안전한 복원 여부 결정 | 조건부 | 누락 파일 출처 확인 필수 | 기능 구현이 아니라 Mac build의 예측 가능한 중단/복구 절차 |
