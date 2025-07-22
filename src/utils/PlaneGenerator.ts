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
    const width = 60; // 40에서 60으로 증가
    const height = 60; // 40에서 60으로 증가
    this.initCanvas(width, height);

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Player plane (blue fighter jet pointing up) - 크기 1.5배 확대
    this.ctx.save();

    // Main fuselage
    this.ctx.fillStyle = '#2E86AB'; // Blue
    this.ctx.fillRect(26, 12, 9, 38); // 크기 1.5배

    // Wings
    this.ctx.fillStyle = '#1E5F74'; // Darker blue
    this.ctx.fillRect(12, 27, 36, 6); // 크기 1.5배

    // Wing tips
    this.ctx.fillRect(9, 30, 6, 3); // 크기 1.5배
    this.ctx.fillRect(45, 30, 6, 3); // 크기 1.5배

    // Cockpit
    this.ctx.fillStyle = '#87CEEB'; // Light blue
    this.ctx.fillRect(27, 15, 6, 12); // 크기 1.5배

    // Nose
    this.ctx.fillStyle = '#2E86AB';
    this.ctx.fillRect(28, 8, 3, 4); // 크기 1.5배

    // Engine exhausts
    this.ctx.fillStyle = '#FF6B35'; // Orange
    this.ctx.fillRect(24, 45, 3, 6); // 크기 1.5배
    this.ctx.fillRect(33, 45, 3, 6); // 크기 1.5배

    // Add some details
    this.ctx.fillStyle = '#FFFFFF'; // White
    this.ctx.fillRect(28, 18, 3, 2); // 크기 1.5배 - Cockpit highlight
    
    this.ctx.restore();

    return this.canvas.toDataURL();
  }

  static generateEnemyPlane(type: number): string {
    const width = 48; // 32에서 48로 증가
    const height = 48; // 32에서 48로 증가
    this.initCanvas(width, height);

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.save();

    switch (type) {
      case 1:
        // Red enemy fighter - 크기 1.5배 확대
        this.ctx.fillStyle = '#DC143C'; // Crimson
        this.ctx.fillRect(21, 9, 6, 30); // 크기 1.5배
        this.ctx.fillRect(12, 21, 24, 5); // 크기 1.5배
        this.ctx.fillStyle = '#8B0000'; // Dark red
        this.ctx.fillRect(22, 12, 3, 9); // 크기 1.5배
        break;

      case 2:
        // Green bomber - 크기 1.5배 확대
        this.ctx.fillStyle = '#228B22'; // Forest green
        this.ctx.fillRect(18, 9, 12, 30); // 크기 1.5배
        this.ctx.fillRect(9, 21, 30, 6); // 크기 1.5배
        this.ctx.fillStyle = '#006400'; // Dark green
        this.ctx.fillRect(21, 12, 6, 12); // 크기 1.5배
        break;

      case 3:
        // Purple interceptor - 크기 1.5배 확대
        this.ctx.fillStyle = '#8A2BE2'; // Blue violet
        this.ctx.fillRect(22, 9, 3, 30); // 크기 1.5배
        this.ctx.fillRect(15, 21, 18, 3); // 크기 1.5배
        this.ctx.fillStyle = '#4B0082'; // Indigo
        this.ctx.fillRect(21, 12, 6, 6); // 크기 1.5배
        break;

      case 4:
        // Orange heavy fighter - 크기 1.5배 확대
        this.ctx.fillStyle = '#FF8C00'; // Dark orange
        this.ctx.fillRect(19, 9, 9, 30); // 크기 1.5배
        this.ctx.fillRect(10, 21, 27, 6); // 크기 1.5배
        this.ctx.fillStyle = '#FF4500'; // Red orange
        this.ctx.fillRect(21, 12, 6, 12); // 크기 1.5배
        break;

      case 5:
        // Black stealth fighter - 크기 1.5배 확대
        this.ctx.fillStyle = '#2F4F4F'; // Dark slate gray
        this.ctx.fillRect(21, 9, 6, 30); // 크기 1.5배
        this.ctx.fillRect(13, 21, 21, 5); // 크기 1.5배
        this.ctx.fillStyle = '#000000'; // Black
        this.ctx.fillRect(22, 12, 3, 9); // 크기 1.5배
        break;
    }

    this.ctx.restore();

    return this.canvas.toDataURL();
  }
}
