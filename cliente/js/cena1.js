export default class cena1 extends Phaser.Scene {
  constructor () {
    super('cena1')

    this.botoesPressionados = {
      cima: false,
      direita: false,
      esquerda: false
    }
  }

  preload () {
    this.load.tilemapTiledJSON('unico', '../assets/cenário/unico/unico.json')

    this.load.image('tileset', '../assets/cenário/unico/tileset.png')
    // this.load.audio('som1', '../assets/som/som.mp3')
    this.load.spritesheet('tela-cheia', '../assets/botão/telacheia.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('beto', '../assets/personagem/beto_sprite.png',
      {
        frameWidth: 50, // plínio - 60x90  beto- 50x55
        frameHeight: 55
      })

    this.load.spritesheet('plinio', '../assets/personagem/plinio_sprite.png',
      {
        frameWidth: 60,
        frameHeight: 90
      })

    this.load.spritesheet('botao', '../assets/botão/botoes.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.image('monster', '../assets/personagem/monster.png')
    this.load.image('relatorio', '../assets/itens/mapa.png')
    this.load.image('portal', '../assets/itens/portal1.png')
  }

  create () {
    // this.physics.world.setBounds
    this.input.addPointer(3)

    /* this.musicaambiente = this.sound.add('som1');
     this.musicaambiente.setLoop(true);
     this.musicaambiente.play(); */

    this.tilemapUnico = this.make.tilemap({
      key: 'unico'
    })

    this.tilesetTileset = this.tilemapUnico.addTilesetImage('tileset')

    this.layerbackground = this.tilemapUnico.createLayer('background', [this.tilesetTileset])
    this.layerfloor = this.tilemapUnico.createLayer('floor', [this.tilesetTileset])
    this.layercm1 = this.tilemapUnico.createLayer('cm1', [this.tilesetTileset])
    this.layercm2 = this.tilemapUnico.createLayer('cm2', [this.tilesetTileset])
    this.layercm3 = this.tilemapUnico.createLayer('cm3', [this.tilesetTileset])

    /* telacheia */
    this.telacheia = this.add
      .sprite(750, 50, 'tela-cheia', 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scale.isFullscreen) {
          this.telacheia.setFrame(0)
          this.scale.stopFullscreen()
        } else {
          this.telacheia.setFrame(1)
          this.scale.startFullscreen()
        }
      })
      .setScrollFactor(0)

    /* Personagens */
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'plinio'
      this.remoto = 'beto'
      this.eu = this.physics.add.sprite(500, 1640, this.local)
      this.ele = this.add.sprite(560, 1640, this.remoto)
      this.eu.canJump = true
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'beto'
      this.remoto = 'plinio'
      this.ele = this.add.sprite(500, 1640, this.remoto)
      this.eu = this.physics.add.sprite(560, 1640, this.local)
    } else { }

    // portal//

    this.portal1 = this.physics.add.image(1930, 831, 'portal')
    this.portal1.setImmovable(true)
    this.relatorio = this.physics.add.image(190, 225, 'relatorio')
    this.monster = this.physics.add.image(400, 225, 'monster')

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.layerfloor.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.eu, this.layerfloor, this.contandar, null, this)
    this.physics.add.collider(this.monster, this.layerfloor)
    this.physics.add.collider(this.relatorio, this.layerfloor)

    this.physics.add.collider(this.eu, this.portal1, this.trocafase, null, this)
    this.physics.add.collider(this.portal1, this.layerfloor)
    this.physics.add.collider(this.eu, this.monster, this.gameover, null, this)
    this.physics.add.collider(this.eu, this.relatorio, this.win, null, this)

    /* anims create */
    this.anims.create({
      key: 'plinio-direita',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 0,
        end: 8
      }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'plinio-esquerda',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 9,
        end: 17
      }),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key: 'plinio-upe',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 11,
        end: 11
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'plinio-upd',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 3,
        end: 3
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'plinio-direita-parado',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 18,
        end: 24
      }),
      frameRate: 2,
      repeat: -1
    })
    this.anims.create({
      key: 'plinio-esquerda-parado',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 26,
        end: 31
      }),
      frameRate: 2,
      repeat: -1
    })

    // anims beto//

    this.anims.create({
      key: 'beto-direita',
      frames: this.anims.generateFrameNumbers('beto', {
        start: 0,
        end: 1
      }),
      frameRate: 5,
      repeat: -1
    })
    this.anims.create({
      key: 'beto-esquerda',
      frames: this.anims.generateFrameNumbers('beto', {
        start: 2,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    })
    this.anims.create({
      key: 'beto-upe',
      frames: this.anims.generateFrameNumbers('beto', {
        start: 2,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'beto-upd',
      frames: this.anims.generateFrameNumbers('beto', {
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'beto-direita-parado',
      frames: this.anims.generateFrameNumbers('beto', {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    })
    this.anims.create({
      key: 'beto-esquerda-parado',
      frames: this.anims.generateFrameNumbers('beto', {
        start: 2,
        end: 3
      }),
      frameRate: 2,
      repeat: -1
    })

    /* botões */

    this.direitaPressionado = false
    this.esquerdaPressionado = false

    this.direita = this.add.sprite(150, 350, 'botao', 0)
      .setScrollFactor(0)
      .setInteractive()

      .on('pointerover', () => {
        this.direitaPressionado = true
        this.direita.setFrame(1)
        this.eu.setVelocityX(150)
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          this.eu.anims.play('plinio-direita')
        } else {
          this.eu.anims.play('beto-direita')
        }
      })
      .on('pointerout', () => {
        this.direitaPressionado = false
        this.direita.setFrame(0)
        this.eu.setVelocityX(0)
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          this.eu.anims.play('plinio-direita-parado')
        } else {
          this.eu.anims.play('beto-direita-parado')
        }
      })

    this.esquerda = this.add.sprite(79, 350, 'botao', 4)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.esquerdaPressionado = true
        this.eu.setVelocityX(-150)
        this.esquerda.setFrame(5)
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          this.eu.anims.play('plinio-esquerda')
        } else {
          this.eu.anims.play('beto-esquerda')
        }
      })
      .on('pointerout', () => {
        this.esquerdaPressionado = false
        this.esquerda.setFrame(4)
        this.eu.setVelocityX(0)
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          this.eu.anims.play('plinio-esquerda-parado')
        } else {
          this.eu.anims.play('beto-esquerda-parado')
        }
      })

    this.up = this.add.sprite(705, 310, 'botao', 6)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.up.setFrame(7)
        const anim = this.eu.anims.getName()
        const esquerda = /.*esquerda.*/ // qualquer expressão com a palavra 'esquerda'
        const direita = /.*direita.*/ // qualquer expressão com a palavra 'direita'
        if (this.eu.body.blocked.down && esquerda.test(anim)) {
          this.eu.canJump = true
          this.eu.setVelocityY(-500)
          if (this.game.jogadores.primeiro === this.game.socket.id) {
            this.eu.anims.play('plinio-upe')
          } else {
            this.eu.anims.play('beto-upe')
          }
        } else if (this.eu.body.blocked.down && direita.test(anim)) {
          this.eu.setVelocityY(-450)
          if (this.game.jogadores.primeiro === this.game.socket.id) {
            this.eu.anims.play('plinio-upd')
          } else {
            this.eu.anims.play('beto-upd')
          }
        }
        this.eu.canJump = false
      })

      .on('pointerout', () => {
        this.up.setFrame(6)
        const anim = this.eu.anims.getName()
        const esquerda = /.*esquerda.*/ // qualquer expressão com a palavra 'esquerda'
        const direita = /.*direita.*/ // qualquer expressão com a palavra 'direita'

        if (this.direitaPressionado) {
          if (this.game.jogadores.primeiro === this.game.socket.id) {
            this.eu.anims.play('plinio-direita', true)
          } else {
            this.eu.anims.play('beto-direita', true)
          }
        } else if (this.esquerdaPressionado) {
          if (this.game.jogadores.primeiro === this.game.socket.id) {
            this.eu.anims.play('plinio-esquerda', true)
          } else {
            this.eu.anims.play('beto-esquerda', true)
          }
        }
        /* if (!this.direitaPressionado && !this.esquerdaPressionado) {
           if (this.esquerda.test(anim)) {
             this.eu.anims.play('plinio-esquerda-parado', true)
           } else if (this.direita.test(anim)) {
             this.eu.anims.play('plinio-direita-parado', true)
           }
         }*/
      })
    /* camera */
    this.cameras.main.setBounds(0, 0, 100000, 100220)
    this.cameras.main.startFollow(this.eu)

    this.game.socket.on('estado-notificar', ({ cena, x, y, frame }) => {
      this.ele.x = x
      this.ele.y = y
      this.ele.setFrame(frame)
    })
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        x: this.eu.x,
        y: this.eu.y,
        frame: this.eu.frame.name
      })
    } catch (error) {
      console.error(error)
    }
  }

  trocafase () {
    this.game.scene.stop('cena1')
    this.game.scene.start('cenamapas')
  }

  gameover () {
    this.game.scene.stop('cena1')
    this.game.scene.start('gameover')
  }

  win () {
    this.game.scene.stop('cena1')
    this.game.scene.start('win')
  }
}