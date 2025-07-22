import Phaser from 'phaser';
import { GAME_CONFIG, KEYS } from '../config/GameConfig';
import MobileControls from '../utils/MobileControls';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: any;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private lastFireTime: number = 0;
  private health: number;
  private mobileControls?: MobileControls;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set properties
    this.health = GAME_CONFIG.PLAYER.HEALTH;
    
    // Set player sprite size (remove tint since we're using actual sprite)
    this.setDisplaySize(40, 40);
    
    // Set physics properties
    (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    (this.body as Phaser.Physics.Arcade.Body).setSize(30, 30);
    
    // Setup input
    this.setupInput();
    
    // Setup mobile controls
    this.mobileControls = new MobileControls(scene, this);
  }
  
  private setupInput(): void {
    // Arrow keys
    this.cursors = this.scene.input.keyboard!.createCursorKeys();
    
    // WASD keys
    this.wasdKeys = this.scene.input.keyboard!.addKeys({
      up: KEYS.W,
      down: KEYS.S,
      left: KEYS.A,
      right: KEYS.D
    });
    
    // Space key for shooting
    this.spaceKey = this.scene.input.keyboard!.addKey(KEYS.SPACE);
  }
  
  update(time: number): void {
    this.handleMovement();
    this.handleShooting(time);
    
    // Update mobile controls
    if (this.mobileControls) {
      this.mobileControls.update(time);
    }
  }
  
  private handleMovement(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    
    // Only handle keyboard movement if not controlled by mobile touch
    if (!this.isMobileDevice() || !this.isTouchControlled()) {
      // Reset velocity
      body.setVelocity(0);
      
      // Handle horizontal movement
      if (this.cursors.left.isDown || this.wasdKeys.left.isDown) {
        body.setVelocityX(-GAME_CONFIG.PLAYER.SPEED);
      } else if (this.cursors.right.isDown || this.wasdKeys.right.isDown) {
        body.setVelocityX(GAME_CONFIG.PLAYER.SPEED);
      }
      
      // Handle vertical movement
      if (this.cursors.up.isDown || this.wasdKeys.up.isDown) {
        body.setVelocityY(-GAME_CONFIG.PLAYER.SPEED);
      } else if (this.cursors.down.isDown || this.wasdKeys.down.isDown) {
        body.setVelocityY(GAME_CONFIG.PLAYER.SPEED);
      }
    }
  }
  
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  private isTouchControlled(): boolean {
    // Check if mobile controls are active
    return this.mobileControls && this.mobileControls.isActive();
  }
  
  private handleShooting(time: number): void {
    if (this.spaceKey.isDown && time - this.lastFireTime > GAME_CONFIG.PLAYER.FIRE_RATE) {
      this.fire();
      this.lastFireTime = time;
    }
  }
  
  private fire(): void {
    // Emit custom event for bullet creation
    this.scene.events.emit('player-shoot', this.x, this.y - 20);
  }
  
  takeDamage(): boolean {
    this.health--;
    
    // Flash effect
    this.setTint(0xff0000);
    this.scene.time.delayedCall(100, () => {
      this.clearTint(); // Use clearTint() instead of setting a specific color
    });
    
    return this.health <= 0;
  }
  
  getHealth(): number {
    return this.health;
  }
}
