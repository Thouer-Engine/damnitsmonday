/* importação dos objeto */
import config from './config.js'
import cena0 from './cena0.js'
import cena1 from './cena1.js'
import cena2 from './cena2.js'
import cena3 from './cena3.js'
import cena4 from './cena4.js'
import gameover from './gameover.js'
import cenastart from './cenastart.js'
import cenasala from './cenasala.js'
import win from './win.js'
import cenamapas from './cenamapas.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.socket = io()
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor!')
    })
    this.scene.add('cenamapas', cenamapas)
    this.scene.add('cenastart', cenastart)
    this.scene.add('cena0', cena0)
    this.scene.add('cena1', cena1)
    this.scene.add('cena2', cena2)
    this.scene.add('cena3', cena3)
    this.scene.add('cena4', cena4)
    this.scene.add('gameover', gameover)
    this.scene.add('win', win)
    this.scene.add('cenasala', cenasala)

    this.scene.start('cenasala')
  }
}

window.onload = () => {
  window.game = new Game()
}
