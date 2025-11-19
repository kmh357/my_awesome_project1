/**
 * 스티커 관련 타입 정의
 */

export type StickerRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type StickerCategory = 'animal' | 'food' | 'nature' | 'trophy' | 'emoji';

export interface Sticker {
  stickerId: string;
  stickerName: string;
  imageUrl: string;
  rarity: StickerRarity;
  category: StickerCategory;
}

export interface UserSticker {
  userStickerId: string;
  userId: string;
  stickerId: string;
  acquiredDate: string; // ISO 8601 format
  sticker?: Sticker; // populated sticker data
}

export interface StickerCollection {
  totalStickers: number;
  acquiredStickers: number;
  percentage: number;
  stickersByCategory: Record<StickerCategory, {
    total: number;
    acquired: number;
  }>;
}
