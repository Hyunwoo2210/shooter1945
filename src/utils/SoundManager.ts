import { SoundGenerator } from '../utils/SoundGenerator';

export default class SoundManager {
  private static instance: SoundManager;
  private shootSound?: AudioBuffer;
  private explosionSound?: AudioBuffer;
  private backgroundMusic?: AudioBuffer;
  private backgroundMusicSource?: AudioBufferSourceNode;
  private isBackgroundMusicPlaying: boolean = false;
  private volume: number = 0.3;

  private constructor() {
    this.initializeSounds();
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private async initializeSounds(): Promise<void> {
    try {
      // Generate all sound effects
      this.shootSound = SoundGenerator.generateShootSound();
      this.explosionSound = SoundGenerator.generateExplosionSound();
      this.backgroundMusic = SoundGenerator.generateBackgroundMusic();
      
      console.log('Sounds initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize sounds:', error);
    }
  }

  playShootSound(): void {
    if (this.shootSound) {
      SoundGenerator.playSound(this.shootSound, this.volume * 0.5);
    }
  }

  playExplosionSound(): void {
    if (this.explosionSound) {
      SoundGenerator.playSound(this.explosionSound, this.volume * 0.8);
    }
  }

  startBackgroundMusic(): void {
    if (this.backgroundMusic && !this.isBackgroundMusicPlaying) {
      this.playBackgroundMusicLoop();
      this.isBackgroundMusicPlaying = true;
    }
  }

  stopBackgroundMusic(): void {
    if (this.backgroundMusicSource) {
      this.backgroundMusicSource.stop();
      this.isBackgroundMusicPlaying = false;
    }
  }

  private playBackgroundMusicLoop(): void {
    if (!this.backgroundMusic) return;

    const ctx = (SoundGenerator as any).getAudioContext();
    this.backgroundMusicSource = ctx.createBufferSource();
    const gainNode = ctx.createGain();

    this.backgroundMusicSource.buffer = this.backgroundMusic;
    this.backgroundMusicSource.loop = true;
    gainNode.gain.value = this.volume * 0.3; // Quieter background music

    this.backgroundMusicSource.connect(gainNode);
    gainNode.connect(ctx.destination);

    this.backgroundMusicSource.start();
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.volume;
  }
}
