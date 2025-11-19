/**
 * stickerService 단위 테스트
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  initializeDefaultStickers,
  getAllStickers,
  getStickerById,
  getStickersByCategory,
  getStickersByRarity,
  getRandomSticker,
  getUserStickers,
  awardStickerToUser,
  awardRandomStickerToUser,
  getUserStickersWithDetails,
  getStickerCollectionStats,
  getUserStickersByCategory,
} from '../stickerService';
import type { Sticker, UserSticker } from '../../types/sticker';
import * as localStorage from '../../utils/localStorage';

// Mock localStorage utilities
vi.mock('../../utils/localStorage', async () => {
  const actual = await vi.importActual<typeof localStorage>('../../utils/localStorage');
  return {
    ...actual,
    getFromStorage: vi.fn(),
    saveToStorage: vi.fn(),
    generateId: vi.fn((prefix: string) => `${prefix}test-id`),
    getCurrentDateISO: vi.fn(() => '2025-11-19T10:00:00.000Z'),
  };
});

describe('stickerService', () => {
  const mockDate = '2025-11-19T10:00:00.000Z';
  const mockStickers: Sticker[] = [
    { stickerId: 'sticker_001', stickerName: '토끼', imageUrl: '🐰', rarity: 'common', category: 'animal' },
    { stickerId: 'sticker_002', stickerName: '판다', imageUrl: '🐼', rarity: 'rare', category: 'animal' },
    { stickerId: 'sticker_003', stickerName: '유니콘', imageUrl: '🦄', rarity: 'epic', category: 'animal' },
    { stickerId: 'sticker_004', stickerName: '사탕', imageUrl: '🍬', rarity: 'common', category: 'food' },
    { stickerId: 'sticker_005', stickerName: '왕관', imageUrl: '👑', rarity: 'legendary', category: 'trophy' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initializeDefaultStickers', () => {
    it('스티커가 없으면 기본 스티커를 초기화한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      initializeDefaultStickers();

      expect(localStorage.saveToStorage).toHaveBeenCalled();
      const savedStickers = vi.mocked(localStorage.saveToStorage).mock.calls[0][1] as Sticker[];
      expect(savedStickers.length).toBe(25); // 총 25개 스티커
    });

    it('스티커가 이미 있으면 초기화하지 않는다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      initializeDefaultStickers();

      expect(localStorage.saveToStorage).not.toHaveBeenCalled();
    });

    it('초기화된 스티커에 모든 카테고리가 포함된다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      initializeDefaultStickers();

      const savedStickers = vi.mocked(localStorage.saveToStorage).mock.calls[0][1] as Sticker[];
      const categories = new Set(savedStickers.map((s) => s.category));

      expect(categories.has('animal')).toBe(true);
      expect(categories.has('food')).toBe(true);
      expect(categories.has('nature')).toBe(true);
      expect(categories.has('trophy')).toBe(true);
      expect(categories.has('emoji')).toBe(true);
    });
  });

  describe('getAllStickers', () => {
    it('모든 스티커를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      const result = getAllStickers();

      expect(result).toEqual(mockStickers);
      expect(localStorage.getFromStorage).toHaveBeenCalledWith('tickticke_stickers', []);
    });
  });

  describe('getStickerById', () => {
    it('ID로 특정 스티커를 찾는다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      const result = getStickerById('sticker_001');

      expect(result).toBeDefined();
      expect(result?.stickerName).toBe('토끼');
    });

    it('존재하지 않는 ID면 undefined를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      const result = getStickerById('nonexistent');

      expect(result).toBeUndefined();
    });
  });

  describe('getStickersByCategory', () => {
    it('특정 카테고리의 스티커만 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      const result = getStickersByCategory('animal');

      expect(result).toHaveLength(3);
      expect(result.every((s) => s.category === 'animal')).toBe(true);
    });

    it('해당 카테고리가 없으면 빈 배열을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = getStickersByCategory('animal');

      expect(result).toEqual([]);
    });
  });

  describe('getStickersByRarity', () => {
    it('특정 희귀도의 스티커만 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      const result = getStickersByRarity('common');

      expect(result).toHaveLength(2);
      expect(result.every((s) => s.rarity === 'common')).toBe(true);
    });

    it('legendary 희귀도 스티커를 찾는다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      const result = getStickersByRarity('legendary');

      expect(result).toHaveLength(1);
      expect(result[0].stickerName).toBe('왕관');
    });
  });

  describe('getRandomSticker', () => {
    it('랜덤 스티커를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);

      const result = getRandomSticker();

      expect(result).toBeDefined();
      expect(mockStickers).toContainEqual(result);
    });

    it('스티커가 없으면 null을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = getRandomSticker();

      expect(result).toBeNull();
    });

    it('common 희귀도를 60% 확률로 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);
      vi.spyOn(Math, 'random').mockReturnValue(0.5); // 50% (< 60%)

      const result = getRandomSticker();

      expect(result?.rarity).toBe('common');
    });

    it('rare 희귀도를 25% 확률로 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);
      vi.spyOn(Math, 'random').mockReturnValue(0.75); // 75% (60 ~ 85)

      const result = getRandomSticker();

      expect(result?.rarity).toBe('rare');
    });

    it('epic 희귀도를 12% 확률로 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);
      vi.spyOn(Math, 'random').mockReturnValue(0.90); // 90% (85 ~ 97)

      const result = getRandomSticker();

      expect(result?.rarity).toBe('epic');
    });

    it('legendary 희귀도를 3% 확률로 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockStickers);
      vi.spyOn(Math, 'random').mockReturnValue(0.98); // 98% (>= 97)

      const result = getRandomSticker();

      expect(result?.rarity).toBe('legendary');
    });
  });

  describe('getUserStickers', () => {
    it('사용자의 모든 스티커를 반환한다', () => {
      const mockUserStickers: UserSticker[] = [
        { userStickerId: 'us_1', userId: 'user_1', stickerId: 'sticker_001', acquiredDate: mockDate },
        { userStickerId: 'us_2', userId: 'user_1', stickerId: 'sticker_002', acquiredDate: mockDate },
        { userStickerId: 'us_3', userId: 'user_2', stickerId: 'sticker_003', acquiredDate: mockDate },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockUserStickers);

      const result = getUserStickers('user_1');

      expect(result).toHaveLength(2);
      expect(result.every((us) => us.userId === 'user_1')).toBe(true);
    });
  });

  describe('awardStickerToUser', () => {
    it('사용자에게 스티커를 부여한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = awardStickerToUser('user_1', 'sticker_001');

      expect(result.userId).toBe('user_1');
      expect(result.stickerId).toBe('sticker_001');
      expect(result.acquiredDate).toBe(mockDate);
      expect(localStorage.saveToStorage).toHaveBeenCalled();
    });

    it('기존 스티커에 새 스티커를 추가한다', () => {
      const existingUserStickers: UserSticker[] = [
        { userStickerId: 'us_1', userId: 'user_1', stickerId: 'sticker_001', acquiredDate: mockDate },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(existingUserStickers);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      awardStickerToUser('user_1', 'sticker_002');

      const savedData = vi.mocked(localStorage.saveToStorage).mock.calls[0][1] as UserSticker[];
      expect(savedData).toHaveLength(2);
    });
  });

  describe('awardRandomStickerToUser', () => {
    it('사용자에게 랜덤 스티커를 부여한다', () => {
      vi.mocked(localStorage.getFromStorage)
        .mockReturnValueOnce(mockStickers) // getAllStickers
        .mockReturnValueOnce(mockStickers) // getStickersByRarity
        .mockReturnValueOnce([]); // getUserStickers for awardStickerToUser

      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = awardRandomStickerToUser('user_1');

      expect(result).toBeDefined();
      expect(result?.userId).toBe('user_1');
    });

    it('스티커가 없으면 null을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = awardRandomStickerToUser('user_1');

      expect(result).toBeNull();
    });
  });

  describe('getUserStickersWithDetails', () => {
    it('사용자 스티커를 스티커 정보와 함께 반환한다', () => {
      const mockUserStickers: UserSticker[] = [
        { userStickerId: 'us_1', userId: 'user_1', stickerId: 'sticker_001', acquiredDate: mockDate },
      ];

      vi.mocked(localStorage.getFromStorage)
        .mockReturnValueOnce(mockUserStickers)
        .mockReturnValueOnce(mockStickers);

      const result = getUserStickersWithDetails('user_1');

      expect(result).toHaveLength(1);
      expect(result[0].sticker).toBeDefined();
      expect(result[0].sticker?.stickerName).toBe('토끼');
    });
  });

  describe('getStickerCollectionStats', () => {
    it('사용자의 스티커 컬렉션 통계를 반환한다', () => {
      const mockUserStickers: UserSticker[] = [
        { userStickerId: 'us_1', userId: 'user_1', stickerId: 'sticker_001', acquiredDate: mockDate },
        { userStickerId: 'us_2', userId: 'user_1', stickerId: 'sticker_004', acquiredDate: mockDate },
      ];

      vi.mocked(localStorage.getFromStorage)
        .mockReturnValueOnce(mockStickers)
        .mockReturnValueOnce(mockUserStickers);

      const result = getStickerCollectionStats('user_1');

      expect(result.totalStickers).toBe(5);
      expect(result.acquiredStickers).toBe(2);
      expect(result.percentage).toBe(40); // 2/5 * 100 = 40%
      expect(result.stickersByCategory).toBeDefined();
    });

    it('카테고리별 통계를 정확히 계산한다', () => {
      const mockUserStickers: UserSticker[] = [
        { userStickerId: 'us_1', userId: 'user_1', stickerId: 'sticker_001', acquiredDate: mockDate },
      ];

      vi.mocked(localStorage.getFromStorage).mockImplementation((key: string) => {
        if (key === 'tickticke_stickers') return mockStickers;
        if (key === 'tickticke_user_stickers') return mockUserStickers;
        return [];
      });

      const result = getStickerCollectionStats('user_1');

      expect(result.stickersByCategory.animal.acquired).toBe(1);
      expect(result.stickersByCategory.animal.total).toBe(3);
    });

    it('스티커가 없으면 0%를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage)
        .mockReturnValueOnce([])
        .mockReturnValueOnce([]);

      const result = getStickerCollectionStats('user_1');

      expect(result.totalStickers).toBe(0);
      expect(result.acquiredStickers).toBe(0);
      expect(result.percentage).toBe(0);
    });
  });

  describe('getUserStickersByCategory', () => {
    it('사용자의 특정 카테고리 스티커만 반환한다', () => {
      const mockUserStickers: UserSticker[] = [
        { userStickerId: 'us_1', userId: 'user_1', stickerId: 'sticker_001', acquiredDate: mockDate },
        { userStickerId: 'us_2', userId: 'user_1', stickerId: 'sticker_004', acquiredDate: mockDate },
      ];

      vi.mocked(localStorage.getFromStorage)
        .mockReturnValueOnce(mockUserStickers)
        .mockReturnValueOnce(mockStickers);

      const result = getUserStickersByCategory('user_1', 'animal');

      expect(result).toHaveLength(1);
      expect(result[0].sticker?.category).toBe('animal');
    });
  });
});
