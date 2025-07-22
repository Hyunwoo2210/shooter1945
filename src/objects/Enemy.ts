import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private lastFireTime: number = 0;
  private health: number = 1;
  private maxHealth: number = 1;
  private enemyType: string;
  private isBoss: boolean = false;
  
  constructor(scene: Phaser.Scene, x: number, y: number, enemyType?: string) {
    // Choose random enemy type if not specified
    const enemyTypes = ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6', 'enemy7'];
    const selectedType = enemyType || enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    super(scene, x, y, selectedType);
    this.enemyType = selectedType;
    
    // Check if this is a boss
    this.isBoss = selectedType.startsWith('boss');
    
    // Set health based on enemy type
    if (this.isBoss) {
      this.health = 30; // 5에서 30으로 증가
      this.maxHealth = 30;
    } else {
      this.health = 1;
      this.maxHealth = 1;
    }
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set enemy sprite size based on type
    if (this.isBoss) {
      this.setDisplaySize(150, 150); // 보스 크기
    } else {
      this.setDisplaySize(100, 100); // 일반 적 크기
    }
    
    // Set physics properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    if (this.isBoss) {
      body.setSize(120, 120); // 보스 충돌 박스
      body.setVelocityY(GAME_CONFIG.ENEMY.SPEED * 0.5); // 보스는 더 느리게
    } else {
      body.setSize(80, 80); // 일반 적 충돌 박스
      body.setVelocityY(GAME_CONFIG.ENEMY.SPEED);
    }
    
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
    
    // Visual damage feedback for bosses
    if (this.isBoss) {
      // Show damage with red tint
      this.setTint(0xff6666);
      this.scene.time.delayedCall(100, () => {
        this.clearTint();
      });
    }
    
    if (this.health <= 0) {
      // Emit score event - bosses give more points
      const points = this.isBoss ? 1500 : 100; // 보스 점수를 500에서 1500으로 증가
      this.scene.events.emit('enemy-destroyed', points);
      
      // Destruction effect
      this.setTint(0xffffff);
      this.scene.time.delayedCall(50, () => {
        this.destroy();
      });
      
      return true;
    }
    
    return false;
  }
}
