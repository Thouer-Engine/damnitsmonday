export default class cenastart extends Phaser.Scene {
  constructor () {
    super('cenastart')
  }

  preload () {
    this.load.image('startbotton', '../assets/cenário/start.png')
  }

  create () {
    this.imagem = this.add
    this.add.image(400, 225, 'imgcenastart')
    this.add.image(400, 225, 'startbotton')

      .setInteractive()

      .on('pointerover', () => {
        this.scale.startFullscreen()
        this.game.scene.stop('cenastart')
        this.game.scene.start('cenasala')
      })
  }

  update () { }
}
