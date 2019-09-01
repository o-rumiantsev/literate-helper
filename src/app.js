import Phaser from 'phaser';
import GameScene from './game-scene';
import loadTextures from './loadTextures';
import createRadioTextures from './radio-textures';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  width: 1200,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  }
};

loadTextures().then(texturesJson => {
  config.scene = new GameScene(texturesJson);
  const game = new Phaser.Game(config);
  createRadioTextures(config.scene);
});

