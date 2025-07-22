import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class Bomb extends Phaser.Physics.Arcade.Sprite {
  private explosionRadius: number = 150;
  private isExploding: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bomb');
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set properties
    this.setScale(1.5);
    
    // Set physics properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(400); // Fast falling speed
    body.setSize(20, 30);
  }

  update(): void {
    // Explode when reaching bottom 1/3 of screen or when hitting ground
    if (this.y > GAME_CONFIG.HEIGHT * 0.7 && !this.isExploding) {
      this.explode();
    }
    
    // Remove if off screen
    if (this.y > GAME_CONFIG.HEIGHT + 50) {
      this.destroy();
    }
  }

  private explode(): void {
    if (this.isExploding) return;
    
    this.isExploding = true;
    
    // Create massive explosion effect
    this.scene.events.emit('bomb-exploded', this.x, this.y, this.explosionRadius);
    
    // Visual explosion effect
    const explosionEffect = this.scene.add.circle(this.x, this.y, 10, 0xffffff, 0.8);
    
    // Expand explosion
    this.scene.tweens.add({
      targets: explosionEffect,
      radius: this.explosionRadius,
      alpha: 0,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        explosionEffect.destroy();
      }
    });
    
    // Screen shake
    this.scene.cameras.main.shake(800, 0.02);
    
    // Destroy the bomb
    this.destroy();
  }

  getExplosionRadius(): number {
    return this.explosionRadius;
  }
}
