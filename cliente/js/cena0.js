export default class cena0 extends Phaser.Scene {
    constructor () {
        super('cena0')
    }

    preload() {

        this.load.image('ifsc-sj-2014', '../assets/fundo_final.png')
        this.load.spritesheet('derek', '../assets/derek.png',
            {
                frameWidth: 64,
                frameHeight: 64
            })

    }

    create() {
        this.add.image(400, 225, 'ifsc-sj-2014')
        this.personagem = this.physics.add.sprite(400, 225, 'derek')
            .setInteractive()
            .on('pointerdown', () => {
                this.personagem.anims.play('derek-direita')
                this.personagem.setVelocityX(100)
            })
            
            
            /*.on('pointerup', () => {})
            .on('pointerup', () => {})*/
        
        this.anims.create({
            key: 'derek-direita',
            frames: this.anims.generateFrameNumbers('derek',{
            start: 8,
            end: 11    
            }),
            frameRate: 6,
            repeat: -1
    
        })
        
    }

    update() { }
}

