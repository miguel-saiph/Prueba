//import { showMessage } from './messager';
//showMessage('Somebody else did this work!');

import 'phaser';

import { MainScene } from './scenes/mainScene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: MainScene
};

new Phaser.Game(gameConfig);