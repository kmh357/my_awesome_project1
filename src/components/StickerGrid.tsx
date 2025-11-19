/**
 * 스티커 그리드 컴포넌트
 * 스티커들을 그리드 레이아웃으로 표시합니다.
 */

import type { Sticker } from '../types/sticker';
import StickerGridItem from './StickerGridItem';

interface StickerGridProps {
  stickers: Sticker[];
  acquiredStickerIds: Set<string>;
  acquiredCounts: Map<string, number>; // 스티커별 획득 개수
  onStickerClick?: (sticker: Sticker) => void;
}

export default function StickerGrid({
  stickers,
  acquiredStickerIds,
  acquiredCounts,
  onStickerClick,
}: StickerGridProps) {
  if (stickers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-8xl mb-4">📦</div>
        <p className="text-kid-base text-gray-500">
          아직 스티커가 없어요
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {stickers.map((sticker) => (
        <StickerGridItem
          key={sticker.stickerId}
          sticker={sticker}
          isAcquired={acquiredStickerIds.has(sticker.stickerId)}
          acquiredCount={acquiredCounts.get(sticker.stickerId) || 0}
          onClick={onStickerClick}
        />
      ))}
    </div>
  );
}
