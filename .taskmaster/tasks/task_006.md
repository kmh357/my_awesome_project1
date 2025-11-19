# TASK-006: 할 일 추가 기능 구현

**Priority:** High
**Status:** Pending
**Phase:** Phase 1-2 (Week 3-4)
**Estimated Hours:** 8
**Tags:** frontend, backend, core-feature

## Description
사용자가 할 일을 입력하고 추가할 수 있는 기능을 구현합니다. 입력 필드, 추가 버튼, 유효성 검증을 포함합니다.

## Acceptance Criteria
- [ ] 할 일 입력 필드 구현 (최대 50자 제한)
- [ ] placeholder 텍스트 표시: '예: 수학 숙제하기, 강아지 밥 주기'
- [ ] 추가 버튼 클릭 시 할 일 목록에 추가
- [ ] 빈 내용 입력 시 유효성 검증 및 에러 메시지 표시
- [ ] Enter 키 입력 시 자동 추가 기능
- [ ] 데이터베이스에 할 일 저장 확인
- [ ] 날짜별 할 일 구분 저장

## Implementation Steps

### 1. TypeScript 타입 정의
```typescript
// src/types/task.ts
export interface Task {
  taskId: string;
  userId: string;
  taskText: string;
  isCompleted: boolean;
  createdDate: string; // ISO 8601 format
  completedDate?: string;
}
```

### 2. 컴포넌트 구현
```typescript
// src/components/TaskInput.tsx
import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (taskText: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const MAX_LENGTH = 50;

  const handleSubmit = () => {
    if (input.trim() === '') {
      setError('할 일을 입력해주세요');
      return;
    }

    onAddTask(input.trim());
    setInput('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MAX_LENGTH))}
        onKeyPress={handleKeyPress}
        placeholder="예: 수학 숙제하기, 강아지 밥 주기"
        className="task-input"
      />
      <button onClick={handleSubmit} className="add-button">
        + 추가
      </button>
      {error && <p className="error-message">{error}</p>}
      <p className="char-count">{input.length}/{MAX_LENGTH}</p>
    </div>
  );
};
```

### 3. 데이터 저장 로직
```typescript
// src/services/taskService.ts
import { Task } from '../types/task';

export const addTask = (taskText: string): Task => {
  const newTask: Task = {
    taskId: `task-${Date.now()}`,
    userId: 'user-1', // 임시, 추후 인증 시스템과 연동
    taskText,
    isCompleted: false,
    createdDate: new Date().toISOString(),
  };

  // 로컬 스토리지에 저장
  const tasks = getTasksFromStorage();
  tasks.push(newTask);
  saveTasksToStorage(tasks);

  return newTask;
};

const getTasksFromStorage = (): Task[] => {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
};

const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
```

### 4. 스타일링 (Tailwind CSS)
```css
/* src/styles/TaskInput.css */
.task-input-container {
  @apply flex flex-col gap-2 p-4 bg-pastel-blue rounded-lg;
}

.task-input {
  @apply w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg
         focus:border-primary focus:outline-none;
  font-size: 18px; /* 초등학생이 읽기 쉬운 크기 */
}

.add-button {
  @apply bg-primary text-white px-6 py-3 rounded-lg text-lg font-bold
         hover:bg-primary-dark transition-colors;
  min-width: 44px; /* 터치하기 쉬운 크기 */
  min-height: 44px;
}

.error-message {
  @apply text-red-500 text-sm;
}

.char-count {
  @apply text-gray-500 text-sm text-right;
}
```

## Dependencies
- TASK-001: 프로젝트 초기 설정 및 환경 구성
- TASK-002: 데이터베이스 스키마 설계 및 구현
- TASK-004: 기본 라우팅 및 페이지 구조 설정

## Testing Checklist
- [ ] 50자 제한 동작 확인
- [ ] 빈 입력 시 에러 메시지 표시
- [ ] Enter 키로 추가 가능
- [ ] 로컬 스토리지에 정상 저장
- [ ] 추가 후 입력 필드 초기화

## Notes
- PRD 요구사항: 큰 글씨와 아이콘 사용, 밝고 친근한 색상 (파스텔톤)
- 버튼 크기 최소 44x44px (터치 친화적)
