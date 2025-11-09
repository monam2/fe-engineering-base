# fe-engineering-base

프론트엔드 관련 지식과 구현 패턴, 선언적인 코드를 학습하고 연습하기 위한 공간입니다.

## 프로젝트 개요
학습 내용 및 의존성 분리를 위한 모노레포로 구성되었습니다.
- Turborepo
- yarn berry4 Workspace
- TypeScript
- Next.js(apps) / vite(packages)

## 프로젝트 구조

### apps/
학습한 내용을 적용해보는 애플리케이션 디렉토리
- `docs`
- `patterns`
- `playground`



### packages/
`@fe-base` 단일 패키지로 구성
- `utils`: 프로젝트 전반에 사용될 유틸 함수
- `react`: 프로젝트 전반에 사용될 선언적 컴포넌트
