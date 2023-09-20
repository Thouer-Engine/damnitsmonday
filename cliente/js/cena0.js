export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  
    this.botoesPressionados = {
      cima: false,
      direita: false,
      esquerda: false,
    };
  }
  preload () {

    this.load.tilemapTiledJSON('unico', '../assets/cenário/unico/unico.json')


    this.load.image('tileset', '../assets/cenário/unico/tileset.png')
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
  }

  create () {
    this.input.addPointer(3)

    this.tilemapUnico = this.make.tilemap({
      key: 'unico'
    })

    this.tilesetTileset = this.tilemapUnico.addTilesetImage('tileset')

    this.layerfloor = this.tilemapUnico.createLayer('floor', [this.tilesetTileset])
    this.layercm1 = this.tilemapUnico.createLayer('cm1', [this.tilesetTileset])
    this.layercm2 = this.tilemapUnico.createLayer('cm2', [this.tilesetTileset])
    this.layercm3 = this.tilemapUnico.createLayer('cm3', [this.tilesetTileset])

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
    this.relatorio = this.physics.add.image(780, 225, 'relatorio')

    this.beto = this.add.sprite(500, 100, 'beto')



    this.plinio = this.physics.add.sprite(500, 800, 'plinio')
      .setScale(1, 1)
    this.monster = this.physics.add.image(700, 225, 'monster')
    this.plinio.canJump = true

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.layerfloor.setCollisionByProperty({ collides: true })
    
    this.physics.add.collider(this.plinio, this.layerfloor)
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
        end: 31
      }),
      frameRate: 2,
      repeat: -1
    })

    /* botões */

    this.direita = this.add.sprite(150, 350, 'botao', 0)  
      .setScrollFactor(0)
      .setInteractive()

      .on('pointerover', () => {
        this.direita.setFrame(1)
        this.plinio.anims.play('plinio-direita', true)//oi
        this.plinio.setVelocityX(150)
      })
      .on('pointerout', () => {
        this.direita.setFrame(0)
        this.plinio.setVelocityX(0)
        this.plinio.anims.play('plinio-parado-direita', true)
      })

    this.esquerda = this.add.sprite(79, 350, 'botao', 4)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {
        this.plinio.setVelocityX(-150)
        this.esquerda.setFrame(5)
        this.plinio.anims.play('plinio-esquerda', true)
      })
      .on('pointerout', () => {
        this.esquerda.setFrame(4)
        this.plinio.setVelocityX(0)
        this.plinio.anims.play('plinio-parado-esquerda')
      })
      this.up = this.add.sprite(505, 310, 'botao', 6)
      .setScrollFactor(0)
        .setInteractive()
        .on('pointerover', () => {
          this.up.setFrame(7)
          let anim = this.plinio.anims.getName()
          const esquerda = new RegExp('.*esquerda.*') // qualquer expressão com a palavra 'esquerda'
          const direita = new RegExp('.*direita.*') // qualquer expressão com a palavra 'direita'
          if (this.plinio.body.blocked.down && esquerda.test(anim)) {
            this.plinio.canJump = true
            this.plinio.setVelocityY(-500)
            this.plinio.anims.play('plinio-upe')
          } 
           else if (this.plinio.body.blocked.down && direita.test(anim)) {
             this.plinio.setVelocityY(-450)
            this.plinio.anims.play('plinio-upd', true)    
          }
          

        })
        .on('pointerout', () => {
          let anim = this.plinio.anims.getName()
          const esquerda = new RegExp('.*esquerda.*') // qualquer expressão com a palavra 'esquerda'
          const direita = new RegExp('.*direita.*') // qualquer expressão com a palavra 'direita'
          this.up.setFrame(6)
          if (esquerda.test(anim)) {
            this.plinio.anims.play('plinio-esquerda', true)
          }
          else if (direita.test(anim)) {
            this.plinio.anims.play('plinio-direita', true)
          }
            
        })
        

    /*this.direitaPressionado = false;
    this.esquerdaPressionado = false;
    this.upePressionado = false;
    this.updPressionado = false; */
        

    /* camera */
    this.cameras.main.setBounds(0, 0, 10000, 1022)
    this.cameras.main.startFollow(this.plinio)
  }

  update () { 

  }
  gameover () {
    this.game.scene.stop('cena0')

  }
  gameover () {
    this.game.scene.stop('cena0')
    this.game.scene.start('gameover')
  }

  win () {
    this.game.scene.stop('cena0')
    this.game.scene.start('win')
  }
}
