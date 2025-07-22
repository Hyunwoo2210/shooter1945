export const GAME_CONFIG = {
  WIDTH: 480,
  HEIGHT: 800,
  
  PLAYER: {
    SPEED: 200,
    HEALTH: 3,
    FIRE_RATE: 150, // milliseconds - 더 빠른 발사
  },
  
  ENEMY: {
    SPEED: 60, // 100에서 60으로 감소 (40% 속도 감소)
    SPAWN_RATE: 1000, // milliseconds - 더 빠르게 생성
    FIRE_RATE: 1500,
  },
  
  BULLET: {
    SPEED: 300,
    ENEMY_SPEED: 150,
  },
  
  COLORS: {
    PLAYER: 0x00ff00,
    ENEMY: 0xff0000,
    BULLET_PLAYER: 0xffff00,
    BULLET_ENEMY: 0xff4444,
    BACKGROUND: 0x001122,
  },
} as const;

export const KEYS = {
  W: 'W',
  A: 'A',
  S: 'S',
  D: 'D',
  SPACE: 'SPACE',
  ARROW_UP: 'UP',
  ARROW_DOWN: 'DOWN',
  ARROW_LEFT: 'LEFT',
  ARROW_RIGHT: 'RIGHT',
} as const;
