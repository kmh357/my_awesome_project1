/**
 * 스티커 관리 서비스
 * 로컬 스토리지를 사용하여 스티커 데이터를 관리합니다.
 */

import type {
  Sticker,
  UserSticker,
  StickerCollection,
  StickerRarity,
  StickerCategory,
} from '../types/sticker';
import {
  STORAGE_KEYS,
  getFromStorage,
  saveToStorage,
  generateId,
  getCurrentDateISO,
} from '../utils/localStorage';

/**
 * 기본 스티커 데이터를 초기화합니다.
 * 앱 최초 실행 시 한 번만 호출됩니다.
 */
export function initializeDefaultStickers(): void {
  const existingStickers = getFromStorage<Sticker[]>(STORAGE_KEYS.STICKERS, []);

  // 이미 스티커가 있으면 초기화하지 않음
  if (existingStickers.length > 0) {
    return;
  }

  const defaultStickers: Sticker[] = [
    // 동물 스티커 (Animal)
    { stickerId: 'sticker_001', stickerName: '토끼', imageUrl: '🐰', rarity: 'common', category: 'animal' },
    { stickerId: 'sticker_002', stickerName: '고양이', imageUrl: '🐱', rarity: 'common', category: 'animal' },
    { stickerId: 'sticker_003', stickerName: '강아지', imageUrl: '🐶', rarity: 'common', category: 'animal' },
    { stickerId: 'sticker_004', stickerName: '판다', imageUrl: '🐼', rarity: 'rare', category: 'animal' },
    { stickerId: 'sticker_005', stickerName: '유니콘', imageUrl: '🦄', rarity: 'epic', category: 'animal' },

    // 음식 스티커 (Food)
    { stickerId: 'sticker_006', stickerName: '사탕', imageUrl: '🍬', rarity: 'common', category: 'food' },
    { stickerId: 'sticker_007', stickerName: '아이스크림', imageUrl: '🍦', rarity: 'common', category: 'food' },
    { stickerId: 'sticker_008', stickerName: '케이크', imageUrl: '🍰', rarity: 'rare', category: 'food' },
    { stickerId: 'sticker_009', stickerName: '도넛', imageUrl: '🍩', rarity: 'common', category: 'food' },
    { stickerId: 'sticker_010', stickerName: '초콜릿', imageUrl: '🍫', rarity: 'rare', category: 'food' },

    // 자연 스티커 (Nature)
    { stickerId: 'sticker_011', stickerName: '별', imageUrl: '⭐', rarity: 'common', category: 'nature' },
    { stickerId: 'sticker_012', stickerName: '달', imageUrl: '🌙', rarity: 'common', category: 'nature' },
    { stickerId: 'sticker_013', stickerName: '해', imageUrl: '☀️', rarity: 'rare', category: 'nature' },
    { stickerId: 'sticker_014', stickerName: '무지개', imageUrl: '🌈', rarity: 'epic', category: 'nature' },
    { stickerId: 'sticker_015', stickerName: '꽃', imageUrl: '🌸', rarity: 'common', category: 'nature' },

    // 트로피 스티커 (Trophy)
    { stickerId: 'sticker_016', stickerName: '금메달', imageUrl: '🥇', rarity: 'legendary', category: 'trophy' },
    { stickerId: 'sticker_017', stickerName: '은메달', imageUrl: '🥈', rarity: 'epic', category: 'trophy' },
    { stickerId: 'sticker_018', stickerName: '동메달', imageUrl: '🥉', rarity: 'rare', category: 'trophy' },
    { stickerId: 'sticker_019', stickerName: '왕관', imageUrl: '👑', rarity: 'legendary', category: 'trophy' },
    { stickerId: 'sticker_020', stickerName: '트로피', imageUrl: '🏆', rarity: 'epic', category: 'trophy' },

    // 이모지 스티커 (Emoji)
    { stickerId: 'sticker_021', stickerName: '웃음', imageUrl: '😊', rarity: 'common', category: 'emoji' },
    { stickerId: 'sticker_022', stickerName: '하트', imageUrl: '❤️', rarity: 'common', category: 'emoji' },
    { stickerId: 'sticker_023', stickerName: '박수', imageUrl: '👏', rarity: 'rare', category: 'emoji' },
    { stickerId: 'sticker_024', stickerName: '최고', imageUrl: '👍', rarity: 'common', category: 'emoji' },
    { stickerId: 'sticker_025', stickerName: '불꽃', imageUrl: '🔥', rarity: 'epic', category: 'emoji' },
  ];

  saveToStorage(STORAGE_KEYS.STICKERS, defaultStickers);
}

/**
 * 모든 스티커 목록을 가져옵니다.
 */
export function getAllStickers(): Sticker[] {
  return getFromStorage<Sticker[]>(STORAGE_KEYS.STICKERS, []);
}

/**
 * 특정 ID의 스티커를 가져옵니다.
 */
export function getStickerById(stickerId: string): Sticker | undefined {
  const stickers = getAllStickers();
  return stickers.find((sticker) => sticker.stickerId === stickerId);
}

/**
 * 특정 카테고리의 스티커를 가져옵니다.
 */
export function getStickersByCategory(category: StickerCategory): Sticker[] {
  const stickers = getAllStickers();
  return stickers.filter((sticker) => sticker.category === category);
}

/**
 * 특정 희귀도의 스티커를 가져옵니다.
 */
export function getStickersByRarity(rarity: StickerRarity): Sticker[] {
  const stickers = getAllStickers();
  return stickers.filter((sticker) => sticker.rarity === rarity);
}

/**
 * 랜덤 스티커를 가져옵니다 (희귀도 가중치 적용).
 * common: 60%, rare: 25%, epic: 12%, legendary: 3%
 */
export function getRandomSticker(): Sticker | null {
  const stickers = getAllStickers();
  if (stickers.length === 0) {
    return null;
  }

  const random = Math.random() * 100;
  let targetRarity: StickerRarity;

  if (random < 60) {
    targetRarity = 'common';
  } else if (random < 85) {
    targetRarity = 'rare';
  } else if (random < 97) {
    targetRarity = 'epic';
  } else {
    targetRarity = 'legendary';
  }

  const rarityStickers = getStickersByRarity(targetRarity);
  if (rarityStickers.length === 0) {
    // 해당 희귀도의 스티커가 없으면 아무 스티커나 반환
    return stickers[Math.floor(Math.random() * stickers.length)];
  }

  return rarityStickers[Math.floor(Math.random() * rarityStickers.length)];
}

/**
 * 사용자의 모든 스티커를 가져옵니다.
 */
export function getUserStickers(userId: string): UserSticker[] {
  const allUserStickers = getFromStorage<UserSticker[]>(STORAGE_KEYS.USER_STICKERS, []);
  return allUserStickers.filter((us) => us.userId === userId);
}

/**
 * 사용자에게 스티커를 부여합니다.
 */
export function awardStickerToUser(userId: string, stickerId: string): UserSticker {
  const allUserStickers = getFromStorage<UserSticker[]>(STORAGE_KEYS.USER_STICKERS, []);

  const newUserSticker: UserSticker = {
    userStickerId: generateId('us_'),
    userId,
    stickerId,
    acquiredDate: getCurrentDateISO(),
  };

  allUserStickers.push(newUserSticker);
  saveToStorage(STORAGE_KEYS.USER_STICKERS, allUserStickers);

  return newUserSticker;
}

/**
 * 사용자에게 랜덤 스티커를 부여합니다.
 */
export function awardRandomStickerToUser(userId: string): UserSticker | null {
  const randomSticker = getRandomSticker();
  if (!randomSticker) {
    return null;
  }

  return awardStickerToUser(userId, randomSticker.stickerId);
}

/**
 * 사용자의 스티커를 스티커 정보와 함께 가져옵니다.
 */
export function getUserStickersWithDetails(userId: string): UserSticker[] {
  const userStickers = getUserStickers(userId);
  const allStickers = getAllStickers();

  return userStickers.map((us) => ({
    ...us,
    sticker: allStickers.find((s) => s.stickerId === us.stickerId),
  }));
}

/**
 * 사용자의 스티커 컬렉션 통계를 가져옵니다.
 */
export function getStickerCollectionStats(userId: string): StickerCollection {
  const allStickers = getAllStickers();
  const userStickers = getUserStickers(userId);

  // 사용자가 획득한 고유 스티커 ID 목록
  const acquiredStickerIds = new Set(userStickers.map((us) => us.stickerId));

  // 카테고리별 통계 초기화
  const categories: StickerCategory[] = ['animal', 'food', 'nature', 'trophy', 'emoji'];
  const stickersByCategory: Record<StickerCategory, { total: number; acquired: number }> = {
    animal: { total: 0, acquired: 0 },
    food: { total: 0, acquired: 0 },
    nature: { total: 0, acquired: 0 },
    trophy: { total: 0, acquired: 0 },
    emoji: { total: 0, acquired: 0 },
  };

  categories.forEach((category) => {
    const categoryStickers = getStickersByCategory(category);
    const acquiredInCategory = categoryStickers.filter((s) =>
      acquiredStickerIds.has(s.stickerId)
    ).length;

    stickersByCategory[category] = {
      total: categoryStickers.length,
      acquired: acquiredInCategory,
    };
  });

  const totalStickers = allStickers.length;
  const acquiredStickers = acquiredStickerIds.size;
  const percentage = totalStickers > 0 ? Math.round((acquiredStickers / totalStickers) * 100) : 0;

  return {
    totalStickers,
    acquiredStickers,
    percentage,
    stickersByCategory,
  };
}

/**
 * 사용자의 특정 카테고리 스티커를 가져옵니다.
 */
export function getUserStickersByCategory(
  userId: string,
  category: StickerCategory
): UserSticker[] {
  const userStickersWithDetails = getUserStickersWithDetails(userId);
  return userStickersWithDetails.filter(
    (us) => us.sticker && us.sticker.category === category
  );
}
