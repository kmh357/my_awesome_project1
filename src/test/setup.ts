/**
 * Vitest 테스트 환경 설정
 */

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// 각 테스트 후 자동으로 cleanup
afterEach(() => {
  cleanup();
  // LocalStorage 초기화
  localStorage.clear();
});

// LocalStorage mock (jsdom에서 기본 제공되지만 명시적 설정)
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// window.matchMedia mock (Tailwind CSS 등에서 사용)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Date.now() mock (일관된 테스트를 위해)
export const mockDate = (dateString: string) => {
  vi.setSystemTime(new Date(dateString));
};

export const resetMockDate = () => {
  vi.useRealTimers();
};
