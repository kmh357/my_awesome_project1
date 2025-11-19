/**
 * 튜토리얼 컴포넌트
 * 앱을 처음 사용하는 사용자에게 기능을 소개합니다.
 */

import { useState } from 'react';
import { setTutorialCompleted, skipTutorial } from '../utils/tutorialUtils';

interface TutorialProps {
  onComplete: () => void;
}

// 튜토리얼 단계별 내용
const TUTORIAL_STEPS = [
  {
    title: '환영합니다! 🎉',
    emoji: '👋',
    description: '찍찍이는 여러분의 할 일을 관리하고\n스티커를 모으는 재미있는 앱이에요!',
    tip: '화면을 터치하면 다음으로 넘어가요',
  },
  {
    title: '할 일을 추가해보세요 ✏️',
    emoji: '📝',
    description: '입력창에 오늘 할 일을 적어보세요.\n예를 들면 "숙제하기", "책 읽기" 같은 거예요!',
    tip: '최대 50자까지 쓸 수 있어요',
  },
  {
    title: '완료하면 체크해요 ✅',
    emoji: '✓',
    description: '할 일을 끝내면 동그라미를 눌러보세요.\n완료 표시가 되면서\n예쁜 애니메이션이 나타나요!',
    tip: '체크를 해제할 수도 있어요',
  },
  {
    title: '스티커를 모아요 🎁',
    emoji: '🎨',
    description: '할 일을 완료할 때마다\n랜덤으로 스티커를 받을 수 있어요!\n25개를 모두 모아보세요!',
    tip: '희귀한 스티커도 있어요!',
  },
  {
    title: '시작할 준비가 됐어요! 🚀',
    emoji: '🌟',
    description: '이제 여러분의 할 일을 관리하고\n스티커를 모아보세요!\n화이팅!',
    tip: '언제든지 즐겁게 사용하세요',
  },
];

export default function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계에서 완료
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    skipTutorial();
    onComplete();
  };

  const handleComplete = () => {
    setTutorialCompleted(true);
    onComplete();
  };

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* 메인 카드 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-popIn">
          {/* 진행도 표시 */}
          <div className="flex justify-center gap-2 mb-6">
            {TUTORIAL_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-primary'
                    : index < currentStep
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* 이모지 */}
          <div className="text-center mb-6">
            <div className="text-8xl mb-4 animate-bounce">{step.emoji}</div>
          </div>

          {/* 제목 */}
          <h2 className="text-kid-2xl font-bold text-center text-primary mb-4">
            {step.title}
          </h2>

          {/* 설명 */}
          <p className="text-kid-lg text-center text-gray-700 mb-3 whitespace-pre-line leading-relaxed">
            {step.description}
          </p>

          {/* 팁 */}
          <div className="bg-primary-light/20 rounded-2xl p-4 mb-6">
            <p className="text-kid-base text-center text-primary font-medium">
              💡 {step.tip}
            </p>
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3">
            {/* 이전 버튼 */}
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex-1 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-kid-base hover:bg-gray-200 transition-all duration-200"
              >
                이전
              </button>
            )}

            {/* 다음/시작 버튼 */}
            <button
              onClick={handleNext}
              className="flex-1 btn-primary"
            >
              {isLastStep ? '시작하기 🎉' : '다음'}
            </button>
          </div>

          {/* 건너뛰기 버튼 */}
          {!isLastStep && (
            <button
              onClick={handleSkip}
              className="w-full mt-4 text-kid-sm text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              건너뛰기
            </button>
          )}
        </div>

        {/* 단계 표시 */}
        <div className="text-center mt-4">
          <p className="text-white text-kid-sm font-medium">
            {currentStep + 1} / {TUTORIAL_STEPS.length}
          </p>
        </div>
      </div>
    </div>
  );
}
