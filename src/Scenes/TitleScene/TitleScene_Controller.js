import 'phaser';
import MenuSceneView from '../TitleScene/TitleScene_View';

export default class MenuSceneController extends Phaser.Scene{
    constructor(){
        super('TitleSceneCont');

        this.view =  new MenuSceneView(this);
    }

    preload(){
        this.view.create();
    }

    create(){

    }

    update(){

    }
}