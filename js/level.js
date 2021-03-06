class Level extends Phaser.Scene {
    constructor(key) {
      super({key});
      this.levelKey = key
      this.nextLevel = {
        'Level1': 'Level2',
        'Level2': 'Level3',
        'Level3': 'Level4',
        'Level4': 'Credits',
      }
    }
  
    preload() {
  
      //Levels Backgrounds
      this.load.image('level1', 'assets/images/levels/level1.jpg');
      this.load.image('level2', 'assets/images/levels/level2.jpg');
      this.load.image('level3', 'assets/images/levels/level3.jpg');
      this.load.image('level4', 'assets/images/levels/level4.jpg');


      //PLAYER SPRITES
      this.load.spritesheet('player', 'assets/images/player/walk.png', {frameWidth: 53, frameHeight: 76});
      this.load.spritesheet('running','assets/images/player/running.png', {frameWidth: 84, frameHeight: 80});
      this.load.spritesheet('jump','assets/images/player/jumping.png', {frameWidth: 75.5, frameHeight: 80});
      

      //ENEMIES SPRITES
      this.load.spritesheet('devil', 'assets/images/enemies/devil_walk_right.png', {frameWidth: 127.5, frameHeight: 100})


      //UTILITIES
      this.load.spritesheet('bullet','assets/images/utilities/bulletOne.png', {frameWidth: 42, frameHeight: 42});

      //PLATFORMS LEVEL 1
      this.load.image('L1_P1_top', 'assets/images/platforms/L1_P1_top.png');
      this.load.image('L1_P1_bottom', 'assets/images/platforms/L1_P1_bottom.png');
      this.load.image('L1_P2', 'assets/images/platforms/L1_P2.png');
      this.load.image('L1_P3', 'assets/images/platforms/L1_P3.png');
      this.load.image('L1_P4', 'assets/images/platforms/L1_P4.png');
      this.load.image('L1_P5', 'assets/images/platforms/L1_P5.png');
      this.load.image('L1_P6', 'assets/images/platforms/L1_P6.png');
      this.load.image('L1_P7', 'assets/images/platforms/L1_P7.png');
      this.load.image('ground', 'assets/images/platforms/L_ground.png');

    }
  
    create() {
      gameState.active = true;

      gameState.level1 = this.add.image(0,0, 'level1').setOrigin(0,0);

      gameState.platforms = this.physics.add.staticGroup();
      gameState.platforms.create(450, 160, 'L1_P1_top');
      gameState.platforms.create(450, 208, 'L1_P1_bottom');
      gameState.platforms.create(198, 300, 'L1_P2')
      gameState.platforms.create(701, 300, 'L1_P3')
      gameState.platforms.create(450, 392, 'L1_P4')
      gameState.platforms.create(112, 485, 'L1_P5')
      gameState.platforms.create(450, 485, 'L1_P6')
      gameState.platforms.create(787, 485, 'L1_P7')
      gameState.platforms.create(450, 577, 'ground')

      // SPRITES
      gameState.player = this.physics.add.sprite(300,440, 'player');
      gameState.devil = this.physics.add.sprite(20, 200, 'devil').setScale(.7);
      gameState.bullet = this.physics.add.group()

      //SHOTING
      



      
      //ANIMATIONS
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: 'stay',
        frames: this.anims.generateFrameNumbers('player', {start: 4, end: 4}),
        frameRate: 4,
        repeat: -1
      });
      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('running', {start:0, end: 4}),
        frameRate: 8,
        repeat: -1
      })
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('jump', {start:0, end: 5}),
        frameRate: 6,
        repeat: -1
      })

      //Enemie animations
      this.anims.create({
        key: 'devil',
        frames: this.anims.generateFrameNumbers('devil', {start: 0, end: 1}),
        frameRate: 4,
        repeat: -1
      });
      gameState.devil.anims.play('devil', true);





      //TWEENS
      gameState.devil.move = this.tweens.add({
        targets: gameState.devil,
        x: 500,
        ease: 'Linear',
        duration: 2200,
        flipX: true,
        repeat: -1,
        yoyo: true,
      });
    

      // COLLITIONS

      this.physics.add.collider(gameState.player, gameState.platforms); 
      gameState.player.setCollideWorldBounds(true);
      gameState.player.body.checkCollision.up = false;
      gameState.player.body.checkCollision.left = false;
      gameState.player.body.checkCollision.right = false;


      this.physics.add.collider(gameState.devil, gameState.platforms);
      gameState.devil.setCollideWorldBounds(true);
      gameState.devil.body.checkCollision.up = false;
      gameState.devil.body.checkCollision.left = false;
      gameState.devil.body.checkCollision.right = false;
     
      // CONTROLS
      gameState.cursors = this.input.keyboard.createCursorKeys();
      
  
    }
  
    
  //////////////////////////////////////////////////////////////////UPDATE

    update() {
  
      if(gameState.cursors.left.isDown){
         gameState.player.setVelocityX(-gameState.speed);
         gameState.player.flipX = false;
         gameState.player.anims.play('walk', true)
       } else if (gameState.cursors.right.isDown){
        gameState.player.setVelocityX(gameState.speed);
        gameState.player.flipX = true;
        gameState.player.anims.play('walk', true)
       } else {
         gameState.player.setVelocityX(0);
         gameState.player.anims.play('stay', true)
       }
       if((gameState.cursors.up.isDown ) && gameState.player.body.touching.down){
          gameState.player.setVelocityY(-600);        
       }
       if(gameState.cursors.space.isDown){
          gameState.bullet.create(gameState.player.x, gameState.player.y, 'bullet');
       }
  
      }

    }
    
  
  class Level1 extends Level {
    constructor() {
      super('Level1')
      
    }
  }
  
  class Level2 extends Level {
    constructor() {
      super('Level2')
      
    }
  }
  
  class Level3 extends Level {
    constructor() {
      super('Level3')
      
    }
  }
  
  class Level4 extends Level {
    constructor() {
      super('Level4')
      
    }
  }
  
  class Credits extends Phaser.Scene {
    constructor() {
      super({ key: 'Credits' })
    }
  
    preload() {
      this.load.spritesheet('codey_sled', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Codey+Tundra/codey_sled.png', { frameWidth: 81, frameHeight: 90 });
    }
  
    create() {
      gameState.player = this.add.sprite(config.width / 2, config.height / 2, 'codey_sled');
  
      this.anims.create({
        key: 'sled',
        frames: this.anims.generateFrameNumbers('codey_sled'),
        frameRate: 10,
        repeat: -1
      })
  
      gameState.player.angle = 20;
    }
  
    update() {
      gameState.player.anims.play('sled', true);
    }
  }
  