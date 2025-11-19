# 스티커 보상 팝업 디자인 명세서

## 개요

스티커 보상 팝업은 사용자가 할 일을 완료했을 때 나타나는 축하 모달입니다.
밝고 즐거운 분위기로 사용자에게 성취감을 주고, 획득한 스티커를 자랑스럽게 표시합니다.

---

## 레이아웃 구조

```
┌──────────────────────────────────────┐
│              배경 오버레이            │ (반투명 검은색 + 흐림 효과)
│                                      │
│    ┌────────────────────────────┐   │
│    │          🎉                 │   │
│    │      정말 잘했어요!          │   │
│    │  할 일을 완료해서 스티커를    │   │
│    │       받았어요!              │   │
│    ├────────────────────────────┤   │
│    │                            │   │
│    │       ┌────────────┐       │   │
│    │       │            │       │   │ (스티커 배경 원)
│    │       │  🌟 토끼   │       │   │ (스티커 이미지)
│    │       │            │       │   │
│    │       └────────────┘       │   │
│    │         💎 레어             │   │ (희귀도 배지)
│    │                            │   │
│    ├────────────────────────────┤   │
│    │          토끼               │   │ (스티커 이름)
│    │   스티커 모음판에 추가됨     │   │
│    ├────────────────────────────┤   │
│    │        [ 확인 ]            │   │ (확인 버튼)
│    │      ✨ 🌟 ✨              │   │ (하단 장식)
│    └────────────────────────────┘   │
│                                      │
└──────────────────────────────────────┘
```

---

## 1. 팝업 배경 및 레이아웃

### 배경 오버레이

**위치**: 전체 화면 덮기 (`fixed inset-0`)

**스타일**:
- 배경색: 검은색 50% 투명도 (`bg-black/50`)
- 흐림 효과: 약한 블러 (`backdrop-blur-sm`)
- z-index: 40 (`z-40`)
- 애니메이션: 페이드인 (`animate-fadeIn`, 0.3s)

**인터랙션**:
- 클릭 시 모달 닫기 (`onClick={onClose}`)

### 모달 컨테이너

**위치**: 화면 중앙 (`fixed inset-0 flex items-center justify-center`)

**z-index**: 50 (`z-50`, 오버레이보다 위)

**패딩**: 16px (`p-4`, 화면 가장자리 여백)

### 모달 카드

**크기**:
- 최대 너비: 448px (`max-w-md`)
- 너비: 100% (`w-full`)
- 패딩: 32px (`p-8`)

**스타일**:
- 배경: 흰색 (`bg-white`)
- 모서리: 둥글게 24px (`rounded-3xl`)
- 그림자: 매우 큰 그림자 (`shadow-2xl`)
- 애니메이션: 팝인 효과 (`animate-popIn`, 0.4s)

---

## 2. 칭찬 메시지 텍스트 스타일링

### 상단 장식 이모지

**이모지**: 🎉

**크기**: 60px (`text-6xl`)

**애니메이션**: 튀어오르기 (`animate-bounce`)

**여백**: 하단 12px (`mb-3`)

### 칭찬 메시지 (주 제목)

**텍스트**: 랜덤 칭찬 메시지 (8가지 중 하나)
- "정말 잘했어요!"
- "대단해요!"
- "최고예요!"
- "멋져요!"
- "훌륭해요!"
- "와! 대박!"
- "짱이에요!"
- "완벽해요!"

**스타일**:
- 크기: 32px (`text-kid-2xl`)
- 색상: 파란색 (`text-primary`)
- 굵기: 굵게 (`font-bold`)
- 여백: 하단 8px (`mb-2`)
- 정렬: 중앙 (`text-center`)

### 설명 텍스트

**텍스트**: "할 일을 완료해서 스티커를 받았어요!"

**스타일**:
- 크기: 18px (`text-kid-base`)
- 색상: 회색 (`text-gray-600`)
- 굵기: 보통
- 정렬: 중앙 (`text-center`)

---

## 3. 스티커 이미지 표시 영역

### 외부 배경 원 (Outer Circle)

**크기**: 192x192px (`w-48 h-48`)

**스타일**:
- 모양: 원형 (`rounded-full`)
- 배경: 파란색→핑크색 그라데이션 30% 투명도
  - `bg-gradient-to-br from-primary-light/30 to-secondary/30`
- 그림자: 큰 그림자 (`shadow-lg`)
- 정렬: 중앙 (`mx-auto flex items-center justify-center`)

**애니메이션**: 느린 펄스 (`animate-pulse-slow`, 2s 무한 반복)

### 내부 흰색 원 (Inner Circle)

**크기**: 128x128px (`w-32 h-32`)

**스타일**:
- 모양: 원형 (`rounded-full`)
- 배경: 흰색 (`bg-white`)
- 그림자: 안쪽 그림자 (`shadow-inner`)
- 정렬: 중앙 (`flex items-center justify-center`)

### 스티커 이미지

**크기**: 112x112px (`w-28 h-28`)

**표시 방식**:
1. **실제 이미지가 있는 경우** (http URL):
   ```jsx
   <img
     src={sticker.imageUrl}
     alt={sticker.stickerName}
     className="w-28 h-28 object-contain"
   />
   ```

2. **이미지가 없는 경우** (placeholder):
   - 희귀도별 이모지 표시
   - 크기: 112px (`text-7xl`)

### 희귀도별 Placeholder 이모지

| 희귀도 | 이모지 |
|--------|--------|
| common | ✨ |
| rare | 💎 |
| epic | 🌟 |
| legendary | 👑 |

---

## 4. 희귀도 배지 디자인

### 위치

**배치**: 스티커 원 하단 중앙

**위치 조정**:
- `absolute` 위치 지정
- 하단에서 -8px (`-bottom-2`)
- 좌우 중앙 (`left-1/2 transform -translate-x-1/2`)

### 스타일

**크기**:
- 패딩: 상하 8px, 좌우 16px (`px-4 py-2`)
- 높이: 자동

**모양**:
- 모서리: 완전히 둥글게 (`rounded-full`)
- 그림자: 중간 그림자 (`shadow-md`)

**레이아웃**:
- 방향: 가로 (`flex`)
- 정렬: 중앙 (`items-center`)
- 간격: 8px (`gap-2`)

### 희귀도별 색상

| 희귀도 | 배경색 | 텍스트 색상 | 라벨 | 이모지 |
|--------|--------|-------------|------|--------|
| common | `bg-gray-100` | `text-gray-600` | 일반 | ✨ |
| rare | `bg-blue-100` | `text-blue-600` | 레어 | 💎 |
| epic | `bg-purple-100` | `text-purple-600` | 에픽 | 🌟 |
| legendary | `bg-yellow-100` | `text-yellow-600` | 전설 | 👑 |

### 내부 구조

```jsx
<div className="배경색 텍스트색 px-4 py-2 rounded-full">
  <span className="text-xl">{이모지}</span>
  <span>{라벨}</span>
</div>
```

---

## 5. 확인 버튼 디자인

### 스타일

**크기**:
- 너비: 100% (`w-full`)
- 최소 높이: 44px (btn-primary 기본값)

**외관**:
- 클래스: `btn-primary` (재사용)
- 배경: 파란색 (`bg-primary`)
- 텍스트: 흰색, 굵게, 18px
- 모서리: 둥글게 16px
- 그림자: 큰 그림자

**텍스트**: "확인"

**인터랙션**:
- 클릭 시: `onClose()` 호출
- 호버 시: 배경색 진하게, 그림자 확대, 105% 확대

---

## 스티커 이름 및 안내 텍스트

### 스티커 이름 (제목)

**텍스트**: 스티커 이름 (예: "토끼")

**스타일**:
- 크기: 24px (`text-kid-xl`)
- 색상: 진한 회색 (`text-gray-800`)
- 굵기: 굵게 (`font-bold`)
- 여백: 하단 4px (`mb-1`)
- 정렬: 중앙

### 안내 텍스트

**텍스트**: "스티커 모음판에 추가되었어요"

**스타일**:
- 크기: 16px (`text-kid-sm`)
- 색상: 회색 (`text-gray-500`)
- 굵기: 보통
- 정렬: 중앙

---

## 하단 장식

### 이모지 세트

**이모지**: ✨ 🌟 ✨

**크기**: 24px (`text-2xl`)

**레이아웃**:
- 방향: 가로 (`inline-flex`)
- 간격: 8px (`gap-2`)
- 정렬: 중앙 (`text-center`)

**애니메이션**: 반짝임 (`animate-sparkle`, 1s 무한 반복)

**여백**: 상단 16px (`mt-4`)

---

## 색상 팔레트

### 배경 및 오버레이

| 요소 | 색상 코드 | CSS 클래스 |
|------|-----------|------------|
| 오버레이 | #000000 (50%) | bg-black/50 |
| 모달 배경 | #FFFFFF | bg-white |
| 스티커 배경 원 | 그라데이션 (30%) | from-primary-light/30 to-secondary/30 |
| 스티커 내부 원 | #FFFFFF | bg-white |

### 텍스트

| 요소 | 색상 코드 | CSS 클래스 |
|------|-----------|------------|
| 주 제목 | #6B9BD1 | text-primary |
| 설명 텍스트 | #4B5563 | text-gray-600 |
| 스티커 이름 | #1F2937 | text-gray-800 |
| 안내 텍스트 | #6B7280 | text-gray-500 |

### 희귀도 배지

| 희귀도 | 배경 | 텍스트 |
|--------|------|--------|
| common | #F3F4F6 | #4B5563 |
| rare | #DBEAFE | #2563EB |
| epic | #EDE9FE | #9333EA |
| legendary | #FEF3C7 | #CA8A04 |

---

## 애니메이션

### 1. 배경 오버레이 (fadeIn)

**효과**: 투명도 0 → 1

**지속 시간**: 300ms (`0.3s`)

**Easing**: ease-out

```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

### 2. 모달 카드 (popIn)

**효과**: 작게 시작 → 크게 → 원래 크기

**지속 시간**: 400ms (`0.4s`)

**Easing**: ease-out

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

### 3. 상단 이모지 (bounce)

**효과**: 위아래로 튀어오르기

**지속 시간**: 무한 반복

**Tailwind 내장**: `animate-bounce`

### 4. 스티커 배경 원 (pulse-slow)

**효과**: 크기 변화 (100% → 102% → 100%)

**지속 시간**: 2초 (`2s`)

**반복**: 무한 (`infinite`)

**Easing**: ease-in-out

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

### 5. 하단 장식 (sparkle)

**효과**: 크기 및 투명도 변화

**지속 시간**: 1초 (`1s`)

**반복**: 무한 (`infinite`)

**Easing**: ease-in-out

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

---

## 인터랙션

### 1. 모달 열기

**트리거**: 할 일 완료 시

**조건**:
- `isOpen === true`
- `userSticker !== null`
- `userSticker.sticker` 존재

**효과**:
- 배경 오버레이 페이드인
- 모달 카드 팝인
- 모든 애니메이션 시작

### 2. 모달 닫기

**트리거**:
- 확인 버튼 클릭
- 배경 오버레이 클릭

**동작**: `onClose()` 콜백 호출

**효과**: 모달 사라짐 (부모 컴포넌트에서 `isOpen` 상태 변경)

### 3. 희귀도 표시

**로직**:
```typescript
const rarityConfig = RARITY_CONFIG[sticker.rarity];
```

**결과**: 희귀도에 맞는 색상, 라벨, 이모지 자동 선택

### 4. 랜덤 칭찬 메시지

**로직**:
```typescript
const randomPraise = PRAISE_MESSAGES[
  Math.floor(Math.random() * PRAISE_MESSAGES.length)
];
```

**결과**: 8가지 메시지 중 하나 랜덤 선택

---

## 반응형 디자인

### 모바일 (< 448px)

**모달 카드**:
- 너비: 화면 너비 - 32px (p-4 양쪽)
- 패딩: 32px (유지)

**스티커 원**:
- 크기: 192px (유지)

### 태블릿/데스크톱 (>= 448px)

**모달 카드**:
- 최대 너비: 448px (`max-w-md`)
- 중앙 정렬

---

## 접근성 (Accessibility)

### 키보드 내비게이션

**Escape 키**: 모달 닫기 (선택적 구현)

**Tab 키**: 확인 버튼에 포커스

**Enter/Space**: 확인 버튼 클릭

### 스크린 리더

**이미지 alt**: 스티커 이름 제공

**ARIA 속성** (선택적):
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="칭찬 메시지"`

### 포커스 관리

**모달 열릴 때**: 확인 버튼에 자동 포커스

**모달 닫힐 때**: 이전 포커스 위치로 복귀

---

## 컴포넌트 Props

### StickerRewardModal

```typescript
interface StickerRewardModalProps {
  userSticker: UserSticker | null;
  isOpen: boolean;
  onClose: () => void;
}
```

**userSticker**: 획득한 스티커 정보 (sticker 필드 포함)
**isOpen**: 모달 표시 여부
**onClose**: 모달 닫기 콜백

---

## 데이터 구조

### RARITY_CONFIG

```typescript
const RARITY_CONFIG: Record<
  StickerRarity,
  { color: string; bgColor: string; label: string; sparkle: string }
> = {
  common: { color: 'text-gray-600', bgColor: 'bg-gray-100', label: '일반', sparkle: '✨' },
  rare: { color: 'text-blue-600', bgColor: 'bg-blue-100', label: '레어', sparkle: '💎' },
  epic: { color: 'text-purple-600', bgColor: 'bg-purple-100', label: '에픽', sparkle: '🌟' },
  legendary: { color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: '전설', sparkle: '👑' },
};
```

### PRAISE_MESSAGES

```typescript
const PRAISE_MESSAGES = [
  '정말 잘했어요!',
  '대단해요!',
  '최고예요!',
  '멋져요!',
  '훌륭해요!',
  '와! 대박!',
  '짱이에요!',
  '완벽해요!',
];
```

---

## 사용자 흐름 (User Flow)

```
1. 사용자가 할 일 완료 체크
   ↓
2. 스티커 보상 로직 실행
   ↓
3. 랜덤 스티커 획득
   ↓
4. isOpen=true, userSticker 설정
   ↓
5. 모달 표시 시작
   ↓
6a. 배경 오버레이 페이드인    6b. 모달 카드 팝인
   ↓                          ↓
7. 모든 애니메이션 시작
   - 🎉 튀어오르기
   - 스티커 배경 펄스
   - ✨🌟✨ 반짝임
   ↓
8. 사용자가 확인 버튼 클릭 또는 배경 클릭
   ↓
9. onClose() 호출
   ↓
10. isOpen=false 설정
   ↓
11. 모달 사라짐
```

---

## 예시 화면

### 일반 스티커 획득 (common)

```
        🎉
   정말 잘했어요!
할 일을 완료해서 스티커를 받았어요!

    ┌──────────┐
    │          │  (연한 그라데이션 배경)
    │    ✨    │  (이모지 placeholder)
    │          │
    └──────────┘
      ✨ 일반      (회색 배지)

      토끼
스티커 모음판에 추가되었어요

    [ 확인 ]

  ✨ 🌟 ✨
```

### 레어 스티커 획득 (rare)

```
        🎉
     대단해요!
할 일을 완료해서 스티커를 받았어요!

    ┌──────────┐
    │          │  (연한 그라데이션 배경)
    │    💎    │  (이모지 placeholder)
    │          │
    └──────────┘
      💎 레어      (파란색 배지)

      판다
스티커 모음판에 추가되었어요

    [ 확인 ]

  ✨ 🌟 ✨
```

### 전설 스티커 획득 (legendary)

```
        🎉
   와! 대박!
할 일을 완료해서 스티커를 받았어요!

    ┌──────────┐
    │          │  (연한 그라데이션 배경)
    │    👑    │  (이모지 placeholder)
    │          │
    └──────────┘
      👑 전설      (노란색 배지)

      금메달
스티커 모음판에 추가되었어요

    [ 확인 ]

  ✨ 🌟 ✨
```

---

## 향후 개선 사항

- [ ] 스티커 획득 축하 사운드 효과
- [ ] 희귀 스티커 획득 시 특별 파티클 효과
- [ ] 스티커 모음판으로 바로 이동 버튼
- [ ] 소셜 공유 기능
- [ ] 연속 획득 시 콤보 표시
- [ ] 스티커 획득 히스토리 확인
