/**
 * 스티커 모음판 페이지
 * 획득한 스티커들을 모아서 확인할 수 있습니다.
 */

import { useState, useEffect, useCallback } from 'react';
import type { Sticker, StickerCollection } from '../types/sticker';
import {
  getAllStickers,
  getUserStickers,
  getStickerCollectionStats,
} from '../services/stickerService';
import { getCurrentUser } from '../services/userService';
import StickerCollectionProgress from '../components/StickerCollectionProgress';
import StickerGrid from '../components/StickerGrid';

export default function StickerCollectionPage() {
  const [allStickers, setAllStickers] = useState<Sticker[]>([]);
  const [acquiredStickerIds, setAcquiredStickerIds] = useState<Set<string>>(
    new Set()
  );
  const [acquiredCounts, setAcquiredCounts] = useState<Map<string, number>>(
    new Map()
  );
  const [stats, setStats] = useState<StickerCollection>({
    totalStickers: 0,
    acquiredStickers: 0,
    percentage: 0,
    stickersByCategory: {
      animal: { total: 0, acquired: 0 },
      food: { total: 0, acquired: 0 },
      nature: { total: 0, acquired: 0 },
      trophy: { total: 0, acquired: 0 },
      emoji: { total: 0, acquired: 0 },
    },
  });

  const loadStickers = useCallback(() => {
    const user = getCurrentUser();
    if (!user) {
      console.error('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    // 모든 스티커 가져오기
    const stickers = getAllStickers();
    setAllStickers(stickers);

    // 사용자가 획득한 스티커 가져오기
    const userStickers = getUserStickers(user.userId);
    const acquiredIds = new Set(userStickers.map((us) => us.stickerId));
    setAcquiredStickerIds(acquiredIds);

    // 스티커별 획득 개수 계산
    const counts = new Map<string, number>();
    userStickers.forEach((us) => {
      const currentCount = counts.get(us.stickerId) || 0;
      counts.set(us.stickerId, currentCount + 1);
    });
    setAcquiredCounts(counts);

    // 통계 가져오기
    const collectionStats = getStickerCollectionStats(user.userId);
    setStats(collectionStats);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadStickers();
  }, [loadStickers]);

  const handleStickerClick = (sticker: Sticker) => {
    const count = acquiredCounts.get(sticker.stickerId) || 0;
    alert(
      `${sticker.stickerName}\n희귀도: ${sticker.rarity}\n획득 횟수: ${count}개`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-purple/20 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-kid-2xl font-bold text-primary mb-2">
            스티커 모음판
          </h1>
          <p className="text-kid-base text-gray-600">
            내가 모은 스티커를 확인해보세요! 🎨
          </p>
        </div>

        {/* 카드 컨테이너 */}
        <div className="card">
          {/* 진행도 바 */}
          <StickerCollectionProgress stats={stats} />

          {/* 스티커 그리드 */}
          <StickerGrid
            stickers={allStickers}
            acquiredStickerIds={acquiredStickerIds}
            acquiredCounts={acquiredCounts}
            onStickerClick={handleStickerClick}
          />
        </div>

        {/* 안내 메시지 */}
        <div className="text-center mt-8 text-kid-sm text-gray-400">
          <p>💡 할 일을 완료하면 더 많은 스티커를 받을 수 있어요!</p>
        </div>
      </div>
    </div>
  );
}
