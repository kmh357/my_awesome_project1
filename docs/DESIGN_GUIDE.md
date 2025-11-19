# 찍찍이 (Tick-Tick-E) 디자인 가이드

**버전**: 1.0.0
**최종 업데이트**: 2024년
**대상 사용자**: 초등학생 (7-13세)

---

## 목차

1. [디자인 철학](#디자인-철학)
2. [색상 팔레트](#색상-팔레트)
3. [타이포그래피](#타이포그래피)
4. [간격 및 레이아웃](#간격-및-레이아웃)
5. [컴포넌트 스타일](#컴포넌트-스타일)
6. [아이콘 및 이모지](#아이콘-및-이모지)
7. [애니메이션](#애니메이션)
8. [접근성](#접근성)
9. [반응형 디자인](#반응형-디자인)

---

## 디자인 철학

### 핵심 원칙

1. **초등학생 친화적**: 밝고 즐거운 분위기, 큰 글씨, 명확한 UI
2. **직관적 사용성**: 복잡하지 않은 인터페이스, 최소한의 단계
3. **긍정적 피드백**: 칭찬, 스티커, 축하 메시지로 동기 부여
4. **게임화 요소**: 스티커 수집, 진행도 바, 희귀도 시스템
5. **안전한 환경**: 외부 광고 없음, 안전한 컨텐츠

### 디자인 목표

- 📚 **교육적**: 자기 관리 습관 형성
- 🎮 **재미있는**: 게임처럼 즐겁게 사용
- 👶 **쉬운**: 직관적이고 간단한 UI
- 🌈 **밝은**: 파스텔 색상과 친근한 디자인
- ♿ **접근 가능한**: 누구나 쉽게 사용할 수 있는 UI

---

## 색상 팔레트

### 주요 색상 (Primary Colors)

#### Primary (파란색)

메인 브랜드 색상, 버튼, 제목, 중요한 UI 요소에 사용

| 변형 | Hex Code | Tailwind | 용도 |
|------|----------|----------|------|
| Light | `#A7C7E7` | `primary-light` | 배경, 연한 강조 |
| Default | `#6B9BD1` | `primary` | 버튼, 제목, 링크 |
| Dark | `#4A7BA7` | `primary-dark` | 호버 상태 |

**사용 예시**:
- 메인 제목 "찍찍이 (Tick-Tick-E)"
- 추가 버튼, 확인 버튼
- 진행도 바 (그라데이션)
- 체크박스 (완료 상태)

#### Secondary (핑크색)

보조 색상, 강조, 축하 메시지에 사용

| 변형 | Hex Code | Tailwind | 용도 |
|------|----------|----------|------|
| Light | `#FFE5D9` | `secondary-light` | 배경, 연한 강조 |
| Default | `#FFB3BA` | `secondary` | 강조, 보조 버튼 |
| Dark | `#FF8FA3` | `secondary-dark` | 호버 상태 |

**사용 예시**:
- "모두 완료했어요!" 축하 메시지
- 진행도 바 (그라데이션 끝부분)
- 스티커 배경 원 (그라데이션)

### 강조 색상 (Accent Colors)

#### Accent Yellow

| Hex Code | Tailwind | 용도 |
|----------|----------|------|
| `#FFFACD` | `accent-yellow` | 전설 스티커 배지 배경 |

#### Accent Green

| Hex Code | Tailwind | 용도 |
|----------|----------|------|
| `#B2F7EF` | `accent-green` | 완료된 할 일 배경 |

#### Accent Purple

| Hex Code | Tailwind | 용도 |
|----------|----------|------|
| `#E0BBE4` | `accent-purple` | 에픽 스티커 배지, 스티커 모음판 |

#### Accent Orange

| Hex Code | Tailwind | 용도 |
|----------|----------|------|
| `#FFD8BE` | `accent-orange` | 장식 요소 |

### 중립 색상 (Neutral Colors)

#### Gray Scale

| 이름 | Hex Code | Tailwind | 용도 |
|------|----------|----------|------|
| Gray 50 | `#F9FAFB` | `gray-50` | 연한 배경 |
| Gray 100 | `#F3F4F6` | `gray-100` | 카드 배경 (비활성) |
| Gray 200 | `#E5E7EB` | `gray-200` | 테두리, 진행 바 배경 |
| Gray 300 | `#D1D5DB` | `gray-300` | 테두리 (기본) |
| Gray 400 | `#9CA3AF` | `gray-400` | 텍스트 (보조) |
| Gray 500 | `#6B7280` | `gray-500` | 텍스트 (완료), 아이콘 |
| Gray 600 | `#4B5563` | `gray-600` | 텍스트 (설명) |
| Gray 700 | `#374151` | `gray-700` | 텍스트 (제목) |
| Gray 800 | `#1F2937` | `gray-800` | 텍스트 (본문) |
| White | `#FFFFFF` | `white` | 카드, 배경, 텍스트 |
| Black | `#000000` | `black` | 텍스트, 오버레이 |

### 상태 색상 (State Colors)

#### Success (성공)

| Hex Code | Tailwind | 용도 |
|----------|----------|------|
| `#10B981` | `green-500` | 성공 메시지 |

#### Error (에러)

| 변형 | Hex Code | Tailwind | 용도 |
|------|----------|----------|------|
| Background | `#FEF2F2` | `red-50` | 에러 박스 배경 |
| Border | `#FECACA` | `red-200` | 에러 박스 테두리 |
| Text | `#DC2626` | `red-600` | 에러 메시지 텍스트 |
| Input | `#F87171` | `red-400` | 에러 상태 입력 필드 |

### 색상 사용 가이드라인

#### Do's ✅

- 파스텔 톤의 밝은 색상 사용
- 명확한 색상 대비 (텍스트와 배경)
- 일관된 색상 팔레트 유지
- 상태에 따라 적절한 색상 사용

#### Don'ts ❌

- 너무 어둡거나 강렬한 색상 지양
- 빨간색을 삭제 외의 용도로 과도하게 사용 금지
- 동일한 색상을 여러 의미로 사용 금지
- 낮은 대비의 색상 조합 사용 금지

---

## 타이포그래피

### 폰트 패밀리

```css
font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
             'Droid Sans', 'Helvetica Neue', sans-serif;
```

**주 폰트**: Noto Sans KR (한글 지원)
**대체 폰트**: 시스템 기본 산세리프 폰트

### 폰트 크기 (Font Sizes)

초등학생의 가독성을 위해 일반 웹보다 큰 글씨 사용

| 클래스 | 크기 (px) | 크기 (rem) | 용도 | 예시 |
|--------|-----------|-----------|------|------|
| `text-kid-sm` | 16px | 1rem | 보조 텍스트, 캡션 | "5/50", 푸터 |
| `text-kid-base` | 18px | 1.125rem | 본문, 버튼 | 할 일 텍스트, 버튼 |
| `text-kid-lg` | 20px | 1.25rem | 작은 제목 | 이모지 (중간) |
| `text-kid-xl` | 24px | 1.5rem | 중간 제목 | 빈 상태 제목 |
| `text-kid-2xl` | 32px | 2rem | 큰 제목 | 페이지 제목 |

### 이모지 크기

| 클래스 | 크기 (px) | 용도 |
|--------|-----------|------|
| `text-2xl` | 24px | 작은 이모지 (✨, 하단 장식) |
| `text-5xl` | 48px | 중간 이모지 (스티커 그리드) |
| `text-6xl` | 60px | 큰 이모지 (🎉, 팝업 상단) |
| `text-7xl` | 72px | 매우 큰 이모지 (스티커 placeholder) |
| `text-8xl` | 96px | 초대형 이모지 (📝, 빈 상태) |

### 폰트 굵기 (Font Weights)

| 클래스 | 굵기 | 용도 |
|--------|------|------|
| `font-normal` | 400 | 본문 텍스트 |
| `font-medium` | 500 | 강조, 라벨 |
| `font-bold` | 700 | 제목, 버튼 |

### 줄 높이 (Line Heights)

| 클래스 | 배율 | 용도 |
|--------|------|------|
| `leading-tight` | 1.25 | 제목 |
| `leading-normal` | 1.5 | 본문 (기본) |
| `leading-relaxed` | 1.625 | 긴 텍스트 |

### 타이포그래피 예시

#### 페이지 제목
```html
<h1 class="text-kid-2xl font-bold text-primary">
  찍찍이 (Tick-Tick-E)
</h1>
```

#### 섹션 제목
```html
<h2 class="text-kid-xl font-bold text-gray-800">
  오늘의 할 일
</h2>
```

#### 본문 텍스트
```html
<p class="text-kid-base text-gray-700">
  할 일을 완료해서 스티커를 받았어요!
</p>
```

#### 보조 텍스트
```html
<p class="text-kid-sm text-gray-500">
  스티커 모음판에 추가되었어요
</p>
```

---

## 간격 및 레이아웃

### 기본 간격 (Spacing Scale)

Tailwind CSS의 4px 기반 간격 시스템 사용

| 클래스 | 크기 (px) | 용도 |
|--------|-----------|------|
| `space-y-1` | 4px | 매우 작은 간격 |
| `space-y-2` | 8px | 작은 간격 |
| `space-y-3` | 12px | 기본 간격 (할 일 항목) |
| `space-y-4` | 16px | 중간 간격 |
| `space-y-6` | 24px | 큰 간격 (섹션) |
| `space-y-8` | 32px | 매우 큰 간격 |

### 패딩 (Padding)

| 클래스 | 크기 (px) | 용도 |
|--------|-----------|------|
| `p-2` | 8px | 작은 컴포넌트 |
| `p-3` | 12px | 에러 메시지, 도움말 |
| `p-4` | 16px | 할 일 항목, 입력 필드 |
| `p-6` | 24px | 카드 내부 |
| `p-8` | 32px | 모달 내부 |

### 모서리 둥글기 (Border Radius)

| 클래스 | 크기 (px) | 용도 |
|--------|-----------|------|
| `rounded-xl` | 12px | 입력 필드, 에러 박스 |
| `rounded-2xl` | 16px | 버튼, 할 일 항목 |
| `rounded-3xl` | 24px | 카드, 모달 |
| `rounded-full` | 50% | 원형 (체크박스, 배지, 버튼) |

### 레이아웃 컨테이너

#### 페이지 컨테이너

```html
<div class="min-h-screen bg-gradient-to-b from-primary-light/20 to-white p-4">
  <div class="max-w-2xl mx-auto">
    <!-- 콘텐츠 -->
  </div>
</div>
```

**최대 너비**:
- 할 일 목록 페이지: `max-w-2xl` (672px)
- 스티커 모음판 페이지: `max-w-4xl` (896px)
- 모달: `max-w-md` (448px)

#### 카드 컨테이너

```html
<div class="card">
  <!-- 콘텐츠 -->
</div>
```

**스타일**: 흰색 배경, 24px 둥근 모서리, 큰 그림자, 24px 패딩

---

## 컴포넌트 스타일

### 버튼 (Buttons)

#### Primary 버튼

```html
<button class="btn-primary">
  추가
</button>
```

**스타일**:
- 배경: 파란색 (`bg-primary`)
- 텍스트: 흰색, 굵게, 18px
- 패딩: 12px 상하, 24px 좌우
- 모서리: 16px 둥글게
- 그림자: 큰 그림자
- 호버: 진한 파란색, 그림자 확대, 105% 확대
- 최소 크기: 44x44px

**코드**:
```css
.btn-primary {
  @apply bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-2xl
         transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105
         min-w-[44px] min-h-[44px] text-kid-base;
}
```

#### Secondary 버튼

```html
<button class="btn-secondary">
  스티커 모음판
</button>
```

**스타일**: Primary와 동일하나 배경색이 핑크색 (`bg-secondary`)

### 입력 필드 (Input Fields)

```html
<input type="text" class="input-field" placeholder="예: 수학 숙제하기" />
```

**스타일**:
- 패딩: 12px 좌우, 12px 상하
- 테두리: 2px 회색
- 모서리: 12px 둥글게
- 포커스: 파란색 테두리 + 링
- 텍스트: 18px

**코드**:
```css
.input-field {
  @apply w-full px-4 py-3 text-kid-base border-2 border-gray-300 rounded-xl
         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
         transition-all duration-200;
}
```

### 카드 (Cards)

```html
<div class="card">
  <!-- 콘텐츠 -->
</div>
```

**스타일**:
- 배경: 흰색
- 모서리: 24px 둥글게
- 그림자: 큰 그림자
- 패딩: 24px

**코드**:
```css
.card {
  @apply bg-white rounded-3xl shadow-lg p-6;
}
```

### 체크박스 (Custom Checkbox)

**미완료 상태**:
- 크기: 40x40px
- 모양: 원형
- 테두리: 4px 회색
- 배경: 흰색

**완료 상태**:
- 배경: 파란색
- 테두리: 4px 파란색
- 크기: 105% 확대
- 체크 아이콘: 흰색 SVG

### 진행도 바 (Progress Bar)

**스타일**:
- 높이: 32px
- 배경: 회색 (`bg-gray-200`)
- 진행 부분: 파란색→핑크색 그라데이션
- 모서리: 완전히 둥글게
- 애니메이션: 500ms 부드러운 전환

---

## 아이콘 및 이모지

### 주요 이모지

| 이모지 | 용도 | 크기 |
|--------|------|------|
| 🎯 | 브랜드 로고 | 중간-큰 |
| ✅ | 완료 표시 (대체) | 중간 |
| 📝 | 빈 상태 (할 일 없음) | 매우 큰 (96px) |
| 🎉 | 축하 (팝업 상단) | 큰 (60px) |
| ✨ | 완료 이모지, 일반 스티커 | 작은-중간 |
| 💎 | 레어 스티커 | 중간 |
| 🌟 | 에픽 스티커 | 중간 |
| 👑 | 전설 스티커 | 중간 |
| 💪 | 응원 메시지 | 작은 |
| 🏆 | 100% 완성 | 중간 |
| 💡 | 도움말 | 작은 |
| ⚠️ | 에러/경고 | 중간 |
| 📦 | 빈 상태 (스티커 없음) | 매우 큰 |
| 🎨 | 스티커 모음판 | 작은 |

### SVG 아이콘

#### 체크 마크
```jsx
<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor">
  <path d="M5 13l4 4L19 7"></path>
</svg>
```

#### X (닫기/삭제)
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor">
  <path d="M6 18L18 6M6 6l12 12"></path>
</svg>
```

---

## 애니메이션

### 애니메이션 원칙

1. **빠르고 부드럽게**: 300-500ms 지속 시간
2. **의미 있는 움직임**: 사용자 행동에 대한 피드백
3. **과하지 않게**: 너무 많은 애니메이션 지양
4. **성능 고려**: CSS transform/opacity 사용

### 주요 애니메이션

#### 1. pop (팝 효과)

**용도**: 완료 이모지 (✨)

**지속 시간**: 300ms

```css
@keyframes pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

#### 2. fadeIn (페이드 인)

**용도**: 모달 배경 오버레이

**지속 시간**: 300ms

```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

#### 3. popIn (팝 인)

**용도**: 모달 카드 등장

**지속 시간**: 400ms

```css
@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

#### 4. pulse-slow (느린 펄스)

**용도**: 스티커 배경 원

**지속 시간**: 2s (무한 반복)

```css
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
}
```

#### 5. sparkle (반짝임)

**용도**: 하단 장식 이모지

**지속 시간**: 1s (무한 반복)

```css
@keyframes sparkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
```

#### 6. bounce (튀어오르기)

**용도**: 팝업 상단 이모지, 빈 상태 이모지

**Tailwind 내장**: `animate-bounce`

### 전환 효과 (Transitions)

| 클래스 | 지속 시간 | 용도 |
|--------|-----------|------|
| `transition-all duration-200` | 200ms | 입력 필드 포커스 |
| `transition-all duration-300` | 300ms | 버튼, 체크박스, 할 일 항목 |
| `transition-all duration-500` | 500ms | 진행도 바 |
| `transition-colors` | 250ms | 색상 변경 (글자 수 카운터) |

---

## 접근성

### 터치 영역

**최소 크기**: 44x44px (Apple/Google 권장)

**적용 대상**:
- 모든 버튼
- 체크박스
- 링크
- 터치 가능한 요소

### 색상 대비

**WCAG AA 준수**:
- 본문 텍스트: 최소 4.5:1 대비
- 큰 텍스트 (18px+): 최소 3:1 대비
- UI 요소: 최소 3:1 대비

### 키보드 내비게이션

**Tab 키**: 모든 인터랙티브 요소에 접근 가능

**Enter/Space**: 버튼 활성화

**Escape**: 모달 닫기

### 스크린 리더

**이미지**: `alt` 속성 제공

**버튼**: 명확한 텍스트 라벨

**ARIA 속성**: 필요 시 적용
- `aria-label`
- `role="dialog"`
- `aria-modal="true"`

---

## 반응형 디자인

### 브레이크포인트

| 이름 | 최소 너비 | 용도 |
|------|-----------|------|
| `sm` | 640px | 작은 태블릿 |
| `md` | 768px | 태블릿 |
| `lg` | 1024px | 데스크톱 |
| `xl` | 1280px | 큰 데스크톱 |

### 그리드 레이아웃

#### 스티커 그리드

**모바일** (< 640px):
```html
<div class="grid grid-cols-3 gap-4">
```

**태블릿+** (>= 640px):
```html
<div class="grid grid-cols-4 gap-4">
```

### 반응형 패딩

**모바일**: `p-4` (16px)

**데스크톱**: `p-4` (유지, 일관성 유지)

---

## 스티커 모음판 디자인

### 그리드 레이아웃

**모바일**: 3열 그리드 (`grid-cols-3`)

**태블릿 이상**: 4열 그리드 (`sm:grid-cols-4`)

**간격**: 16px (`gap-4`)

### 개별 스티커 아이템

#### 획득한 스티커

**스타일**:
- 배경: 흰색
- 테두리: 4px, 희귀도별 색상
- 모서리: 16px 둥글게
- 정사각형 (aspect-square)
- 호버: 105% 확대, 큰 그림자

**희귀도별 테두리**:
- common: 회색 (`border-gray-300`)
- rare: 파란색 (`border-blue-400`)
- epic: 보라색 (`border-purple-400`)
- legendary: 노란색 (`border-yellow-400`)

#### 미획득 스티커

**스타일**:
- 배경: 연한 회색 (`bg-gray-100`)
- 투명도: 60% (`opacity-60`)
- 테두리: 회색 (`border-gray-200`)
- 물음표 표시 (?)
- "미획득" 오버레이

#### 중복 획득 배지

**위치**: 우측 상단 (-8px)

**스타일**:
- 배경: 파란색 (`bg-primary`)
- 텍스트: 흰색, 굵게, 14px
- 크기: 28x28px 원형
- 그림자: 중간
- 내용: "×개수"

### 진행도 바

**스타일**: TodoList 페이지와 유사하나 색상만 다름
- 그라데이션: 보라색→핑크색 (`from-accent-purple to-secondary`)

---

## 부록

### Tailwind 설정 파일

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A7C7E7',
          DEFAULT: '#6B9BD1',
          dark: '#4A7BA7',
        },
        secondary: {
          light: '#FFE5D9',
          DEFAULT: '#FFB3BA',
          dark: '#FF8FA3',
        },
        accent: {
          yellow: '#FFFACD',
          green: '#B2F7EF',
          purple: '#E0BBE4',
          orange: '#FFD8BE',
        },
      },
      fontSize: {
        'kid-sm': '1rem',      // 16px
        'kid-base': '1.125rem', // 18px
        'kid-lg': '1.25rem',    // 20px
        'kid-xl': '1.5rem',     // 24px
        'kid-2xl': '2rem',      // 32px
      },
    },
  },
}
```

### 파일 구조

```
src/
├── pages/
│   ├── TodoListPage.tsx        # 메인 페이지
│   └── StickerCollectionPage.tsx # 스티커 모음판
├── components/
│   ├── ProgressBar.tsx         # 진행도 바
│   ├── TodoList.tsx            # 할 일 목록
│   ├── TodoItem.tsx            # 할 일 항목
│   ├── TodoInput.tsx           # 할 일 입력
│   ├── EmptyState.tsx          # 빈 상태
│   ├── StickerRewardModal.tsx  # 스티커 보상 팝업
│   ├── StickerCollectionProgress.tsx # 스티커 수집 진행도
│   ├── StickerGrid.tsx         # 스티커 그리드
│   └── StickerGridItem.tsx     # 스티커 아이템
├── services/
│   ├── userService.ts          # 사용자 관리
│   ├── taskService.ts          # 할 일 관리
│   └── stickerService.ts       # 스티커 관리
├── types/
│   ├── user.ts                 # 사용자 타입
│   ├── task.ts                 # 할 일 타입
│   └── sticker.ts              # 스티커 타입
├── utils/
│   └── localStorage.ts         # 로컬 스토리지
└── styles/
    └── index.css               # 전역 스타일
```

---

**끝**

이 디자인 가이드는 찍찍이 앱의 일관된 디자인을 유지하기 위한 참고 문서입니다.
새로운 기능을 추가하거나 디자인을 변경할 때는 이 가이드를 따라주세요.
