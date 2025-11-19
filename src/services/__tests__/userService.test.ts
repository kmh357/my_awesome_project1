/**
 * userService 단위 테스트
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getCurrentUser,
  createUser,
  updateUserName,
  hasUser,
  initializeUser,
} from '../userService';
import type { User } from '../../types/user';
import * as localStorage from '../../utils/localStorage';

// Mock localStorage utilities
vi.mock('../../utils/localStorage', async () => {
  const actual = await vi.importActual<typeof localStorage>('../../utils/localStorage');
  return {
    ...actual,
    getFromStorage: vi.fn(),
    saveToStorage: vi.fn(),
    generateId: vi.fn((prefix: string) => `${prefix}test-id`),
    getCurrentDateISO: vi.fn(() => '2025-11-19T10:00:00.000Z'),
  };
});

describe('userService', () => {
  const mockDate = '2025-11-19T10:00:00.000Z';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentUser', () => {
    it('현재 사용자 정보를 반환한다', () => {
      const mockUser: User = {
        userId: 'user_1',
        userName: '민수',
        createdAt: mockDate,
      };

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockUser);

      const result = getCurrentUser();

      expect(localStorage.getFromStorage).toHaveBeenCalledWith('tickticke_user', null);
      expect(result).toEqual(mockUser);
    });

    it('사용자가 없으면 null을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(null);

      const result = getCurrentUser();

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('새 사용자를 생성한다', () => {
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = createUser('지수');

      expect(result.userId).toBe('user_test-id');
      expect(result.userName).toBe('지수');
      expect(result.createdAt).toBe(mockDate);
      expect(localStorage.saveToStorage).toHaveBeenCalledWith('tickticke_user', result);
    });

    it('사용자 ID가 자동으로 생성된다', () => {
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = createUser('준호');

      expect(result.userId).toContain('user_');
    });
  });

  describe('updateUserName', () => {
    it('사용자 이름을 업데이트한다', () => {
      const mockUser: User = {
        userId: 'user_1',
        userName: '원래 이름',
        createdAt: mockDate,
      };

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockUser);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = updateUserName('새로운 이름');

      expect(result).toBe(true);
      expect(localStorage.saveToStorage).toHaveBeenCalledWith('tickticke_user', {
        ...mockUser,
        userName: '새로운 이름',
      });
    });

    it('사용자가 없으면 false를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(null);

      const result = updateUserName('새로운 이름');

      expect(result).toBe(false);
      expect(localStorage.saveToStorage).not.toHaveBeenCalled();
    });
  });

  describe('hasUser', () => {
    it('사용자가 존재하면 true를 반환한다', () => {
      const mockUser: User = {
        userId: 'user_1',
        userName: '민수',
        createdAt: mockDate,
      };

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockUser);

      const result = hasUser();

      expect(result).toBe(true);
    });

    it('사용자가 없으면 false를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(null);

      const result = hasUser();

      expect(result).toBe(false);
    });
  });

  describe('initializeUser', () => {
    it('기존 사용자가 있으면 해당 사용자를 반환한다', () => {
      const mockUser: User = {
        userId: 'user_1',
        userName: '기존 사용자',
        createdAt: mockDate,
      };

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockUser);

      const result = initializeUser();

      expect(result).toEqual(mockUser);
      expect(localStorage.saveToStorage).not.toHaveBeenCalled();
    });

    it('사용자가 없으면 기본 이름으로 새 사용자를 생성한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(null);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = initializeUser();

      expect(result.userName).toBe('친구');
      expect(localStorage.saveToStorage).toHaveBeenCalled();
    });

    it('사용자가 없으면 커스텀 이름으로 새 사용자를 생성한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue(null);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = initializeUser('철수');

      expect(result.userName).toBe('철수');
      expect(localStorage.saveToStorage).toHaveBeenCalled();
    });
  });
});
