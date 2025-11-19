/**
 * 스티커 컬렉션 진행도 컴포넌트
 * 전체 스티커 수집 진행도를 표시합니다.
 */

import { StickerCollection } from '../types/sticker';

interface StickerCollectionProgressProps {
  stats: StickerCollection;
}

export default function StickerCollectionProgress({
  stats,
}: StickerCollectionProgressProps) {
  const { totalStickers, acquiredStickers, percentage } = stats;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-kid-base font-bold text-gray-700">
          나의 스티커 모음
        </span>
        <span className="text-kid-base font-bold text-primary">
          {acquiredStickers}/{totalStickers}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-purple to-secondary transition-all duration-500 ease-out flex items-center justify-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && (
            <span className="text-white font-bold text-kid-sm">
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {percentage === 100 && (
        <div className="mt-3 text-center">
          <span className="text-kid-lg">🏆</span>
          <span className="ml-2 text-kid-base font-bold text-accent-purple">
            모든 스티커를 모았어요! 대단해요!
          </span>
        </div>
      )}
    </div>
  );
}
