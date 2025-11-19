/**
 * TodoItem 컴포넌트 테스트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../TodoItem';
import type { Task } from '../../types/task';

describe('TodoItem', () => {
  const mockTask: Task = {
    taskId: 'task_1',
    userId: 'user_1',
    taskText: '수학 숙제',
    isCompleted: false,
    createdDate: '2025-11-19T10:00:00.000Z',
  };

  const completedTask: Task = {
    ...mockTask,
    taskId: 'task_2',
    taskText: '영어 단어 외우기',
    isCompleted: true,
    completedDate: '2025-11-19T12:00:00.000Z',
  };

  it('할 일 텍스트를 렌더링한다', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} />);

    expect(screen.getByText('수학 숙제')).toBeInTheDocument();
  });

  it('체크박스를 렌더링한다', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('미완료 할 일은 체크되지 않는다', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('완료된 할 일은 체크된다', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={completedTask} onToggle={onToggle} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('완료된 할 일은 취소선이 표시된다', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={completedTask} onToggle={onToggle} />);

    const taskText = screen.getByText('영어 단어 외우기');
    expect(taskText).toHaveClass('line-through');
  });

  it('완료된 할 일은 스파클 이모지를 표시한다', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={completedTask} onToggle={onToggle} />);

    expect(screen.getByText('✨')).toBeInTheDocument();
  });

  it('체크박스 클릭 시 onToggle 콜백이 호출된다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onToggle).toHaveBeenCalledWith('task_1');
  });

  it('onDelete 콜백이 있으면 삭제 버튼을 표시한다', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onDelete={onDelete} />);

    const deleteButton = screen.getByLabelText('삭제');
    expect(deleteButton).toBeInTheDocument();
  });

  it('onDelete 콜백이 없으면 삭제 버튼을 표시하지 않는다', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} />);

    const deleteButton = screen.queryByLabelText('삭제');
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('삭제 버튼 클릭 시 onDelete 콜백이 호출된다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onDelete={onDelete} />);

    const deleteButton = screen.getByLabelText('삭제');
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith('task_1');
  });

  it('미완료 할 일 텍스트 클릭 시 편집 모드로 진입한다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onEdit={onEdit} />);

    const taskText = screen.getByText('수학 숙제');
    await user.click(taskText);

    // 편집 모드: input이 표시됨
    const input = screen.getByDisplayValue('수학 숙제');
    expect(input).toBeInTheDocument();
  });

  it('완료된 할 일은 편집할 수 없다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={completedTask} onToggle={onToggle} onEdit={onEdit} />);

    const taskText = screen.getByText('영어 단어 외우기');
    await user.click(taskText);

    // 편집 모드로 진입하지 않음
    const input = screen.queryByDisplayValue('영어 단어 외우기');
    expect(input).not.toBeInTheDocument();
  });

  it('편집 모드에서 Enter 키 입력 시 저장된다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onEdit={onEdit} />);

    // 편집 모드 진입
    const taskText = screen.getByText('수학 숙제');
    await user.click(taskText);

    const input = screen.getByDisplayValue('수학 숙제');
    await user.clear(input);
    await user.type(input, '과학 숙제{Enter}');

    expect(onEdit).toHaveBeenCalledWith('task_1', '과학 숙제');
  });

  it('편집 모드에서 Escape 키 입력 시 취소된다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onEdit={onEdit} />);

    // 편집 모드 진입
    const taskText = screen.getByText('수학 숙제');
    await user.click(taskText);

    const input = screen.getByDisplayValue('수학 숙제');
    await user.clear(input);
    await user.type(input, '과학 숙제{Escape}');

    // onEdit이 호출되지 않음
    expect(onEdit).not.toHaveBeenCalled();

    // 원래 텍스트로 복원
    await waitFor(() => {
      expect(screen.getByText('수학 숙제')).toBeInTheDocument();
    });
  });

  it('편집 모드에서 blur 시 저장된다', async () => {
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onEdit={onEdit} />);

    // 편집 모드 진입
    const taskText = screen.getByText('수학 숙제');
    fireEvent.click(taskText);

    const input = screen.getByDisplayValue('수학 숙제');
    fireEvent.change(input, { target: { value: '과학 숙제' } });
    fireEvent.blur(input);

    expect(onEdit).toHaveBeenCalledWith('task_1', '과학 숙제');
  });

  it('편집 모드에서 빈 텍스트 저장 시도 시 저장되지 않는다', async () => {
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onEdit={onEdit} />);

    // 편집 모드 진입
    const taskText = screen.getByText('수학 숙제');
    fireEvent.click(taskText);

    const input = screen.getByDisplayValue('수학 숙제');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.blur(input);

    expect(onEdit).not.toHaveBeenCalled();
  });

  it('편집 모드에서 같은 텍스트로 저장 시도 시 onEdit이 호출되지 않는다', async () => {
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onEdit={onEdit} />);

    // 편집 모드 진입
    const taskText = screen.getByText('수학 숙제');
    fireEvent.click(taskText);

    const input = screen.getByDisplayValue('수학 숙제');
    fireEvent.blur(input);

    expect(onEdit).not.toHaveBeenCalled();
  });

  it('편집 모드 진입 시 input에 자동 포커스된다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} onEdit={onEdit} />);

    // 편집 모드 진입
    const taskText = screen.getByText('수학 숙제');
    await user.click(taskText);

    const input = screen.getByDisplayValue('수학 숙제');
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  });

  it('onEdit 콜백이 없으면 텍스트 클릭 시 편집 모드로 진입하지 않는다', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} />);

    const taskText = screen.getByText('수학 숙제');
    await user.click(taskText);

    // 편집 모드로 진입하지 않음
    const input = screen.queryByDisplayValue('수학 숙제');
    expect(input).not.toBeInTheDocument();
  });
});
