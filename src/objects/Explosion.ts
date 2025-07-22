import Phaser from 'phaser';

export default class Explosion extends Phaser.GameObjects.Sprite {
  private animationFrames: string[] = [];
  private currentFrame: number = 0;
  private frameRate: number = 60; // ms per frame
  private lastFrameTime: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, frames: string[]) {
    super(scene, x, y, '');
    
    this.animationFrames = frames;
    this.setDepth(100); // Above other objects
    
    // Add to scene
    scene.add.existing(this);
    
    // Create textures for each frame
    this.animationFrames.forEach((frameData, index) => {
      const img = new Image();
      img.onload = () => {
        scene.textures.addImage(`explosion_frame_${index}`, img);
        if (index === 0) {
          this.setTexture(`explosion_frame_0`);
        }
      };
      img.src = frameData;
    });
    
    this.lastFrameTime = Date.now();
  }

  update(): void {
    const now = Date.now();
    
    if (now - this.lastFrameTime > this.frameRate) {
      this.currentFrame++;
      
      if (this.currentFrame < this.animationFrames.length) {
        this.setTexture(`explosion_frame_${this.currentFrame}`);
        this.lastFrameTime = now;
      } else {
        // Animation finished, destroy explosion
        this.destroy();
      }
    }
  }

  static create(scene: Phaser.Scene, x: number, y: number, frames: string[]): Explosion {
    return new Explosion(scene, x, y, frames);
  }
}
