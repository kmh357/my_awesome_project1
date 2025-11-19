/**
 * 스티커 그리드 아이템 컴포넌트
 * 개별 스티커를 그리드에 표시합니다 (획득/미획득 상태).
 */

import { Sticker, StickerRarity } from '../types/sticker';

interface StickerGridItemProps {
  sticker: Sticker;
  isAcquired: boolean;
  acquiredCount?: number; // 중복 획득 개수
  onClick?: (sticker: Sticker) => void;
}

// 희귀도별 테두리 색상
const RARITY_BORDER: Record<StickerRarity, string> = {
  common: 'border-gray-300',
  rare: 'border-blue-400',
  epic: 'border-purple-400',
  legendary: 'border-yellow-400',
};

// 희귀도별 이모지
const RARITY_EMOJI: Record<StickerRarity, string> = {
  common: '✨',
  rare: '💎',
  epic: '🌟',
  legendary: '👑',
};

export default function StickerGridItem({
  sticker,
  isAcquired,
  acquiredCount = 0,
  onClick,
}: StickerGridItemProps) {
  const borderColor = isAcquired
    ? RARITY_BORDER[sticker.rarity]
    : 'border-gray-200';

  const handleClick = () => {
    if (onClick && isAcquired) {
      onClick(sticker);
    }
  };

  return (
    <div
      className={`
        relative aspect-square rounded-2xl border-4 p-3
        transition-all duration-300 cursor-pointer
        ${borderColor}
        ${isAcquired
          ? 'bg-white hover:scale-105 hover:shadow-lg'
          : 'bg-gray-100 opacity-60 cursor-not-allowed'
        }
      `}
      onClick={handleClick}
    >
      {/* 스티커 이미지 또는 placeholder */}
      <div className="w-full h-full flex items-center justify-center">
        {isAcquired ? (
          sticker.imageUrl && sticker.imageUrl.startsWith('http') ? (
            <img
              src={sticker.imageUrl}
              alt={sticker.stickerName}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-5xl">{sticker.imageUrl}</span>
          )
        ) : (
          <div className="text-4xl text-gray-400">?</div>
        )}
      </div>

      {/* 획득 개수 배지 (중복 획득 시) */}
      {isAcquired && acquiredCount > 1 && (
        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-md">
          ×{acquiredCount}
        </div>
      )}

      {/* 미획득 오버레이 */}
      {!isAcquired && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300/40 rounded-2xl">
          <span className="text-gray-500 text-xs font-bold">미획득</span>
        </div>
      )}
    </div>
  );
}
