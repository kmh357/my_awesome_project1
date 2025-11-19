/**
 * 사운드 토글 컴포넌트
 * 사용자가 효과음을 켜고 끌 수 있는 버튼을 제공합니다.
 */

import { useState, useEffect } from 'react';
import { getSoundSettings, toggleSound, playSound } from '../services/soundService';

export default function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(true);

  // 컴포넌트 마운트 시 사운드 설정 불러오기
  useEffect(() => {
    const settings = getSoundSettings();
    setIsEnabled(settings.enabled);
  }, []);

  // 사운드 토글 핸들러
  const handleToggle = () => {
    const newState = toggleSound();
    setIsEnabled(newState);

    // 사운드가 활성화되면 테스트 효과음 재생
    if (newState) {
      playSound('click');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      aria-label={isEnabled ? '사운드 끄기' : '사운드 켜기'}
      title={isEnabled ? '사운드 끄기' : '사운드 켜기'}
    >
      <span className="text-2xl" role="img" aria-label="sound">
        {isEnabled ? '🔊' : '🔇'}
      </span>
      <span className="text-kid-sm font-medium text-gray-700">
        {isEnabled ? '소리 켜짐' : '소리 꺼짐'}
      </span>
    </button>
  );
}
