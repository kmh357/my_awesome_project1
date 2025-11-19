# 할 일 추가 기능 구현 문서

## 개요

찍찍이 앱의 핵심 기능인 할 일 추가 기능의 완전한 구현 문서입니다.
TASK-006A (UI), TASK-006B (백엔드), TASK-006C (유효성 검증)를 포함합니다.

---

## TASK-006A: 할 일 입력 UI 컴포넌트

### 컴포넌트: TodoInput.tsx

**위치**: `src/components/TodoInput.tsx`

**기능**:
- 할 일 텍스트 입력
- 실시간 글자 수 카운터
- 유효성 검증 및 에러 표시
- Enter 키 지원
- 추가 버튼

### Props 인터페이스

```typescript
interface TodoInputProps {
  onAdd: (taskText: string) => void;
  maxLength?: number; // 기본값: 50
}
```

### 주요 기능

#### 1. 입력 필드

**최대 글자 수**: 50자

**Placeholder**: "예: 수학 숙제하기, 강아지 밥 주기"

**스타일**:
- 클래스: `input-field`
- 에러 시: 빨간색 테두리 (`border-red-400`)
- 패딩: 12px 상하, 16px 좌우
- 모서리: 12px 둥글게

**코드**:
```tsx
<input
  type="text"
  value={inputValue}
  onChange={handleInputChange}
  onKeyDown={handleKeyDown}
  placeholder="예: 수학 숙제하기, 강아지 밥 주기"
  className={`input-field ${error ? 'border-red-400 ...' : ''}`}
  maxLength={maxLength + 10}
/>
```

#### 2. 글자 수 카운터

**위치**: 입력 필드 아래 오른쪽

**형식**: `현재글자수/최대글자수` (예: 15/50)

**스타일**:
- 제한 이내: 회색 (`text-gray-400`)
- 제한 초과: 빨간색 굵게 (`text-red-500 font-bold`)

**코드**:
```tsx
<span className={`
  text-kid-sm transition-colors
  ${isOverLimit ? 'text-red-500 font-bold' : 'text-gray-400'}
`}>
  {currentLength}/{maxLength}
</span>
```

#### 3. 추가 버튼

**텍스트**: "추가"

**스타일**: `btn-primary` (파란색, 굵은 글씨, 그림자)

**비활성 조건**: 입력값이 비어있거나 공백만 있을 때

**코드**:
```tsx
<button
  type="submit"
  className="btn-primary self-start px-8"
  disabled={!inputValue.trim()}
>
  추가
</button>
```

#### 4. Enter 키 핸들링

**기능**: 입력 필드에서 Enter 키 입력 시 폼 제출

**코드**:
```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSubmit(e);
  }
};
```

**호환성**: 모바일 키보드 포함 모든 환경에서 작동

#### 5. 도움말 메시지

**텍스트**: "💡 팁: 구체적으로 적을수록 좋아요!"

**스타일**:
- 배경: 연한 파란색 (`bg-primary-light/20`)
- 테두리: 파란색 (`border-primary-light`)
- 패딩: 16px
- 중앙 정렬

---

## TASK-006B: 할 일 추가 백엔드 로직

### 서비스 함수: createTask

**위치**: `src/services/taskService.ts`

**함수 시그니처**:
```typescript
export function createTask(
  userId: string,
  input: CreateTaskInput
): Task
```

**입력**:
```typescript
interface CreateTaskInput {
  taskText: string;
  createdDate?: string; // 선택적, 기본값: 현재 시간
}
```

**반환**: 생성된 `Task` 객체

**동작 과정**:
1. 기존 할 일 목록 로드
2. 새 Task 객체 생성
   - `taskId`: 고유 ID 생성 (`generateId('task_')`)
   - `userId`: 사용자 ID
   - `taskText`: 할 일 텍스트
   - `isCompleted`: false (기본값)
   - `createdDate`: ISO 8601 형식 (현재 시간 또는 지정된 시간)
3. 로컬 스토리지에 저장
4. 생성된 Task 반환

**코드**:
```typescript
export function createTask(userId: string, input: CreateTaskInput): Task {
  const tasks = getAllTasks();

  const newTask: Task = {
    taskId: generateId('task_'),
    userId,
    taskText: input.taskText,
    isCompleted: false,
    createdDate: input.createdDate || getCurrentDateISO(),
  };

  tasks.push(newTask);
  saveToStorage(STORAGE_KEYS.TASKS, tasks);

  return newTask;
}
```

### 통합: TodoListPage

**위치**: `src/pages/TodoListPage.tsx`

**핸들러 함수**:
```typescript
const handleAdd = (taskText: string) => {
  const user = getCurrentUser();
  if (!user) {
    console.error('사용자 정보를 찾을 수 없습니다.');
    return;
  }

  createTask(user.userId, { taskText });
  loadTasks();
};
```

**동작 흐름**:
1. 현재 사용자 정보 가져오기 (`getCurrentUser()`)
2. 사용자가 없으면 에러 로그 및 중단
3. `createTask` 서비스 호출
4. `loadTasks()`로 목록 새로고침

**컴포넌트 연결**:
```tsx
<TodoInput onAdd={handleAdd} maxLength={50} />
```

### 날짜별 할 일 분리

**함수**: `getTodayTasks()`

**기능**: 오늘 날짜의 할 일만 필터링

**코드**:
```typescript
export function getTodayTasks(): Task[] {
  const allTasks = getAllTasks();
  const today = getTodayDateString(); // "2024-01-15" 형식

  return allTasks.filter((task) => {
    const taskDate = task.createdDate.split('T')[0];
    return taskDate === today;
  });
}
```

**결과**: 매일 새로운 할 일 목록 시작

---

## TASK-006C: 유효성 검증 및 에러 처리

### 검증 규칙

#### 1. 빈 값 검증

**조건**: 입력값이 비어있거나 공백만 있음

**처리**:
```typescript
const trimmedValue = inputValue.trim();

if (!trimmedValue) {
  setError('할 일을 입력해주세요!');
  return;
}
```

**에러 메시지**: "할 일을 입력해주세요!"

#### 2. 글자 수 제한 검증

**조건**: 입력값이 50자 초과

**처리**:
```typescript
if (trimmedValue.length > maxLength) {
  setError(`할 일은 최대 ${maxLength}자까지 입력할 수 있어요!`);
  return;
}
```

**에러 메시지**: "할 일은 최대 50자까지 입력할 수 있어요!"

### 에러 메시지 표시

**UI 컴포넌트**:
```tsx
{error && (
  <div className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2">
    <span className="text-2xl">⚠️</span>
    <p className="text-kid-base text-red-600 font-medium">
      {error}
    </p>
  </div>
)}
```

**스타일**:
- 배경: 연한 빨간색 (`bg-red-50`)
- 테두리: 빨간색 (`border-red-200`)
- 아이콘: ⚠️ (24px)
- 텍스트: 빨간색 (`text-red-600`), 중간 굵기

### 에러 자동 초기화

**트리거**: 사용자가 입력값 변경 시

**코드**:
```typescript
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setInputValue(value);

  // 에러 메시지 초기화
  if (error) {
    setError('');
  }
};
```

**목적**: 사용자 경험 개선 (즉각적인 피드백)

### 성공 시 처리

**동작**:
1. `onAdd` 콜백 호출
2. 입력 필드 초기화
3. 에러 메시지 초기화

**코드**:
```typescript
// 할 일 추가
onAdd(trimmedValue);

// 입력 필드 초기화
setInputValue('');
setError('');
```

---

## 사용자 흐름 (User Flow)

```
1. 사용자가 입력 필드 클릭
   ↓
2. 할 일 텍스트 입력 (예: "수학 숙제하기")
   ↓
3. 글자 수 카운터 실시간 업데이트 (15/50)
   ↓
4a. "추가" 버튼 클릭        4b. Enter 키 입력
   ↓                          ↓
5. 폼 제출 (handleSubmit)
   ↓
6a. 유효성 검증 성공        6b. 유효성 검증 실패
   ↓                          ↓
7a. onAdd 콜백 호출         7b. 에러 메시지 표시
   ↓                          ↓
8a. handleAdd 실행          8b. 사용자가 수정
   ↓                          ↓
9a. getCurrentUser()        9b. 에러 자동 초기화
   ↓
10a. createTask() 서비스 호출
   ↓
11a. Task 객체 생성
   ↓
12a. 로컬 스토리지에 저장
   ↓
13a. loadTasks() - 목록 새로고침
   ↓
14a. 입력 필드 초기화
   ↓
15a. 새 할 일이 목록에 표시됨
```

---

## 테스트 시나리오

### 1. 정상 입력

**입력**: "수학 숙제하기"

**기대 결과**:
- ✅ 할 일이 목록에 추가됨
- ✅ 입력 필드 비워짐
- ✅ 진행도 바 업데이트

### 2. 빈 값 입력

**입력**: "" (빈 문자열) 또는 "   " (공백만)

**기대 결과**:
- ✅ 에러 메시지: "할 일을 입력해주세요!"
- ✅ 추가 버튼 비활성화

### 3. 글자 수 초과

**입력**: "아주 긴 할 일 텍스트..." (51자 이상)

**기대 결과**:
- ✅ 글자 수 카운터 빨간색 + 굵게: **52/50**
- ✅ 추가 시도 시 에러: "할 일은 최대 50자까지..."

### 4. Enter 키 입력

**입력**: "방 청소하기" + Enter

**기대 결과**:
- ✅ 버튼 클릭과 동일하게 작동
- ✅ 할 일 추가됨

### 5. 연속 입력

**입력**: "숙제하기" 추가 → "방 청소하기" 추가 → "강아지 산책" 추가

**기대 결과**:
- ✅ 3개 할 일 모두 목록에 표시
- ✅ 진행도 바: 0/3 (0%)

---

## 코드 구조

### 파일 구조

```
src/
├── components/
│   └── TodoInput.tsx           # 입력 UI 컴포넌트
├── pages/
│   └── TodoListPage.tsx        # 메인 페이지 (통합)
├── services/
│   ├── taskService.ts          # Task CRUD 서비스
│   └── userService.ts          # User 관리 서비스
└── types/
    └── task.ts                 # Task 타입 정의
```

### State 관리

**TodoInput (로컬 상태)**:
```typescript
const [inputValue, setInputValue] = useState('');
const [error, setError] = useState('');
```

**TodoListPage (전역 데이터)**:
```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [completedCount, setCompletedCount] = useState(0);
const [totalCount, setTotalCount] = useState(0);
```

---

## 성능 최적화

### 로컬 스토리지 사용

**장점**:
- 즉시 저장 및 로드
- 서버 요청 불필요
- 오프라인 작동

**제한사항**:
- 5-10MB 용량 제한
- 브라우저 캐시 삭제 시 데이터 손실

### Re-render 최소화

**최적화**:
- `TodoInput`은 독립적인 상태 관리
- 부모 컴포넌트 리렌더링 시 영향 없음

---

## 접근성 (Accessibility)

### 키보드 내비게이션

**Tab 키**: 입력 필드 → 추가 버튼

**Enter 키**: 폼 제출

**Escape 키**: (향후) 입력 취소

### 스크린 리더

**입력 필드**:
- Label: "할 일 입력"
- Placeholder: 예시 제공

**에러 메시지**:
- `role="alert"` (향후 추가 가능)
- 명확한 텍스트

### 터치 영역

**추가 버튼**: 최소 44x44px (접근성 권장 기준 충족)

---

## 향후 개선 사항

- [ ] 할 일 카테고리 선택 (학습, 생활, 운동 등)
- [ ] 할 일 우선순위 설정
- [ ] 할 일 마감일 설정
- [ ] 자동 완성 제안 (최근 입력한 할 일)
- [ ] 음성 입력 지원
- [ ] 이모지 추가 기능
- [ ] 할 일 템플릿 (자주 하는 일)
- [ ] Undo/Redo 기능

---

## 관련 문서

- [DESIGN_TODO_INPUT.md](./DESIGN_TODO_INPUT.md) - 입력 UI 디자인 명세
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Task 데이터 모델
- [DESIGN_MAIN_SCREEN.md](./DESIGN_MAIN_SCREEN.md) - 메인 화면 디자인

---

## 체크리스트

**TASK-006A: 할 일 입력 UI**
- ✅ 입력 필드 (최대 50자)
- ✅ Placeholder 텍스트
- ✅ 추가 버튼 (44x44px 이상)
- ✅ 글자 수 카운터
- ✅ Enter 키 핸들링

**TASK-006B: 백엔드 로직**
- ✅ createTask 서비스 함수
- ✅ 로컬 스토리지 저장
- ✅ 날짜별 할 일 구분
- ✅ 목록 자동 새로고침
- ✅ 사용자 연동

**TASK-006C: 유효성 검증**
- ✅ 빈 값 검증
- ✅ 글자 수 제한 검증
- ✅ 에러 메시지 표시
- ✅ 에러 자동 초기화
- ✅ 성공 시 입력 초기화
