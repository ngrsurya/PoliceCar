import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 720,
  height: 1280,
  physics:{
    default: 'arcade',
    arcade:{
      debug:false
    }
  }
};
