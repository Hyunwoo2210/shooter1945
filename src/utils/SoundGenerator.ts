export class SoundGenerator {
  private static audioContext: AudioContext;
  
  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  static generateShootSound(): AudioBuffer {
    const ctx = this.getAudioContext();
    const length = ctx.sampleRate * 0.1; // 0.1 seconds
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      // Laser-like sound
      const freq = 800 * (1 - t * 2);
      const noise = (Math.random() - 0.5) * 0.1;
      data[i] = Math.sin(freq * t * Math.PI * 2) * (1 - t) * 0.3 + noise;
    }
    
    return buffer;
  }

  static generateExplosionSound(): AudioBuffer {
    const ctx = this.getAudioContext();
    const length = ctx.sampleRate * 0.3; // 0.3 seconds
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      // Explosion sound with noise and decay
      const noise = (Math.random() - 0.5) * 2;
      const lowFreq = Math.sin(100 * t * Math.PI * 2) * 0.3;
      const decay = Math.exp(-t * 5);
      data[i] = (noise + lowFreq) * decay * 0.5;
    }
    
    return buffer;
  }

  static generateBackgroundMusic(): AudioBuffer {
    const ctx = this.getAudioContext();
    const length = ctx.sampleRate * 8; // 8 seconds loop
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    const notes = [220, 246.94, 261.63, 293.66, 329.63]; // A, B, C, D, E
    
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      const noteIndex = Math.floor(t * 2) % notes.length;
      const freq = notes[noteIndex];
      
      // Simple melody with some harmony
      const wave1 = Math.sin(freq * t * Math.PI * 2) * 0.1;
      const wave2 = Math.sin(freq * 1.5 * t * Math.PI * 2) * 0.05;
      const envelope = Math.sin(t * 0.5 * Math.PI) * 0.5 + 0.5;
      
      data[i] = (wave1 + wave2) * envelope * 0.2;
    }
    
    return buffer;
  }

  static playSound(buffer: AudioBuffer, volume: number = 1): void {
    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = volume;
    
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    source.start();
  }
}
