# 라우팅 및 네비게이션 구조

## 개요

찍찍이 앱은 React Router DOM을 사용하여 클라이언트 사이드 라우팅을 구현합니다.
하단 네비게이션 바를 통해 메인 페이지와 스티커 모음판 페이지 간에 전환할 수 있습니다.

---

## 라우팅 구조

### 경로 (Routes)

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | `TodoListPage` | 메인 페이지 (할 일 목록) |
| `/collection` | `StickerCollectionPage` | 스티커 모음판 페이지 |

### 라우팅 설정

**파일**: `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import StickerCollectionPage from './pages/StickerCollectionPage';
import BottomNavigation from './components/BottomNavigation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20">
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/collection" element={<StickerCollectionPage />} />
        </Routes>
        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}
```

**주요 특징**:
- `BrowserRouter`: HTML5 History API 사용
- `pb-20`: 하단 네비게이션 공간 확보 (80px)
- 모든 페이지에서 하단 네비게이션 표시

---

## 하단 네비게이션 바

### 디자인

**파일**: `src/components/BottomNavigation.tsx`

#### 레이아웃

**위치**: 화면 하단 고정 (`fixed bottom-0 left-0 right-0`)

**z-index**: 30 (`z-30`, 다른 요소 위에 표시)

**배경**: 흰색 (`bg-white`)

**테두리**: 상단 2px 회색 테두리 (`border-t-2 border-gray-200`)

**그림자**: 큰 그림자 (`shadow-lg`)

**최대 너비**: 896px (`max-w-4xl`, 중앙 정렬)

#### 네비게이션 아이템

| 아이콘 | 라벨 | 경로 |
|--------|------|------|
| 📝 | 할 일 | `/` |
| 🎨 | 스티커 | `/collection` |

#### 스타일

**기본 상태**:
- 텍스트 색상: 회색 (`text-gray-500`)
- 호버 시: 파란색 (`hover:text-primary`)
- 아이콘 크기: 30px (`text-3xl`)
- 라벨 크기: 16px (`text-kid-sm`)

**활성 상태** (현재 페이지):
- 텍스트 색상: 파란색 (`text-primary`)
- 텍스트 굵기: 굵게 (`font-bold`)
- 아이콘 크기: 110% (`scale-110`)

**애니메이션**:
- 색상 전환: 200ms (`transition-all duration-200`)
- 아이콘 크기 전환: 200ms (`transition-transform duration-200`)

#### 활성 페이지 감지

```tsx
import { useLocation } from 'react-router-dom';

const location = useLocation();
const isActive = location.pathname === item.path;
```

**로직**:
- `useLocation()` 훅으로 현재 경로 감지
- 현재 경로와 아이템 경로 비교
- 일치하면 활성 스타일 적용

---

## 페이지 전환 동작

### 클릭 이벤트

**사용**: React Router의 `<Link>` 컴포넌트

```tsx
<Link to={item.path}>
  {/* 네비게이션 아이템 */}
</Link>
```

**장점**:
- 페이지 새로고침 없음 (SPA)
- 빠른 전환 속도
- 브라우저 뒤로 가기/앞으로 가기 지원
- URL 히스토리 관리

### 전환 효과

**없음**: 기본적으로 즉시 전환

**향후 개선 가능**:
- 페이드 인/아웃 애니메이션
- 슬라이드 전환 효과
- 로딩 스피너

---

## 앱 초기화

### 초기화 로직

**위치**: `App.tsx`의 `useEffect` 훅

```tsx
import { initializeApp } from './services/initService';

useEffect(() => {
  initializeApp();
}, []);
```

**실행 시점**: 앱 최초 로드 시 (마운트 시 1회)

**초기화 내용**:
1. 기본 스티커 데이터 생성 (25개)
2. 기본 사용자 생성 (이름: "친구")

**파일**: `src/services/initService.ts`

```typescript
export function initializeApp(): void {
  console.log('[InitService] 앱 초기화 시작...');

  // 1. 기본 스티커 데이터 초기화
  initializeDefaultStickers();
  console.log('[InitService] ✅ 스티커 데이터 초기화 완료');

  // 2. 사용자 초기화 (없으면 기본 사용자 생성)
  const user = initializeUser('친구');
  console.log('[InitService] ✅ 사용자 초기화 완료:', user.userName);

  console.log('[InitService] 🎉 앱 초기화 완료!');
}
```

---

## 페이지 구조

### 공통 레이아웃

**모든 페이지**:
- 최소 높이: 전체 화면 (`min-h-screen`)
- 하단 패딩: 80px (`pb-20`, 네비게이션 공간)
- 배경: 그라데이션 (페이지별 다름)

### 페이지별 배경

**TodoListPage** (`/`):
```tsx
<div className="min-h-screen bg-gradient-to-b from-primary-light/20 to-white p-4">
```
- 그라데이션: 연한 파란색 → 흰색

**StickerCollectionPage** (`/collection`):
```tsx
<div className="min-h-screen bg-gradient-to-b from-accent-purple/20 to-white p-4">
```
- 그라데이션: 연한 보라색 → 흰색

---

## 네비게이션 흐름

### 사용자 흐름

```
1. 앱 실행
   ↓
2. App.tsx 마운트
   ↓
3. 앱 초기화 (스티커 데이터, 사용자 생성)
   ↓
4. 기본 경로 (/) 렌더링 → TodoListPage 표시
   ↓
5. 하단 네비게이션 표시
   ↓
6a. 사용자가 "할 일" 탭 클릭    6b. 사용자가 "스티커" 탭 클릭
   ↓                              ↓
7a. "/" 경로로 이동              7b. "/collection" 경로로 이동
   ↓                              ↓
8a. TodoListPage 렌더링          8b. StickerCollectionPage 렌더링
   ↓                              ↓
9. 하단 네비게이션 활성 상태 업데이트
```

---

## 디렉토리 구조

```
src/
├── App.tsx                      # 메인 앱 컴포넌트 (라우팅 설정)
├── pages/
│   ├── TodoListPage.tsx         # 메인 페이지
│   └── StickerCollectionPage.tsx # 스티커 모음판 페이지
├── components/
│   └── BottomNavigation.tsx     # 하단 네비게이션 바
└── services/
    └── initService.ts           # 앱 초기화 서비스
```

---

## 의존성

### 패키지

**react-router-dom**: ^6.x

**설치**:
```bash
npm install react-router-dom
```

**사용 모듈**:
- `BrowserRouter`: 라우터 컨테이너
- `Routes`: 라우트 목록 컨테이너
- `Route`: 개별 라우트 정의
- `Link`: 네비게이션 링크
- `useLocation`: 현재 경로 감지 훅

---

## 성능 최적화

### 코드 스플리팅 (향후 개선)

**현재**: 모든 페이지를 한 번에 로드

**개선 가능**:
```tsx
import { lazy, Suspense } from 'react';

const TodoListPage = lazy(() => import('./pages/TodoListPage'));
const StickerCollectionPage = lazy(() => import('./pages/StickerCollectionPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/collection" element={<StickerCollectionPage />} />
        </Routes>
      </Suspense>
      <BottomNavigation />
    </BrowserRouter>
  );
}
```

**장점**:
- 초기 로드 시간 감소
- 필요한 페이지만 로드
- 번들 크기 최적화

---

## 접근성

### 키보드 내비게이션

**Tab 키**: 네비게이션 아이템 간 이동

**Enter/Space**: 선택한 아이템으로 이동

### 스크린 리더

**링크 라벨**: "할 일", "스티커" (명확한 텍스트)

**활성 상태**: 굵은 글씨로 시각적 구분

### 터치 영역

**높이**: 약 60px (패딩 포함)

**너비**: 화면 너비의 50% (2개 아이템)

**최소 터치 영역**: 44x44px 충족

---

## 브라우저 호환성

### 지원 브라우저

**모던 브라우저**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**모바일 브라우저**:
- iOS Safari 14+
- Chrome Android 90+

### HTML5 History API

**필요**: React Router의 `BrowserRouter` 사용

**대체**: `HashRouter` (레거시 브라우저 지원 필요 시)

---

## 디버깅

### 콘솔 로그

**앱 초기화**:
```
[InitService] 앱 초기화 시작...
[InitService] ✅ 스티커 데이터 초기화 완료
[InitService] ✅ 사용자 초기화 완료: 친구
[InitService] 🎉 앱 초기화 완료!
```

**확인 방법**:
1. 개발 서버 실행: `npm run dev`
2. 브라우저 콘솔 열기: F12 → Console 탭
3. 초기화 로그 확인

### React DevTools

**설치**: [React Developer Tools](https://react.dev/learn/react-developer-tools)

**활용**:
- 컴포넌트 트리 확인
- State/Props 검사
- 라우팅 상태 확인

---

## 향후 개선 사항

- [ ] 페이지 전환 애니메이션
- [ ] 코드 스플리팅 적용
- [ ] 404 페이지 추가
- [ ] 네비게이션 가드 (인증 필요 시)
- [ ] 뒤로 가기 버튼 (브라우저 히스토리 활용)
- [ ] 스와이프 제스처로 페이지 전환
- [ ] 상단 헤더 추가 (페이지 제목)
- [ ] 로딩 상태 표시
