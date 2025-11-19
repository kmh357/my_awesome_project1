# 찍찍이 개발자 가이드 👨‍💻

## 목차

- [개발 환경 설정](#개발-환경-설정)
- [프로젝트 구조](#프로젝트-구조)
- [코딩 규칙](#코딩-규칙)
- [컴포넌트 개발](#컴포넌트-개발)
- [서비스 레이어](#서비스-레이어)
- [상태 관리](#상태-관리)
- [스타일링](#스타일링)
- [테스트](#테스트)
- [디버깅](#디버깅)
- [성능 최적화](#성능-최적화)
- [기여 가이드](#기여-가이드)

---

## 개발 환경 설정

### 필수 도구

```bash
Node.js: 18.0 이상
npm: 9.0 이상 (또는 yarn 1.22+)
Git: 2.0 이상
```

### IDE 설정 (VS Code 권장)

**필수 확장 프로그램**:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

**추천 확장 프로그램**:
- Auto Rename Tag
- Path Intellisense
- GitLens

### 설정 파일

**.vscode/settings.json** (권장):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### 초기 설정

```bash
# 1. 저장소 클론
git clone <repository-url>
cd my_awesome_project1

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 새 터미널에서 TypeScript 타입 체크 (선택적)
npm run build -- --watch
```

---

## 프로젝트 구조

### 폴더 구조 상세

```
my_awesome_project1/
├── .taskmaster/              # TaskMaster AI 설정
│   ├── tasks.json           # 작업 목록
│   └── docs/
│       └── prd.txt          # 제품 요구사항 문서
├── docs/                    # 프로젝트 문서
│   ├── PROJECT_SUMMARY.md
│   ├── DEVELOPER_GUIDE.md
│   └── ...
├── public/                  # 정적 파일
│   └── stickers/
│       └── sticker-metadata.json
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── BottomNavigation.tsx
│   │   ├── DateSelector.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── StickerCollectionProgress.tsx
│   │   ├── StickerGrid.tsx
│   │   ├── StickerGridItem.tsx
│   │   ├── StickerRewardModal.tsx
│   │   ├── TodoInput.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoList.tsx
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── StickerCollectionPage.tsx
│   │   └── TodoListPage.tsx
│   ├── services/            # 비즈니스 로직
│   │   ├── initService.ts
│   │   ├── stickerService.ts
│   │   ├── taskService.ts
│   │   └── userService.ts
│   ├── types/               # TypeScript 타입
│   │   ├── sticker.ts
│   │   ├── task.ts
│   │   └── user.ts
│   ├── utils/               # 유틸리티 함수
│   │   └── localStorage.ts
│   ├── App.tsx              # 루트 컴포넌트
│   ├── index.css            # 전역 스타일
│   └── main.tsx             # 진입점
├── .eslintrc.cjs           # ESLint 설정
├── tailwind.config.js      # Tailwind 설정
├── tsconfig.json           # TypeScript 설정
├── vite.config.ts          # Vite 설정
└── package.json            # 패키지 정보
```

### 파일 명명 규칙

- **컴포넌트**: PascalCase (예: `TodoItem.tsx`)
- **서비스**: camelCase (예: `taskService.ts`)
- **타입**: camelCase (예: `task.ts`)
- **유틸**: camelCase (예: `localStorage.ts`)
- **페이지**: PascalCase + Page 접미사 (예: `TodoListPage.tsx`)

---

## 코딩 규칙

### TypeScript

**타입 정의**:
```typescript
// ✅ Good: 명시적 타입 정의
interface TodoItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

// ❌ Bad: any 사용
function handleTask(task: any) { }
```

**함수 시그니처**:
```typescript
// ✅ Good: 명확한 반환 타입
export function getTaskById(taskId: string): Task | undefined {
  // ...
}

// ❌ Bad: 반환 타입 생략
export function getTaskById(taskId: string) {
  // ...
}
```

### React 컴포넌트

**함수형 컴포넌트** (권장):
```typescript
// ✅ Good
export default function TodoItem({ task, onToggle }: TodoItemProps) {
  return <div>{task.taskText}</div>;
}

// ❌ Bad: 화살표 함수 (export default와 함께 사용 시)
export default ({ task }: TodoItemProps) => {
  return <div>{task.taskText}</div>;
};
```

**Props 구조 분해**:
```typescript
// ✅ Good
export default function TodoItem({ task, onToggle }: TodoItemProps) {
  // ...
}

// ❌ Bad
export default function TodoItem(props: TodoItemProps) {
  const task = props.task;
  // ...
}
```

### 컴포넌트 구조 순서

```typescript
export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // 1. Hooks (useState, useEffect, useRef 등)
  const [state, setState] = useState();
  const ref = useRef();

  // 2. 계산된 값
  const computedValue = useMemo(() => { }, []);

  // 3. 이벤트 핸들러
  const handleClick = () => { };

  // 4. useEffect
  useEffect(() => { }, []);

  // 5. JSX 반환
  return (
    <div>{/* ... */}</div>
  );
}
```

### 주석 규칙

**JSDoc 주석** (함수/클래스):
```typescript
/**
 * 특정 날짜의 할 일 목록을 가져옵니다.
 * @param dateString - YYYY-MM-DD 형식의 날짜 문자열
 * @returns Task 배열
 */
export function getTasksByDate(dateString: string): Task[] {
  // ...
}
```

**인라인 주석** (복잡한 로직):
```typescript
// 희귀도별 가중치 계산 (common 60%, rare 25%, epic 12%, legendary 3%)
const random = Math.random() * 100;
```

---

## 컴포넌트 개발

### 새 컴포넌트 생성 단계

1. **타입 정의**:
```typescript
// src/types/myFeature.ts
export interface MyFeature {
  id: string;
  name: string;
}
```

2. **컴포넌트 파일 생성**:
```typescript
// src/components/MyComponent.tsx
import { MyFeature } from '../types/myFeature';

interface MyComponentProps {
  feature: MyFeature;
  onAction: (id: string) => void;
}

export default function MyComponent({ feature, onAction }: MyComponentProps) {
  return (
    <div className="card">
      <h2>{feature.name}</h2>
      <button onClick={() => onAction(feature.id)}>
        액션
      </button>
    </div>
  );
}
```

3. **페이지에 통합**:
```typescript
// src/pages/MyPage.tsx
import MyComponent from '../components/MyComponent';

export default function MyPage() {
  const handleAction = (id: string) => {
    console.log('Action:', id);
  };

  return (
    <MyComponent feature={{ id: '1', name: 'Test' }} onAction={handleAction} />
  );
}
```

### 컴포넌트 패턴

**Stateless 컴포넌트** (권장):
```typescript
// 순수 표시 컴포넌트
export default function DisplayComponent({ data }: { data: string }) {
  return <div>{data}</div>;
}
```

**Stateful 컴포넌트**:
```typescript
// 상태를 가진 컴포넌트
export default function FormComponent() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Container/Presenter 패턴**:
```typescript
// Container (로직)
export default function TodoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    setTasks(getTodayTasks());
  };

  return <TodoListPresenter tasks={tasks} onLoad={loadTasks} />;
}

// Presenter (표시)
function TodoListPresenter({ tasks, onLoad }: PresenterProps) {
  return (
    <div>
      {tasks.map(task => <TodoItem key={task.taskId} task={task} />)}
    </div>
  );
}
```

---

## 서비스 레이어

### 서비스 함수 작성

**CRUD 패턴**:
```typescript
// Create
export function createTask(userId: string, input: CreateTaskInput): Task {
  // 1. 데이터 생성
  const newTask: Task = {
    taskId: generateId('task_'),
    userId,
    taskText: input.taskText,
    isCompleted: false,
    createdDate: input.createdDate || getCurrentDateISO(),
  };

  // 2. 저장
  const tasks = getAllTasks();
  tasks.push(newTask);
  saveToStorage(STORAGE_KEYS.TASKS, tasks);

  // 3. 반환
  return newTask;
}

// Read
export function getTaskById(taskId: string): Task | undefined {
  const tasks = getAllTasks();
  return tasks.find(task => task.taskId === taskId);
}

// Update
export function updateTask(taskId: string, input: UpdateTaskInput): Task | null {
  const tasks = getAllTasks();
  const taskIndex = tasks.findIndex(task => task.taskId === taskId);

  if (taskIndex === -1) return null;

  const updatedTask = { ...tasks[taskIndex], ...input };
  tasks[taskIndex] = updatedTask;
  saveToStorage(STORAGE_KEYS.TASKS, tasks);

  return updatedTask;
}

// Delete
export function deleteTask(taskId: string): boolean {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter(task => task.taskId !== taskId);

  if (tasks.length === filteredTasks.length) return false;

  saveToStorage(STORAGE_KEYS.TASKS, filteredTasks);
  return true;
}
```

### 에러 처리

```typescript
export function getTaskById(taskId: string): Task | undefined {
  try {
    const tasks = getAllTasks();
    return tasks.find(task => task.taskId === taskId);
  } catch (error) {
    console.error('Failed to get task:', error);
    return undefined;
  }
}
```

---

## 상태 관리

### useState 사용

```typescript
// ✅ Good: 초기값 명시
const [tasks, setTasks] = useState<Task[]>([]);

// ✅ Good: 함수형 업데이트
setTasks(prevTasks => [...prevTasks, newTask]);

// ❌ Bad: 직접 업데이트
tasks.push(newTask);
setTasks(tasks);
```

### useEffect 사용

```typescript
// ✅ Good: 의존성 배열 명시
useEffect(() => {
  loadTasks();
}, [selectedDate]);

// ❌ Bad: 의존성 배열 생략 (무한 루프 위험)
useEffect(() => {
  loadTasks();
});
```

### Custom Hook 작성

```typescript
// src/hooks/useTasks.ts
export function useTasks(date: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const dateTasks = getTasksByDate(date);
    setTasks(dateTasks);
    setLoading(false);
  }, [date]);

  return { tasks, loading };
}

// 사용
function MyComponent() {
  const { tasks, loading } = useTasks('2024-01-15');

  if (loading) return <div>로딩 중...</div>;
  return <TodoList tasks={tasks} />;
}
```

---

## 스타일링

### Tailwind CSS 클래스 순서

```typescript
// 권장 순서: Layout → Box Model → Typography → Visual → Animation
<div className="
  flex items-center justify-between  // Layout
  p-4 m-2                            // Box Model
  text-lg font-bold                  // Typography
  bg-white border-2 rounded-lg       // Visual
  transition-all duration-300        // Animation
">
```

### 조건부 스타일

```typescript
// ✅ Good: 템플릿 리터럴
<div className={`
  base-class
  ${isActive ? 'active-class' : 'inactive-class'}
  ${isDisabled && 'disabled-class'}
`}>

// ✅ Good: clsx 라이브러리 (설치 필요)
import clsx from 'clsx';

<div className={clsx(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)}>
```

### 커스텀 CSS (index.css)

```css
/* 애니메이션 정의 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
```

### Tailwind 설정 커스터마이징

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
      fontSize: {
        'kid-sm': ['14px', '20px'],
        'kid-base': ['16px', '24px'],
        'kid-lg': ['18px', '28px'],
      },
    },
  },
};
```

---

## 테스트

### 단위 테스트 (Vitest)

```typescript
// src/services/__tests__/taskService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createTask, getTaskById } from '../taskService';

describe('taskService', () => {
  beforeEach(() => {
    // 테스트 전 LocalStorage 초기화
    localStorage.clear();
  });

  it('should create a new task', () => {
    const task = createTask('user_001', {
      taskText: 'Test task'
    });

    expect(task.taskId).toBeDefined();
    expect(task.taskText).toBe('Test task');
    expect(task.isCompleted).toBe(false);
  });

  it('should retrieve task by ID', () => {
    const created = createTask('user_001', { taskText: 'Test' });
    const retrieved = getTaskById(created.taskId);

    expect(retrieved).toEqual(created);
  });
});
```

### 컴포넌트 테스트 (React Testing Library)

```typescript
// src/components/__tests__/TodoItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  const mockTask = {
    taskId: 'task_001',
    userId: 'user_001',
    taskText: 'Test task',
    isCompleted: false,
    createdDate: '2024-01-15T00:00:00.000Z',
  };

  it('renders task text', () => {
    render(<TodoItem task={mockTask} onToggle={() => {}} />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox clicked', () => {
    const onToggle = vi.fn();
    render(<TodoItem task={mockTask} onToggle={onToggle} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onToggle).toHaveBeenCalledWith('task_001');
  });
});
```

---

## 디버깅

### 브라우저 DevTools

**LocalStorage 확인**:
```javascript
// 콘솔에서 실행
localStorage.getItem('tasks');
JSON.parse(localStorage.getItem('tasks') || '[]');
```

**State 디버깅**:
```typescript
// 컴포넌트 내
useEffect(() => {
  console.log('Tasks updated:', tasks);
}, [tasks]);
```

### React DevTools

1. 확장 프로그램 설치: React Developer Tools
2. Components 탭에서 컴포넌트 트리 확인
3. Props, State, Hooks 값 실시간 확인
4. Profiler로 성능 측정

### 일반적인 문제 해결

**문제: 할 일이 추가되지 않음**
```typescript
// 1. 사용자 확인
const user = getCurrentUser();
console.log('Current user:', user);

// 2. createTask 호출 확인
console.log('Creating task:', taskText);
const task = createTask(user.userId, { taskText });
console.log('Created task:', task);

// 3. loadTasks 호출 확인
loadTasks();
console.log('Tasks after load:', tasks);
```

**문제: useEffect가 무한 루프**
```typescript
// ❌ Bad: 의존성 배열 누락
useEffect(() => {
  loadTasks(); // tasks 상태 변경
}, [tasks]); // tasks가 변경되면 다시 실행 → 무한 루프

// ✅ Good: 적절한 의존성
useEffect(() => {
  loadTasks();
}, [selectedDate]); // selectedDate가 변경될 때만 실행
```

---

## 성능 최적화

### React.memo 사용

```typescript
// 불필요한 리렌더링 방지
const TodoItem = React.memo(function TodoItem({ task, onToggle }: TodoItemProps) {
  return (
    <div>{task.taskText}</div>
  );
});
```

### useMemo 사용

```typescript
// 무거운 계산 메모이제이션
const sortedTasks = useMemo(() => {
  return [...tasks].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });
}, [tasks]);
```

### useCallback 사용

```typescript
// 함수 메모이제이션
const handleToggle = useCallback((taskId: string) => {
  toggleTaskCompletion(taskId);
  loadTasks();
}, []);
```

### 번들 크기 최적화

```bash
# 번들 분석
npm run build
npm run preview
```

**Dynamic Import**:
```typescript
// 큰 컴포넌트 지연 로딩
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## 기여 가이드

### 브랜치 전략

```
main                    # 프로덕션 코드
├── develop            # 개발 브랜치
    ├── feature/xxx    # 새 기능
    ├── bugfix/xxx     # 버그 수정
    └── refactor/xxx   # 리팩토링
```

### 커밋 메시지 규칙

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (동작 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 설정 파일 변경

**예시**:
```
feat(task): Add date filtering functionality

- Added DateSelector component
- Implemented getTasksByDate service function
- Updated TodoListPage to support date-based filtering

Closes #123
```

### Pull Request 템플릿

```markdown
## 변경 사항
- [ ] 기능 추가
- [ ] 버그 수정
- [ ] 리팩토링
- [ ] 문서 업데이트

## 설명
무엇을 변경했는지 간단히 설명

## 테스트
- [ ] 단위 테스트 작성
- [ ] 수동 테스트 완료
- [ ] 브라우저 테스트 (Chrome, Safari, Firefox)

## 스크린샷
(해당되는 경우 스크린샷 첨부)

## 체크리스트
- [ ] 코드 리뷰 요청
- [ ] ESLint 통과
- [ ] TypeScript 컴파일 성공
- [ ] 문서 업데이트
```

### 코드 리뷰 가이드

**리뷰어**:
- 코드의 의도와 동작 이해
- 버그 및 엣지 케이스 확인
- 성능 및 보안 검토
- 코딩 규칙 준수 확인

**작성자**:
- 피드백에 대응
- 변경 사항 설명
- 테스트 결과 공유

---

## 유용한 명령어

### 개발

```bash
# 개발 서버 (HMR)
npm run dev

# 타입 체크
npm run build -- --watch

# Lint 검사
npm run lint

# Lint 자동 수정
npm run lint -- --fix
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 타입 에러 확인
npx tsc --noEmit
```

### 디버깅

```bash
# 의존성 트리 확인
npm list

# 중복 패키지 확인
npm dedupe

# 캐시 정리
npm cache clean --force
```

---

## 참고 자료

### 공식 문서
- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)

### 커뮤니티
- [React Discord](https://discord.gg/react)
- [TypeScript Discord](https://discord.gg/typescript)

### 블로그 & 튜토리얼
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

**해피 코딩! 🎉**
