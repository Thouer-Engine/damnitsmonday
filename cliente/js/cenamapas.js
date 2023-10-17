export default class cenamapas extends Phaser.Scene {
  constructor () {
    super('cenamapas')
  }

  preload () {
    this.load.spritesheet('mapasbloq', '../assets/fases/botoes_comcadeado.png',
      {
        frameWidth: 200, // plínio - 60x90  beto- 50x55
        frameHeight: 200
      })

    this.load.spritesheet('mapaslib', '../assets/fases/botoes_sem_cadeado.png',
      {
        frameWidth: 115, // plínio - 60x90  beto- 50x55
        frameHeight: 115
      })
    this.load.image('fundomapa', '../assets/fases/fundo_fases.png')
  }

  create () {
    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2

    this.fundofase = this.add.image(centrox, centroy, 'fundomapa')
    
    this.mapasbmon = this.add.sprite(centrox - 300, centroy, 'mapaslib', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('cenamapas')
        this.game.scene.start('cena0')
      })

    this.mapasbtue = this.add.sprite(centrox - 150, centroy, 'mapasbloq', 1)

    this.mapasbwed = this.add.sprite(centrox, centroy, 'mapasbloq', 2)

    this.mapasbthu = this.add.sprite(centrox + 150, centroy, 'mapasbloq', 3)

    this.mapasbfri = this.add.sprite(centrox + 300, centroy, 'mapasbloq', 4)

  }

  update () {

  }
}