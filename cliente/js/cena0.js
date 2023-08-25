export default class cena0 extends Phaser.Scene {
    constructor () {
        super('cena0')
    }

    preload() {

        this.load.image('ifsc-sj-2014', '../assets/fundo_final.png')
        this.load.spritesheet('beto', '../assets/beto_sprite.png',
            {
                frameWidth: 50,  //plínio - 60x90  beto- 50x55
                frameHeight: 55
            })
        this.load.spritesheet('plinio', '../assets/plinio_sprite.png',
            {
                frameWidth: 60,
                frameHeight:90
            })

    }


    create() {
        this.add.image(400, 225, 'ifsc-sj-2014')
        this.beto = this.physics.add.sprite(400, 225, 'beto')
            .setInteractive()
            .on('pointerdown', () => {
                this.beto.anims.play('beto-direita')
                this.beto.setVelocityX(100)
            })
        
        this.plinio = this.physics.add.sprite(500, 225, 'plinio')
            .setInteractive()
            .on('pointerdown', () => {
                this.plinio.anims.play('plinio-direita')
                this.plinio.setVelocityX(100)
            })
            
            /*.on('pointerup', () => {})
            .on('pointerup', () => {})*/
        
        this.anims.create({
            key: 'beto-direita',
            frames: this.anims.generateFrameNumbers('beto',{
            start: 0,
            end: 1    
            }),
            frameRate: 6,
            repeat: -1
    
        })
        this.anims.create({
            key: 'plinio-direita',
            frames: this.anims.generateFrameNumbers('plinio', {
                start: 0,
                end: 8
            }),
            frameRate: 6,
            repeat: -1
        })
        
    }

    update() { }
}

