/**
 * 할 일 목록 컴포넌트
 * 여러 개의 TodoItem을 렌더링하고 빈 상태를 처리합니다.
 */

import { Task } from '../types/task';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

interface TodoListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, newText: string) => void;
  onAddClick?: () => void;
}

export default function TodoList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onAddClick,
}: TodoListProps) {
  // 할 일이 없으면 빈 상태 표시
  if (tasks.length === 0) {
    return <EmptyState onAddClick={onAddClick} />;
  }

  // 완료되지 않은 할 일을 먼저, 완료된 할 일을 나중에 표시
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return 0;
    }
    return a.isCompleted ? 1 : -1;
  });

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TodoItem
          key={task.taskId}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
