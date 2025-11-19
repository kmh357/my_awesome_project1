/**
 * 메인 페이지 - 할 일 목록 화면
 * 오늘의 할 일 목록과 진행도를 표시합니다.
 */

import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import {
  getTodayTasks,
  toggleTaskCompletion,
  deleteTask,
  getTodayCompletedCount,
  getTodayTaskCount,
} from '../services/taskService';
import ProgressBar from '../components/ProgressBar';
import TodoList from '../components/TodoList';

export default function TodoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // 할 일 목록 로드
  const loadTasks = () => {
    const todayTasks = getTodayTasks();
    setTasks(todayTasks);
    setCompletedCount(getTodayCompletedCount());
    setTotalCount(getTodayTaskCount());
  };

  // 컴포넌트 마운트 시 할 일 목록 로드
  useEffect(() => {
    loadTasks();
  }, []);

  // 할 일 완료/미완료 토글
  const handleToggle = (taskId: string) => {
    const updatedTask = toggleTaskCompletion(taskId);
    if (updatedTask) {
      loadTasks(); // 목록 다시 로드

      // 할 일 완료 시 스티커 보상 로직 (나중에 구현)
      if (updatedTask.isCompleted) {
        console.log('🎉 할 일 완료! 스티커 보상 예정');
        // TODO: 스티커 보상 팝업 표시
      }
    }
  };

  // 할 일 삭제
  const handleDelete = (taskId: string) => {
    const confirmed = window.confirm('이 할 일을 삭제할까요?');
    if (confirmed) {
      const success = deleteTask(taskId);
      if (success) {
        loadTasks();
      }
    }
  };

  // 할 일 추가 버튼 클릭 (스크롤 또는 포커스 이동)
  const handleAddClick = () => {
    // TODO: 할 일 추가 입력창으로 스크롤 또는 포커스
    console.log('할 일 추가 버튼 클릭');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/20 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-kid-2xl font-bold text-primary mb-2">
            찍찍이 (Tick-Tick-E)
          </h1>
          <p className="text-kid-base text-gray-600">
            오늘도 화이팅! 💪
          </p>
        </div>

        {/* 카드 컨테이너 */}
        <div className="card">
          {/* 진행도 바 */}
          <ProgressBar completed={completedCount} total={totalCount} />

          {/* 할 일 목록 */}
          <TodoList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onAddClick={handleAddClick}
          />
        </div>

        {/* 푸터 */}
        <div className="text-center mt-8 text-kid-sm text-gray-400">
          <p>✨ 할 일을 완료하면 스티커를 받을 수 있어요!</p>
        </div>
      </div>
    </div>
  );
}
