import Phaser from 'phaser';
import { GAME_CONFIG } from '../config/GameConfig';
import { SpriteGenerator } from '../utils/SpriteGenerator';
import { PlaneGenerator } from '../utils/PlaneGenerator';
import { MobileUI } from '../utils/MobileUI';
import SoundManager from '../utils/SoundManager';
import Player from '../objects/Player';
import Enemy from '../objects/Enemy';
import Explosion from '../objects/Explosion';
import Bomb from '../objects/Bomb';

export default class MainScene extends Phaser.Scene {
  private player?: Player;
  private enemies?: Phaser.GameObjects.Group;
  private playerBullets?: Phaser.GameObjects.Group;
  private enemyBullets?: Phaser.GameObjects.Group;
  private explosions?: Phaser.GameObjects.Group;
  private clouds?: Phaser.GameObjects.Group;
  private bombs?: Phaser.GameObjects.Group;
  private mobileUI?: MobileUI;
  
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys?: any;
  private spaceKey?: Phaser.Input.Keyboard.Key;
  private restartKey?: Phaser.Input.Keyboard.Key;
  private bombKey?: Phaser.Input.Keyboard.Key;
  
  private lastEnemySpawn: number = 0;
  private lastPlayerFire: number = 0;
  private lastCloudSpawn: number = 0;
  private score: number = 0;
  private gameOver: boolean = false;
  private health: number = GAME_CONFIG.PLAYER.HEALTH;
  
  private scoreText?: Phaser.GameObjects.Text;
  private healthText?: Phaser.GameObjects.Text;
  private backgroundImage?: Phaser.GameObjects.Image;
  
  private soundManager: SoundManager;
  private explosionFrames: string[] = [];
  private enemyTypes: string[] = ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6', 'enemy7'];
  private bossTypes: string[] = ['boss1', 'boss2'];
  private lastBossSpawn: number = 0;
  private bossSpawnInterval: number = 30000; // 30초마다 보스 스폰
  
  constructor() {
    super({ key: 'MainScene' });
    this.soundManager = SoundManager.getInstance();
  }
  
  preload(): void {
    console.log('Preloading assets...');
    
    try {
      // Load enemy images from files
      console.log('Loading enemy images...');
      this.load.image('enemy1', 'assets/images/enemy1.png');
      this.load.image('enemy2', 'assets/images/enemy2.png');
      this.load.image('enemy3', 'assets/images/enemy3.png');
      this.load.image('enemy4', 'assets/images/enemy4.png');
      this.load.image('enemy5', 'assets/images/enemy5.png');
      this.load.image('enemy6', 'assets/images/enemy6.png');
      this.load.image('enemy7', 'assets/images/enemy7.png');
      
      // Load boss images
      console.log('Loading boss images...');
      this.load.image('boss1', 'assets/images/boss1.png');
      this.load.image('boss2', 'assets/images/boss2.png');
      
      // Generate and load player sprite
      console.log('Generating player plane...');
      const playerSprite = PlaneGenerator.generatePlayerPlane();
      this.loadSpriteFromDataURL('player', playerSprite);
      
      // Generate other sprites
      const playerBulletSprite = SpriteGenerator.generateBulletSprite(true);
      const enemyBulletSprite = SpriteGenerator.generateBulletSprite(false);
      const backgroundSprite = SpriteGenerator.generateBackgroundStars();
      const cloudSprite = SpriteGenerator.generateCloud();
      const bombSprite = SpriteGenerator.generateBombSprite();
      
      this.loadSpriteFromDataURL('player_bullet', playerBulletSprite);
      this.loadSpriteFromDataURL('enemy_bullet', enemyBulletSprite);
      this.loadSpriteFromDataURL('background', backgroundSprite);
      this.loadSpriteFromDataURL('cloud', cloudSprite);
      this.loadSpriteFromDataURL('bomb', bombSprite);
      
      // Generate explosion frames
      this.explosionFrames = SpriteGenerator.generateExplosionFrames();
      this.explosionFrames.forEach((frameDataURL, index) => {
        this.loadSpriteFromDataURL(`explosion_${index}`, frameDataURL);
      });
      
      console.log('All sprites loaded successfully');
    } catch (error) {
      console.error('Error during sprite generation:', error);
      this.createFallbackSprites();
      this.explosionFrames = ['explosion_0', 'explosion_1', 'explosion_2'];
    }
    
    // Generate fallback sprites for new enemies and bosses in case images don't load
    this.load.on('loaderror', (file: any) => {
      console.log(`Failed to load: ${file.key}, generating fallback sprite`);
      if (file.key.startsWith('enemy') || file.key.startsWith('boss')) {
        this.generateFallbackSprite(file.key);
      }
    });
  }
  
  private createFallbackSprite(key: string, color: number): void {
    this.add.graphics()
      .fillStyle(color)
      .fillRect(0, 0, 32, 32)
      .generateTexture(key, 32, 32);
  }
  
  private createFallbackSprites(): void {
    console.log('Creating fallback sprites...');
    this.createFallbackSprite('player', 0x00ff00);
    this.createFallbackSprite('enemy1', 0xff0000);
    this.createFallbackSprite('enemy2', 0xff4444);
    this.createFallbackSprite('enemy3', 0xff8888);
    this.createFallbackSprite('enemy4', 0xffaaaa);
    this.createFallbackSprite('enemy5', 0xffcccc);
    this.createFallbackSprite('enemy6', 0xffdddd);
    this.createFallbackSprite('enemy7', 0xffeeee);
    this.createFallbackSprite('boss1', 0x800000);
    this.createFallbackSprite('boss2', 0x008000);
    this.createFallbackSprite('player_bullet', 0xffff00);
    this.createFallbackSprite('enemy_bullet', 0xff0000);
    this.createFallbackSprite('bomb', 0x000000);
    this.createFallbackSprite('explosion_0', 0xff8800);
    this.createFallbackSprite('explosion_1', 0xffaa00);
    this.createFallbackSprite('explosion_2', 0xffcc00);
    
    // Create simple background
    this.add.graphics()
      .fillStyle(0x001122)
      .fillRect(0, 0, 800, 600)
      .generateTexture('background', 800, 600);
      
    // Create simple cloud
    this.add.graphics()
      .fillStyle(0xffffff)
      .fillCircle(25, 25, 25)
      .generateTexture('cloud', 50, 50);
  }
  
  private generateFallbackSprite(key: string): void {
    console.log(`Generating fallback sprite for ${key}`);
    
    if (key.startsWith('enemy')) {
      const enemyNumber = parseInt(key.replace('enemy', ''));
      const enemySprite = PlaneGenerator.generateEnemyPlane(enemyNumber);
      this.loadSpriteFromDataURL(key, enemySprite);
    } else if (key.startsWith('boss')) {
      const bossNumber = parseInt(key.replace('boss', ''));
      const bossSprite = PlaneGenerator.generateBossPlane(bossNumber);
      this.loadSpriteFromDataURL(key, bossSprite);
    }
  }
  
  private loadSpriteFromDataURL(key: string, dataURL: string): void {
    try {
      // Since the data URL is already loaded, we can add it immediately
      if (!this.textures.exists(key)) {
        if (dataURL && dataURL.startsWith('data:')) {
          this.textures.addBase64(key, dataURL);
        } else {
          console.warn(`Invalid data URL for ${key}, creating fallback`);
          this.createFallbackSprite(key, 0x888888);
        }
      }
    } catch (error) {
      console.error(`Failed to load sprite ${key}:`, error);
      this.createFallbackSprite(key, 0x888888);
    }
  }
  
  create(): void {
    console.log('MainScene created!');
    
    try {
      // Set world bounds
      this.physics.world.setBounds(0, 0, GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);
      
      // Create beautiful starry background
      this.createBackground();
      
      // Create groups
      this.enemies = this.add.group();
      this.playerBullets = this.add.group();
      this.enemyBullets = this.add.group();
      this.explosions = this.add.group();
      this.clouds = this.add.group();
      this.bombs = this.add.group();
      
      // Create player with Player class
      this.player = new Player(this, GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT - 100);
      
      console.log('Player created:', this.player);
      
      // Create UI with improved styling
      this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
        fontSize: '24px',
        color: '#00ffff',
        fontFamily: 'Arial, sans-serif'
      });
      
      this.healthText = this.add.text(16, 50, `Health: ${this.health}`, {
        fontSize: '24px',
        color: '#00ff00',
        fontFamily: 'Arial, sans-serif'
      });
      
      console.log('UI created with health:', this.health);
      
      // Setup input
      this.cursors = this.input.keyboard!.createCursorKeys();
      this.wasdKeys = this.input.keyboard!.addKeys('W,S,A,D');
      this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.restartKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      this.bombKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      
      // Setup collisions
      this.setupCollisions();
      
      // Setup event listeners for Player
      this.events.on('player-shoot', (x: number, y: number) => {
        this.createPlayerBullet(x, y);
      });
      
      // Setup event listeners for Enemy
      this.events.on('enemy-shoot', (x: number, y: number) => {
        this.createEnemyBullet(x, y);
      });
      
      this.events.on('enemy-destroyed', (points: number) => {
        this.score += points;
        this.scoreText?.setText(`Score: ${this.score}`);
      });
      
      // Setup mobile UI
      this.mobileUI = new MobileUI(this);
      
      // Setup bomb event
      this.events.on('bomb-used', () => {
        this.useBomb();
      });
      
      // Start background music
      try {
        this.soundManager.startBackgroundMusic();
      } catch (error) {
        console.warn('Could not start background music:', error);
      }
      
      // Show enhanced controls hint
      const controlsText = this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 
        '🚀 1945 SHOOTER 🚀\n\nWASD/Arrow Keys: Move\nSPACE: Shoot\nENTER: Bomb (Kill All Enemies)\n\nGet ready for battle!\n\nGame starts in 3 seconds...', {
        fontSize: '20px',
        color: '#ffff00',
        align: 'center',
        fontFamily: 'Arial, sans-serif'
      }).setOrigin(0.5);
      
      this.time.delayedCall(3000, () => {
        controlsText.destroy();
      });
      
      console.log('MainScene setup complete!');
    } catch (error) {
      console.error('Error in MainScene create:', error);
    }
  }
  
  private createBackground(): void {
    // Create beautiful starry background
    this.backgroundImage = this.add.image(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, 'background');
    
    // Add scrolling effect to background
    this.tweens.add({
      targets: this.backgroundImage,
      y: this.backgroundImage.y + 20,
      duration: 10000,
      repeat: -1,
      yoyo: true,
      ease: 'Sine.easeInOut'
    });
  }
  
  update(time: number, delta: number): void {
    if (this.gameOver) {
      if (this.restartKey?.isDown) {
        this.restartGame();
      }
      return;
    }
    
    // Update player
    if (this.player) {
      this.player.update(time);
    }
    
    this.handleBombInput();
    this.spawnEnemies(time);
    this.spawnClouds(time);
    this.updateBullets();
    this.updateBombs();
    this.updateEnemies(time);
    this.updateExplosions();
  }
  
  private createPlayerBullet(x?: number, y?: number): void {
    if (!this.player || !this.playerBullets) return;
    
    const bulletX = x || this.player.x;
    const bulletY = y || this.player.y - 30;
    
    const bullet = this.physics.add.sprite(bulletX, bulletY, 'player_bullet');
    bullet.setScale(1.5);
    
    const body = bullet.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(-GAME_CONFIG.BULLET.SPEED);
    
    this.playerBullets.add(bullet);
    
    // Play shoot sound
    this.soundManager.playShootSound();
  }
  
  private createEnemyBullet(x: number, y: number): void {
    if (!this.enemyBullets) return;
    
    const bullet = this.physics.add.sprite(x, y, 'enemy_bullet');
    bullet.setScale(1.2);
    
    const body = bullet.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(GAME_CONFIG.BULLET.SPEED / 2); // Enemy bullets slower
    
    this.enemyBullets.add(bullet);
  }
  
  private spawnClouds(time: number): void {
    if (time - this.lastCloudSpawn > 5000) { // Every 5 seconds
      this.createCloud();
      this.lastCloudSpawn = time;
    }
  }
  
  private createCloud(): void {
    if (!this.clouds) return;
    
    const x = Math.random() * GAME_CONFIG.WIDTH;
    const cloud = this.add.image(x, -50, 'cloud');
    cloud.setAlpha(0.3);
    cloud.setScale(0.8 + Math.random() * 0.4);
    
    // Move cloud slowly downward
    this.tweens.add({
      targets: cloud,
      y: GAME_CONFIG.HEIGHT + 100,
      duration: 15000 + Math.random() * 10000,
      onComplete: () => cloud.destroy()
    });
    
    this.clouds.add(cloud);
  }
  
  private spawnEnemies(time: number): void {
    // Spawn regular enemies
    if (time - this.lastEnemySpawn > GAME_CONFIG.ENEMY.SPAWN_RATE) {
      this.createEnemy();
      this.lastEnemySpawn = time;
    }
    
    // Spawn boss enemies
    if (time - this.lastBossSpawn > this.bossSpawnInterval) {
      this.createBoss();
      this.lastBossSpawn = time;
    }
  }
  
  private createEnemy(): void {
    if (!this.enemies) return;
    
    const x = Math.random() * (GAME_CONFIG.WIDTH - 50) + 25;
    
    // Choose random enemy type
    const enemyType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
    const enemy = new Enemy(this, x, -30, enemyType);
    
    // Add random movement pattern
    this.tweens.add({
      targets: enemy,
      x: enemy.x + (Math.random() - 0.5) * 100,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.enemies.add(enemy);
  }
  
  private createBoss(): void {
    if (!this.enemies) return;
    
    const x = GAME_CONFIG.WIDTH / 2; // 보스는 중앙에 스폰
    
    // Choose random boss type
    const bossType = this.bossTypes[Math.floor(Math.random() * this.bossTypes.length)];
    const boss = new Enemy(this, x, -80, bossType);
    
    // Add slow side-to-side movement for boss
    this.tweens.add({
      targets: boss,
      x: boss.x + (Math.random() - 0.5) * 200,
      duration: 4000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    this.enemies.add(boss);
  }
  
  private updateExplosions(): void {
    this.explosions?.children.entries.forEach((explosion: any) => {
      if (explosion.update) {
        explosion.update();
      }
    });
  }
  
  private createExplosion(x: number, y: number): void {
    const explosion = Explosion.create(this, x, y, this.explosionFrames);
    this.explosions?.add(explosion);
    
    // Play explosion sound
    this.soundManager.playExplosionSound();
  }
  
  private updateBullets(): void {
    // Update player bullets
    this.playerBullets?.children.entries.forEach((bullet: any) => {
      if (bullet.y < -20) {
        bullet.destroy();
      }
    });
    
    // Update enemy bullets
    this.enemyBullets?.children.entries.forEach((bullet: any) => {
      if (bullet.y > GAME_CONFIG.HEIGHT + 20) {
        bullet.destroy();
      }
    });
  }
  
  private updateEnemies(time: number): void {
    this.enemies?.children.entries.forEach((enemy: any) => {
      if (enemy.update) {
        enemy.update(time); // Call Enemy's update method
      }
      
      if (enemy.y > GAME_CONFIG.HEIGHT + 50) {
        enemy.destroy();
      }
    });
  }
  
  private setupCollisions(): void {
    if (!this.player || !this.enemies || !this.playerBullets) return;
    
    // Player bullets hit enemies
    this.physics.add.overlap(this.playerBullets, this.enemies, (bullet: any, enemy: any) => {
      // Create explosion at enemy position
      this.createExplosion(enemy.x, enemy.y);
      
      bullet.destroy();
      
      // Use Enemy's takeDamage method if it exists
      if (enemy.takeDamage) {
        enemy.takeDamage();
      } else {
        enemy.destroy();
        this.addScore(100);
      }
    });
    
    // Enemies hit player
    this.physics.add.overlap(this.player, this.enemies, (player: any, enemy: any) => {
      // Create explosion at collision point
      this.createExplosion(enemy.x, enemy.y);
      
      enemy.destroy();
      
      // Use Player's takeDamage method if it exists
      if (this.player && (this.player as any).takeDamage) {
        const playerDead = (this.player as any).takeDamage();
        if (playerDead) {
          this.gameOver = true;
        }
      } else {
        this.takeDamage();
      }
    });
  }
  
  private addScore(points: number): void {
    this.score += points;
    this.scoreText?.setText(`Score: ${this.score}`);
  }
  
  private takeDamage(): void {
    this.health--;
    this.healthText?.setText(`Health: ${this.health}`);
    
    // Change color based on health
    if (this.health <= 1) {
      this.healthText?.setColor('#ff0000');
    } else if (this.health <= 2) {
      this.healthText?.setColor('#ffaa00');
    }
    
    if (this.health <= 0) {
      this.endGame();
    } else {
      // Enhanced flash effect
      this.player?.setTint(0xff0000);
      this.cameras.main.shake(200, 0.01);
      
      this.time.delayedCall(100, () => {
        this.player?.clearTint();
      });
    }
  }
  
  private endGame(): void {
    this.gameOver = true;
    this.physics.pause();
    
    // Stop background music
    this.soundManager.stopBackgroundMusic();
    
    // Enhanced game over screen
    const overlay = this.add.rectangle(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2,
      GAME_CONFIG.WIDTH,
      GAME_CONFIG.HEIGHT,
      0x000000,
      0.8
    );
    overlay.setDepth(1000);
    
    // Game over text with glow effect
    this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 - 100, '💥 GAME OVER 💥', {
      fontSize: '48px',
      color: '#ff0000',
      fontStyle: 'bold',
      fontFamily: 'monospace',
      stroke: '#ffffff',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(1001);
    
    // Final score with enhanced styling
    this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 - 20, `🏆 Final Score: ${this.score} 🏆`, {
      fontSize: '28px',
      color: '#ffff00',
      fontFamily: 'monospace',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5).setDepth(1001);
    
    // Restart instruction
    this.add.text(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2 + 60, '🔄 Press R to Restart 🔄', {
      fontSize: '24px',
      color: '#00ffff',
      fontFamily: 'monospace',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5).setDepth(1001);
  }
  
  private restartGame(): void {
    // Stop any remaining sounds
    this.soundManager.stopBackgroundMusic();
    this.scene.restart();
  }
  
  private handleBombInput(): void {
    if (this.bombKey?.isDown) {
      this.createBomb();
    }
  }
  
  private createBomb(): void {
    if (!this.player || !this.bombs) return;
    
    const bomb = new Bomb(this, this.player.x, this.player.y - 20);
    this.bombs.add(bomb);
    
    // Bomb explodes after 2 seconds and kills all enemies
    this.time.delayedCall(2000, () => {
      this.detonateAllBombs();
    });
  }
  
  private useBomb(): void {
    this.createBomb();
  }
  
  private detonateAllBombs(): void {
    // Kill all enemies with explosion effects
    this.enemies?.children.entries.forEach((enemy: any) => {
      this.createExplosion(enemy.x, enemy.y);
      this.score += 100;
      enemy.destroy();
    });
    
    // Clear all bombs
    this.bombs?.children.entries.forEach((bomb: any) => {
      this.createExplosion(bomb.x, bomb.y);
      bomb.destroy();
    });
    
    // Update score display
    if (this.scoreText) {
      this.scoreText.text = `Score: ${this.score}`;
    }
    
    // Play explosion sound
    this.soundManager.playExplosionSound();
  }
  
  private updateBombs(): void {
    this.bombs?.children.entries.forEach((bomb: any) => {
      if (bomb.y > GAME_CONFIG.HEIGHT + 50) {
        bomb.destroy();
      }
    });
  }
}
