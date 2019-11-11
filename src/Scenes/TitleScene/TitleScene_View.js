import  'phaser';

export default class TitleSceneView extends Phaser.GameObjects.Container{
         /** @param {Phaser.Scene} scene */
    constructor(scene){
        super(scene);
        this.scene = scene;
    }

    create(){
        var width = this.scene.cameras.main.width;
        var height = this.scene.cameras.main.height;
        this.titleBg = this.scene.add.image(width/2,height/2,'titleBackground');
        this.titleBg.setScale(.67,.67); 

        this.tutorButton = this.scene.add.sprite(width/2,1200,'tutorButton',0).setInteractive();
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



        this.playButton = this.scene.add.sprite(width/2,1100,'playButton',0).setInteractive();
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
}