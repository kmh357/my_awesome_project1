/**
 * 튜토리얼 관리 유틸리티
 * 첫 실행 감지 및 튜토리얼 상태를 관리합니다.
 */

// 튜토리얼 완료 상태 키
const TUTORIAL_COMPLETED_KEY = 'tickticke_tutorial_completed';

/**
 * 튜토리얼을 완료했는지 확인합니다.
 */
export function isTutorialCompleted(): boolean {
  const stored = localStorage.getItem(TUTORIAL_COMPLETED_KEY);
  return stored === 'true';
}

/**
 * 튜토리얼 완료 상태를 설정합니다.
 */
export function setTutorialCompleted(completed: boolean): void {
  localStorage.setItem(TUTORIAL_COMPLETED_KEY, completed.toString());
}

/**
 * 튜토리얼을 건너뛰고 완료 처리합니다.
 */
export function skipTutorial(): void {
  setTutorialCompleted(true);
}

/**
 * 튜토리얼을 보여야 하는지 확인합니다.
 * 첫 실행이거나 튜토리얼을 완료하지 않았으면 true를 반환합니다.
 */
export function shouldShowTutorial(): boolean {
  return !isTutorialCompleted();
}

/**
 * 튜토리얼 상태를 초기화합니다. (개발/테스트 용도)
 */
export function resetTutorial(): void {
  localStorage.removeItem(TUTORIAL_COMPLETED_KEY);
}
