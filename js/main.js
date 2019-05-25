
const gameState = {
  speed: 240,
  ups: 380,
};

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  fps: {target: 60},
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 },
      enableBody: true,
    }
  },
  scene: [Level1, Level2, Level3, Level4, Credits]
};

const game = new Phaser.Game(config);