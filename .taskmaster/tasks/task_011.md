# TASK-011: 스티커 보상 시스템 구현 - 팝업 및 랜덤 로직

**Priority:** High
**Status:** Pending
**Phase:** Phase 1-3 (Week 5-6)
**Estimated Hours:** 10
**Tags:** frontend, backend, core-feature

## Description
할 일 완료 시 랜덤 스티커와 칭찬 메시지를 표시하는 보상 팝업을 구현합니다. 희귀도별 확률 로직을 포함합니다.

## Acceptance Criteria
- [ ] 할 일 완료 시 보상 팝업 자동 표시
- [ ] 랜덤 스티커 선택 로직 구현 (희귀도별 확률 적용)
- [ ] 스티커 이미지를 화면 중앙에 크게 표시
- [ ] 칭찬 메시지 랜덤 선택 ('참 잘했어요!', '대단해요!' 등)
- [ ] 확인 버튼 클릭 시 스티커 모음판에 저장
- [ ] 팝업 애니메이션 효과 (짠! 효과, 회전, 반짝임)
- [ ] 3-5초 후 자동 닫기 옵션 구현

## Implementation Steps

### 1. 스티커 타입 및 희귀도 정의
```typescript
// src/types/sticker.ts
export type StickerRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Sticker {
  stickerId: string;
  stickerName: string;
  imageUrl: string;
  rarity: StickerRarity;
  category: string; // 동물, 음식, 자연, 트로피 등
}

export interface UserSticker {
  userStickerId: string;
  userId: string;
  stickerId: string;
  acquiredDate: string;
}
```

### 2. 희귀도별 확률 로직
```typescript
// src/services/stickerService.ts
const RARITY_WEIGHTS = {
  common: 60,      // 60% 확률
  rare: 25,        // 25% 확률
  epic: 12,        // 12% 확률
  legendary: 3,    // 3% 확률
};

export const getRandomSticker = (allStickers: Sticker[]): Sticker => {
  // 1. 희귀도 결정
  const rarity = selectRarityByWeight();

  // 2. 해당 희귀도의 스티커 중 랜덤 선택
  const stickersOfRarity = allStickers.filter(s => s.rarity === rarity);
  const randomIndex = Math.floor(Math.random() * stickersOfRarity.length);

  return stickersOfRarity[randomIndex];
};

const selectRarityByWeight = (): StickerRarity => {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight;
    if (random <= cumulative) {
      return rarity as StickerRarity;
    }
  }

  return 'common';
};
```

### 3. 칭찬 메시지 랜덤 선택
```typescript
// src/constants/messages.ts
export const PRAISE_MESSAGES = [
  '참 잘했어요!',
  '대단해요!',
  '훌륭해요!',
  '최고예요!',
  '멋져요!',
  '정말 잘했어요!',
  '대박!',
  '완벽해요!',
  '너무 좋아요!',
  '최고의 친구!',
];

export const getRandomPraise = (): string => {
  const randomIndex = Math.floor(Math.random() * PRAISE_MESSAGES.length);
  return PRAISE_MESSAGES[randomIndex];
};
```

### 4. 보상 팝업 컴포넌트
```typescript
// src/components/RewardPopup.tsx
import React, { useEffect, useState } from 'react';
import { Sticker } from '../types/sticker';
import { motion, AnimatePresence } from 'framer-motion';

interface RewardPopupProps {
  sticker: Sticker;
  message: string;
  onClose: () => void;
  autoCloseDelay?: number; // 밀리초, 기본값 4000 (4초)
}

export const RewardPopup: React.FC<RewardPopupProps> = ({
  sticker,
  message,
  onClose,
  autoCloseDelay = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDelay);

    return () => clearTimeout(timer);
  }, [autoCloseDelay, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="reward-popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="reward-popup-content"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          {/* 칭찬 메시지 */}
          <h2 className="praise-message">{message}</h2>

          {/* 스티커 이미지 */}
          <motion.img
            src={sticker.imageUrl}
            alt={sticker.stickerName}
            className="sticker-image"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />

          {/* 희귀도 표시 */}
          <div className={`rarity-badge ${sticker.rarity}`}>
            {getRarityLabel(sticker.rarity)}
          </div>

          {/* 확인 버튼 */}
          <button onClick={onClose} className="close-button">
            확인
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const getRarityLabel = (rarity: string): string => {
  const labels = {
    common: '일반',
    rare: '레어',
    epic: '에픽',
    legendary: '레전더리',
  };
  return labels[rarity] || '일반';
};
```

### 5. 스타일링 (CSS/Tailwind)
```css
/* src/styles/RewardPopup.css */
.reward-popup-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.reward-popup-content {
  @apply bg-gradient-to-br from-yellow-100 to-pink-100
         rounded-3xl p-8 shadow-2xl text-center max-w-md;
}

.praise-message {
  @apply text-4xl font-bold text-purple-600 mb-6;
  font-family: 'Comic Sans MS', cursive; /* 친근한 폰트 */
}

.sticker-image {
  @apply w-48 h-48 mx-auto mb-4;
}

.rarity-badge {
  @apply px-4 py-2 rounded-full text-white font-bold mb-4 inline-block;
}

.rarity-badge.common { @apply bg-gray-400; }
.rarity-badge.rare { @apply bg-blue-500; }
.rarity-badge.epic { @apply bg-purple-600; }
.rarity-badge.legendary { @apply bg-gradient-to-r from-yellow-400 to-orange-500; }

.close-button {
  @apply bg-green-500 text-white px-8 py-3 rounded-lg text-xl font-bold
         hover:bg-green-600 transition-colors;
  min-width: 120px;
  min-height: 44px;
}
```

### 6. 보상 시스템 통합
```typescript
// src/hooks/useRewardSystem.ts
import { useState } from 'react';
import { Sticker } from '../types/sticker';
import { getRandomSticker } from '../services/stickerService';
import { getRandomPraise } from '../constants/messages';
import { saveUserSticker } from '../services/userStickerService';

export const useRewardSystem = () => {
  const [showReward, setShowReward] = useState(false);
  const [currentSticker, setCurrentSticker] = useState<Sticker | null>(null);
  const [praiseMessage, setPraiseMessage] = useState('');

  const triggerReward = async (allStickers: Sticker[]) => {
    const sticker = getRandomSticker(allStickers);
    const message = getRandomPraise();

    setCurrentSticker(sticker);
    setPraiseMessage(message);
    setShowReward(true);

    // 스티커 획득 기록
    await saveUserSticker(sticker.stickerId);
  };

  const closeReward = () => {
    setShowReward(false);
  };

  return {
    showReward,
    currentSticker,
    praiseMessage,
    triggerReward,
    closeReward,
  };
};
```

## Dependencies
- TASK-008: 할 일 완료 체크 기능 구현
- TASK-005: 스티커 이미지 리소스 준비

## Testing Checklist
- [ ] 할 일 완료 시 팝업 표시 확인
- [ ] 희귀도별 확률 동작 확인 (100회 테스트)
- [ ] 칭찬 메시지 랜덤 변경 확인
- [ ] 애니메이션 부드럽게 동작
- [ ] 자동 닫기 기능 동작
- [ ] 확인 버튼으로 수동 닫기 가능
- [ ] 스티커 저장 확인

## Notes
- 애니메이션 라이브러리: Framer Motion 사용 권장
- PRD 요구사항: 밝고 즐거운 분위기, 아이들이 기쁨을 느낄 수 있는 비주얼
- 성능: 이미지 미리 로딩하여 팝업 표시 지연 방지
