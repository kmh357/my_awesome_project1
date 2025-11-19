/**
 * 메인 앱 컴포넌트
 * 라우팅 및 앱 초기화를 담당합니다.
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeApp } from './services/initService';
import TodoListPage from './pages/TodoListPage';
import StickerCollectionPage from './pages/StickerCollectionPage';
import BottomNavigation from './components/BottomNavigation';
import './App.css';

function App() {
  // 앱 초기화 (스티커 데이터, 사용자 생성)
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20">
        {/* 페이지 라우팅 */}
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/collection" element={<StickerCollectionPage />} />
        </Routes>

        {/* 하단 네비게이션 */}
        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;
