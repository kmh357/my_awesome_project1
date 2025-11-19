/**
 * 최초 사용자 튜토리얼 모달 컴포넌트
 * 앱 첫 방문 시 사용법을 안내합니다.
 */

import { useState } from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 튜토리얼 단계 정의
interface TutorialStep {
  emoji: string;
  title: string;
  description: string;
  tips?: string[];
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    emoji: '👋',
    title: '찍찍이에 오신 것을 환영해요!',
    description: '할 일을 관리하고 재미있는 스티커를 모으는 앱이에요.',
    tips: [
      '할 일을 완료하면 스티커를 받을 수 있어요',
      '모은 스티커는 스티커 모음판에서 확인할 수 있어요',
    ],
  },
  {
    emoji: '✍️',
    title: '할 일 추가하기',
    description: '오늘 해야 할 일을 적어보세요.',
    tips: [
      '입력창에 할 일을 적고 "추가" 버튼을 눌러요',
      '날짜를 선택해서 다른 날의 할 일도 추가할 수 있어요',
    ],
  },
  {
    emoji: '✅',
    title: '할 일 완료하기',
    description: '할 일을 다 했다면 체크박스를 눌러주세요!',
    tips: [
      '할 일을 완료하면 랜덤 스티커를 받아요',
      '진행도 바에서 오늘의 진척도를 확인할 수 있어요',
    ],
  },
  {
    emoji: '🎨',
    title: '스티커 모으기',
    description: '할 일을 완료하고 다양한 스티커를 모아보세요!',
    tips: [
      '스티커는 일반, 레어, 에픽, 전설 등급이 있어요',
      '아래 탭에서 "스티커 모음판"을 눌러 모은 스티커를 확인해요',
    ],
  },
];

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) {
    return null;
  }

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  // 다음 단계로 이동
  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 튜토리얼 건너뛰기
  const handleSkip = () => {
    onClose();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn" />

      {/* 모달 컨테이너 */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-popIn">
          {/* 진행도 표시 */}
          <div className="flex gap-2 mb-6">
            {TUTORIAL_STEPS.map((_, index) => (
              <div
                key={index}
                className={`
                  flex-1 h-2 rounded-full transition-all duration-300
                  ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}
                `}
              />
            ))}
          </div>

          {/* 이모지 */}
          <div className="text-center mb-6">
            <div className="text-8xl mb-4 animate-bounce">{step.emoji}</div>
          </div>

          {/* 제목 */}
          <h2 className="text-kid-xl font-bold text-gray-800 text-center mb-4">
            {step.title}
          </h2>

          {/* 설명 */}
          <p className="text-kid-base text-gray-600 text-center mb-6">
            {step.description}
          </p>

          {/* 팁 리스트 */}
          {step.tips && step.tips.length > 0 && (
            <div className="bg-primary-light/10 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">💡</span>
                <span className="text-kid-sm font-bold text-gray-700">팁</span>
              </div>
              <ul className="space-y-2">
                {step.tips.map((tip, index) => (
                  <li key={index} className="text-kid-sm text-gray-600 flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 버튼 영역 */}
          <div className="flex gap-3">
            {/* 이전 버튼 */}
            {!isFirstStep && (
              <button
                onClick={handlePrev}
                className="btn-secondary flex-1"
              >
                이전
              </button>
            )}

            {/* 건너뛰기 버튼 (마지막 단계가 아닐 때만) */}
            {!isLastStep && (
              <button
                onClick={handleSkip}
                className="btn-secondary flex-1"
              >
                건너뛰기
              </button>
            )}

            {/* 다음/시작하기 버튼 */}
            <button
              onClick={handleNext}
              className="btn-primary flex-1"
            >
              {isLastStep ? '시작하기 🚀' : '다음'}
            </button>
          </div>

          {/* 단계 표시 */}
          <div className="text-center mt-4">
            <span className="text-kid-xs text-gray-400">
              {currentStep + 1} / {TUTORIAL_STEPS.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
