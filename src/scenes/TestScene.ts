import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene' });
  }

  preload(): void {
    console.log('TestScene preload started');
    
    // Create a simple colored rectangle for testing
    this.add.graphics()
      .fillStyle(0x00ff00)
      .fillRect(0, 0, 32, 32)
      .generateTexture('player', 32, 32);
      
    this.add.graphics()
      .fillStyle(0xff0000)
      .fillRect(0, 0, 32, 32)
      .generateTexture('enemy', 32, 32);
  }

  create(): void {
    console.log('TestScene create started');
    
    // Add a simple background
    this.add.rectangle(
      GAME_CONFIG.WIDTH / 2, 
      GAME_CONFIG.HEIGHT / 2, 
      GAME_CONFIG.WIDTH, 
      GAME_CONFIG.HEIGHT, 
      0x001122
    );
    
    // Add some text
    this.add.text(GAME_CONFIG.WIDTH / 2, 100, '🚀 1945 SHOOTER TEST 🚀', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    // Add player sprite
    const player = this.add.sprite(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 100, 'player');
    player.setScale(2);
    
    // Add enemy sprite
    const enemy = this.add.sprite(GAME_CONFIG.WIDTH / 2, 100, 'enemy');
    enemy.setScale(2);
    
    // Add some movement
    this.tweens.add({
      targets: enemy,
      x: enemy.x + 100,
      duration: 2000,
      yoyo: true,
      repeat: -1
    });
    
    console.log('TestScene setup complete');
  }
}
