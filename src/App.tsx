/**
 * 메인 앱 컴포넌트
 * 라우팅 및 앱 초기화를 담당합니다.
 */

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeApp } from './services/initService';
import { getFromStorage, saveToStorage } from './utils/localStorage';
import TodoListPage from './pages/TodoListPage';
import StickerCollectionPage from './pages/StickerCollectionPage';
import BottomNavigation from './components/BottomNavigation';
import TutorialModal from './components/TutorialModal';
import './App.css';

const TUTORIAL_COMPLETED_KEY = 'tickticke_tutorial_completed';

function App() {
  const [showTutorial, setShowTutorial] = useState(false);

  // 앱 초기화 (스티커 데이터, 사용자 생성, 튜토리얼 확인)
  useEffect(() => {
    initializeApp();

    // 튜토리얼 완료 여부 확인
    const tutorialCompleted = getFromStorage<boolean>(TUTORIAL_COMPLETED_KEY, false);

    // 튜토리얼을 본 적이 없으면 표시
    if (!tutorialCompleted) {
      setShowTutorial(true);
    }
  }, []);

  // 튜토리얼 닫기 핸들러
  const handleCloseTutorial = () => {
    setShowTutorial(false);
    // 튜토리얼 완료 표시
    saveToStorage(TUTORIAL_COMPLETED_KEY, true);
  };

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

        {/* 최초 사용자 튜토리얼 */}
        <TutorialModal isOpen={showTutorial} onClose={handleCloseTutorial} />
      </div>
    </BrowserRouter>
  );
}

export default App;
