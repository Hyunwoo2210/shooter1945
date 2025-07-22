import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class UIManager {
  private scene: Phaser.Scene;
  private scoreText!: Phaser.GameObjects.Text;
  private healthText!: Phaser.GameObjects.Text;
  private gameOverText!: Phaser.GameObjects.Text;
  private score: number = 0;
  private health: number = GAME_CONFIG.PLAYER.HEALTH;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createUI();
  }
  
  private createUI(): void {
    // Score display
    this.scoreText = this.scene.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    this.scoreText.setDepth(1000);
    
    // Health display
    this.healthText = this.scene.add.text(16, 50, `Health: ${this.health}`, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    this.healthText.setDepth(1000);
    
    // Mobile controls hint (if on mobile)
    if (this.isMobileDevice()) {
      const controlsText = this.scene.add.text(
        GAME_CONFIG.WIDTH / 2, 
        GAME_CONFIG.HEIGHT - 40,
        'Tap to move and shoot',
        {
          fontSize: '16px',
          color: '#cccccc',
          fontFamily: 'Arial'
        }
      );
      controlsText.setOrigin(0.5);
      controlsText.setDepth(1000);
    } else {
      // PC controls hint
      const controlsText = this.scene.add.text(
        GAME_CONFIG.WIDTH / 2,
        GAME_CONFIG.HEIGHT - 40,
        'WASD/Arrow Keys to move, SPACE to shoot',
        {
          fontSize: '14px',
          color: '#cccccc',
          fontFamily: 'Arial'
        }
      );
      controlsText.setOrigin(0.5);
      controlsText.setDepth(1000);
    }
  }
  
  updateScore(newScore: number): void {
    this.score = newScore;
    this.scoreText.setText(`Score: ${this.score}`);
  }
  
  updateHealth(newHealth: number): void {
    this.health = newHealth;
    this.healthText.setText(`Health: ${this.health}`);
    
    // Change color based on health
    if (this.health <= 1) {
      this.healthText.setColor('#ff0000');
    } else if (this.health <= 2) {
      this.healthText.setColor('#ffaa00');
    } else {
      this.healthText.setColor('#ffffff');
    }
  }
  
  showGameOver(finalScore: number): void {
    // Semi-transparent overlay
    const overlay = this.scene.add.rectangle(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2,
      GAME_CONFIG.WIDTH,
      GAME_CONFIG.HEIGHT,
      0x000000,
      0.7
    );
    overlay.setDepth(2000);
    
    // Game Over text
    this.gameOverText = this.scene.add.text(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2 - 50,
      'GAME OVER',
      {
        fontSize: '48px',
        color: '#ff0000',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }
    );
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setDepth(2001);
    
    // Final score
    const finalScoreText = this.scene.add.text(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2 + 20,
      `Final Score: ${finalScore}`,
      {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }
    );
    finalScoreText.setOrigin(0.5);
    finalScoreText.setDepth(2001);
    
    // Restart instruction
    const restartText = this.scene.add.text(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2 + 80,
      'Press R to Restart',
      {
        fontSize: '20px',
        color: '#cccccc',
        fontFamily: 'Arial'
      }
    );
    restartText.setOrigin(0.5);
    restartText.setDepth(2001);
  }
  
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
