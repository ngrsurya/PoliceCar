import 'phaser';

export default class TitleScene extends Phaser.Scene{
    constructor(){
        super('Title');
    }

    preload(){
        this.load.image('titleBackground','src/assets/images/BG1.png');
        this.load.spritesheet('playButton','src/assets/images/ButtonPlay.png',{frameWidth:986/2,frameHeight:117});
        this.load.spritesheet('tutorButton','src/assets/images/ButtonTuts.png',{frameWidth:986/2,frameHeight:117});
    }

    create(){
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.titleBg = this.add.image(width/2,height/2,'titleBackground');
        this.titleBg.setScale(.67,.67); 

        this.tutorButton = this.add.sprite(width/2,1200,'tutorButton',0).setInteractive();
        this.tutorButton.setScale(.62,.62);
        this.tutorButton.on('pointerover',function(){
            this.tutorButton.setFrame(1);
        }.bind(this));

        this.tutorButton.on('pointerout',function(){
            this.tutorButton.setFrame(0);
        }.bind(this));

        this.tutorButton.on('pointerdown',function(){
            this.scene.start('Menu');
        }.bind(this));



        this.playButton = this.add.sprite(width/2,1100,'playButton',0).setInteractive();
        this.playButton.setScale(.62,.62);
        this.playButton.on('pointerover',function(){
            this.playButton.setFrame(1);
        }.bind(this));

        this.playButton.on('pointerout',function(){
            this.playButton.setFrame(0);
        }.bind(this));

        this.playButton.on('pointerdown',function(){
            this.scene.start('Menu');
        }.bind(this));

    }

    update(){

    }
}
