import saveTextures from './saveTextures';

export default class GameScene extends Phaser.Scene {
  constructor(texturesJson) {
    super({ key: 'main', active: true });

    this.texturesJson = texturesJson;
    this.pos = { x: 1152, y: 2000 };

    const addButton = document.getElementById('add-button');
    addButton.onclick = () => this.addTexture();

    document.addEventListener('keydown', e => {
      if (e.code === 'Space') this.addTexture();
    });

    this.position = document.getElementById('position');
    this.velocity = document.getElementById('velocity');
    this.zoom = document.getElementById('zoom');
  }

  preload() {
    this.load.image('bg', 'assets/map.png');

    this.load.image('stair', 'assets/stair.png');
    this.load.image('plat1', 'assets/plat1.png');
    this.load.image('vase1', 'assets/vase1.png');
    this.load.image('wall1', 'assets/wall1.png');
    this.load.image('block1', 'assets/block1.png');
    this.load.image('platform1', 'assets/platform1.png');
    this.load.image('platform2', 'assets/platform2.png');
    this.load.image('platform3', 'assets/platform3.png');
    this.load.image('vertical-block1', 'assets/vertical-block1.png');
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.texturesJson.forEach(({ x, y, key }, index) => {
      const image = this.add.image(x, y, key);
      image.setInteractive().on('pointerdown', () => {
        console.log('Delete texture: ', { x, y, key });
        this.texturesJson.splice(index, 1);
        saveTextures(this.texturesJson);
        this.scene.restart();
      });
    });

    const name = this.getSpriteName();
    this.sprite = this.physics.add.sprite(this.pos.x, this.pos.y, name);
    this.cameras.main.startFollow(this.sprite);
  }

  update() {
    const z = +this.zoom.value;
    this.cameras.main.setZoom(z);

    this.sprite.setVelocity(0);
    const v = +this.velocity.value;

    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-v);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(v);
    }

    if (this.cursors.up.isDown) {
      this.sprite.setVelocityY(-v);
    } else if (this.cursors.down.isDown) {
      this.sprite.setVelocityY(v);
    }

    const {
      halfHeight,
      halfWidth,
      position: { x, y },
    } = this.sprite.body;

    this.pos.x = Math.round(x + halfWidth);
    this.pos.y = Math.round(y + halfHeight);

    this.position.innerText = JSON.stringify(this.pos);
  }

  addTexture() {
    const { x, y } = this.pos;
    const key = this.getSpriteName();
    this.texturesJson.push({ x, y, key });

    saveTextures(this.texturesJson)
      .then(() => console.log('Saved texture: ', { x, y, key }));

    this.scene.restart();
  }

  getSpriteName() {
    return document.querySelector('input[name="texture"]:checked').value;
  }

}
