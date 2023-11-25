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
    this.game.cena = 'cenamapas'

    const centrox = this.cameras.main.worldView.x + this.cameras.main.width / 2
    const centroy = this.cameras.main.worldView.y + this.cameras.main.height / 2

    this.fundofase = this.add.image(centrox, centroy, 'fundomapa')

    console.log(this.game.cenas)
    if (this.mapasbmon) this.mapasbmon.destroy()
    if (this.mapasbtue) this.mapasbtue.destroy()
    if (this.mapasbwed) this.mapasbwed.destroy()
    if (this.mapasbthu) this.mapasbthu.destroy()
    if (this.mapasbfri) this.mapasbfri.destroy()

    if (this.game.cenas === 0) {
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
    } else if (this.game.cenas === 1) {
      this.mapasbmon = this.add.sprite(centrox - 300, centroy, 'mapaslib', 0)
      this.mapasbtue = this.add.sprite(centrox - 150, centroy, 'mapaslib', 1)
        .setInteractive()
        .on('pointerdown', () => {
          this.game.socket.emit('cena-publicar', this.game.cenasala, 'cena1')
          this.game.scene.stop('cenamapas')
          this.game.scene.start('cena1')
        })
      this.mapasbwed = this.add.sprite(centrox, centroy, 'mapasbloq', 2)
      this.mapasbthu = this.add.sprite(centrox + 150, centroy, 'mapasbloq', 3)
      this.mapasbfri = this.add.sprite(centrox + 300, centroy, 'mapasbloq', 4)
    } else if (this.game.cenas === 2) {
      this.mapasbmon = this.add.sprite(centrox - 300, centroy, 'mapaslib', 0)
      this.mapasbtue = this.add.sprite(centrox - 150, centroy, 'mapaslib', 1)
      this.mapasbwed = this.add.sprite(centrox, centroy, 'mapaslib', 2)
        .setInteractive()
        .on('pointerdown', () => {
          this.game.socket.emit('cena-publicar', this.game.cenasala, 'cena2')
          this.game.scene.stop('cenamapas')
          this.game.scene.start('cena2')
        })
      this.mapasbthu = this.add.sprite(centrox + 150, centroy, 'mapasbloq', 3)
      this.mapasbfri = this.add.sprite(centrox + 300, centroy, 'mapasbloq', 4)
    } else if (this.game.cenas === 3) {
      this.mapasbmon = this.add.sprite(centrox - 300, centroy, 'mapaslib', 0)
      this.mapasbtue = this.add.sprite(centrox - 150, centroy, 'mapaslib', 1)
      this.mapasbwed = this.add.sprite(centrox, centroy, 'mapaslib', 2)
      this.mapasbthu = this.add.sprite(centrox + 150, centroy, 'mapaslib', 3)
        .setInteractive()
        .on('pointerdown', () => {
          this.game.socket.emit('cena-publicar', this.game.cenasala, 'cena3')
          this.game.scene.stop('cenamapas')
          this.game.scene.stop('cenamapas')
          this.game.scene.start('cena3')
        })
      this.mapasbfri = this.add.sprite(centrox + 300, centroy, 'mapasbloq', 4)
    } else if (this.game.cenas === 4) {
      this.mapasbmon = this.add.sprite(centrox - 300, centroy, 'mapaslib', 0)
      this.mapasbtue = this.add.sprite(centrox - 150, centroy, 'mapaslib', 1)
      this.mapasbwed = this.add.sprite(centrox, centroy, 'mapaslib', 2)
      this.mapasbthu = this.add.sprite(centrox + 150, centroy, 'mapaslib', 3)
      this.mapasbfri = this.add.sprite(centrox + 300, centroy, 'mapaslib', 4)
        .setInteractive()
        .on('pointerdown', () => {
          this.game.socket.emit('cena-publicar', this.game.cenasala, 'cena4')
          this.game.scene.stop('cenamapas')
          this.game.scene.stop('cenamapas')
          this.game.scene.start('cena4')
        })
    }
  }

  update () {
  }
}
