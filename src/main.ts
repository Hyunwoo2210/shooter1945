import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import { GAME_CONFIG } from './config/GameConfig';
import './style.css';

console.log('Starting 1945 Shooter Game...');

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.WIDTH,
  height: GAME_CONFIG.HEIGHT,
  parent: 'app',
  backgroundColor: GAME_CONFIG.COLORS.BACKGROUND,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [MainScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT
  }
};

console.log('Phaser config:', config);

// Initialize the game
const game = new Phaser.Game(config);

console.log('Game initialized:', game);

// Handle window resize for responsive design
window.addEventListener('resize', () => {
  game.scale.refresh();
});

export default game;
