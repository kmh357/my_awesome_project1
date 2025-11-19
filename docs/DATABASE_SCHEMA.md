# 데이터베이스 스키마 문서

찍찍이 (Tick-Tick-E) 앱의 로컬 스토리지 기반 데이터 구조 설명서입니다.

## 개요

이 앱은 브라우저의 `localStorage`를 사용하여 모든 데이터를 클라이언트 측에 저장합니다.
오프라인 우선(offline-first) 설계로, 인터넷 연결 없이도 완전히 작동합니다.

## 스토리지 키

```typescript
STORAGE_KEYS = {
  USER: 'tickticke_user',              // 사용자 정보
  TASKS: 'tickticke_tasks',            // 할 일 목록
  STICKERS: 'tickticke_stickers',      // 스티커 마스터 데이터
  USER_STICKERS: 'tickticke_user_stickers', // 사용자가 획득한 스티커
}
```

## 데이터 모델

### 1. User (사용자)

**스토리지 키**: `tickticke_user`

```typescript
interface User {
  userId: string;        // 고유 ID (예: "user_1234567890_abc123")
  userName: string;      // 사용자 이름 (예: "철수")
  createdAt: string;     // 생성 시간 (ISO 8601 형식)
}
```

**특징**:
- 현재 단일 사용자 모드 (한 명의 사용자만 지원)
- 앱 최초 실행 시 자동 생성
- `localStorage`에 단일 객체로 저장

**예시 데이터**:
```json
{
  "userId": "user_1700000000000_abc123",
  "userName": "철수",
  "createdAt": "2024-01-15T09:30:00.000Z"
}
```

---

### 2. Task (할 일)

**스토리지 키**: `tickticke_tasks`

```typescript
interface Task {
  taskId: string;         // 고유 ID (예: "task_1234567890_xyz789")
  userId: string;         // 사용자 ID (외래 키)
  taskText: string;       // 할 일 내용 (예: "숙제하기")
  isCompleted: boolean;   // 완료 여부
  createdDate: string;    // 생성 시간 (ISO 8601 형식)
  completedDate?: string; // 완료 시간 (ISO 8601 형식, 선택적)
}
```

**특징**:
- `localStorage`에 배열로 저장
- 매일 새로운 할 일을 추가할 수 있음
- 완료 시 `completedDate` 자동 설정
- 오늘 날짜의 할 일만 필터링하여 표시

**예시 데이터**:
```json
[
  {
    "taskId": "task_1700000000000_xyz789",
    "userId": "user_1700000000000_abc123",
    "taskText": "수학 숙제하기",
    "isCompleted": true,
    "createdDate": "2024-01-15T10:00:00.000Z",
    "completedDate": "2024-01-15T14:30:00.000Z"
  },
  {
    "taskId": "task_1700000000001_def456",
    "userId": "user_1700000000000_abc123",
    "taskText": "방 청소하기",
    "isCompleted": false,
    "createdDate": "2024-01-15T10:05:00.000Z"
  }
]
```

---

### 3. Sticker (스티커 마스터 데이터)

**스토리지 키**: `tickticke_stickers`

```typescript
type StickerRarity = 'common' | 'rare' | 'epic' | 'legendary';
type StickerCategory = 'animal' | 'food' | 'nature' | 'trophy' | 'emoji';

interface Sticker {
  stickerId: string;       // 고유 ID (예: "sticker_001")
  stickerName: string;     // 스티커 이름 (예: "토끼")
  imageUrl: string;        // 이미지 경로 (예: "/stickers/rabbit.png")
  rarity: StickerRarity;   // 희귀도
  category: StickerCategory; // 카테고리
}
```

**특징**:
- 앱 최초 실행 시 25개의 기본 스티커 데이터 초기화
- `localStorage`에 배열로 저장
- 읽기 전용 마스터 데이터 (사용자가 수정 불가)

**희귀도별 확률**:
- `common` (일반): 60%
- `rare` (레어): 25%
- `epic` (에픽): 12%
- `legendary` (전설): 3%

**카테고리별 스티커 개수**:
- `animal` (동물): 5개
- `food` (음식): 5개
- `nature` (자연): 5개
- `trophy` (트로피): 5개
- `emoji` (이모지): 5개

**예시 데이터**:
```json
[
  {
    "stickerId": "sticker_001",
    "stickerName": "토끼",
    "imageUrl": "/stickers/rabbit.png",
    "rarity": "common",
    "category": "animal"
  },
  {
    "stickerId": "sticker_016",
    "stickerName": "금메달",
    "imageUrl": "/stickers/gold-medal.png",
    "rarity": "legendary",
    "category": "trophy"
  }
]
```

---

### 4. UserSticker (사용자가 획득한 스티커)

**스토리지 키**: `tickticke_user_stickers`

```typescript
interface UserSticker {
  userStickerId: string;  // 고유 ID (예: "us_1234567890_qwe456")
  userId: string;         // 사용자 ID (외래 키)
  stickerId: string;      // 스티커 ID (외래 키)
  acquiredDate: string;   // 획득 시간 (ISO 8601 형식)
  sticker?: Sticker;      // 스티커 상세 정보 (조인 결과)
}
```

**특징**:
- `localStorage`에 배열로 저장
- 할 일 완료 시 랜덤 스티커 획득
- 같은 스티커를 여러 번 받을 수 있음 (중복 허용)
- `sticker` 필드는 조회 시에만 채워짐 (저장되지 않음)

**예시 데이터**:
```json
[
  {
    "userStickerId": "us_1700000000000_qwe456",
    "userId": "user_1700000000000_abc123",
    "stickerId": "sticker_001",
    "acquiredDate": "2024-01-15T14:30:00.000Z"
  },
  {
    "userStickerId": "us_1700000000001_rty789",
    "userId": "user_1700000000000_abc123",
    "stickerId": "sticker_022",
    "acquiredDate": "2024-01-15T15:00:00.000Z"
  }
]
```

---

### 5. StickerCollection (스티커 컬렉션 통계)

**참고**: 이 타입은 저장되지 않고, 실시간으로 계산되어 반환됩니다.

```typescript
interface StickerCollection {
  totalStickers: number;     // 전체 스티커 개수
  acquiredStickers: number;  // 획득한 고유 스티커 개수
  percentage: number;        // 수집 완성도 (0-100)
  stickersByCategory: Record<StickerCategory, {
    total: number;           // 카테고리별 전체 스티커 개수
    acquired: number;        // 카테고리별 획득한 스티커 개수
  }>;
}
```

**예시 데이터**:
```json
{
  "totalStickers": 25,
  "acquiredStickers": 8,
  "percentage": 32,
  "stickersByCategory": {
    "animal": { "total": 5, "acquired": 2 },
    "food": { "total": 5, "acquired": 1 },
    "nature": { "total": 5, "acquired": 3 },
    "trophy": { "total": 5, "acquired": 1 },
    "emoji": { "total": 5, "acquired": 1 }
  }
}
```

---

## 관계도 (Entity Relationship)

```
User (1) ─────< (N) Task
  │
  │
  └─────< (N) UserSticker >─────(1) Sticker
```

- 한 명의 User는 여러 개의 Task를 가질 수 있습니다.
- 한 명의 User는 여러 개의 UserSticker를 가질 수 있습니다.
- 각 UserSticker는 하나의 Sticker를 참조합니다.

---

## 서비스 함수

### UserService (`src/services/userService.ts`)

| 함수명 | 설명 |
|--------|------|
| `getCurrentUser()` | 현재 사용자 정보 가져오기 |
| `createUser(userName)` | 새 사용자 생성 |
| `updateUserName(userName)` | 사용자 이름 업데이트 |
| `hasUser()` | 사용자 존재 여부 확인 |
| `initializeUser(defaultName)` | 사용자 초기화 또는 가져오기 |

### TaskService (`src/services/taskService.ts`)

| 함수명 | 설명 |
|--------|------|
| `getAllTasks()` | 모든 할 일 가져오기 |
| `getTodayTasks()` | 오늘 날짜의 할 일만 가져오기 |
| `getTaskById(taskId)` | 특정 ID의 할 일 가져오기 |
| `createTask(userId, input)` | 새 할 일 생성 |
| `updateTask(taskId, input)` | 할 일 업데이트 |
| `deleteTask(taskId)` | 할 일 삭제 |
| `toggleTaskCompletion(taskId)` | 할 일 완료 상태 토글 |
| `getTodayCompletedCount()` | 오늘 완료한 할 일 개수 |
| `getTodayTaskCount()` | 오늘 전체 할 일 개수 |

### StickerService (`src/services/stickerService.ts`)

| 함수명 | 설명 |
|--------|------|
| `initializeDefaultStickers()` | 기본 스티커 데이터 초기화 |
| `getAllStickers()` | 모든 스티커 가져오기 |
| `getStickerById(stickerId)` | 특정 ID의 스티커 가져오기 |
| `getStickersByCategory(category)` | 카테고리별 스티커 가져오기 |
| `getStickersByRarity(rarity)` | 희귀도별 스티커 가져오기 |
| `getRandomSticker()` | 랜덤 스티커 가져오기 (확률 가중치 적용) |
| `getUserStickers(userId)` | 사용자의 모든 스티커 가져오기 |
| `awardStickerToUser(userId, stickerId)` | 사용자에게 스티커 부여 |
| `awardRandomStickerToUser(userId)` | 사용자에게 랜덤 스티커 부여 |
| `getUserStickersWithDetails(userId)` | 스티커 정보와 함께 가져오기 |
| `getStickerCollectionStats(userId)` | 스티커 컬렉션 통계 가져오기 |
| `getUserStickersByCategory(userId, category)` | 카테고리별 사용자 스티커 가져오기 |

---

## 데이터 흐름 예시

### 할 일 추가 및 완료 흐름

1. 사용자가 "숙제하기" 입력
2. `createTask()` 호출
3. 새 Task 객체 생성 (`isCompleted: false`)
4. `localStorage`에 저장
5. 사용자가 체크박스 클릭
6. `toggleTaskCompletion()` 호출
7. `isCompleted: true`, `completedDate` 설정
8. `localStorage` 업데이트
9. 스티커 보상 로직 실행
10. `awardRandomStickerToUser()` 호출
11. 랜덤 스티커 선택 (확률 가중치 적용)
12. UserSticker 생성 및 저장
13. 축하 메시지 표시

---

## 초기화 순서

앱 최초 실행 시 다음 순서로 초기화됩니다:

1. `initializeDefaultStickers()` - 25개의 기본 스티커 생성
2. `initializeUser()` - 기본 사용자 생성 (이름: "친구")
3. 빈 Task 배열과 UserSticker 배열 생성

---

## 데이터 백업 및 복원

### 전체 데이터 내보내기

```typescript
const backup = {
  user: localStorage.getItem('tickticke_user'),
  tasks: localStorage.getItem('tickticke_tasks'),
  stickers: localStorage.getItem('tickticke_stickers'),
  userStickers: localStorage.getItem('tickticke_user_stickers'),
};

console.log(JSON.stringify(backup));
```

### 전체 데이터 복원

```typescript
localStorage.setItem('tickticke_user', backup.user);
localStorage.setItem('tickticke_tasks', backup.tasks);
localStorage.setItem('tickticke_stickers', backup.stickers);
localStorage.setItem('tickticke_user_stickers', backup.userStickers);
```

---

## 주의사항

1. **브라우저 저장소 제한**: `localStorage`는 일반적으로 5-10MB 제한이 있습니다.
2. **데이터 손실 위험**: 브라우저 캐시 삭제 시 데이터가 영구 삭제됩니다.
3. **단일 사용자**: 현재 버전은 한 명의 사용자만 지원합니다.
4. **동기화 없음**: 다른 기기와 데이터 동기화가 불가능합니다.

---

## 향후 확장 가능성

- Firebase Firestore 연동으로 클라우드 동기화
- 다중 사용자 지원
- 데이터 백업/복원 UI 기능
- IndexedDB 마이그레이션 (더 큰 용량)
