/**
 * 할 일 추가 입력 컴포넌트
 * 사용자가 새로운 할 일을 입력하고 추가할 수 있습니다.
 */

import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

interface TodoInputProps {
  onAdd: (taskText: string) => void;
  maxLength?: number;
}

export default function TodoInput({ onAdd, maxLength = 50 }: TodoInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // 입력 값 변경 핸들러
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 에러 메시지 초기화
    if (error) {
      setError('');
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 유효성 검증
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setError('할 일을 입력해주세요!');
      return;
    }

    if (trimmedValue.length > maxLength) {
      setError(`할 일은 최대 ${maxLength}자까지 입력할 수 있어요!`);
      return;
    }

    // 할 일 추가
    onAdd(trimmedValue);

    // 입력 필드 초기화
    setInputValue('');
    setError('');
  };

  // Enter 키 핸들러 (모바일 대응)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // 현재 글자 수
  const currentLength = inputValue.length;
  const isOverLimit = currentLength > maxLength;

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          {/* 입력 필드 */}
          <div className="flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="예: 수학 숙제하기, 강아지 밥 주기"
              className={`
                input-field
                ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}
              `}
              maxLength={maxLength + 10} // 약간의 여유를 두어 에러 메시지 표시 가능
            />

            {/* 글자 수 카운터 */}
            <div className="mt-2 text-right">
              <span
                className={`
                  text-kid-sm transition-colors
                  ${isOverLimit ? 'text-red-500 font-bold' : 'text-gray-400'}
                `}
              >
                {currentLength}/{maxLength}
              </span>
            </div>
          </div>

          {/* 추가 버튼 */}
          <button
            type="submit"
            className="btn-primary self-start px-8"
            disabled={!inputValue.trim()}
          >
            추가
          </button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            <p className="text-kid-base text-red-600 font-medium">
              {error}
            </p>
          </div>
        )}
      </form>

      {/* 도움말 메시지 */}
      <div className="mt-4 p-4 bg-primary-light/20 rounded-xl border-2 border-primary-light">
        <p className="text-kid-sm text-gray-600 text-center">
          💡 <span className="font-medium">팁:</span> 구체적으로 적을수록 좋아요!
        </p>
      </div>
    </div>
  );
}
