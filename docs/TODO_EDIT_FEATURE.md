# 할 일 수정 기능 구현 문서

## 개요

찍찍이 앱의 할 일 수정 기능 구현 문서입니다.
TASK-017 (할 일 삭제 및 수정 기능 구현) 중 수정 기능을 포함합니다.
삭제 기능은 이미 구현되어 있습니다.

---

## TASK-017: 할 일 삭제 및 수정 기능 구현

### 삭제 기능 (이미 구현됨)

**위치**: `src/pages/TodoListPage.tsx:82-90`

**기능**:
- 각 할 일 항목에 삭제 버튼 표시
- 클릭 시 확인 메시지 표시
- 확인 시 데이터베이스에서 삭제

**코드**:
```typescript
const handleDelete = (taskId: string) => {
  const confirmed = window.confirm('이 할 일을 삭제할까요?');
  if (confirmed) {
    const success = deleteTask(taskId);
    if (success) {
      loadTasks();
    }
  }
};
```

**UI**:
- 할 일 항목 오른쪽에 X 버튼
- hover 시 빨간색으로 변경
- 위치: `src/components/TodoItem.tsx:88-107`

---

## 수정 기능 구현 (신규)

### 1. TodoItem 컴포넌트 수정

**위치**: `src/components/TodoItem.tsx`

#### Props 인터페이스 확장

**코드**:
```typescript
interface TodoItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, newText: string) => void; // 추가
}
```

**추가**:
- `onEdit`: 할 일 텍스트 수정 시 호출되는 콜백

#### State 관리

**코드**:
```typescript
import { useState, useRef, useEffect } from 'react';

const [isEditing, setIsEditing] = useState(false);
const [editText, setEditText] = useState(task.taskText);
const inputRef = useRef<HTMLInputElement>(null);
```

**State**:
- `isEditing`: 편집 모드 여부
- `editText`: 편집 중인 텍스트
- `inputRef`: input 요소 참조 (포커스 제어)

#### 편집 모드 진입

**코드**:
```typescript
const handleTextClick = () => {
  if (!task.isCompleted && onEdit) {
    setIsEditing(true);
    setEditText(task.taskText);
  }
};
```

**동작**:
1. 할 일 텍스트 클릭
2. 완료되지 않은 항목만 편집 가능 확인
3. `onEdit` prop이 있을 때만 편집 모드 진입
4. `isEditing` true로 설정
5. 현재 텍스트로 `editText` 초기화

**제약**:
- 완료된 할 일은 수정 불가능
- `onEdit` prop이 없으면 편집 불가능

#### 편집 저장

**코드**:
```typescript
const handleSave = () => {
  const trimmedText = editText.trim();
  if (trimmedText && trimmedText !== task.taskText) {
    onEdit?.(task.taskId, trimmedText);
  }
  setIsEditing(false);
};
```

**동작**:
1. 입력 텍스트 trim (공백 제거)
2. 빈 텍스트가 아니고, 기존 텍스트와 다를 때만 저장
3. `onEdit` 콜백 호출
4. 편집 모드 종료

**검증**:
- 빈 텍스트 저장 방지
- 변경 사항 없을 때 불필요한 업데이트 방지

#### 편집 취소

**코드**:
```typescript
const handleCancel = () => {
  setEditText(task.taskText);
  setIsEditing(false);
};
```

**동작**:
1. 원래 텍스트로 복원
2. 편집 모드 종료

#### 키보드 단축키

**코드**:
```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    handleSave();
  } else if (e.key === 'Escape') {
    handleCancel();
  }
};
```

**단축키**:
- **Enter**: 저장
- **Escape**: 취소

#### 자동 포커스

**코드**:
```typescript
useEffect(() => {
  if (isEditing && inputRef.current) {
    inputRef.current.focus();
    inputRef.current.select();
  }
}, [isEditing]);
```

**동작**:
1. 편집 모드 진입 시 input에 포커스
2. 전체 텍스트 선택 (바로 타이핑 가능)

#### UI 렌더링

**일반 모드**:
```tsx
<p
  onClick={handleTextClick}
  className={`
    text-kid-base font-medium transition-all duration-300
    ${
      task.isCompleted
        ? 'text-gray-500 line-through'
        : 'text-gray-800 cursor-pointer hover:text-primary'
    }
    ${onEdit && !task.isCompleted ? 'hover:underline' : ''}
  `}
>
  {task.taskText}
</p>
```

**스타일**:
- 완료된 항목: 회색, 취소선
- 미완료 항목: 검은색, 클릭 가능 (cursor-pointer)
- hover: 파란색, 밑줄

**편집 모드**:
```tsx
<input
  ref={inputRef}
  type="text"
  value={editText}
  onChange={(e) => setEditText(e.target.value)}
  onKeyDown={handleKeyDown}
  onBlur={handleSave}
  maxLength={50}
  className="flex-1 px-3 py-1 rounded-lg border-2 border-primary text-kid-base focus:outline-none"
/>
```

**특징**:
- 최대 50자 제한
- 파란색 테두리 (focus 상태 표시)
- `onBlur`: 포커스 잃으면 자동 저장
- Enter/Escape 단축키 지원

---

### 2. TodoList 컴포넌트 수정

**위치**: `src/components/TodoList.tsx`

#### Props 전달

**코드**:
```typescript
interface TodoListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, newText: string) => void; // 추가
  onAddClick?: () => void;
}

export default function TodoList({
  tasks,
  onToggle,
  onDelete,
  onEdit, // 추가
  onAddClick,
}: TodoListProps) {
  // ...

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TodoItem
          key={task.taskId}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit} // 전달
        />
      ))}
    </div>
  );
}
```

**역할**: `onEdit` prop을 TodoItem으로 전달

---

### 3. TodoListPage 통합

**위치**: `src/pages/TodoListPage.tsx`

#### Import 추가

**코드**:
```typescript
import {
  // ... 기존 imports
  updateTask, // 추가
} from '../services/taskService';
```

#### 수정 핸들러

**코드**:
```typescript
const handleEdit = (taskId: string, newText: string) => {
  const updatedTask = updateTask(taskId, { taskText: newText });
  if (updatedTask) {
    loadTasks();
  }
};
```

**동작**:
1. `updateTask` 서비스 함수 호출
2. taskId와 새 텍스트 전달
3. 성공 시 할 일 목록 새로고침
4. UI 자동 업데이트

#### TodoList에 전달

**코드**:
```tsx
<TodoList
  tasks={tasks}
  onToggle={handleToggle}
  onDelete={handleDelete}
  onEdit={handleEdit} // 추가
  onAddClick={handleAddClick}
/>
```

---

## 서비스 계층 (이미 구현됨)

### updateTask 함수

**위치**: `src/services/taskService.ts`

**함수 시그니처**:
```typescript
export function updateTask(taskId: string, input: UpdateTaskInput): Task | null
```

**입력 타입**:
```typescript
interface UpdateTaskInput {
  taskText?: string;
  isCompleted?: boolean;
}
```

**동작**:
1. taskId로 할 일 찾기
2. 입력 데이터로 업데이트
3. 로컬 스토리지에 저장
4. 업데이트된 Task 반환

**사용 예**:
```typescript
updateTask('task_001', { taskText: '수정된 텍스트' });
```

---

## 사용자 흐름 (User Flow)

### 수정 흐름

```
1. 사용자가 할 일 목록 확인
   ↓
2. 미완료 할 일 텍스트 클릭
   (완료된 항목은 클릭 불가)
   ↓
3. 편집 모드 진입
   - isEditing = true
   - input 필드 표시
   ↓
4. useEffect 실행
   - input에 자동 포커스
   - 전체 텍스트 선택
   ↓
5. 사용자가 텍스트 수정
   (예: "수학 숙제하기" → "수학 문제집 10페이지 풀기")
   ↓
6a. Enter 키 입력
    OR
6b. input 외부 클릭 (onBlur)
    OR
6c. Escape 키 입력 (취소)
    ↓
7a. Enter/onBlur: handleSave 실행
    - trimmedText 생성
    - 빈 텍스트 확인 (빈 텍스트면 취소)
    - 변경 사항 확인 (변경 없으면 그냥 종료)
    - onEdit(taskId, newText) 호출
    ↓
7b. Escape: handleCancel 실행
    - 원래 텍스트로 복원
    - 편집 모드 종료
    ↓
8. (Enter/onBlur 경로) handleEdit 실행 (TodoListPage)
   ↓
9. updateTask(taskId, { taskText }) 호출
   ↓
10. taskService에서 Task 업데이트
    - 로컬 스토리지 저장
    ↓
11. loadTasks() 호출
    ↓
12. UI 리렌더링
    - 수정된 텍스트 표시
    ↓
13. 편집 모드 종료 (isEditing = false)
```

---

## 테스트 시나리오

### 1. 기본 수정

**시나리오**: 할 일 텍스트 수정

**단계**:
1. "수학 숙제하기" 클릭
2. "수학 문제집 10페이지 풀기" 입력
3. Enter 키

**기대 결과**:
- ✅ 편집 모드 진입
- ✅ input에 포커스
- ✅ 전체 텍스트 선택
- ✅ 수정된 텍스트 저장
- ✅ UI에 "수학 문제집 10페이지 풀기" 표시

### 2. 편집 취소

**시나리오**: Escape로 취소

**단계**:
1. "영어 단어 외우기" 클릭
2. "영어 단어 50개 외우기" 입력
3. Escape 키

**기대 결과**:
- ✅ 편집 취소
- ✅ 원래 텍스트 유지 ("영어 단어 외우기")
- ✅ 편집 모드 종료

### 3. 완료된 항목 수정 불가

**시나리오**: 완료된 할 일 클릭

**단계**:
1. 할 일 완료 (체크박스 클릭)
2. 텍스트 클릭

**기대 결과**:
- ✅ 편집 모드 진입 안 됨
- ✅ 커서 모양 변경 없음
- ✅ hover 효과 없음

### 4. 빈 텍스트 방지

**시나리오**: 공백만 입력

**단계**:
1. "강아지 산책" 클릭
2. 모두 삭제 (빈 텍스트)
3. Enter 키

**기대 결과**:
- ✅ 저장되지 않음
- ✅ 원래 텍스트 유지
- ✅ 편집 모드 종료

### 5. 변경 사항 없을 때

**시나리오**: 수정하지 않고 Enter

**단계**:
1. "책 읽기" 클릭
2. 아무것도 변경하지 않음
3. Enter 키

**기대 결과**:
- ✅ updateTask 호출되지 않음
- ✅ 불필요한 저장 방지
- ✅ 편집 모드 종료

### 6. onBlur 자동 저장

**시나리오**: input 외부 클릭

**단계**:
1. "운동하기" 클릭
2. "헬스장에서 1시간 운동" 입력
3. input 외부 클릭

**기대 결과**:
- ✅ onBlur 이벤트 발생
- ✅ handleSave 자동 실행
- ✅ 수정된 텍스트 저장

### 7. 50자 제한

**시나리오**: 50자 초과 입력

**단계**:
1. "프로젝트 작업" 클릭
2. 60자 텍스트 입력

**기대 결과**:
- ✅ 50자까지만 입력됨
- ✅ maxLength 속성으로 제한

### 8. 삭제 기능 (이미 구현)

**시나리오**: 할 일 삭제

**단계**:
1. 삭제 버튼 클릭 (X)
2. 확인 메시지에서 "확인"

**기대 결과**:
- ✅ 확인 메시지 표시
- ✅ 할 일 삭제됨
- ✅ 목록에서 제거

---

## UI/UX 개선 사항

### 시각적 피드백

**일반 모드**:
- hover 시 파란색 텍스트
- hover 시 밑줄
- cursor-pointer (클릭 가능 표시)

**편집 모드**:
- 파란색 테두리 (focus 상태)
- 텍스트 전체 선택 (즉시 수정 가능)

### 접근성

**키보드 지원**:
- Tab: 다음 항목으로 이동
- Enter: 편집 저장
- Escape: 편집 취소

**스크린 리더**:
- 할 일 텍스트 읽음
- 편집 모드 진입 시 input 포커스

### 사용자 경험

**자동 포커스**:
- 편집 모드 진입 시 즉시 입력 가능
- 전체 텍스트 선택으로 빠른 수정

**자동 저장**:
- onBlur로 입력 후 외부 클릭 시 저장
- Enter 키로 빠른 저장

**완료된 항목 보호**:
- 완료된 할 일은 수정 불가능
- 실수로 수정하는 것 방지

---

## 성능 최적화

### 불필요한 업데이트 방지

**검증 로직**:
```typescript
if (trimmedText && trimmedText !== task.taskText) {
  onEdit?.(task.taskId, trimmedText);
}
```

**효과**:
- 빈 텍스트 저장 방지
- 변경 사항 없을 때 업데이트 방지
- 로컬 스토리지 쓰기 최소화

### State 관리

**로컬 State 사용**:
- `isEditing`, `editText`: TodoItem 내부 state
- 전역 state 오염 방지
- 리렌더링 최소화

---

## 코드 구조

### 파일 구조

```
src/
├── components/
│   ├── TodoItem.tsx           # 수정 UI 및 로직
│   └── TodoList.tsx           # onEdit prop 전달
├── pages/
│   └── TodoListPage.tsx       # handleEdit, 통합
└── services/
    └── taskService.ts         # updateTask (이미 구현)
```

### 데이터 흐름

```
사용자 클릭 (텍스트)
  ↓
TodoItem → handleTextClick
  ↓
setIsEditing(true)
  ↓
input 렌더링
  ↓
사용자 수정 → setEditText
  ↓
Enter/onBlur → handleSave
  ↓
TodoItem → onEdit(taskId, newText)
  ↓
TodoList (전달)
  ↓
TodoListPage → handleEdit
  ↓
taskService → updateTask
  ↓
localStorage 저장
  ↓
loadTasks() → 새로고침
```

---

## 향후 개선 사항

**UI/UX**:
- [ ] 저장/취소 버튼 추가 (명시적 UI)
- [ ] 편집 중 표시 (아이콘 또는 배경색)
- [ ] Undo 기능 (실수로 수정 시)

**기능**:
- [ ] 멀티라인 수정 (textarea)
- [ ] 마크다운 지원
- [ ] 완료된 항목도 수정 가능 (옵션)

**검증**:
- [ ] 중복 텍스트 방지
- [ ] 금지어 필터링
- [ ] 최소 길이 제한 (예: 3자 이상)

**성능**:
- [ ] Debounce 적용 (자동 저장)
- [ ] 낙관적 업데이트
- [ ] 변경 사항 추적 (dirty flag)

---

## 관련 문서

- [TODO_ADD_FEATURE.md](./TODO_ADD_FEATURE.md) - 할 일 추가 기능
- [TODO_COMPLETION_FEATURE.md](./TODO_COMPLETION_FEATURE.md) - 할 일 완료 기능
- [DATE_FILTERING_FEATURE.md](./DATE_FILTERING_FEATURE.md) - 날짜별 필터링
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Task 데이터 모델

---

## 체크리스트

**TASK-017: 할 일 삭제 및 수정 기능**

**삭제 기능** (이미 구현):
- ✅ 스와이프로 할 일 삭제 기능 (X 버튼)
- ✅ 삭제 시 확인 메시지 표시
- ✅ 데이터베이스에서 삭제 반영

**수정 기능** (신규 구현):
- ✅ 할 일 클릭 시 수정 모드 진입
- ✅ 편집 input 표시 (자동 포커스, 전체 선택)
- ✅ Enter 키로 저장
- ✅ Escape 키로 취소
- ✅ onBlur로 자동 저장
- ✅ 빈 텍스트 방지
- ✅ 변경 사항 없을 때 저장 방지
- ✅ 완료된 항목 수정 불가능
- ✅ 데이터베이스에서 수정 반영 (updateTask)
- ✅ UI 자동 새로고침

**모든 acceptance criteria 충족 완료!**
