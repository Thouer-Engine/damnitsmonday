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
    //this.load.audio('som1', '../assets/som/som.mp3')
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
    this.load.image('portal1', '../assets/itens/portal1.png')
    this.load.image('portal2', '../assets/itens/portal2.png')
  
  }


  create () {
    this.physics.world.setBounds
    this.input.addPointer(3)

   /* this.musicaambiente = this.sound.add('som1');
    this.musicaambiente.setLoop(true);
    this.musicaambiente.play();*/

    this.tilemapUnico = this.make.tilemap({
      key: 'unico'
    })

    this.tilesetTileset = this.tilemapUnico.addTilesetImage('tileset')

    this.layerfloor = this.tilemapUnico.createLayer('floor', [this.tilesetTileset])
    this.layerbackground = this.tilemapUnico.createLayer('background', [this.tilesetTileset])
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
    this.relatorio = this.physics.add.image(500, 225, 'relatorio')

    this.beto = this.add.sprite(500, 100, 'beto')

    

    this.plinio = this.physics.add.sprite(670, 835, 'plinio')
      .setScale(1, 1)

    this.portal1 = this.physics.add.image(1930, 831, 'portal1')
    this.portal1.setImmovable(true)
    this.portal2 = this.physics.add.image(2545, 1715, 'portal2')
    this.portal2.setImmovable(true)


    this.monster = this.physics.add.image (400, 225, 'monster')
    this.plinio.canJump = true

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.layerfloor.setCollisionByProperty({ collides: true })
    
    this.physics.add.collider(this.plinio, this.layerfloor, this.contandar, null, this)
    this.physics.add.collider(this.monster, this.layerfloor)
    this.physics.add.collider(this.relatorio, this.layerfloor)


    this.physics.add.collider(this.plinio, this.portal1, this.segundafase, null, this)
    this.physics.add.collider(this.plinio, this.portal2, this.terceirafase, null, this)
    this.physics.add.collider(this.portal1, this.layerfloor)
    this.physics.add.collider(this.portal2, this.layerfloor)
    this.physics.add.collider(this.plinio, this.monster, this.gameover, null, this)
    this.physics.add.collider(this.plinio, this.relatorio, this.win, null, this)

   


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

    let direitaPressionado = false;
    let esquerdaPressionado = false;
   
    


    this.direita = this.add.sprite(150, 350, 'botao', 0)
      .setScrollFactor(0)
      .setInteractive()

      .on('pointerover', () => {
        direitaPressionado = true;
        esquerdaPressionado = true;
       
        
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
        esquerdaPressionado = true;
        direitaPressionado = false;
    
        this.plinio.setVelocityX(-150)
        this.esquerda.setFrame(5)
        this.plinio.anims.play('plinio-esquerda', true)
      })
      .on('pointerout', () => {
        this.esquerda.setFrame(4)
        this.plinio.setVelocityX(0)
        this.plinio.anims.play('plinio-parado-esquerda')
      })
     

   

    this.up = this.add.sprite(705, 310, 'botao', 6)
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
        this.plinio.canJump = false;
      })
      
      .on('pointerout', () => {
        this.up.setFrame(6)
        const esquerda = new RegExp('.*esquerda.*') // qualquer expressão com a palavra 'esquerda'
        const direita = new RegExp('.*direita.*') // qualquer expressão com a palavra 'direita'
      

        
          if (direitaPressionado) {
            this.plinio.anims.play('plinio-direita', true);
          }

        
        
          else if (esquerdaPressionado) {
            this.plinio.anims.play('plinio-esquerda', true);
          }
      
        
        
        
        
      })

    /*  .on('pointerup', () => {
        let anim = this.plinio.anims.getName();
        const esquerda = new RegExp('.*esquerda.*');
        const direita = new RegExp('.*direita.*');
        this.up.setFrame(6)
        if ((esquerda.test(anim) || direita.test(anim))) {

          if (esquerda.test(anim)) {
            this.plinio.anims.play('plinio-esquerda', true);
          } else if (direita.test(anim)) {
            this.plinio.anims.play('plinio-direita', true);
          }
        }
      })     
  
*/

    

    /*this.direitaPressionado = false;
    this.esquerdaPressionado = false;
    this.upePressionado = false;
    this.updPressionado = false; */
        

    /* camera */
    this.cameras.main.setBounds(0, 0, 100000, 100220)
    this.cameras.main.startFollow(this.plinio)
  }



  
  /*contandar (plinio, floor) {
    if (this.botao.frame.name === 1) {
      if (this.botao.frame.name === 7) {
        this.plinio.anims.play('upd')
        this.plinio.setVelocityX(150)
      }
    } else if (this.botao.frame.name === 1) {
      if (this.botao.frame.name === 5) {
        this.plinio.anims.play('upe')
        this.plinio.setVelocityX(-150)
      }
    }
  }*/
  /*contandar () {
    this.esquerdaPressionado = false;
    this.upePressionado = false;
    this.updPressionado = false;


    if (this.esquerdaPressionado) {
      this.plinio.setVelocityX(-150)
      this.plinio.anims.play('plinio-esquerda', true)

    }
    }*/


  update () {
    
    
  }
  segundafase () {
    
      this.plinio.x = 500;
    this.plinio.y = 1640;
    }
    
  terceirafase () {

    this.plinio.x = 324;
    this.plinio.y = 2510;
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
