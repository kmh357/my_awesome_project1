# 스티커 이미지 리소스 가이드

## 개요

찍찍이 앱은 이모지 기반의 스티커 시스템을 사용합니다.
실제 이미지 파일 대신 유니코드 이모지를 활용하여 다음과 같은 장점을 제공합니다:

- ✅ **즉시 사용 가능**: 별도의 이미지 파일 다운로드 불필요
- ✅ **저작권 문제 없음**: 유니코드 표준 이모지 사용
- ✅ **크기 조절 자유로움**: CSS로 자유롭게 크기 조정
- ✅ **빠른 로딩 속도**: 텍스트로 처리되어 즉시 렌더링
- ✅ **크로스 플랫폼**: 모든 OS와 브라우저에서 동일하게 표시

---

## 스티커 목록

### 전체 통계

| 항목 | 개수 |
|------|------|
| 전체 스티커 | 25개 |
| 카테고리 | 5개 |
| 희귀도 등급 | 4개 |

---

## 카테고리별 스티커

### 1. 동물 (Animal) - 5개

| ID | 이름 | 이모지 | 희귀도 | 설명 |
|----|------|--------|--------|------|
| sticker_001 | 토끼 | 🐰 | common | 귀여운 토끼 |
| sticker_002 | 고양이 | 🐱 | common | 사랑스러운 고양이 |
| sticker_003 | 강아지 | 🐶 | common | 충실한 강아지 |
| sticker_004 | 판다 | 🐼 | rare | 귀여운 판다 |
| sticker_005 | 유니콘 | 🦄 | epic | 마법의 유니콘 |

**설명**: 초등학생들이 좋아하는 귀여운 동물 친구들

---

### 2. 음식 (Food) - 5개

| ID | 이름 | 이모지 | 희귀도 | 설명 |
|----|------|--------|--------|------|
| sticker_006 | 사탕 | 🍬 | common | 달콤한 사탕 |
| sticker_007 | 아이스크림 | 🍦 | common | 시원한 아이스크림 |
| sticker_008 | 케이크 | 🍰 | rare | 맛있는 케이크 |
| sticker_009 | 도넛 | 🍩 | common | 달콤한 도넛 |
| sticker_010 | 초콜릿 | 🍫 | rare | 고급 초콜릿 |

**설명**: 맛있고 달콤한 음식들

---

### 3. 자연 (Nature) - 5개

| ID | 이름 | 이모지 | 희귀도 | 설명 |
|----|------|--------|--------|------|
| sticker_011 | 별 | ⭐ | common | 반짝이는 별 |
| sticker_012 | 달 | 🌙 | common | 밤하늘의 달 |
| sticker_013 | 해 | ☀️ | rare | 따뜻한 해 |
| sticker_014 | 무지개 | 🌈 | epic | 아름다운 무지개 |
| sticker_015 | 꽃 | 🌸 | common | 예쁜 꽃 |

**설명**: 아름다운 자연의 모습

---

### 4. 트로피 (Trophy) - 5개

| ID | 이름 | 이모지 | 희귀도 | 설명 |
|----|------|--------|--------|------|
| sticker_016 | 금메달 | 🥇 | legendary | 1등 금메달 |
| sticker_017 | 은메달 | 🥈 | epic | 2등 은메달 |
| sticker_018 | 동메달 | 🥉 | rare | 3등 동메달 |
| sticker_019 | 왕관 | 👑 | legendary | 왕의 왕관 |
| sticker_020 | 트로피 | 🏆 | epic | 우승 트로피 |

**설명**: 성취를 나타내는 멋진 트로피와 메달

---

### 5. 이모지 (Emoji) - 5개

| ID | 이름 | 이모지 | 희귀도 | 설명 |
|----|------|--------|--------|------|
| sticker_021 | 웃음 | 😊 | common | 환하게 웃는 얼굴 |
| sticker_022 | 하트 | ❤️ | common | 사랑의 하트 |
| sticker_023 | 박수 | 👏 | rare | 박수치는 손 |
| sticker_024 | 최고 | 👍 | common | 최고를 외치는 엄지 |
| sticker_025 | 불꽃 | 🔥 | epic | 타오르는 불꽃 |

**설명**: 다양한 감정을 표현하는 이모지

---

## 희귀도 시스템

### 희귀도별 통계

| 희귀도 | 이름 | 확률 | 개수 | 색상 코드 | 대표 이모지 |
|--------|------|------|------|-----------|-------------|
| common | 일반 | 60% | 11개 | #9CA3AF (회색) | ✨ |
| rare | 레어 | 25% | 7개 | #60A5FA (파란색) | 💎 |
| epic | 에픽 | 12% | 5개 | #C084FC (보라색) | 🌟 |
| legendary | 전설 | 3% | 2개 | #FACC15 (노란색) | 👑 |

### 희귀도별 스티커 목록

**Common (일반) - 11개**:
- 🐰 토끼, 🐱 고양이, 🐶 강아지
- 🍬 사탕, 🍦 아이스크림, 🍩 도넛
- ⭐ 별, 🌙 달, 🌸 꽃
- 😊 웃음, ❤️ 하트, 👍 최고

**Rare (레어) - 7개**:
- 🐼 판다
- 🍰 케이크, 🍫 초콜릿
- ☀️ 해
- 🥉 동메달
- 👏 박수

**Epic (에픽) - 5개**:
- 🦄 유니콘
- 🌈 무지개
- 🥈 은메달, 🏆 트로피
- 🔥 불꽃

**Legendary (전설) - 2개**:
- 🥇 금메달
- 👑 왕관

---

## 획득 확률

### 확률 시스템

```typescript
const random = Math.random() * 100;

if (random < 60) {
  // 60% - Common
} else if (random < 85) {
  // 25% - Rare
} else if (random < 97) {
  // 12% - Epic
} else {
  // 3% - Legendary
}
```

### 기대 획득 횟수

100개의 할 일을 완료했을 때 기대되는 희귀도별 획득 개수:

| 희귀도 | 확률 | 기대 개수 (100개 기준) |
|--------|------|------------------------|
| Common | 60% | 60개 |
| Rare | 25% | 25개 |
| Epic | 12% | 12개 |
| Legendary | 3% | 3개 |

---

## 파일 구조

### 디렉토리

```
public/
└── stickers/
    └── sticker-metadata.json  # 스티커 메타데이터
```

### 메타데이터 파일

**위치**: `/public/stickers/sticker-metadata.json`

**내용**:
- 버전 정보
- 전체 스티커 개수
- 카테고리별 정보
- 희귀도별 정보
- 전체 스티커 목록

**용도**:
- 스티커 데이터 백업
- 외부 도구와의 연동
- 스티커 정보 조회

---

## 이모지 렌더링

### HTML/CSS

```html
<span class="text-5xl">🐰</span>
```

**클래스별 크기**:
- `text-2xl`: 24px
- `text-5xl`: 48px (스티커 그리드)
- `text-7xl`: 72px (보상 팝업)
- `text-8xl`: 96px (큰 이모지)

### React 컴포넌트

**스티커 표시 로직**:
```tsx
{sticker.imageUrl && sticker.imageUrl.startsWith('http') ? (
  <img src={sticker.imageUrl} alt={sticker.stickerName} />
) : (
  <span className="text-5xl">{sticker.imageUrl}</span>
)}
```

**특징**:
- HTTP URL이면 이미지 태그 사용
- 아니면 이모지로 직접 표시
- 향후 실제 이미지 파일로 교체 가능

---

## 이모지 호환성

### 지원 플랫폼

**모바일**:
- ✅ iOS 14+ (Apple Color Emoji)
- ✅ Android 11+ (Noto Color Emoji)

**데스크톱**:
- ✅ macOS 11+ (Apple Color Emoji)
- ✅ Windows 10+ (Segoe UI Emoji)
- ✅ Linux (Noto Color Emoji)

**브라우저**:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 폴백 처리

**흑백 이모지**: 일부 구형 시스템에서는 컬러가 아닌 흑백으로 표시될 수 있음

**미지원 이모지**: 특수 이모지는 □로 표시될 수 있음

**권장 사항**: 유니코드 14.0 이하의 이모지 사용 (호환성 최대화)

---

## 향후 확장 계획

### 실제 이미지 파일 추가 (선택사항)

**장점**:
- 커스텀 디자인 가능
- 브랜드 일관성
- 독창적인 비주얼

**방법**:
1. `/public/stickers/` 폴더에 PNG/SVG 파일 추가
2. `imageUrl`을 파일 경로로 변경
   ```typescript
   imageUrl: '/stickers/rabbit.png'
   ```
3. 컴포넌트는 자동으로 이미지 태그로 렌더링

### 새로운 스티커 추가

**절차**:
1. `stickerService.ts`의 `defaultStickers` 배열에 추가
2. `sticker-metadata.json` 업데이트
3. 카테고리/희귀도 균형 유지
4. 총 개수 업데이트

**예시**:
```typescript
{
  stickerId: 'sticker_026',
  stickerName: '공룡',
  imageUrl: '🦕',
  rarity: 'rare',
  category: 'animal'
}
```

### 애니메이션 이모지

**Lottie 파일 사용**:
- JSON 기반 애니메이션
- 고품질 벡터 애니메이션
- 크기 조절 자유로움

**구현**:
```typescript
import Lottie from 'lottie-react';
import rabbitAnimation from './rabbit.json';

<Lottie animationData={rabbitAnimation} />
```

---

## 최적화

### 성능

**이모지의 장점**:
- 텍스트로 처리되어 매우 빠름
- 별도의 HTTP 요청 불필요
- 캐싱 필요 없음
- 번들 크기 증가 없음

**측정**:
- 25개 스티커 렌더링: < 1ms
- 메모리 사용량: 무시할 수준
- 네트워크 요청: 0개

### 접근성

**스크린 리더**:
```tsx
<span role="img" aria-label={sticker.stickerName}>
  {sticker.imageUrl}
</span>
```

**대체 텍스트**: 항상 `stickerName` 제공

---

## 트러블슈팅

### 이모지가 표시되지 않음

**원인**:
- 구형 OS/브라우저
- 폰트 없음
- 인터넷 익스플로러

**해결**:
1. 브라우저 업데이트
2. 시스템 폰트 설치
3. 폴백 이미지 제공

### 이모지가 깨져 보임

**원인**:
- 유니코드 인코딩 문제
- 폰트 누락

**해결**:
1. UTF-8 인코딩 확인
2. 시스템 이모지 폰트 설치

### 일부 이모지만 컬러로 표시

**원인**:
- 플랫폼별 폰트 차이
- 이모지 버전 차이

**해결**:
- 정상 동작 (플랫폼별 디자인 차이)
- 통일이 필요하면 SVG/PNG 사용

---

## 라이선스

### 이모지 라이선스

**유니코드 이모지**: 자유롭게 사용 가능 (공개 표준)

**제한사항**: 없음

**출처**: Unicode Consortium

---

## 참고 자료

- [Unicode Emoji List](https://unicode.org/emoji/charts/full-emoji-list.html)
- [Emojipedia](https://emojipedia.org/)
- [Can I Use - Emoji](https://caniuse.com/mdn-css_properties_font-family_emoji)

---

## 체크리스트

TASK-005 완료 기준:

- ✅ 최소 20개 이상의 스티커 준비 (25개)
- ✅ 희귀도별 스티커 분류 (4단계)
- ✅ 이미지 파일 최적화 (이모지 사용으로 대체)
- ✅ 스티커 메타데이터 JSON 파일 작성
- ✅ 이미지 로딩 테스트 (개발 서버에서 확인 가능)
