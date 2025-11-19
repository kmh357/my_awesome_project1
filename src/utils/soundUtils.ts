/**
 * 사운드 효과 유틸리티
 * 스티커 획득 시 재생할 사운드 효과를 관리합니다.
 */

// 사운드 설정 키
const SOUND_ENABLED_KEY = 'tickticke_sound_enabled';

/**
 * 사운드 활성화 상태를 확인합니다.
 */
export function isSoundEnabled(): boolean {
  const stored = localStorage.getItem(SOUND_ENABLED_KEY);
  // 기본값은 true (활성화)
  return stored === null ? true : stored === 'true';
}

/**
 * 사운드 활성화 상태를 설정합니다.
 */
export function setSoundEnabled(enabled: boolean): void {
  localStorage.setItem(SOUND_ENABLED_KEY, enabled.toString());
}

/**
 * 사운드 활성화 상태를 토글합니다.
 */
export function toggleSound(): boolean {
  const newState = !isSoundEnabled();
  setSoundEnabled(newState);
  return newState;
}

/**
 * Web Audio API를 사용하여 간단한 축하 사운드를 생성합니다.
 * 실제 사운드 파일이 없을 때 대체용으로 사용됩니다.
 */
function playSuccessBeep(): void {
  if (!isSoundEnabled()) return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // 첫 번째 음 (높은 음)
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();

    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);

    oscillator1.frequency.value = 800; // 높은 음
    oscillator1.type = 'sine';

    gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator1.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.1);

    // 두 번째 음 (더 높은 음)
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();

    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);

    oscillator2.frequency.value = 1000; // 더 높은 음
    oscillator2.type = 'sine';

    gainNode2.gain.setValueAtTime(0, audioContext.currentTime + 0.1);
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);

    oscillator2.start(audioContext.currentTime + 0.1);
    oscillator2.stop(audioContext.currentTime + 0.25);
  } catch (error) {
    console.warn('사운드 재생 실패:', error);
  }
}

/**
 * HTML5 Audio를 사용하여 사운드 파일을 재생합니다.
 * 사운드 파일이 있을 경우 사용됩니다.
 * (현재는 사용하지 않지만 향후 확장 가능)
 */
// function playAudioFile(audioPath: string): void {
//   if (!isSoundEnabled()) return;

//   try {
//     const audio = new Audio(audioPath);
//     audio.volume = 0.5; // 볼륨 50%
//     audio.play().catch((error) => {
//       console.warn('오디오 재생 실패:', error);
//       // 파일 재생 실패 시 대체 사운드 재생
//       playSuccessBeep();
//     });
//   } catch (error) {
//     console.warn('오디오 로딩 실패:', error);
//     playSuccessBeep();
//   }
// }

/**
 * 스티커 획득 시 재생할 축하 사운드를 재생합니다.
 * 희귀도에 따라 다른 사운드를 재생할 수 있습니다.
 */
export function playStickerRewardSound(_rarity?: string): void {
  if (!isSoundEnabled()) return;

  // 희귀도별 다른 사운드 재생 (향후 확장 가능)
  // 현재는 모든 희귀도에 동일한 사운드 사용

  // 사운드 파일 경로 (실제 파일이 있으면 사용)
  // const soundPath = `/sounds/reward-${_rarity || 'common'}.mp3`;

  // 현재는 Web Audio API로 생성한 사운드 사용
  playSuccessBeep();
}

/**
 * 체크박스 완료 시 재생할 클릭 사운드를 재생합니다.
 */
export function playCheckSound(): void {
  if (!isSoundEnabled()) return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch (error) {
    console.warn('사운드 재생 실패:', error);
  }
}

/**
 * 버튼 클릭 시 재생할 클릭 사운드를 재생합니다.
 */
export function playClickSound(): void {
  if (!isSoundEnabled()) return;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.03);
  } catch (error) {
    console.warn('사운드 재생 실패:', error);
  }
}
