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
    const width = 100; // 48에서 100으로 증가
    const height = 100; // 48에서 100으로 증가
    this.initCanvas(width, height);

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.save();

    switch (type) {
      case 1:
        // Red enemy fighter - 크기 3배 확대
        this.ctx.fillStyle = '#DC143C'; // Crimson
        this.ctx.fillRect(44, 19, 12, 62); // 크기 3배
        this.ctx.fillRect(25, 44, 50, 10); // 크기 3배
        this.ctx.fillStyle = '#8B0000'; // Dark red
        this.ctx.fillRect(46, 25, 6, 19); // 크기 3배
        break;

      case 2:
        // Green bomber - 크기 3배 확대
        this.ctx.fillStyle = '#228B22'; // Forest green
        this.ctx.fillRect(37, 19, 25, 62); // 크기 3배
        this.ctx.fillRect(19, 44, 62, 12); // 크기 3배
        this.ctx.fillStyle = '#006400'; // Dark green
        this.ctx.fillRect(44, 25, 12, 25); // 크기 3배
        break;

      case 3:
        // Purple interceptor - 크기 3배 확대
        this.ctx.fillStyle = '#8A2BE2'; // Blue violet
        this.ctx.fillRect(46, 19, 6, 62); // 크기 3배
        this.ctx.fillRect(31, 44, 37, 6); // 크기 3배
        this.ctx.fillStyle = '#4B0082'; // Indigo
        this.ctx.fillRect(44, 25, 12, 12); // 크기 3배
        break;

      case 4:
        // Orange heavy fighter - 크기 3배 확대
        this.ctx.fillStyle = '#FF8C00'; // Dark orange
        this.ctx.fillRect(40, 19, 19, 62); // 크기 3배
        this.ctx.fillRect(21, 44, 56, 12); // 크기 3배
        this.ctx.fillStyle = '#FF4500'; // Red orange
        this.ctx.fillRect(44, 25, 12, 25); // 크기 3배
        break;

      case 5:
        // Black stealth fighter - 크기 3배 확대
        this.ctx.fillStyle = '#2F4F4F'; // Dark slate gray
        this.ctx.fillRect(44, 19, 12, 62); // 크기 3배
        this.ctx.fillRect(27, 44, 44, 10); // 크기 3배
        this.ctx.fillStyle = '#000000'; // Black
        this.ctx.fillRect(46, 25, 6, 19); // 크기 3배
        break;

      case 6:
        // Silver scout fighter - 크기 3배 확대
        this.ctx.fillStyle = '#C0C0C0'; // Silver
        this.ctx.fillRect(44, 19, 12, 62); // 크기 3배
        this.ctx.fillRect(25, 44, 50, 8); // 크기 3배
        this.ctx.fillStyle = '#808080'; // Gray
        this.ctx.fillRect(46, 25, 6, 15); // 크기 3배
        break;

      case 7:
        // Gold assault fighter - 크기 3배 확대
        this.ctx.fillStyle = '#FFD700'; // Gold
        this.ctx.fillRect(40, 19, 19, 62); // 크기 3배
        this.ctx.fillRect(22, 44, 54, 10); // 크기 3배
        this.ctx.fillStyle = '#FFA500'; // Orange
        this.ctx.fillRect(44, 25, 12, 20); // 크기 3배
        break;
    }

    this.ctx.restore();

    return this.canvas.toDataURL();
  }

  static generateBossPlane(type: number): string {
    let width = 150; // 기본 보스 크기
    let height = 150;
    
    // boss2는 더 큰 사이즈
    if (type === 2) {
      width = 250;
      height = 250;
    }
    
    this.initCanvas(width, height);

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.save();

    switch (type) {
      case 1:
        // Boss 1 - Massive Red Destroyer
        this.ctx.fillStyle = '#8B0000'; // Dark red
        this.ctx.fillRect(65, 30, 20, 90); // Main fuselage
        this.ctx.fillRect(30, 65, 90, 20); // Wings
        this.ctx.fillRect(20, 70, 15, 10); // Wing extensions
        this.ctx.fillRect(115, 70, 15, 10);
        this.ctx.fillStyle = '#DC143C'; // Crimson details
        this.ctx.fillRect(70, 35, 10, 30); // Cockpit area
        this.ctx.fillRect(60, 75, 30, 8); // Engine details
        break;

      case 2:
        // Boss 2 - Massive Green Battleship (250x250 크기)
        this.ctx.fillStyle = '#006400'; // Dark green
        this.ctx.fillRect(100, 50, 50, 150); // Main fuselage (크기 확대)
        this.ctx.fillRect(42, 108, 166, 42); // Wings (크기 확대)
        this.ctx.fillRect(25, 120, 33, 18); // Wing extensions (크기 확대)
        this.ctx.fillRect(192, 120, 33, 18);
        this.ctx.fillStyle = '#228B22'; // Forest green details
        this.ctx.fillRect(112, 58, 26, 58); // Cockpit area (크기 확대)
        this.ctx.fillRect(92, 130, 66, 17); // Engine details (크기 확대)
        break;
    }

    this.ctx.restore();

    return this.canvas.toDataURL();
  }
}
