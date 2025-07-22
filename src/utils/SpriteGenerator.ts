export class SpriteGenerator {
  private static createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  static generatePlayerSprite(): string {
    const canvas = this.createCanvas(64, 80);
    const ctx = canvas.getContext('2d')!;
    
    // Clear with transparent background
    ctx.clearRect(0, 0, 64, 80);
    
    // Main fuselage (body)
    const bodyGradient = ctx.createLinearGradient(0, 20, 0, 70);
    bodyGradient.addColorStop(0, '#87CEEB');
    bodyGradient.addColorStop(0.3, '#4682B4');
    bodyGradient.addColorStop(0.7, '#1E90FF');
    bodyGradient.addColorStop(1, '#000080');
    
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    // Aircraft nose (pointed)
    ctx.moveTo(32, 10);
    ctx.lineTo(38, 25);
    ctx.lineTo(36, 45);
    ctx.lineTo(36, 65);
    ctx.lineTo(28, 65);
    ctx.lineTo(28, 45);
    ctx.lineTo(26, 25);
    ctx.closePath();
    ctx.fill();
    
    // Main wings (larger)
    const wingGradient = ctx.createLinearGradient(0, 35, 0, 50);
    wingGradient.addColorStop(0, '#708090');
    wingGradient.addColorStop(1, '#2F4F4F');
    
    ctx.fillStyle = wingGradient;
    ctx.beginPath();
    // Left wing
    ctx.moveTo(28, 35);
    ctx.lineTo(8, 42);
    ctx.lineTo(12, 50);
    ctx.lineTo(28, 45);
    ctx.closePath();
    ctx.fill();
    
    // Right wing
    ctx.beginPath();
    ctx.moveTo(36, 35);
    ctx.lineTo(56, 42);
    ctx.lineTo(52, 50);
    ctx.lineTo(36, 45);
    ctx.closePath();
    ctx.fill();
    
    // Rear stabilizers
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    // Left stabilizer
    ctx.moveTo(28, 55);
    ctx.lineTo(20, 58);
    ctx.lineTo(22, 62);
    ctx.lineTo(28, 60);
    ctx.closePath();
    ctx.fill();
    
    // Right stabilizer
    ctx.beginPath();
    ctx.moveTo(36, 55);
    ctx.lineTo(44, 58);
    ctx.lineTo(42, 62);
    ctx.lineTo(36, 60);
    ctx.closePath();
    ctx.fill();
    
    // Cockpit (glass effect)
    const cockpitGradient = ctx.createRadialGradient(32, 30, 2, 32, 30, 8);
    cockpitGradient.addColorStop(0, '#87CEEB');
    cockpitGradient.addColorStop(0.7, '#4169E1');
    cockpitGradient.addColorStop(1, '#191970');
    
    ctx.fillStyle = cockpitGradient;
    ctx.beginPath();
    ctx.ellipse(32, 30, 6, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Engine exhausts with glow
    const exhaustGradient = ctx.createRadialGradient(32, 70, 0, 32, 70, 8);
    exhaustGradient.addColorStop(0, '#FFD700');
    exhaustGradient.addColorStop(0.5, '#FF4500');
    exhaustGradient.addColorStop(1, '#8B0000');
    
    ctx.fillStyle = exhaustGradient;
    ctx.beginPath();
    ctx.ellipse(30, 68, 3, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(34, 68, 3, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Wing tip lights
    ctx.fillStyle = '#00FF00';
    ctx.beginPath();
    ctx.arc(10, 46, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(54, 46, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add some detail lines
    ctx.strokeStyle = '#2F4F4F';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(28, 20);
    ctx.lineTo(36, 20);
    ctx.moveTo(28, 50);
    ctx.lineTo(36, 50);
    ctx.stroke();
    
    return canvas.toDataURL();
  }

  static generateEnemySprite(): string {
    return this.generateEnemyType1();
  }

  // Type 1: Basic Fighter (Red)
  static generateEnemyType1(): string {
    const canvas = this.createCanvas(48, 48);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 48, 48);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 48);
    gradient.addColorStop(0, '#DC143C');
    gradient.addColorStop(0.5, '#B22222');
    gradient.addColorStop(1, '#8B0000');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(24, 5);
    ctx.lineTo(28, 15);
    ctx.lineTo(26, 35);
    ctx.lineTo(22, 35);
    ctx.lineTo(20, 15);
    ctx.closePath();
    ctx.fill();
    
    // Wings
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    ctx.ellipse(24, 20, 20, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cockpit
    ctx.fillStyle = '#2F4F4F';
    ctx.beginPath();
    ctx.ellipse(24, 15, 3, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas.toDataURL();
  }

  // Type 2: Heavy Bomber (Dark Green)
  static generateEnemyType2(): string {
    const canvas = this.createCanvas(60, 50);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 60, 50);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 50);
    gradient.addColorStop(0, '#228B22');
    gradient.addColorStop(0.5, '#006400');
    gradient.addColorStop(1, '#2F4F2F');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Wider, heavier body
    ctx.ellipse(30, 25, 12, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Large wings
    ctx.fillStyle = '#556B2F';
    ctx.beginPath();
    ctx.ellipse(30, 22, 25, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Multiple engines
    ctx.fillStyle = '#2F4F4F';
    ctx.beginPath();
    ctx.ellipse(15, 22, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(45, 22, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas.toDataURL();
  }

  // Type 3: Fast Scout (Yellow)
  static generateEnemyType3(): string {
    const canvas = this.createCanvas(40, 40);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 40, 40);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 40);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FFA500');
    gradient.addColorStop(1, '#FF8C00');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Sleek, narrow body
    ctx.ellipse(20, 20, 6, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Small, swept wings
    ctx.fillStyle = '#DAA520';
    ctx.beginPath();
    ctx.moveTo(20, 15);
    ctx.lineTo(8, 20);
    ctx.lineTo(14, 25);
    ctx.lineTo(20, 20);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(20, 15);
    ctx.lineTo(32, 20);
    ctx.lineTo(26, 25);
    ctx.lineTo(20, 20);
    ctx.closePath();
    ctx.fill();
    
    return canvas.toDataURL();
  }

  // Type 4: Elite Fighter (Purple)
  static generateEnemyType4(): string {
    const canvas = this.createCanvas(52, 52);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 52, 52);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 52);
    gradient.addColorStop(0, '#9370DB');
    gradient.addColorStop(0.5, '#8A2BE2');
    gradient.addColorStop(1, '#4B0082');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Angular, advanced design
    ctx.moveTo(26, 5);
    ctx.lineTo(32, 18);
    ctx.lineTo(30, 35);
    ctx.lineTo(26, 40);
    ctx.lineTo(22, 35);
    ctx.lineTo(20, 18);
    ctx.closePath();
    ctx.fill();
    
    // Angled wings
    ctx.fillStyle = '#663399';
    ctx.beginPath();
    ctx.moveTo(20, 18);
    ctx.lineTo(5, 25);
    ctx.lineTo(10, 30);
    ctx.lineTo(22, 25);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(32, 18);
    ctx.lineTo(47, 25);
    ctx.lineTo(42, 30);
    ctx.lineTo(30, 25);
    ctx.closePath();
    ctx.fill();
    
    // Cockpit glow
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.ellipse(26, 15, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas.toDataURL();
  }

  // Type 5: Boss Aircraft (Black/Silver)
  static generateEnemyType5(): string {
    const canvas = this.createCanvas(80, 70);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 80, 70);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 70);
    gradient.addColorStop(0, '#C0C0C0');
    gradient.addColorStop(0.5, '#696969');
    gradient.addColorStop(1, '#2F2F2F');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Large, intimidating body
    ctx.ellipse(40, 35, 18, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Massive wings
    ctx.fillStyle = '#2F2F2F';
    ctx.beginPath();
    ctx.ellipse(40, 30, 35, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Multiple weapon pods
    ctx.fillStyle = '#1C1C1C';
    ctx.beginPath();
    ctx.ellipse(20, 30, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(60, 30, 5, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Central weapon system
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.ellipse(40, 25, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Engine exhausts
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.ellipse(35, 55, 3, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(45, 55, 3, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas.toDataURL();
  }

  static generateBulletSprite(isPlayer: boolean = true): string {
    const canvas = this.createCanvas(8, 16);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 8, 16);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 16);
    if (isPlayer) {
      gradient.addColorStop(0, '#ffff00');
      gradient.addColorStop(1, '#ffc107');
    } else {
      gradient.addColorStop(0, '#ff5722');
      gradient.addColorStop(1, '#d84315');
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(4, 8, 3, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Glow effect
    ctx.shadowColor = isPlayer ? '#ffff00' : '#ff5722';
    ctx.shadowBlur = 6;
    ctx.fill();
    
    return canvas.toDataURL();
  }

  static generateExplosionFrames(): string[] {
    const frames: string[] = [];
    
    for (let frame = 0; frame < 8; frame++) {
      const canvas = this.createCanvas(64, 64);
      const ctx = canvas.getContext('2d')!;
      
      ctx.clearRect(0, 0, 64, 64);
      
      const progress = frame / 7;
      const maxRadius = 32 * (1 + progress);
      
      // Multiple explosion circles
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + progress * Math.PI;
        const distance = progress * 15;
        const x = 32 + Math.cos(angle) * distance;
        const y = 32 + Math.sin(angle) * distance;
        const radius = (8 + Math.random() * 12) * (1 - progress * 0.3);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - progress})`);
        gradient.addColorStop(0.3, `rgba(255, 150, 0, ${0.8 - progress * 0.8})`);
        gradient.addColorStop(0.7, `rgba(255, 50, 0, ${0.6 - progress * 0.6})`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      frames.push(canvas.toDataURL());
    }
    
    return frames;
  }

  static generateBackgroundStars(): string {
    const canvas = this.createCanvas(480, 800);
    const ctx = canvas.getContext('2d')!;
    
    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#000428');
    gradient.addColorStop(0.5, '#004e92');
    gradient.addColorStop(1, '#000428');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 480, 800);
    
    // Add stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 480;
      const y = Math.random() * 800;
      const size = Math.random() * 2 + 0.5;
      const brightness = Math.random() * 0.8 + 0.2;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add twinkle effect for some stars
      if (Math.random() < 0.1) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - size * 3, y);
        ctx.lineTo(x + size * 3, y);
        ctx.moveTo(x, y - size * 3);
        ctx.lineTo(x, y + size * 3);
        ctx.stroke();
      }
    }
    
    return canvas.toDataURL();
  }

  static generateBombSprite(): string {
    const canvas = this.createCanvas(32, 48);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 32, 48);
    
    // Bomb body
    const bombGradient = ctx.createLinearGradient(0, 10, 0, 40);
    bombGradient.addColorStop(0, '#2F4F4F');
    bombGradient.addColorStop(0.5, '#696969');
    bombGradient.addColorStop(1, '#2F2F2F');
    
    ctx.fillStyle = bombGradient;
    ctx.beginPath();
    ctx.ellipse(16, 25, 8, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Bomb fins
    ctx.fillStyle = '#1C1C1C';
    ctx.beginPath();
    // Left fin
    ctx.moveTo(8, 35);
    ctx.lineTo(5, 45);
    ctx.lineTo(12, 42);
    ctx.closePath();
    ctx.fill();
    
    // Right fin
    ctx.beginPath();
    ctx.moveTo(24, 35);
    ctx.lineTo(27, 45);
    ctx.lineTo(20, 42);
    ctx.closePath();
    ctx.fill();
    
    // Bomb tip
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.ellipse(16, 8, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Warning stripes
    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, 20);
    ctx.lineTo(24, 20);
    ctx.moveTo(8, 30);
    ctx.lineTo(24, 30);
    ctx.stroke();
    
    return canvas.toDataURL();
  }

  static generateCloud(): string {
    const canvas = this.createCanvas(120, 60);
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, 120, 60);
    
    // Cloud with transparency
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    
    // Multiple overlapping circles to form cloud
    const circles = [
      {x: 20, y: 30, r: 15},
      {x: 35, y: 25, r: 18},
      {x: 50, y: 30, r: 20},
      {x: 65, y: 28, r: 16},
      {x: 80, y: 32, r: 14},
      {x: 100, y: 30, r: 12}
    ];
    
    circles.forEach(circle => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
      ctx.fill();
    });
    
    return canvas.toDataURL();
  }
}
