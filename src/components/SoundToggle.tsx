import { useState, useEffect } from 'react';
import { isSoundEnabled, toggleSound, playClickSound } from '../utils/soundUtils';

/**
 * 사운드 on/off 토글 컴포넌트
 * 사용자가 사운드를 켜고 끌 수 있습니다.
 */
export default function SoundToggle() {
  const [enabled, setEnabled] = useState<boolean>(isSoundEnabled());

  useEffect(() => {
    setEnabled(isSoundEnabled());
  }, []);

  const handleToggle = () => {
    const newState = toggleSound();
    setEnabled(newState);

    // 사운드를 켰을 때만 피드백 소리 재생
    if (newState) {
      playClickSound();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
      aria-label={enabled ? '사운드 끄기' : '사운드 켜기'}
      title={enabled ? '사운드 끄기' : '사운드 켜기'}
    >
      <span className="text-2xl" aria-hidden="true">
        {enabled ? '🔊' : '🔇'}
      </span>
      <span className="text-kid-sm font-medium text-gray-700">
        {enabled ? '소리 켜짐' : '소리 꺼짐'}
      </span>
    </button>
  );
}
