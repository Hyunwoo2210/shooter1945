import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export class PlaneGenerator {
  private static canvas: HTMLCanvasElement;
  private static ctx: CanvasRenderingContext2D;

  private static initCanvas(width: number, height: number): void {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  static generatePlayerPlane(): string {
    const width = 40;
    const height = 40;
    this.initCanvas(width, height);

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Player plane (blue fighter jet pointing up)
    this.ctx.save();

    // Main fuselage
    this.ctx.fillStyle = '#2E86AB'; // Blue
    this.ctx.fillRect(17, 8, 6, 25);

    // Wings
    this.ctx.fillStyle = '#1E5F74'; // Darker blue
    this.ctx.fillRect(8, 18, 24, 4);

    // Wing tips
    this.ctx.fillRect(6, 20, 4, 2);
    this.ctx.fillRect(30, 20, 4, 2);

    // Cockpit
    this.ctx.fillStyle = '#87CEEB'; // Light blue
    this.ctx.fillRect(18, 10, 4, 8);

    // Nose
    this.ctx.fillStyle = '#2E86AB';
    this.ctx.fillRect(19, 5, 2, 3);

    // Engine exhausts
    this.ctx.fillStyle = '#FF6B35'; // Orange
    this.ctx.fillRect(16, 30, 2, 4);
    this.ctx.fillRect(22, 30, 2, 4);

    // Add some details
    this.ctx.fillStyle = '#FFFFFF'; // White
    this.ctx.fillRect(19, 12, 2, 1); // Cockpit highlight
    
    this.ctx.restore();

    return this.canvas.toDataURL();
  }

  static generateEnemyPlane(type: number): string {
    const width = 32;
    const height = 32;
    this.initCanvas(width, height);

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.save();

    switch (type) {
      case 1:
        // Red enemy fighter
        this.ctx.fillStyle = '#DC143C'; // Crimson
        this.ctx.fillRect(14, 6, 4, 20);
        this.ctx.fillRect(8, 14, 16, 3);
        this.ctx.fillStyle = '#8B0000'; // Dark red
        this.ctx.fillRect(15, 8, 2, 6);
        break;

      case 2:
        // Green bomber
        this.ctx.fillStyle = '#228B22'; // Forest green
        this.ctx.fillRect(12, 6, 8, 20);
        this.ctx.fillRect(6, 14, 20, 4);
        this.ctx.fillStyle = '#006400'; // Dark green
        this.ctx.fillRect(14, 8, 4, 8);
        break;

      case 3:
        // Purple interceptor
        this.ctx.fillStyle = '#8A2BE2'; // Blue violet
        this.ctx.fillRect(15, 6, 2, 20);
        this.ctx.fillRect(10, 14, 12, 2);
        this.ctx.fillStyle = '#4B0082'; // Indigo
        this.ctx.fillRect(14, 8, 4, 4);
        break;

      case 4:
        // Orange heavy fighter
        this.ctx.fillStyle = '#FF8C00'; // Dark orange
        this.ctx.fillRect(13, 6, 6, 20);
        this.ctx.fillRect(7, 14, 18, 4);
        this.ctx.fillStyle = '#FF4500'; // Red orange
        this.ctx.fillRect(14, 8, 4, 8);
        break;

      case 5:
        // Black stealth fighter
        this.ctx.fillStyle = '#2F4F4F'; // Dark slate gray
        this.ctx.fillRect(14, 6, 4, 20);
        this.ctx.fillRect(9, 14, 14, 3);
        this.ctx.fillStyle = '#000000'; // Black
        this.ctx.fillRect(15, 8, 2, 6);
        break;
    }

    this.ctx.restore();

    return this.canvas.toDataURL();
  }
}
