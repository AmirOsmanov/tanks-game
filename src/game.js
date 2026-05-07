// =====================================================================
// TANKS GAME — Battle City clone on Phaser 3
// =====================================================================

const TILE = 16;        // tile size px
const COLS = 26;        // map columns
const ROWS = 26;        // map rows
const W = COLS * TILE;  // 416
const H = ROWS * TILE;  // 416

// Tile types
const T = { EMPTY: 0, BRICK: 1, STEEL: 2, WATER: 3, FOREST: 4, BASE: 5 };

// Directions
const DIR = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

// Colors (NES palette approximation)
const COLORS = {
  brick:  0xc84000,
  steel:  0x808080,
  water:  0x0060c0,
  forest: 0x008000,
  base:   0xffffff,
  player: 0xffd700,
  enemy1: 0xd0d0d0,
  enemy2: 0xff6000,
  enemy3: 0x00d0d0,
  bullet: 0xffffff,
  explosion: 0xff8000,
  bg:     0x1a1a1a,
  border: 0x404040,
};

// =====================================================================
// Level maps (0=empty,1=brick,2=steel,3=water,4=forest,5=base)
// Each row is 26 chars, each col is 26 rows
// =====================================================================
const LEVELS = [
  // Level 1
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,1,1,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,1,1,0,0],
    [0,1,1,0,1,1,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,1,1,0,0],
    [0,1,1,0,1,1,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,1,1,0,0,2,2,0,1,1,0,1,1,0,2,2,0,0,1,1,0,1,0],
    [0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,1,0,1,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,1,1,0,0,3,3,0,0,3,3,0,0,1,1,0,0,0,1,1,0],
    [0,1,1,0,0,0,1,1,0,0,3,3,0,0,3,3,0,0,1,1,0,0,0,1,1,0],
    [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],
    [0,2,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,2,0],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1,0],
    [0,1,0,1,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,1,1,0,0,4,4,0,0,1,1,0,0,0,0,1,1,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,1,1,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
    [0,0,0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,0],
    [0,0,0,0,0,0,1,1,0,0,0,1,1,0,1,1,0,0,0,1,1,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0],
    [0,1,1,0,1,1,0,1,1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1,1,0],
    [0,1,1,0,1,1,0,1,1,0,0,1,0,5,0,1,0,0,1,1,0,1,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
  // Level 2
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,2,2,2,0],
    [0,2,0,2,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,2,0,2,0],
    [0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0],
    [0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0],
    [0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0],
    [0,1,0,3,3,3,3,0,1,0,0,1,0,0,1,0,0,1,0,3,3,3,3,0,1,0],
    [0,1,0,3,0,0,3,0,1,0,0,0,0,0,0,0,0,0,3,0,0,3,0,0,1,0],
    [0,0,0,3,0,0,3,0,0,0,2,2,0,0,2,2,0,0,3,0,0,3,0,0,0,0],
    [0,0,0,3,3,3,3,0,0,0,2,2,0,0,2,2,0,0,3,3,3,3,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,2,0,0,1,1,0,0,0,0,0,0,1,1,0,0,2,0,0,1,1,0],
    [0,1,1,0,0,2,0,0,1,1,0,4,4,4,4,0,1,1,0,0,2,0,0,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1,1,0,0],
    [0,0,1,1,0,0,1,0,0,0,0,4,4,4,4,0,0,0,0,1,0,0,1,1,0,0],
    [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,1,1,0,0],
    [0,1,1,0,1,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,1,0,1,1,0],
    [0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0],
    [0,1,1,0,0,0,1,0,0,0,0,1,0,5,0,1,0,0,0,1,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
];

// =====================================================================
// MAIN GAME CLASS
// =====================================================================
class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.map = [];
    this.playerTank = null;
    this.enemies = [];
    this.bullets = [];
    this.explosions = [];
    this.tileGraphics = null;
    this.overlayGraphics = null;
    this.lives = 5;
    this.baseHp = 5;
    this.score = 0;
    this.level = 1;
    this.enemiesLeft = 20;
    this.enemiesOnField = 0;
    this.maxEnemiesOnField = 4;
    this.spawnPoints = [];
    this.playerSpawn = null;
    this.basePos = null;
    this.gameOver = false;
    this.playerRespawning = false;
    this.spawnQueue = [];
    this.lastEnemySpawn = 0;
    this.enemySpawnDelay = 3000;
  }

  create() {
    this.graphics = this.add.graphics();
    this.overlayGraphics = this.add.graphics();

    this.cursors = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.UP,
      down:  Phaser.Input.Keyboard.KeyCodes.DOWN,
      left:  Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      w:     Phaser.Input.Keyboard.KeyCodes.W,
      s:     Phaser.Input.Keyboard.KeyCodes.S,
      a:     Phaser.Input.Keyboard.KeyCodes.A,
      d:     Phaser.Input.Keyboard.KeyCodes.D,
      fire:  Phaser.Input.Keyboard.KeyCodes.SPACE,
      fire2: Phaser.Input.Keyboard.KeyCodes.ENTER,
      restart: Phaser.Input.Keyboard.KeyCodes.R,
    });

    // Prevent browser from scrolling the page on arrow keys / space
    this.input.keyboard.addCapture([
      Phaser.Input.Keyboard.KeyCodes.UP,
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      Phaser.Input.Keyboard.KeyCodes.LEFT,
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
      Phaser.Input.Keyboard.KeyCodes.SPACE,
      Phaser.Input.Keyboard.KeyCodes.W,
      Phaser.Input.Keyboard.KeyCodes.A,
      Phaser.Input.Keyboard.KeyCodes.S,
      Phaser.Input.Keyboard.KeyCodes.D,
    ]);

    this.loadLevel(this.level);
    this.updateUI();
  }

  loadLevel(lvl) {
    const idx = Math.min(lvl - 1, LEVELS.length - 1);
    this.map = LEVELS[idx].map(row => [...row]);

    this.enemies = [];
    this.bullets = [];
    this.explosions = [];
    this.spawnPoints = [];
    this.enemiesLeft = 20;
    this.enemiesOnField = 0;
    this.lastEnemySpawn = 0;
    this.playerRespawning = false;
    this.baseHp = 5;

    // Detect base and spawn points
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (this.map[r][c] === T.BASE) {
          this.basePos = { r, c };
        }
      }
    }

    // Fixed spawn points: top corners + top center
    this.spawnPoints = [
      { r: 0, c: 0 },
      { r: 0, c: Math.floor(COLS / 2) },
      { r: 0, c: COLS - 2 },
    ];
    this.playerSpawn = { r: ROWS - 2, c: 4 };

    this.spawnPlayer();

    // Pre-queue enemies
    this.spawnQueue = [];
    for (let i = 0; i < this.enemiesLeft; i++) {
      this.spawnQueue.push(this.randomEnemyType());
    }
  }

  randomEnemyType() {
    const r = Math.random();
    if (r < 0.5) return 'basic';
    if (r < 0.75) return 'fast';
    return 'armor';
  }

  spawnPlayer() {
    const sp = this.playerSpawn;
    const pos = this.findClearSpawn(sp.r, sp.c);
    const x = pos.c * TILE + TILE / 2;
    const y = pos.r * TILE + TILE / 2;
    this.playerTank = new Tank(this, x, y, 'player', DIR.UP);
    this.playerRespawning = false;
  }

  findClearSpawn(startR, startC) {
    for (let radius = 0; radius < 8; radius++) {
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          if (Math.abs(dr) !== radius && Math.abs(dc) !== radius) continue;
          const r = startR + dr;
          const c = startC + dc;
          if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
          if (this.map[r][c] === T.EMPTY) return { r, c };
        }
      }
    }
    return { r: ROWS - 1, c: 1 };
  }

  trySpawnEnemy() {
    if (this.enemiesOnField >= this.maxEnemiesOnField) return;
    if (this.spawnQueue.length === 0) return;

    const sp = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
    const x = sp.c * TILE + TILE / 2;
    const y = sp.r * TILE + TILE / 2;

    // Check not blocked
    if (!this.isClear(x, y, null)) return;

    const type = this.spawnQueue.shift();
    const enemy = new Tank(this, x, y, type, DIR.DOWN);
    this.enemies.push(enemy);
    this.enemiesOnField++;
    this.spawnEffect(x, y);
  }

  spawnEffect(x, y) {
    this.explosions.push({ x, y, frame: 0, maxFrames: 8, type: 'spawn' });
  }

  update(time, delta) {
    if (this.gameOver) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.restart)) this.restartGame();
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.restart)) {
      this.restartGame();
      return;
    }

    // Spawn enemies
    if (time - this.lastEnemySpawn > this.enemySpawnDelay) {
      this.trySpawnEnemy();
      this.lastEnemySpawn = time;
    }

    // Update player
    if (this.playerTank && !this.playerRespawning) {
      this.updatePlayer(delta);
    }

    // Update enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      this.enemies[i].updateEnemy(delta, time);
    }

    // Update bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.update(delta);

      if (b.dead) {
        this.bullets.splice(i, 1);
        continue;
      }

      // Bullet hits
      this.checkBulletCollision(b, i);
    }

    // Update explosions
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      this.explosions[i].frame += delta / 60;
      if (this.explosions[i].frame >= this.explosions[i].maxFrames) {
        this.explosions.splice(i, 1);
      }
    }

    this.draw();
    this.updateUI();
  }

  checkBulletCollision(b, bIdx) {
    const bx = b.x, by = b.y;

    // Wall collision
    const tc = Math.floor(bx / TILE);
    const tr = Math.floor(by / TILE);

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = tr + dr, c = tc + dc;
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
          b.dead = true;
          this.addExplosion(b.x, b.y, 'small');
          return;
        }
        const tile = this.map[r][c];
        if (tile === T.EMPTY || tile === T.FOREST) continue;

        // Check if bullet center is within this tile
        const tx = c * TILE, ty = r * TILE;
        if (bx > tx && bx < tx + TILE && by > ty && by < ty + TILE) {
          if (tile === T.BRICK) {
            this.destroyBrick(r, c, b.power);
            b.dead = true;
            this.addExplosion(b.x, b.y, 'small');
            return;
          } else if (tile === T.STEEL) {
            if (b.power >= 2) this.map[r][c] = T.EMPTY;
            b.dead = true;
            this.addExplosion(b.x, b.y, 'small');
            return;
          } else if (tile === T.WATER) {
            // water doesn't block bullets
          } else if (tile === T.BASE) {
            b.dead = true;
            this.baseHp--;
            this.addExplosion(b.x, b.y, this.baseHp <= 0 ? 'big' : 'small');
            if (this.baseHp <= 0) {
              this.map[r][c] = T.EMPTY;
              this.triggerGameOver('base');
            }
            return;
          }
        }
      }
    }

    // Bullet out of bounds
    if (bx < 0 || bx > W || by < 0 || by > H) {
      b.dead = true;
      return;
    }

    // Player bullet hits enemy
    if (b.owner === 'player') {
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const e = this.enemies[i];
        if (Math.abs(bx - e.x) < TILE * 0.8 && Math.abs(by - e.y) < TILE * 0.8) {
          e.hp -= b.power;
          b.dead = true;
          this.addExplosion(e.x, e.y, e.hp <= 0 ? 'big' : 'small');
          if (e.hp <= 0) {
            this.score += e.scoreValue;
            this.enemies.splice(i, 1);
            this.enemiesOnField--;
            this.enemiesLeft--;
            if (this.enemiesLeft <= 0 && this.enemies.length === 0) {
              this.time.delayedCall(1500, () => this.nextLevel());
            }
          }
          return;
        }
      }
    }

    // Enemy bullet hits player
    if (b.owner !== 'player' && this.playerTank && !this.playerRespawning) {
      const p = this.playerTank;
      if (Math.abs(bx - p.x) < TILE * 0.8 && Math.abs(by - p.y) < TILE * 0.8) {
        b.dead = true;
        this.addExplosion(p.x, p.y, 'big');
        this.playerHit();
        return;
      }
    }

    // Bullet vs bullet
    for (let j = this.bullets.length - 1; j >= 0; j--) {
      const other = this.bullets[j];
      if (other === b || other.dead) continue;
      if (other.owner === b.owner) continue;
      if (Math.abs(bx - other.x) < 6 && Math.abs(by - other.y) < 6) {
        b.dead = true;
        other.dead = true;
        this.addExplosion(b.x, b.y, 'small');
        return;
      }
    }
  }

  destroyBrick(r, c, power) {
    this.map[r][c] = T.EMPTY;
    if (power >= 2) {
      // destroy adjacent bricks
      const neighbors = [[r-1,c],[r+1,c],[r,c-1],[r,c+1]];
      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && this.map[nr][nc] === T.BRICK) {
          this.map[nr][nc] = T.EMPTY;
        }
      }
    }
  }

  addExplosion(x, y, size) {
    const maxFrames = size === 'big' ? 12 : 6;
    this.explosions.push({ x, y, frame: 0, maxFrames, type: size });
  }

  playerHit() {
    this.playerTank = null;
    this.lives--;
    this.playerRespawning = true;

    if (this.lives <= 0) {
      this.time.delayedCall(1000, () => this.triggerGameOver('lives'));
    } else {
      this.time.delayedCall(2000, () => this.spawnPlayer());
    }
  }

  triggerGameOver(reason) {
    this.gameOver = true;
    this.playerTank = null;
  }

  nextLevel() {
    this.level++;
    if (this.level > LEVELS.length) {
      // repeat last level with more enemies speed
      this.enemySpawnDelay = Math.max(1000, this.enemySpawnDelay - 300);
    }
    this.loadLevel(this.level);
  }

  restartGame() {
    this.lives = 5;
    this.baseHp = 5;
    this.score = 0;
    this.level = 1;
    this.gameOver = false;
    this.enemySpawnDelay = 3000;
    this.loadLevel(1);
  }

  updatePlayer(delta) {
    const p = this.playerTank;
    const speed = p.speed;
    let moved = false;

    const up    = this.cursors.up.isDown    || this.cursors.w.isDown;
    const down  = this.cursors.down.isDown  || this.cursors.s.isDown;
    const left  = this.cursors.left.isDown  || this.cursors.a.isDown;
    const right = this.cursors.right.isDown || this.cursors.d.isDown;

    let dx = 0, dy = 0, newDir = p.dir;

    if (up)    { dy = -1; newDir = DIR.UP; }
    else if (down)  { dy =  1; newDir = DIR.DOWN; }
    else if (left)  { dx = -1; newDir = DIR.LEFT; }
    else if (right) { dx =  1; newDir = DIR.RIGHT; }

    if (dx !== 0 || dy !== 0) {
      p.dir = newDir;
      const nx = p.x + dx * speed * (delta / 16);
      const ny = p.y + dy * speed * (delta / 16);
      if (this.isClear(nx, ny, p)) {
        p.x = nx;
        p.y = ny;
      } else {
        // Try to slide along walls
        if (dx !== 0 && this.isClear(p.x, ny, p)) p.y = ny;
        if (dy !== 0 && this.isClear(nx, p.y, p)) p.x = nx;
      }
      // Clamp — TILE*0.5 keeps both tank corners within row 0 at the top edge
      p.x = Phaser.Math.Clamp(p.x, TILE * 0.5, W - TILE * 0.5);
      p.y = Phaser.Math.Clamp(p.y, TILE * 0.5, H - TILE * 0.5);
      p.animTimer += delta;
      moved = true;
    }

    // Fire
    const firePresseed = Phaser.Input.Keyboard.JustDown(this.cursors.fire) ||
                         Phaser.Input.Keyboard.JustDown(this.cursors.fire2);
    if (firePresseed) p.fire(this);
  }

  isClear(nx, ny, tank) {
    const half = TILE * 0.45;
    const corners = [
      [nx - half, ny - half],
      [nx + half, ny - half],
      [nx - half, ny + half],
      [nx + half, ny + half],
    ];
    for (const [cx, cy] of corners) {
      const c = Math.floor(cx / TILE);
      const r = Math.floor(cy / TILE);
      if (c < 0 || c >= COLS || r < 0 || r >= ROWS) return false;
      const tile = this.map[r][c];
      if (tile === T.BRICK || tile === T.STEEL || tile === T.WATER || tile === T.BASE) return false;
    }
    // Collision with other tanks
    if (tank) {
      const others = tank.owner === 'player' ? this.enemies :
                     (this.playerTank ? [this.playerTank] : []);
      for (const other of others) {
        if (Math.abs(nx - other.x) < TILE * 0.85 && Math.abs(ny - other.y) < TILE * 0.85) {
          return false;
        }
      }
    }
    return true;
  }

  draw() {
    const g = this.graphics;
    g.clear();

    // Background
    g.fillStyle(COLORS.bg);
    g.fillRect(0, 0, W, H);

    // Tiles (except forest — drawn after tanks)
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tile = this.map[r][c];
        const x = c * TILE, y = r * TILE;
        this.drawTile(g, tile, x, y, false);
      }
    }

    // Explosions (behind tanks)
    for (const ex of this.explosions) {
      if (ex.type === 'spawn') this.drawSpawn(g, ex);
      else this.drawExplosion(g, ex);
    }

    // Tanks
    if (this.playerTank && !this.playerRespawning) {
      this.drawTank(g, this.playerTank);
    }
    for (const e of this.enemies) {
      this.drawTank(g, e);
    }

    // Bullets
    for (const b of this.bullets) {
      this.drawBullet(g, b);
    }

    // Forest overlay (on top of tanks)
    const go = this.overlayGraphics;
    go.clear();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (this.map[r][c] === T.FOREST) {
          const x = c * TILE, y = r * TILE;
          this.drawTile(go, T.FOREST, x, y, false);
        }
      }
    }

    // Game over overlay
    if (this.gameOver) {
      g.fillStyle(0x000000, 0.6);
      g.fillRect(0, 0, W, H);
      // Text drawn via Phaser text objects — but we'll use graphics for pixel feel
      g.fillStyle(0xff0000);
      g.fillRect(80, 150, 256, 4);
      g.fillRect(80, 250, 256, 4);
      // Game over letters (simple pixel blocks)
      this.drawPixelText(g, 'GAME OVER', W / 2, H / 2, 0xff2222, 3);
      this.drawPixelText(g, 'PRESS R TO RESTART', W / 2, H / 2 + 40, 0xaaaaaa, 1);
    }
  }

  drawTile(g, tile, x, y, overlay) {
    switch (tile) {
      case T.BRICK:
        g.fillStyle(COLORS.brick);
        g.fillRect(x, y, TILE, TILE);
        // mortar lines
        g.fillStyle(0x601800);
        g.fillRect(x, y + TILE/2 - 1, TILE, 2);
        g.fillRect(x + TILE/2 - 1, y, 2, TILE/2 - 1);
        g.fillRect(x + TILE/2 - 1, y + TILE/2 + 1, 2, TILE/2 - 1);
        break;
      case T.STEEL:
        g.fillStyle(COLORS.steel);
        g.fillRect(x, y, TILE, TILE);
        g.fillStyle(0xc0c0c0);
        g.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);
        g.fillStyle(0x505050);
        g.fillRect(x, y, TILE, 2);
        g.fillRect(x, y, 2, TILE);
        break;
      case T.WATER:
        g.fillStyle(COLORS.water);
        g.fillRect(x, y, TILE, TILE);
        g.fillStyle(0x0080ff, 0.5);
        // wave pattern
        for (let i = 0; i < 3; i++) {
          g.fillRect(x + i * 5 + 1, y + 4, 4, 2);
          g.fillRect(x + i * 5 + 3, y + 10, 4, 2);
        }
        break;
      case T.FOREST:
        g.fillStyle(COLORS.forest);
        g.fillRect(x, y, TILE, TILE);
        g.fillStyle(0x00a000);
        g.fillRect(x + 2, y + 2, 5, 5);
        g.fillRect(x + 9, y + 2, 5, 5);
        g.fillRect(x + 2, y + 9, 5, 5);
        g.fillRect(x + 9, y + 9, 5, 5);
        g.fillStyle(0x004000);
        g.fillRect(x + 4, y + 4, 2, 2);
        g.fillRect(x + 11, y + 4, 2, 2);
        g.fillRect(x + 4, y + 11, 2, 2);
        g.fillRect(x + 11, y + 11, 2, 2);
        break;
      case T.BASE: {
        // Border color changes with base HP
        const hpColors = [0x808080, 0xff2000, 0xff6000, 0xffa000, 0xc0c000, 0xc0c000];
        const borderColor = hpColors[Math.max(0, this.baseHp)];
        g.fillStyle(borderColor);
        g.fillRect(x - TILE, y - TILE, TILE * 3, TILE * 3);
        g.fillStyle(COLORS.base);
        g.fillRect(x - TILE + 2, y - TILE + 2, TILE * 3 - 4, TILE * 3 - 4);
        // Eagle
        g.fillStyle(0x000000);
        g.fillRect(x, y, TILE, TILE);
        // Eagle color changes with HP: gold → orange → red
        const eagleColors = [0x808080, 0xff2000, 0xff6000, 0xffa000, 0xc0c000, 0xc0c000];
        const flash = this.baseHp === 1 && Math.floor(this.time.now / 200) % 2 === 0;
        g.fillStyle(flash ? 0xff0000 : eagleColors[Math.max(0, this.baseHp)]);
        const ep = [
          [0,1,1,1,0,0,1,1,1,0],
          [1,1,1,1,1,1,1,1,1,1],
          [1,1,1,0,1,1,1,0,1,1],
          [1,1,1,1,1,1,1,1,1,1],
          [0,1,1,0,0,0,0,1,1,0],
          [1,1,0,0,0,0,0,0,1,1],
        ];
        for (let er = 0; er < ep.length; er++) {
          for (let ec = 0; ec < 10; ec++) {
            if (ep[er][ec]) {
              g.fillRect(x + ec + 3, y + er + 5, 1, 1);
            }
          }
        }
        break;
      }
    }
  }

  drawTank(g, tank) {
    const x = Math.round(tank.x - TILE / 2);
    const y = Math.round(tank.y - TILE / 2);
    const frame = Math.floor(tank.animTimer / 100) % 2;
    const color = tank.color;
    const dir = tank.dir;

    // Body
    g.fillStyle(color);
    g.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);

    // Tracks (sides)
    g.fillStyle(0x303030);
    if (dir === DIR.UP || dir === DIR.DOWN) {
      g.fillRect(x, y + 1, 3, TILE - 2);
      g.fillRect(x + TILE - 3, y + 1, 3, TILE - 2);
      // Track notches animation
      g.fillStyle(0x606060);
      const off = frame * 4;
      for (let i = 0; i < 3; i++) {
        g.fillRect(x + 1, y + 2 + ((i * 5 + off) % (TILE - 4)), 1, 2);
        g.fillRect(x + TILE - 2, y + 2 + ((i * 5 + off) % (TILE - 4)), 1, 2);
      }
    } else {
      g.fillRect(x + 1, y, TILE - 2, 3);
      g.fillRect(x + 1, y + TILE - 3, TILE - 2, 3);
      g.fillStyle(0x606060);
      const off = frame * 4;
      for (let i = 0; i < 3; i++) {
        g.fillRect(x + 2 + ((i * 5 + off) % (TILE - 4)), y + 1, 2, 1);
        g.fillRect(x + 2 + ((i * 5 + off) % (TILE - 4)), y + TILE - 2, 2, 1);
      }
    }

    // Hull highlight
    g.fillStyle(Phaser.Display.Color.GetColor(
      Math.min(255, Phaser.Display.Color.IntegerToRGB(color).r + 60),
      Math.min(255, Phaser.Display.Color.IntegerToRGB(color).g + 60),
      Math.min(255, Phaser.Display.Color.IntegerToRGB(color).b + 60)
    ));
    g.fillRect(x + 4, y + 4, TILE - 8, TILE - 8);

    // Turret
    g.fillStyle(color);
    g.fillRect(x + 5, y + 5, 6, 6);

    // Barrel
    g.fillStyle(color);
    switch (dir) {
      case DIR.UP:    g.fillRect(x + 7, y, 2, 8); break;
      case DIR.DOWN:  g.fillRect(x + 7, y + 8, 2, 8); break;
      case DIR.LEFT:  g.fillRect(x, y + 7, 8, 2); break;
      case DIR.RIGHT: g.fillRect(x + 8, y + 7, 8, 2); break;
    }

    // Shield indicator for armored tanks
    if (tank.hp > 1) {
      g.lineStyle(1, 0xffffff, 0.4);
      g.strokeRect(x, y, TILE, TILE);
    }
  }

  drawBullet(g, b) {
    g.fillStyle(COLORS.bullet);
    g.fillRect(Math.round(b.x) - 2, Math.round(b.y) - 2, 4, 4);
    g.fillStyle(0xffff80);
    g.fillRect(Math.round(b.x) - 1, Math.round(b.y) - 1, 2, 2);
  }

  drawExplosion(g, ex) {
    const progress = ex.frame / ex.maxFrames;
    const baseR = ex.type === 'big' ? TILE * 1.5 : TILE * 0.7;
    const r1 = baseR * progress;
    const r2 = baseR * progress * 0.6;

    g.fillStyle(0xff8000, 1 - progress * 0.5);
    g.fillCircle(ex.x, ex.y, r1);
    g.fillStyle(0xffff00, 1 - progress);
    g.fillCircle(ex.x, ex.y, r2);
    g.fillStyle(0xffffff, (1 - progress) * 0.8);
    g.fillCircle(ex.x, ex.y, r2 * 0.4);
  }

  drawSpawn(g, ex) {
    const progress = ex.frame / ex.maxFrames;
    const size = TILE * 0.8 * Math.sin(progress * Math.PI);
    g.lineStyle(2, 0xffffff, 1 - progress);
    g.strokeRect(ex.x - size, ex.y - size, size * 2, size * 2);
  }

  drawPixelText(g, text, cx, cy, color, scale = 2) {
    // Simple 3x5 pixel font map (uppercase)
    const FONT = {
      'G': [[1,1,1],[1,0,0],[1,0,1],[1,1,1],[0,1,1]],
      'A': [[0,1,0],[1,0,1],[1,1,1],[1,0,1],[1,0,1]],
      'M': [[1,0,1],[1,1,1],[1,1,1],[1,0,1],[1,0,1]],
      'E': [[1,1,1],[1,0,0],[1,1,0],[1,0,0],[1,1,1]],
      'O': [[0,1,0],[1,0,1],[1,0,1],[1,0,1],[0,1,0]],
      'V': [[1,0,1],[1,0,1],[1,0,1],[1,0,1],[0,1,0]],
      'R': [[1,1,0],[1,0,1],[1,1,0],[1,0,1],[1,0,1]],
      'P': [[1,1,0],[1,0,1],[1,1,0],[1,0,0],[1,0,0]],
      'S': [[0,1,1],[1,0,0],[0,1,0],[0,0,1],[1,1,0]],
      'T': [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
      'W': [[1,0,1],[1,0,1],[1,1,1],[1,1,1],[1,0,1]],
      'I': [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
      'N': [[1,0,1],[1,1,1],[1,1,1],[1,0,1],[1,0,1]],
      'C': [[0,1,1],[1,0,0],[1,0,0],[1,0,0],[0,1,1]],
      'U': [[1,0,1],[1,0,1],[1,0,1],[1,0,1],[0,1,0]],
      ' ': [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    };
    const charW = (3 + 1) * scale;
    const totalW = text.length * charW;
    let startX = cx - totalW / 2;

    g.fillStyle(color);
    for (let i = 0; i < text.length; i++) {
      const ch = FONT[text[i]] || FONT[' '];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (ch[row][col]) {
            g.fillRect(
              startX + i * charW + col * scale,
              cy - 2.5 * 5 * scale + row * scale,
              scale, scale
            );
          }
        }
      }
    }
  }

  updateUI() {
    const livesEl = document.getElementById('lives-display');
    const levelEl = document.getElementById('level-display');
    const enemiesEl = document.getElementById('enemies-display');
    const scoreEl = document.getElementById('score-display');
    const baseEl = document.getElementById('base-display');

    if (livesEl) livesEl.textContent = '❤'.repeat(Math.max(0, this.lives));
    if (levelEl) levelEl.textContent = this.level;
    if (enemiesEl) enemiesEl.textContent = this.enemiesLeft + this.spawnQueue.length;
    if (scoreEl) scoreEl.textContent = this.score;
    if (baseEl) {
      const hp = Math.max(0, this.baseHp);
      const colors = ['#808080', '#ff2000', '#ff6000', '#ffa000', '#ffd700', '#ffd700'];
      baseEl.style.color = colors[hp];
      baseEl.textContent = '★'.repeat(hp) + '☆'.repeat(5 - hp);
    }
  }
}

// =====================================================================
// TANK CLASS
// =====================================================================
class Tank {
  constructor(scene, x, y, type, dir) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.type = type;
    this.animTimer = 0;
    this.fireTimer = 0;
    this.aiTimer = 0;
    this.aiDir = dir;
    this.dead = false;

    const configs = {
      player: { speed: 0.75, hp: 1, color: COLORS.player, fireCooldown: 400, power: 1, scoreValue: 0, owner: 'player' },
      basic:  { speed: 0.3,  hp: 1, color: COLORS.enemy1, fireCooldown: 1800, power: 1, scoreValue: 100, owner: 'enemy' },
      fast:   { speed: 0.75, hp: 1, color: COLORS.enemy2, fireCooldown: 1200, power: 1, scoreValue: 200, owner: 'enemy' },
      armor:  { speed: 0.2,  hp: 3, color: COLORS.enemy3, fireCooldown: 2500, power: 1, scoreValue: 400, owner: 'enemy' },
    };
    const cfg = configs[type] || configs.basic;
    Object.assign(this, cfg);
  }

  fire(scene) {
    const now = scene.time.now;
    if (now - this.fireTimer < this.fireCooldown) return;
    // Max 1 bullet per player on screen
    if (this.owner === 'player') {
      const myBullets = scene.bullets.filter(b => b.owner === 'player');
      if (myBullets.length >= 2) return;
    }
    this.fireTimer = now;
    const speed = 5;
    const bx = this.x + DX[this.dir] * TILE * 0.6;
    const by = this.y + DY[this.dir] * TILE * 0.6;
    scene.bullets.push(new Bullet(bx, by, this.dir, speed, this.owner, this.power));
  }

  updateEnemy(delta, time) {
    this.aiTimer += delta;
    this.fireTimer += delta;

    // Try to fire
    if (this.fireTimer > this.fireCooldown * (0.8 + Math.random() * 0.4)) {
      this.fire(this.scene);
      this.fireTimer = 0;
    }

    // AI movement
    if (this.aiTimer > 600 + Math.random() * 800) {
      this.aiTimer = 0;
      // Sometimes change direction, bias toward player/base
      if (Math.random() < 0.4) {
        this.aiDir = Math.floor(Math.random() * 4);
      } else {
        // Move toward base or player
        const target = this.scene.basePos || { r: ROWS - 3, c: 4 };
        const tx = target.c * TILE + TILE / 2;
        const ty = target.r * TILE + TILE / 2;
        if (Math.abs(tx - this.x) > Math.abs(ty - this.y)) {
          this.aiDir = tx > this.x ? DIR.RIGHT : DIR.LEFT;
        } else {
          this.aiDir = ty > this.y ? DIR.DOWN : DIR.UP;
        }
      }
    }

    this.dir = this.aiDir;
    const nx = this.x + DX[this.dir] * this.speed * (delta / 16);
    const ny = this.y + DY[this.dir] * this.speed * (delta / 16);

    if (this.scene.isClear(nx, ny, this)) {
      this.x = nx;
      this.y = ny;
    } else {
      // Bounce
      this.aiDir = Math.floor(Math.random() * 4);
      this.aiTimer = 0;
    }

    this.x = Phaser.Math.Clamp(this.x, TILE * 0.5, W - TILE * 0.5);
    this.y = Phaser.Math.Clamp(this.y, TILE * 0.5, H - TILE * 0.5);
    this.animTimer += delta;
  }
}

// =====================================================================
// BULLET CLASS
// =====================================================================
class Bullet {
  constructor(x, y, dir, speed, owner, power = 1) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = speed;
    this.owner = owner;
    this.power = power;
    this.dead = false;
  }

  update(delta) {
    this.x += DX[this.dir] * this.speed * (delta / 8);
    this.y += DY[this.dir] * this.speed * (delta / 8);
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      this.dead = true;
    }
  }
}

// =====================================================================
// PHASER CONFIG
// =====================================================================
const config = {
  type: Phaser.AUTO,
  width: W,
  height: H,
  backgroundColor: '#1a1a1a',
  parent: 'game-container',
  scene: GameScene,
  render: {
    pixelArt: true,
    antialias: false,
  },
};

window.game = new Phaser.Game(config);
