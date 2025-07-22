import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  private isPlayerBullet: boolean;
  
  constructor(scene: Phaser.Scene, x: number, y: number, isPlayerBullet: boolean = true) {
    super(scene, x, y, 'bullet');
    
    this.isPlayerBullet = isPlayerBullet;
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Create bullet visual
    this.setDisplaySize(6, 12);
    this.setTint(isPlayerBullet ? GAME_CONFIG.COLORS.BULLET_PLAYER : GAME_CONFIG.COLORS.BULLET_ENEMY);
    
    // Set physics properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(4, 8);
    
    // Set velocity based on bullet type
    const speed = isPlayerBullet ? -GAME_CONFIG.BULLET.SPEED : GAME_CONFIG.BULLET.ENEMY_SPEED;
    body.setVelocityY(speed);
  }
  
  update(): void {
    // Remove bullet if it goes off screen
    if (this.y < -20 || this.y > GAME_CONFIG.HEIGHT + 20) {
      this.destroy();
    }
  }
  
  getIsPlayerBullet(): boolean {
    return this.isPlayerBullet;
  }
}
