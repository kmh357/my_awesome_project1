# 찍찍이 (Tick-Tick-E) 🎯✨

> 초등학생을 위한 재미있는 할 일 관리 앱

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4?logo=tailwindcss)

## 📖 소개

**찍찍이**는 초등학생들이 즐겁게 할 일을 관리할 수 있도록 설계된 웹 애플리케이션입니다. 할 일을 완료할 때마다 귀여운 스티커를 받을 수 있어 공부와 숙제를 더욱 재미있게 만들어줍니다!

### ✨ 주요 기능

- 🎯 **할 일 관리**: 간단하게 할 일을 추가하고, 수정하고, 삭제할 수 있어요
- 📅 **날짜별 관리**: 어제, 오늘, 내일의 할 일을 쉽게 볼 수 있어요
- ✅ **완료 체크**: 할 일을 완료하면 예쁜 애니메이션과 함께 체크!
- 🎁 **스티커 보상**: 할 일을 완료할 때마다 랜덤 스티커를 받아요
- 📊 **진행도 표시**: 오늘 얼마나 완료했는지 한눈에 볼 수 있어요
- 🎨 **스티커 모음판**: 25개의 귀여운 스티커를 모두 모아보세요!

## 🚀 빠른 시작

### 필수 조건

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd my_awesome_project1

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173`을 열면 앱을 사용할 수 있습니다! 🎉

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🎮 사용 방법

### 1. 할 일 추가하기

1. 화면 위쪽의 입력창에 할 일을 적어요 (최대 50자)
2. "추가" 버튼을 누르거나 Enter 키를 눌러요
3. 할 일이 목록에 나타나요!

### 2. 할 일 완료하기

1. 할 일 왼쪽의 동그라미를 눌러요
2. 예쁜 애니메이션과 함께 완료 표시가 돼요
3. 🎉 스티커 보상 팝업이 나타나요!
4. 어떤 스티커를 받았는지 확인해보세요

### 3. 할 일 수정하기

1. 수정하고 싶은 할 일 텍스트를 클릭해요
2. 텍스트가 입력창으로 바뀌어요
3. 수정한 후 Enter를 누르거나 다른 곳을 클릭해요
4. Esc 키를 누르면 취소할 수 있어요

### 4. 날짜별 보기

1. "어제", "오늘", "내일" 버튼으로 빠르게 이동해요
2. 날짜 입력창을 클릭해서 원하는 날짜를 선택할 수도 있어요
3. 선택한 날짜의 할 일만 보여요

### 5. 스티커 모으기

1. 화면 아래의 "스티커" 탭을 눌러요
2. 지금까지 모은 스티커를 볼 수 있어요
3. 25개를 모두 모아보세요! 🎨

## 🎨 스티커 종류

찍찍이에는 5가지 카테고리의 스티커가 있어요:

- 🐰 **동물**: 토끼, 고양이, 강아지, 판다, 유니콘
- 🍬 **음식**: 사탕, 아이스크림, 케이크, 도넛, 초콜릿
- ⭐ **자연**: 별, 달, 해, 무지개, 꽃
- 🏆 **트로피**: 금메달, 은메달, 동메달, 왕관, 트로피
- 😊 **이모지**: 웃음, 하트, 박수, 최고, 불꽃

### 희귀도

- **일반** (60%): 자주 나와요 ✨
- **레어** (25%): 가끔 나와요 💎
- **에픽** (12%): 드물게 나와요 🌟
- **전설** (3%): 아주 드물어요! 👑

## 🛠️ 기술 스택

### Frontend
- **React 19**: 최신 React 버전
- **TypeScript**: 타입 안전한 개발
- **Vite**: 초고속 개발 환경
- **Tailwind CSS**: 유틸리티 기반 스타일링

### State & Storage
- **React Hooks**: 상태 관리
- **LocalStorage**: 브라우저 기반 데이터 저장

### Routing
- **React Router v6**: 클라이언트 사이드 라우팅

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── DateSelector.tsx       # 날짜 선택
│   ├── ProgressBar.tsx        # 진행도 바
│   ├── TodoInput.tsx          # 할 일 입력
│   ├── TodoItem.tsx           # 할 일 항목
│   ├── TodoList.tsx           # 할 일 목록
│   ├── StickerRewardModal.tsx # 스티커 보상 팝업
│   └── ...
├── pages/              # 페이지 컴포넌트
│   ├── TodoListPage.tsx       # 메인 할 일 페이지
│   └── StickerCollectionPage.tsx  # 스티커 모음판
├── services/           # 비즈니스 로직
│   ├── taskService.ts         # 할 일 관리
│   ├── stickerService.ts      # 스티커 관리
│   └── userService.ts         # 사용자 관리
├── types/              # TypeScript 타입 정의
├── utils/              # 유틸리티 함수
└── App.tsx             # 메인 앱 컴포넌트
```

## 🎯 주요 컴포넌트

### TodoListPage
메인 할 일 페이지로, 할 일 추가/수정/삭제/완료 기능을 제공합니다.

### DateSelector
날짜를 선택할 수 있는 UI 컴포넌트입니다. 어제/오늘/내일 버튼과 날짜 선택기를 포함합니다.

### StickerRewardModal
할 일 완료 시 나타나는 스티커 보상 팝업입니다. 칭찬 메시지와 함께 획득한 스티커를 보여줍니다.

### StickerCollectionPage
사용자가 모은 모든 스티커를 그리드 형태로 보여주는 페이지입니다.

## 📚 상세 문서

더 자세한 정보는 다음 문서를 참고하세요:

- [프로젝트 요약](./docs/PROJECT_SUMMARY.md) - 전체 프로젝트 개요
- [개발자 가이드](./docs/DEVELOPER_GUIDE.md) - 개발 환경 설정 및 기여 방법
- [데이터베이스 스키마](./docs/DATABASE_SCHEMA.md) - 데이터 구조
- [디자인 가이드](./docs/DESIGN_GUIDE.md) - UI/UX 디자인 시스템
- [스티커 보상 시스템](./docs/STICKER_REWARD_SYSTEM.md) - 보상 메커니즘
- [날짜 필터링 기능](./docs/DATE_FILTERING_FEATURE.md) - 날짜별 조회
- [할 일 수정 기능](./docs/TODO_EDIT_FEATURE.md) - 편집 기능

## 🎨 디자인 원칙

### 초등학생 친화적
- 큰 버튼 (최소 44x44px)
- 명확하고 간단한 텍스트
- 밝고 친근한 색상
- 즉각적인 피드백 (애니메이션)

### 접근성
- 키보드 네비게이션 지원
- 명확한 시각적 구분
- 충분한 색상 대비
- 스크린 리더 호환

## 🔧 개발

### 스크립트

```bash
# 개발 서버 실행
npm run dev

# 타입 체크
npm run build

# ESLint 실행
npm run lint

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 환경 변수

현재 환경 변수는 사용하지 않습니다. 모든 데이터는 브라우저의 LocalStorage에 저장됩니다.

## 🚀 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify

```bash
# 빌드
npm run build

# dist 폴더를 Netlify에 드래그 앤 드롭
```

### GitHub Pages

```bash
# vite.config.ts에 base 설정 추가
export default defineConfig({
  base: '/repository-name/',
  // ...
})

# 빌드 및 배포
npm run build
# dist 폴더를 gh-pages 브랜치에 푸시
```

## 🤝 기여하기

찍찍이를 더 좋게 만들고 싶으신가요? 기여를 환영합니다!

1. 이 저장소를 Fork 하세요
2. 새 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 📝 TaskMaster AI

이 프로젝트는 TaskMaster AI를 사용하여 관리됩니다:
- **PRD**: `.taskmaster/docs/prd.txt`
- **작업 목록**: `.taskmaster/tasks.json`
- **복잡도 분석**: `.taskmaster/COMPLEXITY_ANALYSIS.md`

총 37개의 작업 중 17개 주요 작업이 완료되었습니다.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🙏 감사의 말

- 이모지 스티커는 유니코드 표준을 사용합니다
- Tailwind CSS 커뮤니티
- React 팀

## 📞 문의

질문이나 제안사항이 있으시면 이슈를 열어주세요!

---

**찍찍이와 함께 즐거운 하루를 보내세요! 🎉✨**

Made with ❤️ for elementary students
