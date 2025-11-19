/**
 * TodoListPage 통합 테스트
 * 주요 사용자 플로우를 테스트합니다.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TodoListPage from '../TodoListPage';
import * as taskService from '../../services/taskService';
import * as userService from '../../services/userService';
import * as stickerService from '../../services/stickerService';

// Mock services
vi.mock('../../services/taskService');
vi.mock('../../services/userService');
vi.mock('../../services/stickerService');

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('TodoListPage 통합 테스트', () => {
  const mockUser = {
    userId: 'user_test',
    userName: '테스트 사용자',
    createdAt: '2025-11-19T10:00:00.000Z',
  };

  const mockSticker = {
    stickerId: 'sticker_001',
    stickerName: '토끼',
    imageUrl: '🐰',
    rarity: 'common' as const,
    category: 'animal' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    // Default mocks
    vi.mocked(userService.getCurrentUser).mockReturnValue(mockUser);
    vi.mocked(taskService.getTasksByDate).mockReturnValue([]);
    vi.mocked(taskService.getCompletedCountByDate).mockReturnValue(0);
    vi.mocked(taskService.getTaskCountByDate).mockReturnValue(0);
  });

  describe('할 일 추가 플로우', () => {
    it('새 할 일을 추가할 수 있다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      vi.mocked(taskService.createTask).mockReturnValue(mockTask);
      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);
      vi.mocked(taskService.getTaskCountByDate).mockReturnValue(1);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
      await user.type(input, '수학 숙제');

      const addButton = screen.getByText('추가');
      await user.click(addButton);

      expect(taskService.createTask).toHaveBeenCalledWith('user_test', {
        taskText: '수학 숙제',
        createdDate: expect.stringContaining('2025-11-19'),
      });
    });

    it('할 일 추가 후 입력 필드가 초기화된다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      vi.mocked(taskService.createTask).mockReturnValue(mockTask);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const input = screen.getByPlaceholderText(/예: 수학 숙제하기/) as HTMLInputElement;
      await user.type(input, '수학 숙제');

      const addButton = screen.getByText('추가');
      await user.click(addButton);

      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });
  });

  describe('할 일 완료 플로우', () => {
    it('할 일을 완료할 수 있다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      const completedTask = {
        ...mockTask,
        isCompleted: true,
        completedDate: '2025-11-19T12:00:00.000Z',
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);
      vi.mocked(taskService.getTaskCountByDate).mockReturnValue(1);
      vi.mocked(taskService.toggleTaskCompletion).mockReturnValue(completedTask);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(taskService.toggleTaskCompletion).toHaveBeenCalledWith('task_1');
    });

    it('할 일 완료 시 스티커 보상을 받는다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      const completedTask = {
        ...mockTask,
        isCompleted: true,
        completedDate: '2025-11-19T12:00:00.000Z',
      };

      const userSticker = {
        userStickerId: 'us_1',
        userId: 'user_test',
        stickerId: 'sticker_001',
        acquiredDate: '2025-11-19T12:00:00.000Z',
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);
      vi.mocked(taskService.toggleTaskCompletion).mockReturnValue(completedTask);
      vi.mocked(stickerService.awardRandomStickerToUser).mockReturnValue(userSticker);
      vi.mocked(stickerService.getStickerById).mockReturnValue(mockSticker);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      await waitFor(() => {
        expect(stickerService.awardRandomStickerToUser).toHaveBeenCalledWith('user_test');
      });
    });

    it('할 일 완료 취소 시 스티커 보상을 받지 않는다', async () => {
      const user = userEvent.setup();
      const completedTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: true,
        createdDate: '2025-11-19T10:00:00.000Z',
        completedDate: '2025-11-19T11:00:00.000Z',
      };

      const uncompletedTask = {
        ...completedTask,
        isCompleted: false,
        completedDate: undefined,
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([completedTask]);
      vi.mocked(taskService.toggleTaskCompletion).mockReturnValue(uncompletedTask);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(stickerService.awardRandomStickerToUser).not.toHaveBeenCalled();
    });
  });

  describe('할 일 수정 플로우', () => {
    it('할 일을 수정할 수 있다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      const updatedTask = {
        ...mockTask,
        taskText: '과학 숙제',
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);
      vi.mocked(taskService.updateTask).mockReturnValue(updatedTask);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const taskText = screen.getByText('수학 숙제');
      await user.click(taskText);

      const input = screen.getByDisplayValue('수학 숙제');
      await user.clear(input);
      await user.type(input, '과학 숙제{Enter}');

      await waitFor(() => {
        expect(taskService.updateTask).toHaveBeenCalledWith('task_1', { taskText: '과학 숙제' });
      });
    });
  });

  describe('할 일 삭제 플로우', () => {
    it('할 일을 삭제할 수 있다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);
      vi.mocked(taskService.deleteTask).mockReturnValue(true);

      // window.confirm mock
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const deleteButton = screen.getByLabelText('삭제');
      await user.click(deleteButton);

      expect(window.confirm).toHaveBeenCalledWith('이 할 일을 삭제할까요?');
      expect(taskService.deleteTask).toHaveBeenCalledWith('task_1');
    });

    it('삭제 확인 취소 시 삭제되지 않는다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);

      // window.confirm mock - 취소
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const deleteButton = screen.getByLabelText('삭제');
      await user.click(deleteButton);

      expect(taskService.deleteTask).not.toHaveBeenCalled();
    });
  });

  describe('날짜 필터링 플로우', () => {
    it('오늘 버튼 클릭 시 오늘 날짜의 할 일을 표시한다', async () => {
      const user = userEvent.setup();
      const today = new Date().toISOString().split('T')[0];

      render(<TodoListPage />, { wrapper: TestWrapper });

      const todayButton = screen.getByRole('button', { name: '오늘' });
      await user.click(todayButton);

      expect(taskService.getTasksByDate).toHaveBeenCalledWith(today);
    });

    it('날짜 변경 시 해당 날짜의 할 일을 표시한다', async () => {
      const user = userEvent.setup();

      render(<TodoListPage />, { wrapper: TestWrapper });

      const dateInput = screen.getByDisplayValue(/2025-11-19/);
      await user.clear(dateInput);
      await user.type(dateInput, '2025-11-20');

      await waitFor(() => {
        expect(taskService.getTasksByDate).toHaveBeenCalledWith('2025-11-20');
      });
    });
  });

  describe('진행도 표시', () => {
    it('완료율을 정확히 표시한다', () => {
      const mockTasks = [
        {
          taskId: 'task_1',
          userId: 'user_test',
          taskText: '완료 1',
          isCompleted: true,
          createdDate: '2025-11-19T10:00:00.000Z',
        },
        {
          taskId: 'task_2',
          userId: 'user_test',
          taskText: '미완료',
          isCompleted: false,
          createdDate: '2025-11-19T11:00:00.000Z',
        },
      ];

      vi.mocked(taskService.getTasksByDate).mockReturnValue(mockTasks);
      vi.mocked(taskService.getCompletedCountByDate).mockReturnValue(1);
      vi.mocked(taskService.getTaskCountByDate).mockReturnValue(2);

      render(<TodoListPage />, { wrapper: TestWrapper });

      expect(screen.getByText('1/2')).toBeInTheDocument();
    });

    it('할 일이 없으면 0/0을 표시한다', () => {
      vi.mocked(taskService.getTasksByDate).mockReturnValue([]);
      vi.mocked(taskService.getCompletedCountByDate).mockReturnValue(0);
      vi.mocked(taskService.getTaskCountByDate).mockReturnValue(0);

      render(<TodoListPage />, { wrapper: TestWrapper });

      expect(screen.getByText('0/0')).toBeInTheDocument();
    });
  });

  describe('스티커 보상 모달', () => {
    it('스티커 획득 시 모달이 표시된다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      const completedTask = {
        ...mockTask,
        isCompleted: true,
        completedDate: '2025-11-19T12:00:00.000Z',
      };

      const userSticker = {
        userStickerId: 'us_1',
        userId: 'user_test',
        stickerId: 'sticker_001',
        acquiredDate: '2025-11-19T12:00:00.000Z',
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);
      vi.mocked(taskService.toggleTaskCompletion).mockReturnValue(completedTask);
      vi.mocked(stickerService.awardRandomStickerToUser).mockReturnValue(userSticker);
      vi.mocked(stickerService.getStickerById).mockReturnValue(mockSticker);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      await waitFor(() => {
        expect(screen.getByText(/토끼/)).toBeInTheDocument();
      });
    });

    it('모달 닫기 버튼 클릭 시 모달이 닫힌다', async () => {
      const user = userEvent.setup();
      const mockTask = {
        taskId: 'task_1',
        userId: 'user_test',
        taskText: '수학 숙제',
        isCompleted: false,
        createdDate: '2025-11-19T10:00:00.000Z',
      };

      const completedTask = {
        ...mockTask,
        isCompleted: true,
        completedDate: '2025-11-19T12:00:00.000Z',
      };

      const userSticker = {
        userStickerId: 'us_1',
        userId: 'user_test',
        stickerId: 'sticker_001',
        acquiredDate: '2025-11-19T12:00:00.000Z',
      };

      vi.mocked(taskService.getTasksByDate).mockReturnValue([mockTask]);
      vi.mocked(taskService.toggleTaskCompletion).mockReturnValue(completedTask);
      vi.mocked(stickerService.awardRandomStickerToUser).mockReturnValue(userSticker);
      vi.mocked(stickerService.getStickerById).mockReturnValue(mockSticker);

      render(<TodoListPage />, { wrapper: TestWrapper });

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      await waitFor(() => {
        expect(screen.getByText(/토끼/)).toBeInTheDocument();
      });

      const closeButton = screen.getByText('확인');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText(/토끼/)).not.toBeInTheDocument();
      });
    });
  });
});
