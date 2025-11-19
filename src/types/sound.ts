/**
 * 사운드 관련 타입 정의
 */

export type SoundType = 'complete' | 'reward' | 'click' | 'error';

export interface SoundSettings {
  enabled: boolean;
  volume: number; // 0.0 ~ 1.0
}
