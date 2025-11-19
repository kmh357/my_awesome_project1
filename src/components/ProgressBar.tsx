/**
 * 완료율 표시 진행 바 컴포넌트
 * 오늘 완료한 할 일의 진행도를 시각적으로 표시합니다.
 */

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-kid-base font-bold text-gray-700">
          오늘의 할 일
        </span>
        <span className="text-kid-base font-bold text-primary">
          {completed}/{total}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out flex items-center justify-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && (
            <span className="text-white font-bold text-kid-sm">
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {percentage === 100 && total > 0 && (
        <div className="mt-3 text-center">
          <span className="text-kid-lg">🎉</span>
          <span className="ml-2 text-kid-base font-bold text-secondary">
            모두 완료했어요! 최고예요!
          </span>
        </div>
      )}
    </div>
  );
}
