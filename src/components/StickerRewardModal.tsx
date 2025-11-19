/**
 * 스티커 보상 팝업 컴포넌트
 * 할 일 완료 시 획득한 스티커를 축하하는 모달을 표시합니다.
 */

import { UserSticker } from '../types/sticker';
import { StickerRarity } from '../types/sticker';

interface StickerRewardModalProps {
  userSticker: UserSticker | null;
  isOpen: boolean;
  onClose: () => void;
}

// 희귀도별 색상 및 라벨
const RARITY_CONFIG: Record<
  StickerRarity,
  { color: string; bgColor: string; label: string; sparkle: string }
> = {
  common: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    label: '일반',
    sparkle: '✨',
  },
  rare: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: '레어',
    sparkle: '💎',
  },
  epic: {
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: '에픽',
    sparkle: '🌟',
  },
  legendary: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    label: '전설',
    sparkle: '👑',
  },
};

// 랜덤 칭찬 메시지
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

export default function StickerRewardModal({
  userSticker,
  isOpen,
  onClose,
}: StickerRewardModalProps) {
  if (!isOpen || !userSticker || !userSticker.sticker) {
    return null;
  }

  const { sticker } = userSticker;
  const rarityConfig = RARITY_CONFIG[sticker.rarity];
  const randomPraise =
    PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* 모달 컨테이너 */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-popIn">
          {/* 상단 장식 */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-3 animate-bounce">
              🎉
            </div>
            <h2 className="text-kid-2xl font-bold text-primary mb-2">
              {randomPraise}
            </h2>
            <p className="text-kid-base text-gray-600">
              할 일을 완료해서 스티커를 받았어요!
            </p>
          </div>

          {/* 스티커 표시 영역 */}
          <div className="relative mb-6">
            {/* 스티커 배경 원 */}
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-light/30 to-secondary/30 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
              {/* 스티커 이미지 */}
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-8xl shadow-inner">
                {/* 실제 스티커 이미지가 있으면 img 태그 사용, 없으면 placeholder */}
                {sticker.imageUrl && sticker.imageUrl.startsWith('http') ? (
                  <img
                    src={sticker.imageUrl}
                    alt={sticker.stickerName}
                    className="w-28 h-28 object-contain"
                  />
                ) : (
                  <span className="text-7xl">{rarityConfig.sparkle}</span>
                )}
              </div>
            </div>

            {/* 희귀도 배지 */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div
                className={`
                  ${rarityConfig.bgColor} ${rarityConfig.color}
                  px-4 py-2 rounded-full font-bold text-kid-base
                  shadow-md flex items-center gap-2
                `}
              >
                <span className="text-xl">{rarityConfig.sparkle}</span>
                <span>{rarityConfig.label}</span>
              </div>
            </div>
          </div>

          {/* 스티커 이름 */}
          <div className="text-center mb-6">
            <h3 className="text-kid-xl font-bold text-gray-800 mb-1">
              {sticker.stickerName}
            </h3>
            <p className="text-kid-sm text-gray-500">
              스티커 모음판에 추가되었어요
            </p>
          </div>

          {/* 확인 버튼 */}
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            확인
          </button>

          {/* 하단 장식 */}
          <div className="mt-4 text-center">
            <div className="inline-flex gap-2 text-2xl animate-sparkle">
              ✨ 🌟 ✨
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
