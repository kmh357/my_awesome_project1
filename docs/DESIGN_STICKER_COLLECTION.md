# 스티커 모음판 화면 디자인 명세서

## 개요

스티커 모음판은 사용자가 획득한 스티커들을 한눈에 볼 수 있는 화면입니다.
게임의 도감처럼, 수집 진행도와 획득한 스티커를 확인하며 성취감을 느낄 수 있습니다.

---

## 레이아웃 구조

```
┌──────────────────────────────────────────┐
│          스티커 모음판                    │
│   내가 모은 스티커를 확인해보세요! 🎨     │
├──────────────────────────────────────────┤
│  나의 스티커 모음           8/25         │
│  [=========>          ] 32%              │
├──────────────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐               │
│  │ ✨│ │ 💎│ │ ? │ │ ? │               │
│  └───┘ └───┘ └───┘ └───┘               │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐               │
│  │ ? │ │ ✨│ │ ? │ │ ? │               │
│  └───┘ └───┘ └───┘ └───┘               │
│  ...                                     │
├──────────────────────────────────────────┤
│ 💡 할 일을 완료하면 더 많은 스티커를      │
│    받을 수 있어요!                        │
└──────────────────────────────────────────┘
```

---

## 1. 그리드 레이아웃

### 기본 구조

**CSS Grid 사용**:
```html
<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
  <!-- 스티커 아이템들 -->
</div>
```

### 반응형 레이아웃

**모바일** (< 640px):
- 열 개수: 3열 (`grid-cols-3`)
- 간격: 16px (`gap-4`)
- 화면 너비에 맞춰 자동 조절

**태블릿 이상** (>= 640px):
- 열 개수: 4열 (`sm:grid-cols-4`)
- 간격: 16px (유지)
- 최대 너비: 896px (`max-w-4xl`)

### 스티커 정렬 순서

**정렬 기준**: 스티커 ID 순서 (기본 데이터 순서 유지)

**표시 방식**:
- 획득/미획득 섞여서 표시
- 같은 위치에 항상 같은 스티커 표시

---

## 2. 획득/미획득 스티커 표시

### 획득한 스티커

#### 기본 스타일

**크기**: 정사각형 (aspect-square)

**배경 및 테두리**:
- 배경: 흰색 (`bg-white`)
- 테두리: 4px, 희귀도별 색상
- 모서리: 16px 둥글게 (`rounded-2xl`)

**패딩**: 12px (`p-3`)

#### 희귀도별 테두리 색상

| 희귀도 | 테두리 색상 | Tailwind 클래스 |
|--------|-------------|-----------------|
| common | 회색 (#D1D5DB) | `border-gray-300` |
| rare | 파란색 (#60A5FA) | `border-blue-400` |
| epic | 보라색 (#C084FC) | `border-purple-400` |
| legendary | 노란색 (#FACC15) | `border-yellow-400` |

#### 스티커 이미지

**표시 방식**:
1. **실제 이미지 있는 경우**:
   ```jsx
   <img
     src={sticker.imageUrl}
     alt={sticker.stickerName}
     className="w-full h-full object-contain"
   />
   ```

2. **이미지 없는 경우** (placeholder):
   - 희귀도별 이모지 표시
   - 크기: 48px (`text-5xl`)

#### 호버 효과

**효과**:
- 크기: 105% 확대 (`hover:scale-105`)
- 그림자: 큰 그림자 (`hover:shadow-lg`)
- 전환: 300ms 부드러운 전환

**커서**: 포인터 (`cursor-pointer`)

#### 클릭 동작

**기능**: 스티커 상세 정보 표시

**내용**:
- 스티커 이름
- 희귀도
- 획득 횟수

**구현**: 간단한 `alert()` (추후 모달로 업그레이드 가능)

### 미획득 스티커

#### 기본 스타일

**배경 및 테두리**:
- 배경: 연한 회색 (`bg-gray-100`)
- 테두리: 4px 회색 (`border-gray-200`)
- 모서리: 16px 둥글게

**투명도**: 60% (`opacity-60`)

**커서**: 비활성 (`cursor-not-allowed`)

#### 물음표 표시

**아이콘**: ?

**크기**: 36px (`text-4xl`)

**색상**: 회색 (`text-gray-400`)

#### 미획득 오버레이

**위치**: 전체 영역 덮기 (`absolute inset-0`)

**배경**: 회색 40% 투명도 (`bg-gray-300/40`)

**텍스트**:
- 내용: "미획득"
- 크기: 12px (`text-xs`)
- 색상: 회색 (`text-gray-500`)
- 굵기: 굵게 (`font-bold`)

#### 호버 효과

**없음**: 클릭 불가, 효과 없음

### 중복 획득 배지

#### 표시 조건

획득 횟수가 2개 이상일 때만 표시

#### 위치

**위치**: 우측 상단 모서리

**좌표**:
- 상단: -8px (`-top-2`)
- 우측: -8px (`-right-2`)

#### 스타일

**크기**: 28x28px (`w-7 h-7`)

**모양**: 원형 (`rounded-full`)

**배경**: 파란색 (`bg-primary`)

**텍스트**:
- 색상: 흰색 (`text-white`)
- 크기: 14px (`text-sm`)
- 굵기: 굵게 (`font-bold`)
- 내용: "×개수" (예: ×3)

**그림자**: 중간 그림자 (`shadow-md`)

**정렬**: 중앙 (`flex items-center justify-center`)

### 상태별 비교

| 요소 | 획득 | 미획득 |
|------|------|--------|
| 배경 | 흰색 | 연한 회색 |
| 테두리 | 희귀도별 색상 | 회색 |
| 투명도 | 100% | 60% |
| 이미지 | 스티커 이미지/이모지 | ? |
| 호버 | 확대 + 그림자 | 없음 |
| 클릭 | 상세 정보 표시 | 비활성 |
| 오버레이 | 없음 | "미획득" |

---

## 3. 진행도 바

### 레이아웃

**위치**: 스티커 그리드 상단

**여백**: 하단 24px (`mb-6`)

### 상단 정보 바

**레이아웃**: 좌우 정렬 (`flex justify-between`)

**왼쪽 텍스트**: "나의 스티커 모음"
- 크기: 18px (`text-kid-base`)
- 색상: 진한 회색 (`text-gray-700`)
- 굵기: 굵게 (`font-bold`)

**오른쪽 텍스트**: "8/25" (획득/전체)
- 크기: 18px (`text-kid-base`)
- 색상: 파란색 (`text-primary`)
- 굵기: 굵게 (`font-bold`)

### 진행 바

**높이**: 32px (`h-8`)

**배경**: 회색 (`bg-gray-200`)

**모서리**: 완전히 둥글게 (`rounded-full`)

**넘침 숨김**: `overflow-hidden`

**진행 부분**:
- 그라데이션: 보라색→핑크색
  - `bg-gradient-to-r from-accent-purple to-secondary`
- 애니메이션: 부드러운 너비 전환 (`transition-all duration-500`)
- 정렬: 중앙 (`flex items-center justify-center`)

**퍼센트 표시**:
- 위치: 진행 바 내부 중앙
- 색상: 흰색 (`text-white`)
- 굵기: 굵게 (`font-bold`)
- 크기: 16px (`text-kid-sm`)
- 표시 조건: `percentage > 0`

### 100% 완성 축하 메시지

**표시 조건**: `percentage === 100`

**레이아웃**:
- 여백: 상단 12px (`mt-3`)
- 정렬: 중앙 (`text-center`)

**내용**:
- 이모지: 🏆 (20px, `text-kid-lg`)
- 텍스트: "모든 스티커를 모았어요! 대단해요!"
- 색상: 보라색 (`text-accent-purple`)
- 크기: 18px (`text-kid-base`)
- 굵기: 굵게 (`font-bold`)

---

## 페이지 스타일

### 배경

**그라데이션**: 보라색→흰색
- `bg-gradient-to-b from-accent-purple/20 to-white`

**패딩**: 16px (`p-4`)

**최소 높이**: 전체 화면 (`min-h-screen`)

### 컨테이너

**최대 너비**: 896px (`max-w-4xl`)

**정렬**: 중앙 (`mx-auto`)

### 헤더

**정렬**: 중앙 (`text-center`)

**여백**: 하단 32px, 상단 32px (`mb-8 pt-8`)

**제목**:
- 텍스트: "스티커 모음판"
- 크기: 32px (`text-kid-2xl`)
- 색상: 파란색 (`text-primary`)
- 굵기: 굵게 (`font-bold`)
- 여백: 하단 8px (`mb-2`)

**부제**:
- 텍스트: "내가 모은 스티커를 확인해보세요! 🎨"
- 크기: 18px (`text-kid-base`)
- 색상: 회색 (`text-gray-600`)

### 카드

**클래스**: `card`

**구성**:
1. 진행도 바
2. 스티커 그리드

### 푸터

**정렬**: 중앙 (`text-center`)

**여백**: 상단 32px (`mt-8`)

**텍스트**:
- 크기: 16px (`text-kid-sm`)
- 색상: 연한 회색 (`text-gray-400`)
- 내용: "💡 할 일을 완료하면 더 많은 스티커를 받을 수 있어요!"

---

## 색상 팔레트

### 진행도 바

| 요소 | 색상 코드 | Tailwind |
|------|-----------|----------|
| 배경 | #E5E7EB | bg-gray-200 |
| 진행 시작 | #E0BBE4 | from-accent-purple |
| 진행 끝 | #FFB3BA | to-secondary |
| 텍스트 (백분율) | #FFFFFF | text-white |
| 축하 텍스트 | #E0BBE4 | text-accent-purple |

### 스티커 아이템 (획득)

| 희귀도 | 테두리 색상 | 코드 |
|--------|-------------|------|
| common | 회색 | #D1D5DB |
| rare | 파란색 | #60A5FA |
| epic | 보라색 | #C084FC |
| legendary | 노란색 | #FACC15 |

**배경**: #FFFFFF (흰색)

### 스티커 아이템 (미획득)

| 요소 | 색상 코드 | Tailwind |
|------|-----------|----------|
| 배경 | #F3F4F6 | bg-gray-100 |
| 테두리 | #E5E7EB | border-gray-200 |
| 물음표 | #9CA3AF | text-gray-400 |
| 오버레이 배경 | #D1D5DB (40%) | bg-gray-300/40 |
| 오버레이 텍스트 | #6B7280 | text-gray-500 |

### 중복 획득 배지

| 요소 | 색상 코드 | Tailwind |
|------|-----------|----------|
| 배경 | #6B9BD1 | bg-primary |
| 텍스트 | #FFFFFF | text-white |

---

## 인터랙션

### 획득한 스티커 클릭

**트리거**: 사용자가 획득한 스티커 클릭

**동작**:
```typescript
const handleStickerClick = (sticker: Sticker) => {
  const count = acquiredCounts.get(sticker.stickerId) || 0;
  alert(
    `${sticker.stickerName}\n희귀도: ${sticker.rarity}\n획득 횟수: ${count}개`
  );
};
```

**표시 내용**:
- 스티커 이름
- 희귀도 (common, rare, epic, legendary)
- 획득 횟수

### 미획득 스티커 클릭

**동작**: 없음 (비활성)

**커서**: `cursor-not-allowed`

### 호버 효과

**획득한 스티커만**:
- 105% 확대
- 큰 그림자 표시
- 300ms 부드러운 전환

**미획득 스티커**:
- 호버 효과 없음

---

## 데이터 구조

### State 관리

```typescript
const [allStickers, setAllStickers] = useState<Sticker[]>([]);
const [acquiredStickerIds, setAcquiredStickerIds] = useState<Set<string>>(new Set());
const [acquiredCounts, setAcquiredCounts] = useState<Map<string, number>>(new Map());
const [stats, setStats] = useState({
  totalStickers: 0,
  acquiredStickers: 0,
  percentage: 0,
  stickersByCategory: {} as any,
});
```

### 데이터 로드

```typescript
const loadStickers = () => {
  const user = getCurrentUser();

  // 모든 스티커 가져오기
  const stickers = getAllStickers();
  setAllStickers(stickers);

  // 획득한 스티커 ID 목록
  const userStickers = getUserStickers(user.userId);
  const acquiredIds = new Set(userStickers.map(us => us.stickerId));
  setAcquiredStickerIds(acquiredIds);

  // 스티커별 획득 개수
  const counts = new Map<string, number>();
  userStickers.forEach(us => {
    const currentCount = counts.get(us.stickerId) || 0;
    counts.set(us.stickerId, currentCount + 1);
  });
  setAcquiredCounts(counts);

  // 통계
  const collectionStats = getStickerCollectionStats(user.userId);
  setStats(collectionStats);
};
```

---

## 컴포넌트 구조

### 파일 구조

```
src/
├── pages/
│   └── StickerCollectionPage.tsx
├── components/
│   ├── StickerCollectionProgress.tsx
│   ├── StickerGrid.tsx
│   └── StickerGridItem.tsx
```

### Props 인터페이스

**StickerCollectionProgress**:
```typescript
interface StickerCollectionProgressProps {
  stats: StickerCollection;
}
```

**StickerGrid**:
```typescript
interface StickerGridProps {
  stickers: Sticker[];
  acquiredStickerIds: Set<string>;
  acquiredCounts: Map<string, number>;
  onStickerClick?: (sticker: Sticker) => void;
}
```

**StickerGridItem**:
```typescript
interface StickerGridItemProps {
  sticker: Sticker;
  isAcquired: boolean;
  acquiredCount?: number;
  onClick?: (sticker: Sticker) => void;
}
```

---

## 예시 화면

### 초기 상태 (0%)

```
┌──────────────────────────────────┐
│       스티커 모음판               │
│  내가 모은 스티커를 확인해보세요!  │
├──────────────────────────────────┤
│  나의 스티커 모음         0/25   │
│  [                    ] 0%       │
├──────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ ? │ │ ? │ │ ? │ │ ? │       │
│  └───┘ └───┘ └───┘ └───┘       │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ ? │ │ ? │ │ ? │ │ ? │       │
│  └───┘ └───┘ └───┘ └───┘       │
└──────────────────────────────────┘
```

### 중간 진행 (32%)

```
┌──────────────────────────────────┐
│       스티커 모음판               │
│  내가 모은 스티커를 확인해보세요!  │
├──────────────────────────────────┤
│  나의 스티커 모음         8/25   │
│  [=========>          ] 32%      │
├──────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ ✨│ │ 💎│ │ ? │ │ ? │       │
│  └───┘ └───┘ └───┘ └───┘       │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ ? │ │ ✨│ │ ? │ │ ? │       │
│  └───┘ └───┘ └───┘ └───┘       │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ ✨│ │ ? │ │ 🌟│ │ ? │       │
│  │×2 │ │   │ │   │ │   │       │
│  └───┘ └───┘ └───┘ └───┘       │
└──────────────────────────────────┘
```

### 100% 완성

```
┌──────────────────────────────────┐
│       스티커 모음판               │
│  내가 모은 스티커를 확인해보세요!  │
├──────────────────────────────────┤
│  나의 스티커 모음        25/25   │
│  [=====================] 100%    │
│  🏆 모든 스티커를 모았어요! 대단해요! │
├──────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ ✨│ │ 💎│ │ 🌟│ │ 👑│       │
│  └───┘ └───┘ └───┘ └───┘       │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ ✨│ │ 💎│ │ 🌟│ │ 👑│       │
│  └───┘ └───┘ └───┘ └───┘       │
│  ...                             │
└──────────────────────────────────┘
```

---

## 향후 개선 사항

- [ ] 카테고리별 필터링 (동물, 음식, 자연, 트로피, 이모지)
- [ ] 희귀도별 필터링
- [ ] 스티커 상세 모달 (alert 대신)
- [ ] 스티커 정렬 옵션 (획득 순, 희귀도 순 등)
- [ ] 검색 기능
- [ ] 스티커 획득 날짜 표시
- [ ] 중복 스티커 교환 기능
- [ ] 스티커 즐겨찾기 기능
- [ ] 애니메이션 효과 (스티커 획득 시)
