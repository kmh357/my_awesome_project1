/**
 * 빈 상태 화면 컴포넌트
 * 할 일이 없을 때 표시되는 안내 메시지입니다.
 */

interface EmptyStateProps {
  onAddClick?: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-8xl mb-4 animate-bounce">📝</div>
      <h3 className="text-kid-xl font-bold text-gray-700 mb-2">
        할 일이 없어요!
      </h3>
      <p className="text-kid-base text-gray-500 mb-6">
        오늘 할 일을 추가해보세요
      </p>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="btn-primary inline-block"
        >
          할 일 추가하기
        </button>
      )}
    </div>
  );
}
