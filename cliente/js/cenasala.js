export default class cenasala extends Phaser.Scene {
  constructor () {
    super('cenasala')
  }

  preload () {
    
  }

  create () {
    this.salas = [
      {
        numero: 1,
        x: 100,
        y: 100
      }, 
      {
        numero: 2,
        x: 200,
        y:200
        
      }
    ]
   
      
      this.salas.forEach((sala) => {
        sala.botao = this.add
          .text(sala.x, sala.y, 'sala' + sala.numero)
          .setInteractive()
          .on('pointerdown', () => {
            this.game.socket.emit('entrar-na-sala', sala.numero)
            
          this.aguarde = this.add.text(this.game.config.widith / 2, this.game.config.heigth / 2, 'Conectando...')
            this.game.socket.on('jogadores', (jogadores) => {
              this.aguarde.destroy()
              this.game.jogadores = jogadores
              this.game.scene.stop('cenasala')
              this.game.scene.start('cena0')
            })

            
          
          })
      })
      
  
  }

  update () {
    
  }
}