# 찍찍이 (Tick-Tick-E) 🎯

초등학생을 위한 재미있는 할 일 관리 앱

## 프로젝트 소개

찍찍이는 초등학생이 스스로 오늘의 할 일을 관리하고, 완료하면 칭찬 스티커를 받는 재미있는 앱입니다.
아이들이 책임감과 성취감을 느끼며 자기 관리 습관을 기를 수 있도록 게임화(gamification) 요소를 접목했습니다.

## 기술 스택

- ⚛️ **React 19** + **TypeScript** - 타입 안정성과 컴포넌트 기반 개발
- ⚡ **Vite** - 빠른 개발 서버와 빌드
- 🎨 **Tailwind CSS** - 유틸리티 기반 스타일링, 초등학생 친화적 디자인
- 💾 **Local Storage** - 오프라인 우선 설계
- ✨ **Framer Motion** - 부드러운 애니메이션 (예정)

## 주요 기능

1. **할 일 추가** - 간단하게 오늘의 할 일 입력
2. **할 일 완료 체크** - 완료하면 체크 표시
3. **스티커 보상** - 할 일 완료 시 칭찬 메시지와 스티커 획득
4. **스티커 모음판** - 받은 스티커를 모아서 확인

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── utils/         # 유틸리티 함수
├── types/         # TypeScript 타입 정의
├── services/      # API 및 데이터 서비스
├── assets/        # 이미지, 아이콘 등
└── styles/        # 전역 스타일
```

## TaskMaster AI

이 프로젝트는 TaskMaster AI를 사용하여 관리됩니다.
- PRD: `.taskmaster/docs/prd.txt`
- 작업 목록: `.taskmaster/tasks.json`
- 상세 분석: `.taskmaster/COMPLEXITY_ANALYSIS.md`

## 라이선스

MIT
