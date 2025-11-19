/**
 * TodoList 컴포넌트 테스트
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { Task } from '../../types/task';

describe('TodoList', () => {
  const mockTasks: Task[] = [
    {
      taskId: 'task_1',
      userId: 'user_1',
      taskText: '수학 숙제',
      isCompleted: false,
      createdDate: '2025-11-19T10:00:00.000Z',
    },
    {
      taskId: 'task_2',
      userId: 'user_1',
      taskText: '영어 단어 외우기',
      isCompleted: true,
      createdDate: '2025-11-19T11:00:00.000Z',
      completedDate: '2025-11-19T12:00:00.000Z',
    },
    {
      taskId: 'task_3',
      userId: 'user_1',
      taskText: '과학 실험 준비',
      isCompleted: false,
      createdDate: '2025-11-19T13:00:00.000Z',
    },
  ];

  it('할 일 목록을 렌더링한다', () => {
    const onToggle = vi.fn();
    render(<TodoList tasks={mockTasks} onToggle={onToggle} />);

    expect(screen.getByText('수학 숙제')).toBeInTheDocument();
    expect(screen.getByText('영어 단어 외우기')).toBeInTheDocument();
    expect(screen.getByText('과학 실험 준비')).toBeInTheDocument();
  });

  it('할 일이 없으면 빈 상태를 표시한다', () => {
    const onToggle = vi.fn();
    const onAddClick = vi.fn();
    render(<TodoList tasks={[]} onToggle={onToggle} onAddClick={onAddClick} />);

    expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
  });

  it('미완료 할 일을 먼저 표시한다', () => {
    const onToggle = vi.fn();
    render(<TodoList tasks={mockTasks} onToggle={onToggle} />);

    const taskTexts = screen.getAllByText(/수학|영어|과학/).map((el) => el.textContent);

    // 미완료 할 일(수학, 과학)이 완료된 할 일(영어)보다 앞에 있어야 함
    const mathIndex = taskTexts.findIndex((text) => text === '수학 숙제');
    const scienceIndex = taskTexts.findIndex((text) => text === '과학 실험 준비');
    const englishIndex = taskTexts.findIndex((text) => text === '영어 단어 외우기');

    expect(mathIndex).toBeLessThan(englishIndex);
    expect(scienceIndex).toBeLessThan(englishIndex);
  });

  it('완료된 할 일에 체크 표시가 있다', () => {
    const onToggle = vi.fn();
    render(<TodoList tasks={mockTasks} onToggle={onToggle} />);

    const checkboxes = screen.getAllByRole('checkbox');
    // mockTasks에서 완료된 항목은 인덱스 1 (정렬 후에는 마지막)
    const completedCheckbox = checkboxes.find((cb) => (cb as HTMLInputElement).checked);

    expect(completedCheckbox).toBeDefined();
    expect(completedCheckbox).toBeChecked();
  });

  it('미완료 할 일에 체크 표시가 없다', () => {
    const onToggle = vi.fn();
    render(<TodoList tasks={mockTasks} onToggle={onToggle} />);

    const checkboxes = screen.getAllByRole('checkbox');
    // mockTasks에서 미완료 항목은 인덱스 0과 2 (정렬 후 앞쪽)
    const incompleteCheckboxes = checkboxes.filter((cb) => !(cb as HTMLInputElement).checked);

    expect(incompleteCheckboxes.length).toBe(2);
    incompleteCheckboxes.forEach((cb) => {
      expect(cb).not.toBeChecked();
    });
  });

  it('onDelete 콜백이 전달되면 삭제 버튼을 표시한다', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    render(<TodoList tasks={[mockTasks[0]]} onToggle={onToggle} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByLabelText('삭제');
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it('onEdit 콜백이 전달되면 편집 가능하다', () => {
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    render(<TodoList tasks={[mockTasks[0]]} onToggle={onToggle} onEdit={onEdit} />);

    // TodoItem이 onEdit을 받았는지는 직접적으로 테스트하기 어려우므로
    // 텍스트 클릭이 가능한지 확인 (hover 스타일이 적용되는지)
    const taskText = screen.getByText('수학 숙제');
    expect(taskText).toHaveClass('cursor-pointer');
  });

  it('단일 할 일을 렌더링한다', () => {
    const onToggle = vi.fn();
    render(<TodoList tasks={[mockTasks[0]]} onToggle={onToggle} />);

    expect(screen.getByText('수학 숙제')).toBeInTheDocument();
    expect(screen.queryByText('영어 단어 외우기')).not.toBeInTheDocument();
  });

  it('다수의 할 일을 렌더링한다', () => {
    const onToggle = vi.fn();
    const manyTasks: Task[] = Array.from({ length: 10 }, (_, i) => ({
      taskId: `task_${i}`,
      userId: 'user_1',
      taskText: `할 일 ${i + 1}`,
      isCompleted: false,
      createdDate: '2025-11-19T10:00:00.000Z',
    }));

    render(<TodoList tasks={manyTasks} onToggle={onToggle} />);

    expect(screen.getByText('할 일 1')).toBeInTheDocument();
    expect(screen.getByText('할 일 10')).toBeInTheDocument();
  });
});
