import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class ScrollingBackground {
  private scene: Phaser.Scene;
  private backgrounds: Phaser.GameObjects.TileSprite[] = [];
  private scrollSpeed: number = 50;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createBackground();
  }
  
  private createBackground(): void {
    // Create a simple gradient background using Graphics
    const graphics = this.scene.add.graphics();
    
    // Create gradient from dark blue to lighter blue
    const gradient = graphics.fillGradientStyle(
      0x000033, 0x000033, 0x001155, 0x001155, 1
    );
    
    graphics.fillRect(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);
    
    // Create stars for background effect
    this.createStars();
  }
  
  private createStars(): void {
    for (let i = 0; i < 50; i++) {
      const star = this.scene.add.circle(
        Math.random() * GAME_CONFIG.WIDTH,
        Math.random() * GAME_CONFIG.HEIGHT,
        Math.random() * 2 + 1,
        0xffffff,
        Math.random() * 0.8 + 0.2
      );
      
      // Add random twinkling
      this.scene.tweens.add({
        targets: star,
        alpha: 0.1,
        duration: 1000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }
  
  update(time: number, delta: number): void {
    // Stars already handle their own animation
    // Could add scrolling clouds or other background elements here
  }
}
