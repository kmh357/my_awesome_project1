/**
 * 앱 초기화 서비스
 * 앱 최초 실행 시 필요한 모든 데이터를 초기화합니다.
 */

import { initializeDefaultStickers } from './stickerService';
import { initializeUser } from './userService';

/**
 * 앱 초기화 함수
 * 앱 시작 시 한 번 호출되어야 합니다.
 */
export function initializeApp(): void {
  console.log('[InitService] 앱 초기화 시작...');

  // 1. 기본 스티커 데이터 초기화
  initializeDefaultStickers();
  console.log('[InitService] ✅ 스티커 데이터 초기화 완료');

  // 2. 사용자 초기화 (없으면 기본 사용자 생성)
  const user = initializeUser('친구');
  console.log('[InitService] ✅ 사용자 초기화 완료:', user.userName);

  console.log('[InitService] 🎉 앱 초기화 완료!');
}
