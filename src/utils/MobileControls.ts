import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';

export default class MobileControls {
  private scene: Phaser.Scene;
  private touchArea!: Phaser.GameObjects.Rectangle;
  private player: any;
  private isTouch: boolean = false;
  private lastFireTime: number = 0;
  
  constructor(scene: Phaser.Scene, player: any) {
    this.scene = scene;
    this.player = player;
    
    if (this.isMobileDevice()) {
      this.setupTouchControls();
    }
  }
  
  private setupTouchControls(): void {
    // Create invisible touch area
    this.touchArea = this.scene.add.rectangle(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2,
      GAME_CONFIG.WIDTH,
      GAME_CONFIG.HEIGHT,
      0x000000,
      0
    );
    
    this.touchArea.setInteractive();
    this.touchArea.setDepth(-1);
    
    // Touch events
    this.touchArea.on('pointerdown', this.handleTouchStart, this);
    this.touchArea.on('pointermove', this.handleTouchMove, this);
    this.touchArea.on('pointerup', this.handleTouchEnd, this);
  }
  
  private handleTouchStart(pointer: Phaser.Input.Pointer): void {
    this.isTouch = true;
    this.movePlayerToTouch(pointer);
  }
  
  private handleTouchMove(pointer: Phaser.Input.Pointer): void {
    if (this.isTouch) {
      this.movePlayerToTouch(pointer);
    }
  }
  
  private handleTouchEnd(): void {
    this.isTouch = false;
  }
  
  private movePlayerToTouch(pointer: Phaser.Input.Pointer): void {
    if (!this.player) return;
    
    // Get touch position
    const touchX = pointer.x;
    const touchY = pointer.y;
    
    // Move player towards touch position
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    
    // Calculate direction
    const deltaX = touchX - this.player.x;
    const deltaY = touchY - this.player.y;
    
    // Normalize and apply speed
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > 10) { // Dead zone
      const normalizedX = (deltaX / distance) * GAME_CONFIG.PLAYER.SPEED;
      const normalizedY = (deltaY / distance) * GAME_CONFIG.PLAYER.SPEED;
      
      playerBody.setVelocity(normalizedX, normalizedY);
    } else {
      playerBody.setVelocity(0, 0);
    }
  }
  
  update(time: number): void {
    // Auto-fire for mobile
    if (this.isMobileDevice() && this.isTouch) {
      if (time - this.lastFireTime > GAME_CONFIG.PLAYER.FIRE_RATE) {
        this.scene.events.emit('player-shoot', this.player.x, this.player.y - 20);
        this.lastFireTime = time;
      }
    }
  }
  
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
