import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import GameMenu from './Scenes/GameMenu';
import TitleScene from './Scenes/TitleScene';
import QuestScene from './Scenes/QuestScene';
import PreloadScene from './Scenes/PreloadScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('Menu',GameMenu);
    this.scene.add('Title',TitleScene);
    this.scene.add('Quest',QuestScene);
    this.scene.add('Preloader',PreloadScene);
    this.scene.start('Preloader');
  }
}

window.game = new Game();
