# TASK-001: 프로젝트 초기 설정 및 환경 구성

**Priority:** High
**Status:** Pending
**Phase:** Phase 1-1 (Week 1-2)
**Estimated Hours:** 4
**Tags:** setup, infrastructure

## Description
React 또는 React Native 프로젝트를 TypeScript로 초기화하고, 필요한 의존성 패키지를 설치합니다. Tailwind CSS 또는 styled-components를 설정하고, 기본 폴더 구조를 생성합니다.

## Acceptance Criteria
- [ ] React/React Native + TypeScript 프로젝트 생성 완료
- [ ] package.json에 필요한 의존성 추가
- [ ] 기본 폴더 구조 생성 (components, pages, utils, types 등)
- [ ] ESLint 및 Prettier 설정 완료
- [ ] 개발 서버 정상 실행 확인

## Implementation Steps
1. **프로젝트 생성**
   ```bash
   # React + TypeScript
   npx create-react-app tick-tick-e --template typescript

   # 또는 React Native + TypeScript
   npx react-native init TickTickE --template react-native-template-typescript
   ```

2. **필수 의존성 설치**
   ```bash
   # React 프로젝트의 경우
   npm install react-router-dom
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

   # 상태 관리 (선택)
   npm install zustand
   # 또는
   npm install @reduxjs/toolkit react-redux
   ```

3. **폴더 구조 생성**
   ```
   src/
   ├── components/      # 재사용 가능한 컴포넌트
   ├── pages/          # 페이지 컴포넌트
   ├── hooks/          # 커스텀 훅
   ├── utils/          # 유틸리티 함수
   ├── types/          # TypeScript 타입 정의
   ├── services/       # API 및 데이터 서비스
   ├── assets/         # 이미지, 아이콘 등
   └── styles/         # 전역 스타일
   ```

4. **ESLint 및 Prettier 설정**
   - .eslintrc.json 생성
   - .prettierrc 생성
   - VS Code 설정 (.vscode/settings.json)

5. **개발 서버 실행 테스트**
   ```bash
   npm start
   ```

## Dependencies
None

## Notes
- React vs React Native 선택 기준: 웹 우선(PWA) 시작 시 React, 네이티브 앱 우선 시 React Native
- 초기 버전은 로컬 스토리지로 시작하여 빠른 프로토타이핑 가능
