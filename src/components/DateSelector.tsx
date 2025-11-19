/**
 * 날짜 선택 컴포넌트
 * 어제, 오늘, 내일 버튼과 날짜 입력 필드를 제공합니다.
 */

interface DateSelectorProps {
  selectedDate: string; // YYYY-MM-DD 형식
  onDateChange: (date: string) => void;
}

export default function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  // 오늘 날짜 (YYYY-MM-DD 형식)
  const today = new Date().toISOString().split('T')[0];

  // 어제 날짜
  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  // 내일 날짜
  const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  // 날짜를 한글로 표시 (예: "1월 15일")
  const formatDateKorean = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  // 날짜가 오늘인지 확인
  const isToday = selectedDate === today;
  const isYesterday = selectedDate === getYesterday();
  const isTomorrow = selectedDate === getTomorrow();

  return (
    <div className="mb-6">
      {/* 날짜 표시 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-kid-lg font-bold text-gray-800">
          {isToday ? '오늘' : isYesterday ? '어제' : isTomorrow ? '내일' : formatDateKorean(selectedDate)}
        </h2>
        <span className="text-kid-sm text-gray-500">
          {selectedDate}
        </span>
      </div>

      {/* 날짜 선택 버튼 */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => onDateChange(getYesterday())}
          className={`
            flex-1 py-2 px-4 rounded-xl font-medium text-kid-sm transition-all
            ${isYesterday
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          어제
        </button>
        <button
          onClick={() => onDateChange(today)}
          className={`
            flex-1 py-2 px-4 rounded-xl font-medium text-kid-sm transition-all
            ${isToday
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          오늘
        </button>
        <button
          onClick={() => onDateChange(getTomorrow())}
          className={`
            flex-1 py-2 px-4 rounded-xl font-medium text-kid-sm transition-all
            ${isTomorrow
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          내일
        </button>
      </div>

      {/* 날짜 입력 필드 */}
      <div className="flex items-center gap-2">
        <label htmlFor="date-picker" className="text-kid-sm text-gray-600">
          다른 날짜:
        </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 text-kid-sm focus:border-primary focus:outline-none"
        />
      </div>
    </div>
  );
}
