/**
 * taskService 단위 테스트
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAllTasks,
  getTodayTasks,
  getTasksByDate,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  getTodayCompletedCount,
  getTodayTaskCount,
  getCompletedCountByDate,
  getTaskCountByDate,
  deleteAllUserTasks,
} from '../taskService';
import type { Task } from '../../types/task';
import * as localStorage from '../../utils/localStorage';

// Mock localStorage utilities
vi.mock('../../utils/localStorage', async () => {
  const actual = await vi.importActual<typeof localStorage>('../../utils/localStorage');
  return {
    ...actual,
    getFromStorage: vi.fn(),
    saveToStorage: vi.fn(),
    generateId: vi.fn((prefix: string) => `${prefix}test-id-${Date.now()}`),
    getCurrentDateISO: vi.fn(() => '2025-11-19T10:00:00.000Z'),
    getTodayDateString: vi.fn(() => '2025-11-19'),
  };
});

describe('taskService', () => {
  const mockUserId = 'user_test';
  const mockDate = '2025-11-19T10:00:00.000Z';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('로컬 스토리지에서 모든 할 일을 가져온다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '수학 숙제',
          isCompleted: false,
          createdDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getAllTasks();

      expect(localStorage.getFromStorage).toHaveBeenCalledWith('tickticke_tasks', []);
      expect(result).toEqual(mockTasks);
    });

    it('할 일이 없으면 빈 배열을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = getAllTasks();

      expect(result).toEqual([]);
    });
  });

  describe('getTodayTasks', () => {
    it('오늘 날짜의 할 일만 반환한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '오늘 할 일',
          isCompleted: false,
          createdDate: '2025-11-19T10:00:00.000Z',
        },
        {
          taskId: 'task_2',
          userId: mockUserId,
          taskText: '어제 할 일',
          isCompleted: false,
          createdDate: '2025-11-18T10:00:00.000Z',
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getTodayTasks();

      expect(result).toHaveLength(1);
      expect(result[0].taskText).toBe('오늘 할 일');
    });
  });

  describe('getTasksByDate', () => {
    it('특정 날짜의 할 일만 반환한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '11월 18일 할 일',
          isCompleted: false,
          createdDate: '2025-11-18T10:00:00.000Z',
        },
        {
          taskId: 'task_2',
          userId: mockUserId,
          taskText: '11월 19일 할 일',
          isCompleted: false,
          createdDate: '2025-11-19T10:00:00.000Z',
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getTasksByDate('2025-11-18');

      expect(result).toHaveLength(1);
      expect(result[0].taskText).toBe('11월 18일 할 일');
    });

    it('해당 날짜의 할 일이 없으면 빈 배열을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = getTasksByDate('2025-11-20');

      expect(result).toEqual([]);
    });
  });

  describe('getTaskById', () => {
    it('ID로 특정 할 일을 찾는다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '찾을 할 일',
          isCompleted: false,
          createdDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getTaskById('task_1');

      expect(result).toBeDefined();
      expect(result?.taskText).toBe('찾을 할 일');
    });

    it('존재하지 않는 ID면 undefined를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = getTaskById('nonexistent');

      expect(result).toBeUndefined();
    });
  });

  describe('createTask', () => {
    it('새로운 할 일을 생성한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const input = { taskText: '새로운 할 일' };
      const result = createTask(mockUserId, input);

      expect(result.userId).toBe(mockUserId);
      expect(result.taskText).toBe('새로운 할 일');
      expect(result.isCompleted).toBe(false);
      expect(result.createdDate).toBe(mockDate);
      expect(localStorage.saveToStorage).toHaveBeenCalled();
    });

    it('커스텀 createdDate를 설정할 수 있다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const customDate = '2025-11-20T00:00:00.000Z';
      const input = { taskText: '내일 할 일', createdDate: customDate };
      const result = createTask(mockUserId, input);

      expect(result.createdDate).toBe(customDate);
    });
  });

  describe('updateTask', () => {
    it('할 일을 업데이트한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '원래 텍스트',
          isCompleted: false,
          createdDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = updateTask('task_1', { taskText: '수정된 텍스트' });

      expect(result).toBeDefined();
      expect(result?.taskText).toBe('수정된 텍스트');
      expect(localStorage.saveToStorage).toHaveBeenCalled();
    });

    it('완료 상태를 true로 변경하면 completedDate가 설정된다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '할 일',
          isCompleted: false,
          createdDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = updateTask('task_1', { isCompleted: true });

      expect(result?.isCompleted).toBe(true);
      expect(result?.completedDate).toBe(mockDate);
    });

    it('완료 상태를 false로 변경하면 completedDate가 제거된다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '할 일',
          isCompleted: true,
          createdDate: mockDate,
          completedDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = updateTask('task_1', { isCompleted: false });

      expect(result?.isCompleted).toBe(false);
      expect(result?.completedDate).toBeUndefined();
    });

    it('존재하지 않는 ID면 null을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = updateTask('nonexistent', { taskText: '수정' });

      expect(result).toBeNull();
    });
  });

  describe('deleteTask', () => {
    it('할 일을 삭제한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '삭제할 할 일',
          isCompleted: false,
          createdDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = deleteTask('task_1');

      expect(result).toBe(true);
      expect(localStorage.saveToStorage).toHaveBeenCalledWith('tickticke_tasks', []);
    });

    it('존재하지 않는 ID면 false를 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = deleteTask('nonexistent');

      expect(result).toBe(false);
    });
  });

  describe('toggleTaskCompletion', () => {
    it('완료 상태를 토글한다 (false -> true)', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '할 일',
          isCompleted: false,
          createdDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = toggleTaskCompletion('task_1');

      expect(result?.isCompleted).toBe(true);
      expect(result?.completedDate).toBeDefined();
    });

    it('완료 상태를 토글한다 (true -> false)', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '할 일',
          isCompleted: true,
          createdDate: mockDate,
          completedDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = toggleTaskCompletion('task_1');

      expect(result?.isCompleted).toBe(false);
      expect(result?.completedDate).toBeUndefined();
    });

    it('존재하지 않는 ID면 null을 반환한다', () => {
      vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

      const result = toggleTaskCompletion('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('getTodayCompletedCount', () => {
    it('오늘 완료된 할 일 개수를 반환한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '완료 1',
          isCompleted: true,
          createdDate: '2025-11-19T10:00:00.000Z',
        },
        {
          taskId: 'task_2',
          userId: mockUserId,
          taskText: '완료 2',
          isCompleted: true,
          createdDate: '2025-11-19T11:00:00.000Z',
        },
        {
          taskId: 'task_3',
          userId: mockUserId,
          taskText: '미완료',
          isCompleted: false,
          createdDate: '2025-11-19T12:00:00.000Z',
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getTodayCompletedCount();

      expect(result).toBe(2);
    });
  });

  describe('getTodayTaskCount', () => {
    it('오늘 전체 할 일 개수를 반환한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '오늘 1',
          isCompleted: false,
          createdDate: '2025-11-19T10:00:00.000Z',
        },
        {
          taskId: 'task_2',
          userId: mockUserId,
          taskText: '오늘 2',
          isCompleted: false,
          createdDate: '2025-11-19T11:00:00.000Z',
        },
        {
          taskId: 'task_3',
          userId: mockUserId,
          taskText: '어제',
          isCompleted: false,
          createdDate: '2025-11-18T10:00:00.000Z',
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getTodayTaskCount();

      expect(result).toBe(2);
    });
  });

  describe('getCompletedCountByDate', () => {
    it('특정 날짜의 완료된 할 일 개수를 반환한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '완료',
          isCompleted: true,
          createdDate: '2025-11-18T10:00:00.000Z',
        },
        {
          taskId: 'task_2',
          userId: mockUserId,
          taskText: '미완료',
          isCompleted: false,
          createdDate: '2025-11-18T11:00:00.000Z',
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getCompletedCountByDate('2025-11-18');

      expect(result).toBe(1);
    });
  });

  describe('getTaskCountByDate', () => {
    it('특정 날짜의 전체 할 일 개수를 반환한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: mockUserId,
          taskText: '11월 18일 1',
          isCompleted: false,
          createdDate: '2025-11-18T10:00:00.000Z',
        },
        {
          taskId: 'task_2',
          userId: mockUserId,
          taskText: '11월 18일 2',
          isCompleted: false,
          createdDate: '2025-11-18T11:00:00.000Z',
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);

      const result = getTaskCountByDate('2025-11-18');

      expect(result).toBe(2);
    });
  });

  describe('deleteAllUserTasks', () => {
    it('특정 사용자의 모든 할 일을 삭제한다', () => {
      const mockTasks: Task[] = [
        {
          taskId: 'task_1',
          userId: 'user_1',
          taskText: '사용자 1',
          isCompleted: false,
          createdDate: mockDate,
        },
        {
          taskId: 'task_2',
          userId: 'user_2',
          taskText: '사용자 2',
          isCompleted: false,
          createdDate: mockDate,
        },
      ];

      vi.mocked(localStorage.getFromStorage).mockReturnValue(mockTasks);
      vi.mocked(localStorage.saveToStorage).mockReturnValue(true);

      const result = deleteAllUserTasks('user_1');

      expect(result).toBe(true);
      expect(localStorage.saveToStorage).toHaveBeenCalledWith('tickticke_tasks', [mockTasks[1]]);
    });
  });
});
