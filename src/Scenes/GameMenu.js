import 'phaser';
import{GameObejcts} from 'phaser';
import Car from '../Car';

export default class GameMenu extends Phaser.Scene{
    constructor(){
        super('Menu');
        this.tutorSlide = [];
        this.tutorText = [];
        this.currentPage;
    }

    preload(){
        this.load.image('background','src/assets/images/Pagetext.png');
        this.load.spritesheet('buttonPlay','src/assets/images/ButtonPlay.png',{frameWidth:986/2,frameHeight:117});
        this.load.spritesheet('pagetutorials','src/assets/images/PageTutorials.png',{frameWidth:2388/3,frameHeight:840});
        this.load.spritesheet('buttonRight','src/assets/images/ButtonRight.png',{frameWidth:234/2,frameHeight:117})
        this.load.spritesheet('buttonLeft','src/assets/images/ButtonLeft.png',{frameWidth:234/2,frameHeight:117});
        this.load.spritesheet('backButton','src/assets/images/ButtonBack.png',{frameWidth:152/2,frameHeight:68});
        this.load.audio('buttonclick',['src/assets/sounds/Pops.wav']);
        this.currentPage = 0;
    }

    create(){
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.background = this.add.image(width/2,height/2,'background');
        this.background.setScale(4,4);
        this.popsound = this.sound.add('buttonclick',{volume: 0.5, loop:false});

        this.tutorSlide[0] = this.add.sprite(width/2,height/2 -150,'pagetutorials',0);
        this.tutorSlide[0].setScale(.65,.65);
        this.tutorSlide[0].visible = true;

        this.tutorSlide[1] = this.add.sprite(width/2,height/2 - 150,'pagetutorials',1);
        this.tutorSlide[1].setScale(.65,.65);
        this.tutorSlide[1].visible = false;
        
        this.tutorSlide[2] = this.add.sprite(width/2,height/2 - 150,'pagetutorials',2);
        this.tutorSlide[2].setScale(.65,.65);
        this.tutorSlide[2].visible = false;

        this.buttonPlay = this.add.sprite(width/2,1110,'buttonPlay',0).setInteractive();
        this.buttonPlay.setScale(.75,.75);

        this.buttonPlay.on('pointerdown',function(){
            this.scene.start('Quest');
        }.bind(this));

        this.buttonPlay.on('pointerover',function(){
            this.buttonPlay.setFrame(1);
        }.bind(this));
        
        this.buttonPlay.on('pointerout',function(){
            this.buttonPlay.setFrame(0);
        }.bind(this));
        

        this.buttonRight = this.add.sprite(665,480 ,'buttonRight',0).setInteractive();
        this.buttonRight.setScale(.7,.7);
        this.buttonRight.on('pointerdown',function(){
            this.currentPage += 1;
        }.bind(this));

        this.buttonRight.on('pointerover',function(){
            this.buttonRight.setFrame(1);
        }.bind(this));

        this.buttonRight.on('pointerout',function(){
            this.buttonRight.setFrame(0);
        }.bind(this));

        this.buttonLeft = this.add.sprite(54,480,'buttonLeft',0).setInteractive();
        this.buttonLeft.setScale(.7,.7);
        this.buttonLeft.on('pointerdown',function(){
            this.currentPage -= 1;
            this.popsound.play();
        }.bind(this));

        this.buttonLeft.on('pointerover',function(){
            this.buttonLeft.setFrame(1);
        }.bind(this));

        this.buttonLeft.on('pointerout',function(){
            this.buttonLeft.setFrame(0);
        }.bind(this));

        this.textBox = this.add.image(width/2,925,'background');
        this.textBox.setScale(.6,.6);
        

        this.style = {font:'26px OdudoSoft-Regular',fill:'#fff',boundsAlignH:'center',boundsAlignV:'middle'};
        this.tutorText[0] = this.add.text(125,840,'',this.style);
        this.tutorText[1] = this.add.text(125,870,'',this.style);
        this.tutorText[2] = this.add.text(125,930,'',this.style);
        this.tutorText[3] = this.add.text(125,960,"",this.style);
        
      
        this.backButton = this.add.sprite(40,40,'backButton',0).setInteractive();
        this.backButton.setScale(.7,.7);
        this.backButton.on('pointerover',function(){
            this.backButton.setFrame(1);
        }.bind(this));

        this.backButton.on('pointerout',function(){
            this.backButton.setFrame(0);
        }.bind(this));

        this.backButton.on('pointerdown',function(){
            this.scene.start('Title');
        }.bind(this));
    }

    update(){
      this.checkingCurrentPage();
    }

    updateButtonRight(){
        this.buttonRight.setFrame(0);
    }

    checkingCurrentPage(){
        if(this.currentPage == 0){
            this.buttonRight.visible = true
            this.buttonLeft.visible = false;
            this.tutorSlide[0].visible = true;
            this.tutorSlide[1].visible = false;
            this.tutorSlide[2].visible = false;

            this.tutorText[0].setText('Move using your finger to swipe left or')
            this.tutorText[1].setText('right to dodge the obstacles.')
            this.tutorText[2].setText('The more obstacle you dodge,the')
            this.tutorText[3].setText("faster you'll get to the Inaugration")
            
        
        }

        if(this.currentPage == 1){
            this.buttonLeft.visible = true;
            this.buttonRight.visible = true;
            this.tutorSlide[0].visible = false;
            this.tutorSlide[1].visible = true;
            this.tutorSlide[2].visible = false;
            
            this.tutorText[0].setText('Sign means that the lane there will be')
            this.tutorText[1].setText('an obstacle')
            this.tutorText[2].setText('Avoid the obstacle')
            this.tutorText[3].setText('as you can get to the best score.')
        }

        if(this.currentPage == 2){
            this.buttonLeft.visible = true;
            this.buttonRight.visible = false;
            this.tutorSlide[0].visible = false;
            this.tutorSlide[1].visible = false;
            this.tutorSlide[2].visible = true;

            this.tutorText[0].setText('If you hit an obstacle,then your speed')
            this.tutorText[1].setText('will decrase')
            this.tutorText[2].setText('Which causes decrease your score')
            this.tutorText[3].setText('')
        }
    }

};