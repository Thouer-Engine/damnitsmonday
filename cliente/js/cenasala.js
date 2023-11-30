export default class cenasala extends Phaser.Scene {
  constructor () {
    super('cenasala')
  }

  preload () {
    this.load.image('bgsala', '../assets/salas/salas.png')
    this.load.spritesheet('sala', '../assets/salas/salasbotoes.png', {
      frameWidth: 140,
      frameHeight: 45
    })
    this.load.image('texto', '../assets/salas/texto.png')
  this.load.spritesheet("tela-cheia", "./assets/botão/telacheia.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  
  }

  create () {
    this.add.image(400, 225, 'bgsala')
    this.mensagem = this.add.text(100, 75, ' ', {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#cccccc'
    })

    this.salas = [
      {
        numero: 1,
        x: 315,
        y: 100
      },
      {
        numero: 2,
        x: 485,
        y: 100
      },
      {
        numero: 3,
        x: 315,
        y: 180
      },
      {
        numero: 4,
        x: 485,
        y: 180
      },
      {
        numero: 5,
        x: 315,
        y: 260
      },
      {
        numero: 6,
        x: 485,
        y: 260
      },
      {
        numero: 7,
        x: 315,
        y: 340
      },
      {
        numero: 8,
        x: 485,
        y: 340
      }
    ]
    this.salas.forEach((sala) => {
      sala.botao = this.add.sprite(sala.x, sala.y, 'sala', sala.numero - 1)
        .setInteractive()
        .on('pointerdown', () => {
          this.salas.forEach((item) => {
            item.botao.destroy()
          })
          this.game.cenasala = sala.numero
          this.game.socket.emit('entrar-na-sala', this.game.cenasala)
        })
    })

    this.game.socket.on('jogadores', (jogadores) => {
      this.game.jogadores = jogadores
      console.log(jogadores)
      if (jogadores.segundo) {
        this.game.jogadores = jogadores
        this.game.scene.stop('cenasala')
        this.game.scene.start('cena2')
      } else if (jogadores.primeiro) {
        this.add.image(405, 200, 'texto')
          .setScale(0.5)

        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
          .then((stream) => {
            this.game.midias = stream
          })
          .catch((error) => console.error(error))
        }
      })
      this.tela_cheia = this.add
          .sprite(770, 30, 'tela-cheia', 0)
          .setInteractive()
          .on('pointerdown', () => {
            if (this.scale.isFullscreen) {
              this.tela_cheia.setFrame(0)
              this.scale.stopFullscreen()
            } else {
              this.tela_cheia.setFrame(1)
              this.scale.startFullscreen()
            }
          })
          .setScrollFactor(0, 0)
  }


  update () {

  }
}
