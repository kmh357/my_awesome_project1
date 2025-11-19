/**
 * 로컬 스토리지 유틸리티 함수
 * 찍찍이 앱의 모든 데이터를 로컬 스토리지에 저장하고 관리합니다.
 */

// 로컬 스토리지 키 상수
export const STORAGE_KEYS = {
  USER: 'tickticke_user',
  TASKS: 'tickticke_tasks',
  STICKERS: 'tickticke_stickers',
  USER_STICKERS: 'tickticke_user_stickers',
} as const;

/**
 * 로컬 스토리지에서 데이터를 안전하게 가져옵니다.
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * 로컬 스토리지에 데이터를 안전하게 저장합니다.
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
}

/**
 * 로컬 스토리지에서 데이터를 삭제합니다.
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
}

/**
 * 모든 찍찍이 앱 데이터를 초기화합니다.
 */
export function clearAllAppData(): boolean {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing app data:', error);
    return false;
  }
}

/**
 * 고유 ID를 생성합니다.
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}${timestamp}_${random}`;
}

/**
 * 현재 날짜를 ISO 8601 형식으로 반환합니다.
 */
export function getCurrentDateISO(): string {
  return new Date().toISOString();
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환합니다.
 */
export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
