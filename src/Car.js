import 'phaser';

export default class Car extends Phaser.GameObjects.Container{
  /** @param {Phaser.Scene} scene */
    constructor(scene,x,y){
    super(scene);
    this.scene = scene;
    this.ismiddle = true;
    this.isright = false;
    this.isleft=false;
    this.leftToMiddle =false;
    this.rightToMiddle =false;
    this.speedVelocity = 600;
    this.timePressed = 15;
    this.seconds = 0;
    this.x = x;
    this.y = y;
    this.canPresed = true;
    this.keys = this.scene.input;
    this.physics = this.scene.world;
    //this.scene.physics.add.spri
    console.log(this.physics);
    this.anims = this.scene.anims;
    this.player = this.scene.physics.add.sprite(x,y,'player',0);

    this.anims.create({
        key:'idle',
        repeat:-1,
        frameRate: 10,
        frames: this.anims.generateFrameNames('player',{start:0,end:1})
      });
    this.player.setScale(.42,.42);
    this.player.setCollideWorldBounds(true); 
    }
    update(){
      var cursorKeys = this.scene.input.keyboard.createCursorKeys();
      var isLeftDown = cursorKeys.left.isDown ;
      var isRightDown = cursorKeys.right.isDown;
      if(isLeftDown && this.ismiddle && this.canPresed){
        this.player.setVelocityX(0);
        this.ismiddle = false;
        this.isright = false;
        this.isleft = true;
        this.leftToMiddle =false;
        this.rightToMiddle =false;
        this.player.setVelocityX(-this.speedVelocity);
        this.canPresed = false;
      }
       if(isRightDown && this.ismiddle && this.canPresed){
        this.player.setVelocityX(0);
        this.ismiddle = false;
        this.isright = true;
        this.isleft = false;
        this.leftToMiddle =false;
        this.rightToMiddle =false;
       this.player.setVelocityX(this.speedVelocity);
       this.canPresed = false;
      }
       if(isLeftDown && this.isright && this.canPresed){
        this.player.setVelocityX(0);
        this.ismiddle = true;
        this.isright = false;
        this.isleft = false;
        this.leftToMiddle =true;
        this.rightToMiddle =false;
        this.player.setVelocityX(-this.speedVelocity);
       this.canPresed = false;
      }
       if(isRightDown && this.isleft  && this.canPresed){
        this.player.setVelocityX(0);
        this.ismiddle = true;
        this.isright = false;
        this.isleft = false;
        this.leftToMiddle =false;
        this.rightToMiddle = true;
        this.player.setVelocityX(this.speedVelocity);
        this.canPresed = false;
      }
      this.updatePlayerpos();
      this.checkingTime();
    }
    
    updatePlayerpos(){
      if(this.isleft){
        if(this.player.x <= 175){
          this.player.setVelocityX(null);
          this.player.x = 175;
        }
      }
       if(this.isright){;
        if(this.player.x >= 545 ){
          this.player.setVelocityX(null);
          this.player.x = 545;
        }
      }
      if(this.ismiddle && this.leftToMiddle){
        if(this.player.x <= 360){
          this.player.setVelocityX(null);
          this.player.x = 360;
        }
      }
      if(this.ismiddle && this.rightToMiddle){
        if(this.player.x >= 360){
          this.player.setVelocityX(null);
          this.player.x = 360;
        }
      }
    }

    carMovement(){
   
    }

    checkingTime(){
      if(this.canPresed == false){
        this.seconds++;
        if(this.seconds == this.timePressed){
          this.canPresed = true;
          this.seconds = 0;
        }
      }
    }
}