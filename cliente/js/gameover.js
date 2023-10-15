export default class gameover extends Phaser.Scene {
  constructor () {
    super('gameover')
  }

  preload () {
    this.load.image('over', '../assets/cenário/gameover.png')
    this.load.spritesheet('try', '../assets/botão/trybutton.png', {
      frameWidth: 128,
      frameHeight: 64
    })
    this.load.spritesheet('menu', '../assets/botão/menubutton.png', {
      frameWidth: 128,
      frameHeight: 64
    })
  }

  create () {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2

    this.imagem = this.add
    this.add.image(400, 225, 'over')

    this.try = this.add.sprite(centrox - 70, centroy + 100, 'try', 0)
      .setInteractive()
      .on('pointerover', () => {
        this.try.setFrame(1)
      })
      .on('pointerout', () => {
        this.try.setFrame(0)
      })
      .on('pointerdown', () => {
        this.game.scene.stop('gameover')
        this.game.scene.start('cena0')
      })
    this.menu = this.add.sprite(centrox + 70, centroy + 100, 'menu', 0)
      .setInteractive()
      .on('pointerover', () => {
        this.menu.setFrame(1)
      })
      .on('pointerout', () => {
        this.menu.setFrame(0)
      })
      .on('pointerdown', () => {
        this.game.scene.stop('gameover')
        this.game.scene.start('cenastart')
      })
  }
}
