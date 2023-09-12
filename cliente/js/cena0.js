export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    
    this.load.image('fundofinal', '../assets/cenário/segunda/png/segunda.png')
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
    this.load.image('relatorio', '../assets/mapa.png')
    this.load.image('win', '../assets/win.png')
  }

  create () {
    this.fundo = this.add.image(600, 225, 'fundofinal')

    const chao = this.add.rectangle(0, 350, 10000, 30).setOrigin(0, 0)
    this.physics.add.existing(chao)
    chao.body.allowGravity = false
    chao.body.setImmovable(true)

    /* telacheia */
    this.telacheia = this.add
      .sprite(750, 50, 'tela_cheia', 0)
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
    this.relatorio = this.physics.add.image(50, 225, 'relatorio')

    this.beto = this.add.sprite(500, 100, 'beto')
    this.plinio = this.physics.add.sprite(400, 225, 'plinio')
      .setScale(1, 1)
    this.monster = this.physics.add.image(60, 225, 'monster')
    this.plinio.canJump = true

    /* colisão personagens */

    this.physics.add.collider(this.plinio, chao)
    this.physics.add.collider(this.beto, chao)
    this.physics.add.collider(this.monster, chao)
    this.physics.add.collider(this.relatorio, chao)
    this.physics.add.collider(this.plinio, this.monster, this.gameover, null, this)
    this.physics.add.collider(this.plinio, this.relatorio, this.win, null, this)

    /* this.timer = 3
                    this.timedEvent = this.time.addEvent({
                        delay: 1000,
                        callback: this.countdown,
                        loop: true
                    }) */

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
      key: 'plinio-up',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 3,
        end: 3
      }),
      frameRate: 1
    })
    this.anims.create({
      key: 'plinio-parado-direita',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 18,
        end: 24
      }),
      frameRate: 2,
      repeat: -1
    })
    this.anims.create({
      key: 'plinio-parado-esquerda',
      frames: this.anims.generateFrameNumbers('plinio', {
        start: 26,
        end: 32
      }),
      frameRate: 2,
      repeat: -1
    })

    /* botões */
    this.direita = this.add.sprite(150, 350, 'botao', 0)
      .setScrollFactor(0)
      .setInteractive()

      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.plinio.anims.play('plinio-direita', true)
        this.plinio.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.plinio.setVelocityX(0)
        this.plinio.anims.play('plinio-parado-direita', true)
      })

    this.esquerda = this.add.sprite(80, 350, 'botao', 4)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.plinio.setVelocityX(-100)
        this.esquerda.setFrame(5)
        this.plinio.anims.play('plinio-esquerda', true)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(4)
        this.plinio.setVelocityX(0)
        this.plinio.anims.play('plinio-parado-esquerda')
      })

    this.up = this.add.sprite(700, 290, 'botao', 6)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.plinio.body.touching.down) {
          this.plinio.canJump = true
          this.up.setFrame(7)
          this.plinio.setVelocityY(-500)
          this.plinio.anims.play('plinio-up')
        }
      })
      .on('pointerup', () => {
        this.up.setFrame(6)
      })

    /* camera */
    this.plinio.setCollideWorldBounds(true)
    this.physics.world.setBounds(-1000, 0, 100000000, 450, true, true, false, true)
    this.cameras.main.setBounds(-1000, 0, 1000000, 450).startFollow(this.plinio)
  }

  update () { }

  gameover () {
    this.game.scene.stop('cena0')
    this.game.scene.start('gameover')
  }

  win () {
    this.game.scene.stop('cena0')
    this.game.scene.start('win')
  }
}
