export default class cena0 extends Phaser.Scene {
    constructor () {
        super('cena0')
    }

    preload() {

        this.load.image('fundofinal', '../assets/cenário/fundo_final.png')
       
        this.load.spritesheet('beto', '../assets/personagem/beto_sprite.png',
            {
                frameWidth: 50,  //plínio - 60x90  beto- 50x55
                frameHeight: 55
            })
       
        this.load.spritesheet('plinio', '../assets/personagem/plinio_sprite.png',
            {
                frameWidth: 60,
                frameHeight:90
            })
        
        this.load.spritesheet('direita', '../assets/botão/direita.png', {
            frameWidth: 64, 
            frameHeight: 64
        })
        this.load.spritesheet('esquerda', '../assets/botão/esquerda.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('cima', '../assets/botão/cima.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('baixo', '../assets/botão/baixo.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet('tela_cheia', '../assets/botão/telacheia.png', {
            frameWidth: 64,
            frameHeight: 64
        })





   
    }

    create() {
        this.fundo = this.add.image(400, 225, 'fundofinal')
        
        var chao = this.add.rectangle(0, 350, 800, 30,).setOrigin(0, 0);
        this.physics.add.existing(chao);
        chao.body.allowGravity = false;
        chao.body.setImmovable(true);

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
            .setScrollFactor(0, 0)
        
       
        this.beto = this.physics.add.sprite(500, 225, 'beto')
        
        this.plinio = this.physics.add.sprite(400, 225, 'plinio')
            .setScale(1.5, 1.5)
       
       
       
        this.plinio.canJump = true
       
        


        this.physics.add.collider(this.beto, chao)
        this.physics.add.collider(this.plinio,chao)
            

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
            frameRate: 1,
        }
        )

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


        this.direita = this.add.sprite(150, 350, 'direita')
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
                
        
        this.esquerda = this.add.sprite(80, 350, 'esquerda')
            .setInteractive()
            .on('pointerdown', () => {
                this.plinio.setVelocityX(-100)
                this.esquerda.setFrame(1)
                this.plinio.anims.play('plinio-esquerda', true)
            })
            .on('pointerup', () => {
                this.esquerda.setFrame(0)
                this.plinio.setVelocityX(0)
                this.plinio.anims.play('plinio-parado-esquerda')
            } )
            
        this.up = this.add.sprite(115, 290, 'cima')
            .setInteractive()
            .on('pointerdown', () => {
                if (this.plinio.body.touching.down) {
                    this.plinio.canJump = true
                    this.up.setFrame(1)
                    this.plinio.setVelocityY(-500)
                    this.plinio.anims.play('plinio-up')
                }
            })
            .on('pointerup', () => {
                this.up.setFrame(0)
                
            })
        
        /*camera*/
        this.plinio.setCollideWorldBounds(true)
        this.physics.world.setBounds(0, 0, 100000000, 450, true,true,false,true)
        this.cameras.main.setBounds(0,0,1000000,450).startFollow(this.plinio)

        
        /*fazer o mesmo para o beto*/    
    
    }
    

    update() { 
        

    }
}


