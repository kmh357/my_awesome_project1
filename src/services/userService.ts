/**
 * 사용자 관리 서비스
 * 로컬 스토리지를 사용하여 사용자 정보를 관리합니다.
 */

import { User } from '../types/user';
import {
  STORAGE_KEYS,
  getFromStorage,
  saveToStorage,
  generateId,
  getCurrentDateISO,
} from '../utils/localStorage';

/**
 * 현재 로그인한 사용자 정보를 가져옵니다.
 */
export function getCurrentUser(): User | null {
  return getFromStorage<User | null>(STORAGE_KEYS.USER, null);
}

/**
 * 새 사용자를 생성합니다.
 */
export function createUser(userName: string): User {
  const newUser: User = {
    userId: generateId('user_'),
    userName,
    createdAt: getCurrentDateISO(),
  };

  saveToStorage(STORAGE_KEYS.USER, newUser);
  return newUser;
}

/**
 * 사용자 이름을 업데이트합니다.
 */
export function updateUserName(userName: string): boolean {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return false;
  }

  const updatedUser: User = {
    ...currentUser,
    userName,
  };

  return saveToStorage(STORAGE_KEYS.USER, updatedUser);
}

/**
 * 사용자가 존재하는지 확인합니다.
 */
export function hasUser(): boolean {
  return getCurrentUser() !== null;
}

/**
 * 사용자를 초기화하거나 가져옵니다.
 * 사용자가 없으면 기본 사용자를 생성합니다.
 */
export function initializeUser(defaultName: string = '친구'): User {
  const existingUser = getCurrentUser();
  if (existingUser) {
    return existingUser;
  }
  return createUser(defaultName);
}
