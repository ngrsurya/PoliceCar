import 'phaser';

export default class QuestScene extends Phaser.Scene{
    constructor(){
        super('Quest');

        this.text = [];
        this.counterpage;
    }

    preload(){
        this.load.image('background','src/assets/images/PageText.png');
        this.load.image('pagedialog','src/assets/images/PageDialog.png');
        this.load.spritesheet('nextbutton','src/assets/images/ButtonNext.png',{frameWidth:472/2,frameHeight:117});
        this.load.spritesheet('buttonback','src/assets/images/ButtonBack.png',{frameWidth:152/2,frameHeight:68});
    }


    create(){
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.counterpage = 0;
        this.background = this.add.image(width/2,height/2,'background');
        this.background.setScale(5,5);

        this.pagedialog = this.add.image(width/2,height/2 - 50,'pagedialog');
        this.pagedialog.setScale(.65,.65);

        this.buttonback = this.add.sprite(50,50,'buttonback',0).setInteractive();
        this.buttonback.setScale(.7,.7);

        this.buttonback.on('pointerover',function(){
            this.buttonback.setFrame(1);
        }.bind(this));

        this.buttonback.on('pointerout',function(){
            this.buttonback.setFrame(0);
        }.bind(this));

        this.buttonback.on('pointerdown',function(){
            this.scene.start('Menu');
        }.bind(this));

        this.buttonNext = this.add.image(width/2, 1220,'nextbutton',0).setInteractive();
        this.buttonNext.setScale(.7,.7);

        this.buttonNext.on('pointerover',function(){
            this.buttonNext.setFrame(1);
        }.bind(this));

        this.buttonNext.on('pointerout',function(){
            this.buttonNext.setFrame(0);
        }.bind(this));
        
        this.buttonNext.on('pointerdown',function(){
            this.updateCounter()
        }.bind(this));

        var style = {font:'27px OdudoSoft-Regular',fill:'#fff',boundsAlignH:'center',boundsAlignV:'middle'};
        var boldStyle = {font:'40px Bold OdudoSoft-Regular',fill:'#fff',boundsAlignH:'center',boundsAlignV:'middle'};
        this.text[3] = this.add.text(80,740,"Mr. Jenkins:",boldStyle);
        this.text[0] =  this.add.text(80,782,"Hey,Rookie! It's your inauguration,right? You",style);
        this.text[1] = this.add.text(80,812,'gotta go fast to the police station,the press',style);
        this.text[2] = this.add.text(80,842,"will be crowding the road if you're late!",style);
    }


    update(){
        this.checkingPage();
    }

    updateCounter(){
        if(this.counterpage < 2){
            this.counterpage += 1;
        } 
        
        if(this.counterpage == 2){
            this.scene.start('Game');
        }

    }

    checkingPage(){
        if(this.counterpage == 1){
            this.text[0].setText("Here's some direction,Rookie! Get a close");
            this.text[1].setText("look or you'll get lost!");
            this.text[2].setText('');
        }
    }
}