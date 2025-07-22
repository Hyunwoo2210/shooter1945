import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export class MobileUI {
  private scene: Phaser.Scene;
  private touchIndicator?: Phaser.GameObjects.Graphics;
  private bombButton?: Phaser.GameObjects.Container;
  private controlsHelp?: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    
    if (this.isMobileDevice()) {
      this.createMobileUI();
    }
  }

  private createMobileUI(): void {
    // 터치 인디케이터 생성
    this.touchIndicator = this.scene.add.graphics();
    this.touchIndicator.setDepth(1000);

    // 폭탄 버튼 생성
    this.createBombButton();

    // 모바일 조작법 도움말
    this.createControlsHelp();
  }

  private createBombButton(): void {
    const x = GAME_CONFIG.WIDTH - 70;
    const y = GAME_CONFIG.HEIGHT - 70;

    // 컨테이너 생성
    this.bombButton = this.scene.add.container(x, y);

    // 버튼 배경
    const buttonBg = this.scene.add.circle(0, 0, 35, 0x333333, 0.8);
    const buttonBorder = this.scene.add.circle(0, 0, 35, 0xffffff, 0).setStrokeStyle(2, 0xffffff);

    // 폭탄 아이콘 (텍스트)
    const bombIcon = this.scene.add.text(0, 0, '💣', {
      fontSize: '24px',
      align: 'center'
    }).setOrigin(0.5);

    // 버튼에 요소들 추가
    this.bombButton.add([buttonBg, buttonBorder, bombIcon]);
    this.bombButton.setDepth(999);
    this.bombButton.setInteractive(new Phaser.Geom.Circle(0, 0, 35), Phaser.Geom.Circle.Contains);

    // 버튼 이벤트
    this.bombButton.on('pointerdown', () => {
      this.scene.events.emit('bomb-used');
      // 시각적 피드백
      this.scene.tweens.add({
        targets: buttonBg,
        scaleX: 0.8,
        scaleY: 0.8,
        duration: 100,
        yoyo: true
      });
    });

    this.bombButton.on('pointerover', () => {
      buttonBorder.setStrokeStyle(3, 0x00ff00);
    });

    this.bombButton.on('pointerout', () => {
      buttonBorder.setStrokeStyle(2, 0xffffff);
    });
  }

  private createControlsHelp(): void {
    this.controlsHelp = this.scene.add.text(10, GAME_CONFIG.HEIGHT - 120, 
      '📱 터치로 이동\n🔥 자동 사격\n💣 폭탄 버튼', {
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    }).setDepth(999).setAlpha(0.8);

    // 5초 후 사라지게
    this.scene.time.delayedCall(5000, () => {
      if (this.controlsHelp) {
        this.scene.tweens.add({
          targets: this.controlsHelp,
          alpha: 0,
          duration: 1000,
          onComplete: () => {
            this.controlsHelp?.destroy();
          }
        });
      }
    });
  }

  showTouchFeedback(x: number, y: number): void {
    if (!this.touchIndicator) return;

    this.touchIndicator.clear();
    this.touchIndicator.lineStyle(3, 0x00ff00, 0.8);
    this.touchIndicator.strokeCircle(x, y, 20);

    // 애니메이션 효과
    this.scene.tweens.add({
      targets: this.touchIndicator,
      alpha: { from: 1, to: 0 },
      duration: 300,
      onComplete: () => {
        this.touchIndicator?.clear();
      }
    });
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  destroy(): void {
    this.touchIndicator?.destroy();
    this.bombButton?.destroy();
    this.controlsHelp?.destroy();
  }
}
