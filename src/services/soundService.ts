/**
 * 사운드 효과 서비스
 * Web Audio API를 사용하여 효과음을 생성하고 재생합니다.
 */

import type { SoundType, SoundSettings } from '../types/sound';
import { getFromStorage, saveToStorage } from '../utils/localStorage';

const SOUND_SETTINGS_KEY = 'tickticke_sound_settings';

// 기본 사운드 설정
const DEFAULT_SETTINGS: SoundSettings = {
  enabled: true,
  volume: 0.5,
};

/**
 * 사운드 설정을 가져옵니다.
 */
export function getSoundSettings(): SoundSettings {
  return getFromStorage<SoundSettings>(SOUND_SETTINGS_KEY, DEFAULT_SETTINGS);
}

/**
 * 사운드 설정을 저장합니다.
 */
export function saveSoundSettings(settings: SoundSettings): boolean {
  return saveToStorage(SOUND_SETTINGS_KEY, settings);
}

/**
 * 사운드 활성화/비활성화를 토글합니다.
 */
export function toggleSound(): boolean {
  const settings = getSoundSettings();
  const newSettings = { ...settings, enabled: !settings.enabled };
  saveSoundSettings(newSettings);
  return newSettings.enabled;
}

/**
 * 볼륨을 설정합니다 (0.0 ~ 1.0)
 */
export function setVolume(volume: number): boolean {
  const settings = getSoundSettings();
  const clampedVolume = Math.max(0, Math.min(1, volume));
  return saveSoundSettings({ ...settings, volume: clampedVolume });
}

/**
 * Web Audio API를 사용하여 효과음을 재생합니다.
 */
function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.5
): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // 볼륨 설정 (페이드 아웃 효과)
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    // 메모리 정리
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
      audioContext.close();
    };
  } catch (error) {
    console.warn('사운드 재생 실패:', error);
  }
}

/**
 * 복합 톤을 재생합니다 (화음 효과)
 */
function playChord(
  frequencies: number[],
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
): void {
  frequencies.forEach((freq) => {
    playTone(freq, duration, type, volume);
  });
}

/**
 * 효과음을 재생합니다.
 */
export function playSound(soundType: SoundType): void {
  const settings = getSoundSettings();

  if (!settings.enabled) {
    return;
  }

  const volume = settings.volume;

  switch (soundType) {
    case 'complete':
      // 할 일 완료 - 경쾌한 상승 톤
      playTone(523.25, 0.1, 'sine', volume * 0.3); // C5
      setTimeout(() => playTone(659.25, 0.15, 'sine', volume * 0.3), 50); // E5
      break;

    case 'reward':
      // 스티커 보상 - 축하 화음
      playChord([523.25, 659.25, 783.99], 0.3, 'sine', volume * 0.2); // C-E-G
      setTimeout(() => {
        playChord([659.25, 783.99, 987.77], 0.4, 'sine', volume * 0.2); // E-G-B
      }, 150);
      break;

    case 'click':
      // 클릭 - 짧은 톡 소리
      playTone(800, 0.05, 'sine', volume * 0.2);
      break;

    case 'error':
      // 에러 - 낮은 톤
      playTone(200, 0.2, 'sine', volume * 0.3);
      break;

    default:
      console.warn('알 수 없는 사운드 타입:', soundType);
  }
}

/**
 * 사운드가 활성화되어 있는지 확인합니다.
 */
export function isSoundEnabled(): boolean {
  return getSoundSettings().enabled;
}
