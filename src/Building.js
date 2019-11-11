import 'phaser';

export default class Building extends Phaser.GameObjects.Container{
     /** @param {Phaser.Scene} scene */
    constructor(scene,x,y){
    super(scene)
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.time = 0;
    var width = scene.cameras.main.width;
    var height = scene.cameras.main.height;
    var randomLeft = Phaser.Math.Between(0,3);
    this.buildingLeft = this.scene.add.sprite(width/4 ,height/3 + 50,'building',randomLeft);
    this.buildingLeft.setDepth(3);
    this.buildingLeft.setScale(.01,.01);

    var randomRight = Phaser.Math.Between(0,1);
    this.buildingRight = this.scene.add.sprite(width - 220,height/3 + 50,'tree',randomRight);
    this.buildingRight.setDepth(3);
    this.buildingRight.setScale(.01,.01);

    }
    update(){
        this.moveBuilding(this.buildingLeft,4,1);
        this.moveBuilding(this.buildingRight,4,0);
    }
    moveBuilding(building,speed,isLeft){
  
        if(isLeft == 1){
        building.scaleX += .004;
        building.scaleY += .004;  
        building.x -= 2;
        if(building.scaleX >= .75){
          building.setScale(.75,.75);
        }
  
        if(building.x < -200){
          this.resetBuilding(building,1);
        }
       }else if(isLeft == 0){
          building.scaleX += .005;
          building.scaleY += .005;  
          building.x += 1.8;
          if(building.scaleX >= .75){
            building.setScale(.75,.75);
          }
          if(building.x >830){
            this.time++;
            if(this.time == 14 ){
            this.resetBuilding(building,0);
            this.time = 0;
            }
          } 
       } 
      }

      resetBuilding(building,leftSide){
        var width = this.scene.cameras.main.width;
        var height = this.scene.cameras.main.height;
        if(leftSide == 1){
        building.x= 210;
        building.y= height/3 +50;
        building.setScale(.01,.01);    
        var randomBuildingLeft = Phaser.Math.Between(0,3);
        building.setTexture('building',randomBuildingLeft);    
        }else if(leftSide == 0){
          building.x= width - 220;
          building.y= height/3 +50;
          building.setScale(.01,.01);    
          var randomBuildingRight = Phaser.Math.Between(0,1);
          building.setTexture('tree',randomBuildingRight);  
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      }
}