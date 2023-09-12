export default class cenastart extends Phaser.Scene {
  constructor () {
    super('win')
  }

  preload () {
    this.load.image('imgwin', '../assets/win.png')
  }

  create () {
    this.add.image(400, 225, 'imgwin')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('win')
        this.game.scene.start('cenastart')
      })
  }

  upload () {

  }
}
