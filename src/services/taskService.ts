/**
 * 할 일 관리 서비스
 * 로컬 스토리지를 사용하여 할 일(Task) 데이터를 관리합니다.
 */

import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import {
  STORAGE_KEYS,
  getFromStorage,
  saveToStorage,
  generateId,
  getCurrentDateISO,
  getTodayDateString,
} from '../utils/localStorage';

/**
 * 모든 할 일 목록을 가져옵니다.
 */
export function getAllTasks(): Task[] {
  return getFromStorage<Task[]>(STORAGE_KEYS.TASKS, []);
}

/**
 * 오늘 날짜의 할 일 목록만 가져옵니다.
 */
export function getTodayTasks(): Task[] {
  const allTasks = getAllTasks();
  const today = getTodayDateString();

  return allTasks.filter((task) => {
    const taskDate = task.createdDate.split('T')[0];
    return taskDate === today;
  });
}

/**
 * 특정 ID의 할 일을 가져옵니다.
 */
export function getTaskById(taskId: string): Task | undefined {
  const tasks = getAllTasks();
  return tasks.find((task) => task.taskId === taskId);
}

/**
 * 새로운 할 일을 생성합니다.
 */
export function createTask(userId: string, input: CreateTaskInput): Task {
  const tasks = getAllTasks();

  const newTask: Task = {
    taskId: generateId('task_'),
    userId,
    taskText: input.taskText,
    isCompleted: false,
    createdDate: input.createdDate || getCurrentDateISO(),
  };

  tasks.push(newTask);
  saveToStorage(STORAGE_KEYS.TASKS, tasks);

  return newTask;
}

/**
 * 할 일을 업데이트합니다.
 */
export function updateTask(taskId: string, input: UpdateTaskInput): Task | null {
  const tasks = getAllTasks();
  const taskIndex = tasks.findIndex((task) => task.taskId === taskId);

  if (taskIndex === -1) {
    return null;
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...input,
  };

  // 완료 상태가 true로 변경되면 completedDate 설정
  if (input.isCompleted === true && !tasks[taskIndex].isCompleted) {
    updatedTask.completedDate = getCurrentDateISO();
  }

  // 완료 상태가 false로 변경되면 completedDate 제거
  if (input.isCompleted === false && tasks[taskIndex].isCompleted) {
    delete updatedTask.completedDate;
  }

  tasks[taskIndex] = updatedTask;
  saveToStorage(STORAGE_KEYS.TASKS, tasks);

  return updatedTask;
}

/**
 * 할 일을 삭제합니다.
 */
export function deleteTask(taskId: string): boolean {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((task) => task.taskId !== taskId);

  if (filteredTasks.length === tasks.length) {
    return false; // 삭제할 항목이 없음
  }

  saveToStorage(STORAGE_KEYS.TASKS, filteredTasks);
  return true;
}

/**
 * 할 일의 완료 상태를 토글합니다.
 */
export function toggleTaskCompletion(taskId: string): Task | null {
  const task = getTaskById(taskId);
  if (!task) {
    return null;
  }

  return updateTask(taskId, { isCompleted: !task.isCompleted });
}

/**
 * 오늘의 완료된 할 일 개수를 가져옵니다.
 */
export function getTodayCompletedCount(): number {
  const todayTasks = getTodayTasks();
  return todayTasks.filter((task) => task.isCompleted).length;
}

/**
 * 오늘의 전체 할 일 개수를 가져옵니다.
 */
export function getTodayTaskCount(): number {
  return getTodayTasks().length;
}

/**
 * 특정 사용자의 모든 할 일을 삭제합니다.
 */
export function deleteAllUserTasks(userId: string): boolean {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((task) => task.userId !== userId);
  return saveToStorage(STORAGE_KEYS.TASKS, filteredTasks);
}
