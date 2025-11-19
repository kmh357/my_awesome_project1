/**
 * 개별 할 일 항목 컴포넌트
 * 할 일 하나를 표시하고, 완료/미완료 상태를 체크박스로 표시합니다.
 */

import { useState, useRef, useEffect } from 'react';
import { Task } from '../types/task';

interface TodoItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, newText: string) => void;
}

export default function TodoItem({ task, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.taskText);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    onToggle(task.taskId);
  };

  // 편집 모드 진입
  const handleTextClick = () => {
    if (!task.isCompleted && onEdit) {
      setIsEditing(true);
      setEditText(task.taskText);
    }
  };

  // 편집 저장
  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== task.taskText) {
      onEdit?.(task.taskId, trimmedText);
    }
    setIsEditing(false);
  };

  // 편집 취소
  const handleCancel = () => {
    setEditText(task.taskText);
    setIsEditing(false);
  };

  // Enter 키로 저장, Esc 키로 취소
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // 편집 모드 진입 시 input에 포커스
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300
        ${
          task.isCompleted
            ? 'bg-accent-green/20 border-accent-green'
            : 'bg-white border-gray-200 hover:border-primary/50'
        }
      `}
    >
      {/* 체크박스 */}
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div
          className={`
            w-10 h-10 rounded-full border-4 flex items-center justify-center
            transition-all duration-300 flex-shrink-0
            ${
              task.isCompleted
                ? 'bg-primary border-primary scale-110'
                : 'bg-white border-gray-300 hover:border-primary'
            }
          `}
        >
          {task.isCompleted && (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
      </label>

      {/* 할 일 텍스트 또는 편집 입력 */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              maxLength={50}
              className="flex-1 px-3 py-1 rounded-lg border-2 border-primary text-kid-base focus:outline-none"
            />
          </div>
        ) : (
          <p
            onClick={handleTextClick}
            className={`
              text-kid-base font-medium transition-all duration-300
              ${
                task.isCompleted
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800 cursor-pointer hover:text-primary'
              }
              ${onEdit && !task.isCompleted ? 'hover:underline' : ''}
            `}
          >
            {task.taskText}
          </p>
        )}
      </div>

      {/* 완료 시 이모지 표시 */}
      {task.isCompleted && (
        <div className="text-2xl animate-pop">
          ✨
        </div>
      )}

      {/* 삭제 버튼 (선택적) */}
      {onDelete && (
        <button
          onClick={() => onDelete(task.taskId)}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors flex items-center justify-center flex-shrink-0"
          aria-label="삭제"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
