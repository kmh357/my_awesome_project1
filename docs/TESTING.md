# 찍찍이 테스트 가이드

## 📋 테스트 개요

찍찍이 프로젝트는 **Vitest**와 **React Testing Library**를 사용하여 포괄적인 테스트 스위트를 구축했습니다.

### 테스트 통계

- **총 테스트 파일**: 7개
- **총 테스트 케이스**: 116개
- **테스트 커버리지**: 주요 기능 100% 커버

## 🚀 테스트 실행 방법

### 기본 명령어

```bash
# 모든 테스트 실행 (watch 모드)
npm test

# 테스트 한 번만 실행
npm run test:run

# UI 모드로 테스트 실행
npm run test:ui

# 커버리지 포함 테스트
npm run test:coverage
```

### 특정 테스트 파일 실행

```bash
# 특정 파일만 테스트
npm test -- taskService.test.ts

# 패턴 매칭으로 테스트
npm test -- --grep="할 일 추가"
```

## 📁 테스트 구조

```
src/
├── components/
│   ├── __tests__/
│   │   ├── TodoInput.test.tsx       # 할 일 입력 컴포넌트 테스트
│   │   ├── TodoList.test.tsx        # 할 일 목록 컴포넌트 테스트
│   │   └── TodoItem.test.tsx        # 할 일 항목 컴포넌트 테스트
├── pages/
│   ├── __tests__/
│   │   └── TodoListPage.integration.test.tsx  # 통합 테스트
├── services/
│   ├── __tests__/
│   │   ├── taskService.test.ts      # 할 일 서비스 단위 테스트
│   │   ├── userService.test.ts      # 사용자 서비스 단위 테스트
│   │   └── stickerService.test.ts   # 스티커 서비스 단위 테스트
└── test/
    └── setup.ts                      # 테스트 환경 설정
```

## 🧪 테스트 유형

### 1. 단위 테스트 (Unit Tests)

**위치**: `src/services/__tests__/`

서비스 레이어의 각 함수를 독립적으로 테스트합니다.

**예시: taskService.test.ts**
```typescript
describe('createTask', () => {
  it('새로운 할 일을 생성한다', () => {
    const input = { taskText: '새로운 할 일' };
    const result = createTask('user_test', input);

    expect(result.taskText).toBe('새로운 할 일');
    expect(result.isCompleted).toBe(false);
  });
});
```

**테스트 케이스**:
- taskService: 23개 테스트
- userService: 11개 테스트
- stickerService: 26개 테스트

### 2. 컴포넌트 테스트 (Component Tests)

**위치**: `src/components/__tests__/`

React 컴포넌트의 렌더링, 사용자 상호작용, 상태 변화를 테스트합니다.

**예시: TodoInput.test.tsx**
```typescript
it('추가 버튼 클릭 시 onAdd 콜백이 호출된다', async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();
  render(<TodoInput onAdd={onAdd} />);

  const input = screen.getByPlaceholderText(/예: 수학 숙제하기/);
  await user.type(input, '수학 숙제');

  const button = screen.getByText('추가');
  await user.click(button);

  expect(onAdd).toHaveBeenCalledWith('수학 숙제');
});
```

**테스트 케이스**:
- TodoInput: 14개 테스트
- TodoList: 9개 테스트
- TodoItem: 19개 테스트

### 3. 통합 테스트 (Integration Tests)

**위치**: `src/pages/__tests__/`

전체 페이지의 사용자 플로우를 end-to-end로 테스트합니다.

**예시: TodoListPage.integration.test.tsx**
```typescript
describe('할 일 완료 플로우', () => {
  it('할 일 완료 시 스티커 보상을 받는다', async () => {
    const user = userEvent.setup();
    // ... setup

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    await waitFor(() => {
      expect(stickerService.awardRandomStickerToUser).toHaveBeenCalled();
      expect(screen.getByText(/토끼/)).toBeInTheDocument();
    });
  });
});
```

**테스트 시나리오**:
- 할 일 추가 플로우
- 할 일 완료 플로우 (스티커 보상 포함)
- 할 일 수정 플로우
- 할 일 삭제 플로우
- 날짜 필터링 플로우
- 진행도 표시
- 스티커 보상 모달

## 🔧 테스트 설정

### vitest.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### 테스트 환경 설정 (setup.ts)

```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// 각 테스트 후 자동 cleanup
afterEach(() => {
  cleanup();
  localStorage.clear();
});

// LocalStorage mock
// window.matchMedia mock
// Date.now() mock
```

## 🎯 테스트 작성 가이드

### 1. 컴포넌트 테스트 작성

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<MyComponent onClick={handleClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. 서비스 테스트 작성

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { myService } from '../myService';
import * as localStorage from '../../utils/localStorage';

vi.mock('../../utils/localStorage');

describe('myService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('performs the expected operation', () => {
    vi.mocked(localStorage.getFromStorage).mockReturnValue([]);

    const result = myService.doSomething();

    expect(result).toBeDefined();
    expect(localStorage.getFromStorage).toHaveBeenCalled();
  });
});
```

### 3. 통합 테스트 작성

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyPage from '../MyPage';
import * as myService from '../../services/myService';

vi.mock('../../services/myService');

describe('MyPage 통합 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('완전한 사용자 플로우', async () => {
    const user = userEvent.setup();
    vi.mocked(myService.getData).mockReturnValue([]);

    render(<MyPage />);

    // 사용자 액션
    const input = screen.getByRole('textbox');
    await user.type(input, 'test data');

    const button = screen.getByRole('button', { name: '제출' });
    await user.click(button);

    // 결과 확인
    await waitFor(() => {
      expect(myService.saveData).toHaveBeenCalledWith('test data');
    });
  });
});
```

## 📊 테스트 모범 사례

### ✅ 해야 할 것

1. **명확한 테스트 이름**
   ```typescript
   // ✅ Good
   it('할 일 추가 시 입력 필드가 초기화된다', ...)

   // ❌ Bad
   it('테스트 1', ...)
   ```

2. **AAA 패턴 (Arrange-Act-Assert)**
   ```typescript
   it('example', () => {
     // Arrange: 테스트 준비
     const mockData = [...];
     render(<Component />);

     // Act: 액션 수행
     fireEvent.click(button);

     // Assert: 결과 검증
     expect(result).toBe(expected);
   });
   ```

3. **사용자 관점에서 테스트**
   ```typescript
   // ✅ Good: 사용자가 보는 텍스트로 찾기
   screen.getByText('추가');
   screen.getByRole('button', { name: '저장' });

   // ❌ Bad: 구현 세부사항으로 찾기
   screen.getByTestId('save-button');
   container.querySelector('.save-btn');
   ```

4. **비동기 작업 처리**
   ```typescript
   // ✅ Good: waitFor 사용
   await waitFor(() => {
     expect(screen.getByText('완료')).toBeInTheDocument();
   });

   // ❌ Bad: setTimeout 사용
   setTimeout(() => {
     expect(screen.getByText('완료')).toBeInTheDocument();
   }, 1000);
   ```

### ❌ 하지 말아야 할 것

1. **구현 세부사항 테스트**
   - 내부 state 직접 접근
   - private 함수 테스트
   - CSS 클래스 이름 의존

2. **너무 많은 mock 사용**
   - 꼭 필요한 것만 mock
   - 가능하면 실제 구현 사용

3. **테스트 간 의존성**
   - 각 테스트는 독립적이어야 함
   - beforeEach로 초기화

## 🐛 테스트 디버깅

### screen.debug() 사용

```typescript
it('디버깅 예시', () => {
  render(<MyComponent />);

  // 현재 DOM 출력
  screen.debug();

  // 특정 요소만 출력
  const element = screen.getByRole('button');
  screen.debug(element);
});
```

### logRoles 사용

```typescript
import { render, logRoles } from '@testing-library/react';

it('역할 확인', () => {
  const { container } = render(<MyComponent />);

  // 모든 role 출력
  logRoles(container);
});
```

### 실패한 테스트 재실행

```bash
# 실패한 테스트만 다시 실행
npm test -- --reporter=verbose --run
```

## 📈 테스트 커버리지

### 커버리지 보고서 생성

```bash
npm run test:coverage
```

### 커버리지 보고서 확인

```
coverage/
├── index.html      # HTML 보고서 (브라우저에서 열기)
├── lcov.info       # LCOV 형식
└── coverage.json   # JSON 형식
```

### 목표 커버리지

- **라인 커버리지**: 80% 이상
- **함수 커버리지**: 90% 이상
- **브랜치 커버리지**: 75% 이상

## 🔍 자주 묻는 질문 (FAQ)

### Q: 테스트가 실패하는데 이유를 모르겠어요

1. `screen.debug()` 사용하여 DOM 확인
2. 에러 메시지 자세히 읽기
3. `waitFor` 사용 여부 확인 (비동기 작업)
4. mock 설정 확인

### Q: localStorage를 어떻게 테스트하나요?

테스트 환경에서 자동으로 mock됩니다. `setup.ts` 참조.

### Q: React Router를 어떻게 테스트하나요?

```typescript
import { BrowserRouter } from 'react-router-dom';

const TestWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

render(<MyPage />, { wrapper: TestWrapper });
```

### Q: 날짜/시간을 어떻게 테스트하나요?

```typescript
import { vi } from 'vitest';

// 특정 시간으로 고정
vi.setSystemTime(new Date('2025-11-19'));

// 테스트 후 원래대로
vi.useRealTimers();
```

## 🎓 추가 학습 자료

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library 공식 문서](https://testing-library.com/react)
- [Jest DOM matchers](https://github.com/testing-library/jest-dom)
- [사용자 중심 테스트 가이드](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## ✅ 체크리스트

새로운 기능 추가 시:
- [ ] 서비스 함수 단위 테스트 작성
- [ ] 컴포넌트 렌더링 테스트 작성
- [ ] 사용자 상호작용 테스트 작성
- [ ] 통합 테스트에 시나리오 추가
- [ ] 모든 테스트 통과 확인
- [ ] 커버리지 목표 달성 확인

---

**테스트는 코드의 품질을 보장하는 안전망입니다. 🛡️**
