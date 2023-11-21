export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.tilemapTiledJSON('unico', '../assets/cenário/unico/unico.json')

    this.load.image('tileset', '../assets/cenário/unico/tileset.png')
    this.load.audio('som1', '../assets/som/background.mp3')
    this.load.audio('somportal', '../assets/som/somportal.mp3')
    this.load.audio('somroboo', '../assets/som/somrobo.mp3')
    this.load.audio('somexplosao', '../assets/som/somexplosao.mp3')
    this.load.audio('somdegameover', '../assets/som/somgameover.mp3')

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
    this.load.spritesheet('monster', '../assets/personagem/monsters/monster_red.png',
      {
        frameWidth: 118,
        frameHeight: 160
      })
    this.load.spritesheet('explosao', '../assets/itens/explosao.png',
      {
        frameWidth: 200,
        frameHeight: 208
    }
    )

    this.load.image('relatorio', '../assets/itens/mapa.png')
    this.load.image('portal', '../assets/itens/portal1.png')
    this.load.image('acionarsom', '../assets/itens/acionarsom.png')

    this.load.image('poder', '../assets/itens/poder.png')
  }

  create () {
    this.game.cena = 'cena0'

    this.game.salaCorrente = 'cena0'


    // this.physics.world.setBounds
    this.input.addPointer(3)

    this.musicaambiente = this.sound.add('som1')
    this.musicaambiente.setLoop(true)
    this.musicaambiente.play()



    this.tilemapUnico = this.make.tilemap({
      key: 'unico'
    })

    this.tilesetTileset = this.tilemapUnico.addTilesetImage('tileset')

    this.layerbackground = this.tilemapUnico.createLayer('background', [this.tilesetTileset])
    this.layerfloor = this.tilemapUnico.createLayer('floor', [this.tilesetTileset])
    this.layercm1 = this.tilemapUnico.createLayer('cm1', [this.tilesetTileset])
    this.layercm2 = this.tilemapUnico.createLayer('cm2', [this.tilesetTileset])
    this.layercm3 = this.tilemapUnico.createLayer('cm3', [this.tilesetTileset])

    // proximidade com o portal//
    function verificarProximidade (plinio, portal1, distanciaMaxima) {
      const distancia = Phaser.Math.Distance.Between(plinio.x, plinio.y, portal1.x, portal1.y)
      if (distancia <= distanciaMaxima) {
        return true
      }
      return false
    }


    /* Personagens */
    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'plinio'
      this.remoto = 'beto'
     /*plinio*/ this.eu = this.physics.add.sprite(410, 835, this.local)
     /*beto*/  this.ele = this.add.sprite(1045, 900, this.remoto)

    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'beto'
      this.remoto = 'plinio'
      /*plinio*/ this.ele = this.add.sprite(410, 835, this.remoto)
      /*beto*/  this.eu = this.physics.add.sprite(1045, 800, this.local)




      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          this.game.localConnection = new RTCPeerConnection(this.game.ice_servers)
          this.game.localConnection.onicecandidate = ({ candidate }) =>
            candidate && this.game.socket.emit('candidate', this.game.cenasala, candidate)

          this.game.localConnection.ontrack = ({ streams: [stream] }) =>
            this.game.audio.srcObject = stream

          stream.getTracks()
            .forEach((track) => this.game.localConnection.addTrack(track, stream))

          this.game.localConnection.createOffer()
            .then((offer) => this.game.localConnection.setLocalDescription(offer))
            .then(() => this.game.socket.emit('offer', this.game.cenasala, this.game.localConnection.localDescription))

          this.game.midias = stream
        })
        .catch((error) => console.error(error))
    }

    this.game.socket.on('offer', (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers)

      this.game.remoteConnection.onicecandidate = ({ candidate }) =>
        candidate && this.game.socket.emit('candidate', this.game.cenasala, candidate)

      this.game.remoteConnection.ontrack = ({ streams: [midia] }) =>
        this.game.audio.srcObject = midia

      this.game.midias.getTracks()
        .forEach((track) => this.game.remoteConnection.addTrack(track, this.game.midias))

      this.game.remoteConnection.setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) => this.game.remoteConnection.setLocalDescription(answer))
        .then(() => this.game.socket.emit('answer', this.game.cenasala, this.game.remoteConnection.localDescription))
    })

    this.game.socket.on('answer', (description) =>
      this.game.localConnection.setRemoteDescription(description)
    )

    this.game.socket.on('candidate', (candidate) => {
      const conn = this.game.localConnection || this.game.remoteConnection
      conn.addIceCandidate(new RTCIceCandidate(candidate))
    })
    // portal//

    this.portal1 = this.physics.add.image(1930, 831, 'portal')
    this.portal1.setImmovable(true)

    this.acionarsomrobo = this.physics.add.image(786, 831, 'acionarsom')
    this.acionarsomrobo.setImmovable(true)

    



    this.relatorio = this.physics.add.image(190, 225, 'relatorio')


    //monster

    this.monstersGroup = this.physics.add.group(); // Cria um grupo de monstros

    // Adiciona um monstro ao grupo
    this.monster1 = this.monstersGroup.create(1450, 750, 'monster');
    this.physics.add.collider(this.monster1, this.layerfloor)
    this.monster1.setVelocityX(-40);// Define a velocidade inicial do monstro
    this.anims.create({
      key: 'monster-esquerda',
      frames: this.anims.generateFrameNumbers('monster', {
        start: 0,
        end: 7
      }),
      frameRate: 6,
      repeat: -1
    });

    this.monster1.anims.play('monster-esquerda', true);



    /* Colisão entre personagem 1 e mapa (por layer) */
    this.layerfloor.setCollisionByProperty({ collides: true })


    this.physics.add.collider(this.eu, this.layerfloor, this.contandar, null, this)
    this.physics.add.collider(this.relatorio, this.layerfloor)

    this.physics.add.collider(this.acionarsomrobo, this.layerfloor)
    this.physics.add.collider(this.eu, this.acionarsomrobo, this.somrobot, null, this)

    this.physics.add.collider(this.eu, this.portal1, this.trocafase, null, this)
    this.physics.add.collider(this.portal1, this.layerfloor)
    this.physics.add.collider(this.eu, this.monster1, this.gameOver, null, this)
    this.physics.add.collider(this.eu, this.relatorio, this.win, null, this)



    /* anims create */

    //anims monster//


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
    
    //anims explosão//
    this.anims.create({
      key: 'explosao',
      frames: this.anims.generateFrameNumbers('explosao', {
        start: 0,
        end: 5
      }),
      frameRate: 9,
      repeat: 0
    })

    /* botões */
    this.esquerdaPressionado = false,
      this.direitaPressionado = false,

      this.direita = this.add.sprite(150, 350, 'botao', 0)
        .setScrollFactor(0)
        .setInteractive()
        .on('pointerover', () => {
          this.direitaPressionado = true,
            this.direita.setFrame(1)
          this.eu.setVelocityX(150)
          if (this.game.jogadores.primeiro === this.game.socket.id) {
            this.eu.anims.play('plinio-direita')
          } else {
            this.eu.anims.play('beto-direita')
          }
        })
        .on('pointerout', () => {
          this.direitaPressionado = false,
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
        this.esquerdaPressionado = true,
          this.eu.setVelocityX(-150)
        this.esquerda.setFrame(5)
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          this.eu.anims.play('plinio-esquerda')
        } else {
          this.eu.anims.play('beto-esquerda')
        }
      })
      .on('pointerout', () => {
        this.esquerdaPressionado = false,
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
        if (!this.direitaPressionado && !this.esquerdaPressionado) {
          if (direita.test(anim)) {
            this.eu.anims.play('plinio-direita-parado', true)
          }
          else if (esquerda.test(anim)) {
            this.eu.anims.play('plinio-esquerda-parado', true)
          }
        }
      })
    
    
    //teste ataque//
    this.ataque = this.add.sprite(705, 200, 'botao', 8)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerover', () => {

        const anim = this.eu.anims.getName()
        const esquerda = /.*esquerda.*/ // qualquer expressão com a palavra 'esquerda'
        const direita = /.*direita.*/ // qualquer expressão com a palavra 'direita'
       
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          if (esquerda.test(anim)) {
            this.bola = this.physics.add.sprite(this.eu.x, this.eu.y + 25, 'poder').setGravity(0, 300)
            this.bola.setVelocity(-700, -300)
            this.eu.setVelocityY(0)
          } else if (direita.test(anim)) {
            this.bola = this.physics.add.sprite(this.eu.x, this.eu.y + 14, 'poder').setGravity(0, 300)
            this.bola.setVelocity(700, -300)
            this.eu.setVelocityY(0)
            this.bola.body.gravity.y = 0
          }
          else {
            this.bola = this.physics.add.sprite(this.eu.x, this.eu.y + 14, 'poder').setGravity(0, 300)
            this.bola.setVelocity(700, -300)
            this.eu.setVelocityY(0)
          }
        }
        else {
          if (esquerda.test(anim)) {
            this.bola = this.physics.add.sprite(this.eu.x, this.eu.y + 25, 'poder').setGravity(0, 300)
            this.bola.setVelocity(-800, -500)
            this.eu.setVelocityY(0)
          } else if (direita.test(anim)) {
            this.bola = this.physics.add.sprite(this.eu.x, this.eu.y + 14, 'poder').setGravity(0, 300)
            this.bola.setVelocity(800, -500)
            this.eu.setVelocityY(0)
          }
          else {
            this.bola = this.physics.add.sprite(this.eu.x, this.eu.y + 14, 'poder').setGravity(0, 300)
            this.bola.setVelocity(800, -500)
            this.eu.setVelocityY(0)
          }
        }
        this.game.socket.emit('artefatos-publicar', this.game.sala, {
          bola: {
            x: this.bola.x,
            y: this.bola.y,
            velocityX: this.bola.body.velocity.x
          }
        })
     

        this.physics.add.collider(this.bola, this.layerfloor, this.bolaAtingeChao, null, this)
        this.physics.add.collider(this.bola, this.monster1, this.matarmonster, null, this)
      
        
       
        
        
        
      })

    const monster1x = this.monster1.x
    const monster1y = this.monster1.y
    /* camera */
    this.cameras.main.setBounds(0, 0, 100000, 100220)
    this.cameras.main.startFollow(this.eu)

  
  }

  update () {
    let isSceneTransitioning = false

    if (!isSceneTransitioning) {
      if (this.esquerdaPressionado) {
        this.eu.setVelocityX(-150);
      } else if (this.direitaPressionado) {
        this.eu.setVelocityX(150);
      }
    }


    try {
      this.game.socket.emit('estado-publicar', this.game.cenasala, {
        x: this.eu.x,
        y: this.eu.y,
        frame: this.eu.frame.name
      })
    } catch (error) {
      console.error(error)
    }

    this.monstersGroup.children.iterate((monster) => {
      // Verifica se o monstro atingiu os limites e inverte a direção
      if (monster.x > 1464) {
        monster.setVelocityX(-40);
        monster.flipX = false; // Inverte o sprite horizontalmente
      } else if (monster.x < 1214) {
        monster.setVelocityX(40);
        monster.flipX = true; // Reverte a orientação horizontal do sprite
      }
    });


  }


  somrobot (eu, acionarsomrobo) {
    this.acionarsomrobo.destroy();
    this.somderobo = this.sound.add('somroboo')
    this.somderobo.play()
    this.somderobo.setLoop(true)

  }

bolaAtingeChao (bola,layerfloor){
 
  setTimeout(() => {
    this.bola.destroy()
  }, 2);
}


  matarmonster (bola, monster1) {
    
    const explosaoSprite = this.add.sprite(monster1.x, monster1.y, 'explosao');
    explosaoSprite.anims.play('explosao');
    explosaoSprite.on('animationcomplete', () => {
      explosaoSprite.destroy();
    });
    this.somdeexplosao = this.sound.add('somexplosao')
    this.somdeexplosao.play()
      // Destroi o monstro
    this.monster1.destroy();    
    this.bola.destroy();
    if (this.somderobo && this.somderobo.isPlaying) {
      this.somderobo.stop();
    }
   
  }

  trocafase () {
   /* this.somportal = this.sound.add('portal')
    this.somportal.play()*/
    setTimeout(() => {
      this.game.scene.stop('cena0');
      this.game.socket.emit('cena-publicar', this.game.cenasala, 'cenamapas');
      this.game.scene.start('cenamapas');
    }, 1);
  }



  gameOver () {
    if (this.somderobo && this.somderobo.isPlaying) {
      this.somderobo.stop();
    }

    this.musicaambiente.stop();
    this.somgameover = this.sound.add('somdegameover')
    this.somgameover.play()
    setTimeout(() => {
      this.game.scene.stop('cena0');
      this.game.socket.emit('cena-publicar', this.game.cenasala, 'gameover');
      this.game.scene.start('gameover');
    }, 1);
  }

  win () {
    this.game.scene.stop('cena0')
    this.game.socket.emit('cena-publicar', this.game.cenasala, 'win')
    this.game.scene.start('win')
  }
}
