import './App.css';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-kid-2xl font-bold text-primary mb-4">
          찍찍이 (Tick-Tick-E)
        </h1>
        <p className="text-kid-base text-gray-700 mb-6">
          초등학생을 위한 재미있는 할 일 관리 앱
        </p>
        <div className="space-y-3">
          <button className="btn-primary w-full">
            시작하기
          </button>
          <button className="btn-secondary w-full">
            스티커 모음판
          </button>
        </div>
        <div className="mt-6 text-kid-sm text-gray-500">
          <p>✅ React + TypeScript</p>
          <p>🎨 Tailwind CSS</p>
          <p>💾 Local Storage</p>
        </div>
      </div>
    </div>
  );
}

export default App;
