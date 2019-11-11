import 'phaser';

export default class PreloaderScene extends Phaser.Scene{
    constructor(){
        super('Preloader');
        this.loadingCounter;
    }

    preload(){
        this.load.spritesheet('player','src/assets/images/Player.png',{frameWidth:582/2,frameHeight:230});
        this.load.spritesheet('tree','src/assets/images/Trees.png',{frameWidth:556/2,frameHeight:307});
        this.load.spritesheet('building','src/assets/images/Buildings.png',{frameWidth:2900/5,frameHeight:752});
        this.load.image('titleBackground','src/assets/images/BG1.png');
        this.load.spritesheet('playButton','src/assets/images/ButtonPlay.png',{frameWidth:986/2,frameHeight:117});
        this.load.spritesheet('tutorButton','src/assets/images/ButtonTuts.png',{frameWidth:986/2,frameHeight:117});

        this.loadingCounter = 0;
        var style = {font:'50px Bold OdudoSoft-Regular',fill:'#fff'};
        var widht = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.loadingText = this.add.text(widht/2-70,height/2,this.loadingCounter.toString(),style)
        this.loading = this.add.text(widht/2 -120 ,height/2 + 70,'Loading...',style);
        this.timedEvent = this.time.addEvent({
            delay: 3,
            callback: this.loadScene,
            callbackScope: this,
            loop:true
        });
       

   
    }

    create(){

     
    }

    loadScene(){
        if(this.loadingCounter < 100){
            this.loadingCounter++;
            this.loadingText.setText(this.loadingCounter.toString() + '%');
        }else{
            this.scene.start('Menu');
        }
     
    }
}