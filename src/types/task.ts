/**
 * 할 일 관련 타입 정의
 */

export interface Task {
  taskId: string;
  userId: string;
  taskText: string;
  isCompleted: boolean;
  createdDate: string; // ISO 8601 format
  completedDate?: string; // ISO 8601 format
}

export interface CreateTaskInput {
  taskText: string;
  createdDate?: string; // 기본값: 오늘
}

export interface UpdateTaskInput {
  taskText?: string;
  isCompleted?: boolean;
}
