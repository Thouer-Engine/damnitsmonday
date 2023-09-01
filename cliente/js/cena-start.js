export default class cenastart extends Phaser.Scene {
  constructor () {
    super('cenastart')
  }

  preload() {
    this.load.image('cena-start', '../assets/cenário/startteste.png')
    this.load.image('startbotton', '../assets/start_botton.png')

  }

  create() {
    this.imagem = this.add 
    this.add.image(400, 225, 'cena-start')
    this.add.image(400, 225, 'startbotton')
    
      .setInteractive()
      .on('pointerover', () => {
        
      })
      .on('pointerdown', () => {
        this.imagem.destroy()
        this.game.scene.stop('cenastart')
        this.game.scene.start('cena0')
      })
  }
  

  update() {}


}


