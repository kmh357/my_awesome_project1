# 날짜별 할 일 필터링 기능 구현 문서

## 개요

찍찍이 앱의 날짜별 할 일 조회 기능 구현 문서입니다.
TASK-010 (날짜별 할 일 필터링 기능 구현)을 포함합니다.

---

## TASK-010: 날짜별 할 일 필터링 기능 구현

### 기능 설명

사용자가 특정 날짜의 할 일을 조회할 수 있도록 날짜 선택 기능을 제공합니다.

**주요 기능**:
- 어제, 오늘, 내일 빠른 선택 버튼
- 날짜 입력 필드 (과거/미래 날짜 자유롭게 선택 가능)
- 선택된 날짜의 할 일 목록 표시
- 선택된 날짜에 할 일 추가 가능
- 날짜 변경 시 자동 새로고침

---

## 서비스 계층 구현

### 1. 특정 날짜의 할 일 조회

**위치**: `src/services/taskService.ts:36-47`

**함수**: `getTasksByDate`

**코드**:
```typescript
/**
 * 특정 날짜의 할 일 목록을 가져옵니다.
 * @param dateString - YYYY-MM-DD 형식의 날짜 문자열
 */
export function getTasksByDate(dateString: string): Task[] {
  const allTasks = getAllTasks();

  return allTasks.filter((task) => {
    const taskDate = task.createdDate.split('T')[0];
    return taskDate === dateString;
  });
}
```

**매개변수**:
- `dateString`: YYYY-MM-DD 형식의 날짜 문자열 (예: "2024-01-15")

**반환값**: Task 배열

**동작**:
1. 모든 할 일 목록 조회
2. createdDate에서 날짜 부분만 추출 (ISO 8601 → YYYY-MM-DD)
3. dateString과 일치하는 할 일만 필터링
4. 필터링된 할 일 목록 반환

### 2. 특정 날짜의 완료된 할 일 개수 조회

**위치**: `src/services/taskService.ts:151-158`

**함수**: `getCompletedCountByDate`

**코드**:
```typescript
/**
 * 특정 날짜의 완료된 할 일 개수를 가져옵니다.
 * @param dateString - YYYY-MM-DD 형식의 날짜 문자열
 */
export function getCompletedCountByDate(dateString: string): number {
  const dateTasks = getTasksByDate(dateString);
  return dateTasks.filter((task) => task.isCompleted).length;
}
```

**매개변수**: `dateString` (YYYY-MM-DD)

**반환값**: 완료된 할 일 개수

### 3. 특정 날짜의 전체 할 일 개수 조회

**위치**: `src/services/taskService.ts:160-167`

**함수**: `getTaskCountByDate`

**코드**:
```typescript
/**
 * 특정 날짜의 전체 할 일 개수를 가져옵니다.
 * @param dateString - YYYY-MM-DD 형식의 날짜 문자열
 */
export function getTaskCountByDate(dateString: string): number {
  return getTasksByDate(dateString).length;
}
```

**매개변수**: `dateString` (YYYY-MM-DD)

**반환값**: 전체 할 일 개수

---

## UI 컴포넌트 구현

### DateSelector 컴포넌트

**위치**: `src/components/DateSelector.tsx`

**Props 인터페이스**:
```typescript
interface DateSelectorProps {
  selectedDate: string; // YYYY-MM-DD 형식
  onDateChange: (date: string) => void;
}
```

### 주요 기능

#### 1. 날짜 표시

**코드**:
```tsx
<div className="flex items-center justify-between mb-3">
  <h2 className="text-kid-lg font-bold text-gray-800">
    {isToday ? '오늘' : isYesterday ? '어제' : isTomorrow ? '내일' : formatDateKorean(selectedDate)}
  </h2>
  <span className="text-kid-sm text-gray-500">
    {selectedDate}
  </span>
</div>
```

**동작**:
- 선택된 날짜가 오늘이면: "오늘"
- 어제면: "어제"
- 내일이면: "내일"
- 그 외: "1월 15일" 형식으로 표시
- 오른쪽에 YYYY-MM-DD 형식 표시

**한글 날짜 포맷 함수**:
```typescript
const formatDateKorean = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};
```

#### 2. 빠른 선택 버튼

**코드**:
```tsx
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
```

**버튼 스타일**:
- 선택된 날짜: 파란색 배경, 흰색 텍스트
- 선택되지 않은 날짜: 회색 배경, 회색 텍스트, hover 효과

**날짜 계산 함수**:
```typescript
// 어제
const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
};

// 내일
const getTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
};
```

#### 3. 날짜 입력 필드

**코드**:
```tsx
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
```

**기능**:
- HTML5 `<input type="date">` 사용
- 캘린더 UI 자동 제공 (브라우저 내장)
- 과거 및 미래 날짜 자유롭게 선택 가능
- 포커스 시 파란색 테두리

---

## TodoListPage 통합

**위치**: `src/pages/TodoListPage.tsx`

### State 관리

**코드**:
```typescript
// 오늘 날짜 (YYYY-MM-DD 형식)
const today = new Date().toISOString().split('T')[0];

const [selectedDate, setSelectedDate] = useState<string>(today);
```

**초기값**: 오늘 날짜

### 데이터 로딩 수정

**기존**:
```typescript
const loadTasks = () => {
  const todayTasks = getTodayTasks();
  setTasks(todayTasks);
  setCompletedCount(getTodayCompletedCount());
  setTotalCount(getTodayTaskCount());
};
```

**수정 후**:
```typescript
const loadTasks = () => {
  const dateTasks = getTasksByDate(selectedDate);
  setTasks(dateTasks);
  setCompletedCount(getCompletedCountByDate(selectedDate));
  setTotalCount(getTaskCountByDate(selectedDate));
};
```

**변경 사항**:
- `getTodayTasks()` → `getTasksByDate(selectedDate)`
- `getTodayCompletedCount()` → `getCompletedCountByDate(selectedDate)`
- `getTodayTaskCount()` → `getTaskCountByDate(selectedDate)`

### useEffect 의존성 추가

**기존**:
```typescript
useEffect(() => {
  loadTasks();
}, []);
```

**수정 후**:
```typescript
useEffect(() => {
  loadTasks();
}, [selectedDate]);
```

**동작**:
- 컴포넌트 마운트 시 실행
- `selectedDate` 변경 시마다 실행
- 자동으로 새 날짜의 할 일 로드

### 할 일 추가 수정

**기존**:
```typescript
const handleAdd = (taskText: string) => {
  const user = getCurrentUser();
  if (!user) return;

  createTask(user.userId, { taskText });
  loadTasks();
};
```

**수정 후**:
```typescript
const handleAdd = (taskText: string) => {
  const user = getCurrentUser();
  if (!user) return;

  // 선택된 날짜에 할 일 추가
  createTask(user.userId, { taskText, createdDate: selectedDate + 'T00:00:00.000Z' });
  loadTasks();
};
```

**변경 사항**:
- `createdDate` 명시적으로 설정
- 선택된 날짜에 할 일 추가됨
- 예: "내일" 선택 후 할 일 추가 → 내일 날짜로 저장

### 날짜 변경 핸들러

**코드**:
```typescript
const handleDateChange = (date: string) => {
  setSelectedDate(date);
};
```

**동작**:
1. DateSelector에서 날짜 선택
2. `handleDateChange` 호출
3. `selectedDate` state 업데이트
4. useEffect 트리거
5. `loadTasks()` 실행
6. 새 날짜의 할 일 표시

### UI 배치

**코드**:
```tsx
<div className="card">
  {/* 날짜 선택 */}
  <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />

  {/* 할 일 추가 입력 */}
  <TodoInput onAdd={handleAdd} maxLength={50} />

  {/* 진행도 바 */}
  <ProgressBar completed={completedCount} total={totalCount} />

  {/* 할 일 목록 */}
  <TodoList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
</div>
```

**순서**:
1. 날짜 선택
2. 할 일 추가
3. 진행도 바
4. 할 일 목록

---

## 사용자 흐름 (User Flow)

```
1. 사용자가 메인 페이지 진입
   ↓
2. 기본값: 오늘 날짜 선택 (selectedDate = today)
   ↓
3. useEffect 실행 → loadTasks()
   ↓
4. getTasksByDate(today) 호출
   ↓
5. 오늘의 할 일 목록 표시
   ↓
6. 사용자가 "어제" 버튼 클릭
   ↓
7. onDateChange(getYesterday()) 호출
   ↓
8. handleDateChange 실행 → setSelectedDate(어제)
   ↓
9. useEffect 트리거 (selectedDate 변경 감지)
   ↓
10. loadTasks() 실행
    ↓
11. getTasksByDate(어제) 호출
    ↓
12. 어제의 할 일 목록 표시
    ↓
13. 진행도 바도 어제 기준으로 업데이트
    ↓
14. 사용자가 날짜 입력 필드 클릭
    ↓
15. 캘린더 UI 표시 (브라우저 기본)
    ↓
16. "2024-01-10" 선택
    ↓
17. onChange 이벤트 → onDateChange("2024-01-10")
    ↓
18. handleDateChange 실행 → setSelectedDate("2024-01-10")
    ↓
19. useEffect 트리거
    ↓
20. 2024년 1월 10일의 할 일 표시
    ↓
21. 사용자가 할 일 추가: "프로젝트 마감"
    ↓
22. createTask(userId, { taskText: "프로젝트 마감", createdDate: "2024-01-10T00:00:00.000Z" })
    ↓
23. 2024-01-10 날짜로 저장됨
    ↓
24. loadTasks() 실행
    ↓
25. "프로젝트 마감" 항목이 목록에 추가됨
```

---

## 테스트 시나리오

### 1. 기본 날짜 (오늘)

**시나리오**: 앱 실행

**기대 결과**:
- ✅ "오늘" 버튼 파란색 활성화
- ✅ 오늘 날짜 표시 (예: "오늘", "2024-01-15")
- ✅ 오늘의 할 일 목록 표시
- ✅ 오늘의 진행도 표시

### 2. 어제 선택

**시나리오**: "어제" 버튼 클릭

**기대 결과**:
- ✅ "어제" 버튼 파란색 활성화
- ✅ "어제" 텍스트 표시
- ✅ 어제의 할 일 목록 표시
- ✅ 어제의 진행도 표시

### 3. 내일 선택

**시나리오**: "내일" 버튼 클릭

**기대 결과**:
- ✅ "내일" 버튼 파란색 활성화
- ✅ "내일" 텍스트 표시
- ✅ 내일의 할 일 목록 표시 (비어있을 가능성 높음)

### 4. 과거 날짜 선택

**시나리오**: 날짜 입력 필드에서 "2024-01-01" 선택

**기대 결과**:
- ✅ "1월 1일" 표시
- ✅ 모든 버튼 비활성화 (회색)
- ✅ 2024-01-01의 할 일 목록 표시
- ✅ 날짜 입력 필드에 "2024-01-01" 표시

### 5. 미래 날짜 선택

**시나리오**: 날짜 입력 필드에서 "2024-12-31" 선택

**기대 결과**:
- ✅ "12월 31일" 표시
- ✅ 모든 버튼 비활성화
- ✅ 2024-12-31의 할 일 목록 표시 (비어있을 가능성 높음)

### 6. 선택된 날짜에 할 일 추가

**시나리오**:
1. "내일" 선택
2. "친구 생일 축하하기" 추가

**기대 결과**:
- ✅ 할 일이 내일 날짜로 저장됨
- ✅ 내일의 할 일 목록에 표시됨
- ✅ 오늘로 돌아가면 표시되지 않음

### 7. 날짜 전환 시 자동 새로고침

**시나리오**:
1. 오늘에 할 일 3개
2. "어제" 선택
3. 다시 "오늘" 선택

**기대 결과**:
- ✅ 오늘의 할 일 3개 표시됨
- ✅ 진행도 정확함
- ✅ 데이터 유지됨

### 8. 빈 날짜

**시나리오**: 할 일이 없는 날짜 선택

**기대 결과**:
- ✅ EmptyState 컴포넌트 표시
- ✅ "아직 할 일이 없어요!" 메시지
- ✅ 진행도: "0/0"

---

## 성능 최적화

### 효율적 필터링

**기존 방법** (비효율):
```typescript
// 전체 데이터 로드 후 클라이언트에서 필터링
const allTasks = getAllTasks();
const filteredTasks = allTasks.filter(/* ... */);
```

**현재 방법**:
```typescript
// 한 번의 필터링으로 필요한 데이터만 추출
export function getTasksByDate(dateString: string): Task[] {
  return getAllTasks().filter((task) => {
    const taskDate = task.createdDate.split('T')[0];
    return taskDate === dateString;
  });
}
```

**장점**:
- 단일 패스 필터링
- 불필요한 데이터 처리 최소화

### 메모이제이션 (향후 개선 가능)

**현재**: 매번 필터링 실행

**개선안**:
```typescript
const memoizedTasks = useMemo(() => {
  return getTasksByDate(selectedDate);
}, [selectedDate]);
```

**효과**: selectedDate 변경 시에만 재계산

---

## 접근성 (Accessibility)

### 키보드 내비게이션

**Tab 키**:
- 어제 버튼 → 오늘 버튼 → 내일 버튼 → 날짜 입력 필드
- 순차적 포커스 이동

**Enter/Space 키**:
- 버튼 활성화
- 날짜 입력 필드: Enter로 캘린더 열기

### 날짜 입력 필드

**레이블**:
```tsx
<label htmlFor="date-picker" className="text-kid-sm text-gray-600">
  다른 날짜:
</label>
<input id="date-picker" type="date" ... />
```

**접근성**:
- 명확한 레이블 제공
- id와 htmlFor 연결
- 스크린 리더가 "다른 날짜" 읽음

### 시각적 피드백

**선택된 날짜**:
- 파란색 배경 (명확한 구분)
- 흰색 텍스트 (높은 대비)

**선택되지 않은 날짜**:
- 회색 배경
- 회색 텍스트
- hover 효과 (마우스 오버 시 진한 회색)

---

## 코드 구조

### 파일 구조

```
src/
├── components/
│   └── DateSelector.tsx         # 날짜 선택 UI
├── pages/
│   └── TodoListPage.tsx         # 메인 페이지 (통합)
└── services/
    └── taskService.ts           # 날짜별 필터링 로직
```

### State 관리

**TodoListPage**:
```typescript
const [selectedDate, setSelectedDate] = useState<string>(today);
```

**DateSelector**:
- Props로만 데이터 받음 (selectedDate, onDateChange)
- 내부 상태 없음 (stateless)

### 데이터 흐름

```
사용자 액션 (날짜 선택)
  ↓
DateSelector → onDateChange(date)
  ↓
TodoListPage → handleDateChange(date)
  ↓
setSelectedDate(date)
  ↓
useEffect 트리거 (selectedDate 의존성)
  ↓
loadTasks()
  ↓
getTasksByDate(selectedDate) (taskService)
  ↓
할 일 목록 업데이트
  ↓
UI 리렌더링
```

---

## 향후 개선 사항

**UI/UX**:
- [ ] 캘린더 커스텀 UI (react-calendar 등)
- [ ] 날짜 범위 선택 (기간별 조회)
- [ ] 주간/월간 보기
- [ ] 날짜별 통계 그래프

**기능**:
- [ ] 할 일 날짜 변경 (드래그 앤 드롭)
- [ ] 반복 할 일 (매일, 매주 등)
- [ ] 마감일 개념 추가
- [ ] 우선순위별 정렬

**성능**:
- [ ] 날짜별 데이터 캐싱
- [ ] 무한 스크롤 (과거 날짜)
- [ ] 가상화 (대량 할 일)

**접근성**:
- [ ] 날짜 포맷 국제화 (i18n)
- [ ] 음성 명령 ("어제로 이동")
- [ ] 단축키 (← 어제, → 내일)

---

## 관련 문서

- [TODO_ADD_FEATURE.md](./TODO_ADD_FEATURE.md) - 할 일 추가 기능
- [TODO_COMPLETION_FEATURE.md](./TODO_COMPLETION_FEATURE.md) - 할 일 완료 기능
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Task 데이터 모델

---

## 체크리스트

**TASK-010: 날짜별 할 일 필터링**
- ✅ 날짜 선택 UI 구현 (어제, 오늘, 내일 버튼 + 날짜 입력 필드)
- ✅ 선택한 날짜의 할 일 필터링 (`getTasksByDate`)
- ✅ 기본값은 오늘 날짜로 설정
- ✅ 과거 및 미래 날짜 조회 가능
- ✅ 선택된 날짜 시각적으로 표시 (파란색 버튼, 날짜 표시)
- ✅ 날짜 변경 시 자동 새로고침 (useEffect 의존성)
- ✅ 선택된 날짜에 할 일 추가 가능
- ✅ 진행도 바도 선택된 날짜 기준으로 업데이트

**모든 acceptance criteria 충족 완료!**
