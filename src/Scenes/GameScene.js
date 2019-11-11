import 'phaser';
import Car from '../Car';
import Building from '../Building';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.keys;
    this.speed;
    this.speedVelocity;
    this.position = [];
    this.buildingImages = [];
    this.obstacles = [];
    this.position1;
    this.position2;
    this.position3;
    this.isright;
    this.ismiddle;
    this.isleft;
    this.leftToMiddle;
    this.rightToMiddle;
    this.timePressed;
    this.canPresed;
    this.seconds;
    this.timeSpawning;
    this.currenTime;
    this.spawnObstacle;
    this.buildings;
    this.isMovingTrash = [];
    this.trashAlreadyShowup;
    this.trashesShowup;
    this.cooldownStart;
    this.cooldownRange;
    this.trash = [];
    this.isSpawn;
    this.counter;
    this.alreadySpawn = [];
    this.stopSpawning;
    this.collideDetect = [];
    this.collideDetectBool = [];
    this.gotObstacle = [];
    this.spedo;
    this.decreaseCount;
    this.speedDecrease;
    this.gamestart;
    this.player;
  }
  
 
  
  preload () {
    this.load.image('backGround','src/assets/images/BG0.png');
    this.load.image('backGroundCity','src/assets/images/BG2.png');
    this.load.image('groundBackground','src/assets/images/BG3.png');
    this.load.image('roadImage','src/assets/images/Road.png');
    this.load.image('Trash','src/assets/images/Trash.png');
    this.load.image('Trashes','src/assets/images/Trashes.png');
    this.load.image('crack','src/assets/images/Cracks.png');
    this.load.image('collideDetect','src/assets/images/BG0.png');
    this.load.image('spedometer','src/assets/images/Speedometer.png');
    this.load.scenePlugin('Camera3DPlugin','src/camera3d.min.js','Camera3DPlugin','cameras3d');
    this.load.spritesheet('cars','src/assets/images/Cars.png',{frameWidth:873/3,frameHeight:220});
    this.load.spritesheet('player','src/assets/images/Player.png',{frameWidth:291,frameHeight:230 });
    this.load.spritesheet('building','src/assets/images/Buildings.png',{frameWidth:580,frameHeight:752});
    this.load.spritesheet('tree','src/assets/images/Trees.png',{frameWidth:556/2,frameHeight:307});     
  }

  create () {
  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  this.trashAlreadyShowup = false;

  this.obstacles[0] = 'Trash';
  this.obstacles[1] = 'crack';
  this.obstacles[2] = 'cars';
  
  this.position[0]=320;
  this.position[1]=360;
  this.position[2]=400;

  this.Trashes = this.add.image(width/2,height/2,'Trashes');
  this.Trashes.scaleX = .4;
  this.Trashes.scaleY = .4;
  this.Trashes.setDepth(3);
  this.Trashes.visible = false;
  this.spedo = 0;
  this.gameTimer = this.time.addEvent({
    delay:150,
    callback: this.spedoGrow,
    callbackScope:this ,
    loop:true
  });

   this.backgroundImage = this.add.image(width/2,height/2,'backGround');
   this.cityBuilding = this.add.image(width/2,height/2,'backGroundCity');
   this.cityBuilding.scaleX = .67;
   this.cityBuilding.scaleY = .67;

   this.spedometer = this.add.image(80,1200,'spedometer');
   this.spedometer.setDepth(3);
   this.spedometer.setScale(0.6,0.6);
   var style = {font:'50px Bold OdudoSoft-Regular',fill:'#000000'};
   this.spedoText = this.add.text(50,1170,this.spedo.toString(),style);
   this.spedoText.setDepth(3);

   this.groundBackGround = this.add.image(width/2,height/2,'groundBackground');
   this.groundBackGround.scaleX = .67;
   this.groundBackGround.scaleY = .67;

   this.roadImage = this.add.image(width/2,height - 399,'roadImage');
   this.roadImage.scaleX = .67;
   this.roadImage.scaleY = .67;
   
   this.roadImage.setFrame()
    this.speedVelocity = 600;
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    this.player = new Car(this,width/2,height-200);
    this.building = new Building(this);

    this.keys = this.input.keyboard.createCursorKeys();
    this.position1 = 170;
    this.position2= 360;
    this.position3 =550;
    this.ismiddle = true;
    this.isright = false;
    this.isleft=false;
    this.timePressed = 15;
    this.seconds = 0;
    this.cooldownRange = 40;
    this.timeSpawning = 60;
    this.currenTime = 0;
    this.cooldownStart =0;
    this.canPresed = true;  
    this.trashesShowup = false;
    this.speed = 4;
    this.counter = 0;
    this.stopSpawning = false;
    this.alreadySpawn[0] = false;
    this.alreadySpawn[1] = false;
    this.alreadySpawn[2] = false;
    this.alreadySpawn[3] = false;
    this.speedDecrease = false;
    this.spawningTrash();
    this.gamestart = true;
    this.decreaseCount = 0;
  }

  update(){
  if(this.gamestart){
   this.addingBuilding();
   this.spawningTrash();
   this.spawningTrash();
   this.player.update();
   this.building.update();
   if(this.speedDecrease){
    this.decreaseCount++;
    if(this.decreaseCount >= 60){
      this.decreaseCount = 0;
      this.speedDecrease = false;
    }
     
   }
  console.log(this.speedDecrease);
   this.resetCollideDetectBool();
   this.spedoText.setText(this.spedo.toString());
   if( this.alreadySpawn[0] == true){
     this.moveTrash(this.trash[0],this.speed);
   }

   if(this.spedo ==100){
     this.gameTimer.loop = false;
   }
   
   if(this.alreadySpawn[1] == true){
     this.moveTrash(this.trash[1],this.speed);
   }

   if(this.alreadySpawn[2] ==  true){
     this.moveTrash(this.trash[2],this.speed);
   }

   if(this.alreadySpawn[3] ==  true){
     this.moveTrash(this.trash[3],this.speed);
   }
   
    if(this.trashesShowup){
      this.Trashes.visible = true;
      if(this.Trashes.scaleX != .8){
        this.Trashes.scaleX += .1;
        this.Trashes.scaleY +=.1;
      if(this.Trashes.scaleX >= .8){
        this.Trashes.scaleX = .8;
        this.Trashes.scaleY =.8;
        }
      }
      this.checkingTrashAnim();
    }
  }
  }
  checkingIsObject(){
    this.gotObstacle = true;
    var cooldownStart = 0;
    var cooldownRange = 30;
    if(cooldownStart <= cooldownRange){
      cooldownStart++;
      if(cooldownStart == cooldownRange){
        cooldownStart = 0;
        this.gotObstacle == false;
      }
    }
  }

  checkingTrashAnim(){
    if(this.trashAlreadyShowup == true){
      this.cooldownStart++;
      if(this.cooldownStart >= this.cooldownRange){
        this.trashAlreadyShowup = false;
        this.trashesShowup = false;
        this.Trashes.visible = false;
        this.cooldownStart = 0;
      }
    }
  }
  moveTrash(obstacle ,speed){
      obstacle.scaleX += .003;
      obstacle.scaleY += .003;
      if(obstacle.scaleX >= 0.38){
        obstacle.scaleX = .41;
        obstacle.scaleY = .41;
      }
      obstacle.y += speed;
      if(obstacle.x < this.position[1]){
        obstacle.x -= (speed - 2.7);
      }else if(obstacle.x > this.position[1]){
        obstacle.x += (speed - 2.7);
      }
      if(obstacle.y > 1500){
        this.resetTrash(obstacle)
      }
    }
    resetTrash(obstacle,obs){
      console.log('reset');
      var randomX = Phaser.Math.Between(0,2);
      var randomTexture = Phaser.Math.Between(0,2);
      if(randomTexture == 0){
        obstacle.x = this.position[randomX];
        obstacle.y = 500;
        obstacle.setTexture(this.obstacles[0]);
        obstacle.setScale(.3,.3);
      }
      if(randomTexture == 1){
        obstacle.x = this.position[randomX];
        obstacle.y = 500;
        obstacle.setTexture(this.obstacles[1]);
        obstacle.setScale(.001,.001);
      }
      if(randomTexture == 2){
        obstacle.x = this.position[randomX];
        obstacle.y = 500;
        var randomValue = Phaser.Math.Between(0,2);
        obstacle.setTexture(this.obstacles[2]);
        obstacle.setFrame(randomValue);
        obstacle.setScale(.06,.06);
      }
    }

    spawningTrash(){
        this.currenTime++;
        if(this.currenTime == this.timeSpawning){
          var randomSpawn =  Phaser.Math.Between(0,1);
          if(randomSpawn == 1){
            if(this.counter < 4){
            if(this.alreadySpawn[this.counter] == false){
            var randomPosition = Phaser.Math.Between(0,2);
            var randomObstacle = Phaser.Math.Between(0,this.obstacles.length);
            if(randomObstacle == 0){
              this.trash[this.counter] = this.physics.add.image(this.position[randomPosition],500,this.obstacles[0]);
              this.trash[this.counter].scaleX =.3;
              this.trash[this.counter].scaleY =.3;
              this.physics.add.overlap(this.player.player,this.trash[this.counter],this.showUpTrash,null,this);
              this.alreadySpawn[this.counter] = true;
            }else if(randomObstacle == 1){
              this.trash[this.counter]= this.physics.add.image(this.position[randomPosition],500,this.obstacles[1]);
              this.trash[this.counter].scaleX =.001;
              this.trash[this.counter].scaleY =.001;
              this.physics.add.overlap(this.player.player,this.trash[this.counter],this.showUpTrash,null,this);
              this.alreadySpawn[this.counter] = true;
            }else if(randomObstacle == 2){
              var randomValue = Phaser.Math.Between(0,2);
              this.trash[this.counter] = this.physics.add.sprite(this.position[randomPosition],500,this.obstacles[2],randomValue);
              this.trash[this.counter].scaleX =.06;
              this.trash[this.counter].scaleY =.06;
              this.physics.add.overlap(this.player.player,this.trash[this.counter],this.showUpTrash,null,this);
              this.alreadySpawn[this.counter] = true;
            }
            if(this.counter == 0){
              this.physics.add.overlap(this.trash[this.counter],this.trash[1],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[2],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[3],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[4],this.resetTrash,null,this);  
            }else if(this.counter == 1){
              this.physics.add.overlap(this.trash[this.counter],this.trash[0],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[2],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[3],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[4],this.resetTrash,null,this);  
            }else if(this.counter == 2){
              this.physics.add.overlap(this.trash[this.counter],this.trash[0],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[1],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[3],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[4],this.resetTrash,null,this);  
            }else if(this.counter == 3){
              this.physics.add.overlap(this.trash[this.counter],this.trash[0],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[1],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[2],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[4],this.resetTrash,null,this);  
            }else{
              this.physics.add.overlap(this.trash[this.counter],this.trash[0],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[1],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[2],this.resetTrash,null,this);
              this.physics.add.overlap(this.trash[this.counter],this.trash[3],this.resetTrash,null,this);
            }
          }
            this.counter++;
            
          }
        }                                                                                                                         
          this.currenTime = 0;
          }else if( randomSpawn == 0){
            this.currenTime = 0;
          }
        }
        
  showUpTrash(player,trash){ 
    this.speedDecrease = true;
    this.trashAlreadyShowup = true;
    this.trashesShowup = true;
    trash.visible = false;
    var randomX = Phaser.Math.Between(0,2);
    var randomObstacle = Phaser.Math.Between(0,2);

    if(randomObstacle == 0){
      trash.setTexture(this.obstacles[0]);
      trash.x = this.position[randomX]; 
      trash.y = 500;
      trash.setScale(.3,.3);
      trash.visible = true;
    }else if(randomObstacle == 1){
      trash.setTexture(this.obstacles[1]);
      trash.x = this.position[randomX];
      trash.y = 500;
      trash.setScale(.001,.001);
      trash.visible = true;
    }else if(randomObstacle == 2){
      var randomRange = Phaser.Math.Between(0,2);
      trash.setTexture(this.obstacles[2]);
      trash.setFrame(randomRange);
      trash.x = this.position[randomX];
      trash.y = 500;
      trash.setScale(.06,.06);
      trash.visible = true;
    }
  
  }
  spedoGrow(){
    if(this.speedDecrease == false){
    if(this.spedo < 100){
    this.spedo++;
    }
     }
    if (this.speedDecrease == true){
    if(this.spedo > 0){
      this.spedo--;
      }
    }
  }
  checkingCollideSpawner(trash,collideDetect){
    if(trash.x <= this.position[0]){
      this.collideDetectBool[0] == true;
    }

    if(trash.x == this.position[1]){
      this.collideDetectBool[1] == true;
    }

    if(trash.x >= this.position[2]){
      this.collideDetectBool[2] =  true;
    }
  }

  resetCollideDetectBool(){
    if(this.collideDetectBool[0] == true){
      var timeToWait = 50;
      var currenTime = 0;
      currenTime++;
      if(currenTime == timeToWait){
        currenTime ==0;
        this.collideDetectBool[0] = false;
      } 
    }
    if(this.collideDetectBool[1] == true){
      var timeToWait = 50;
      var currenTime = 0;
      currenTime++;
      if(currenTime == timeToWait){
        currenTime ==0;
        this.collideDetectBool[1] = false;
      } 
    }
    if(this.collideDetectBool[2] == true){
      var timeToWait = 50;
      var currenTime = 0;
      currenTime++;
      if(currenTime == timeToWait){
        currenTime ==0;
        this.collideDetectBool[2] = false;
      } 
    }
  }
};
