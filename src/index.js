//import { showMessage } from './messager';
//showMessage('Somebody else did this work!');

import 'phaser';

import { MainScene } from './scenes/mainScene';

const gameConfig = {
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: MainScene
};

new Phaser.Game(gameConfig);