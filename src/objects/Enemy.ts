import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private lastFireTime: number = 0;
  private health: number = 1;
  private enemyType: string;
  
  constructor(scene: Phaser.Scene, x: number, y: number, enemyType?: string) {
    // Choose random enemy type if not specified
    const enemyTypes = ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5'];
    const selectedType = enemyType || enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    super(scene, x, y, selectedType);
    this.enemyType = selectedType;
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set enemy sprite size (remove tint since we're using actual images)
    this.setDisplaySize(100, 100); // 32에서 100으로 증가
    
    // Set physics properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(80, 80); // 충돌 박스도 크기에 맞게 조정
    body.setVelocityY(GAME_CONFIG.ENEMY.SPEED);
    
    // Random fire timing
    this.lastFireTime = Date.now() + Math.random() * GAME_CONFIG.ENEMY.FIRE_RATE;
  }
  
  update(time: number): void {
    // Auto-fire
    if (time - this.lastFireTime > GAME_CONFIG.ENEMY.FIRE_RATE) {
      this.fire();
      this.lastFireTime = time;
    }
    
    // Remove if out of bounds
    if (this.y > GAME_CONFIG.HEIGHT + 50) {
      this.destroy();
    }
  }
  
  private fire(): void {
    // Only fire if player is roughly in range
    if (this.y > -50 && this.y < GAME_CONFIG.HEIGHT / 2) {
      this.scene.events.emit('enemy-shoot', this.x, this.y + 20);
    }
  }
  
  takeDamage(): boolean {
    this.health--;
    
    if (this.health <= 0) {
      // Emit score event
      this.scene.events.emit('enemy-destroyed', 100);
      
      // Simple destruction effect
      this.setTint(0xffffff);
      this.scene.time.delayedCall(50, () => {
        this.destroy();
      });
      
      return true;
    }
    
    return false;
  }
}
