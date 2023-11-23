/* importação dos objeto */
import config from './config.js'
import cena0 from './cena0.js'
import cena1 from './cena1.js'
import cena2 from './cena2.js'
import cena3 from './cena3.js'
import cena4 from './cena4.js'
import cenafinal from './cenafinal.js'
import gameover from './gameover.js'
import cenastart from './cenastart.js'
import cenasala from './cenasala.js'
import win from './win.js'
import cenamapas from './cenamapas.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.id = 10 // Jogo Pesadelos Lúcidos, id 1
    this.valor = 100 // crédito padrão em Tijolinhos quando termina o jogo
    
    let iceServers
    if (window.location.host === 'feira-de-jogos.sj.ifsc.edu.br') {
      iceServers = [
        {
          urls: 'stun:feira-de-jogos.sj.ifsc.edu.br'
        },
        {
          urls: 'turns:feira-de-jogos.sj.ifsc.edu.br',
          username: 'adcipt',
          credential: 'adcipt20232'
        }
      ]
    } else {
      iceServers = [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    this.iceServers = { iceServers }
    this.audio = document.querySelector('audio')

    this.socket = io()
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor!')
    })


    this.socket.on('cena-notificar', cena => {
      this.scene.stop(this.cena)
      this.scene.start(cena)
    })


    this.socket.on('estado-notificar', ({ x, y, frame }) => {
      try {
        this.scene.getScene(this.salaCorrente).ele.x = x
        this.scene.getScene(this.salaCorrente).ele.y = y
        this.scene.getScene(this.salaCorrente).ele.setFrame(frame)
      }
      catch (e) {
        console.error(e)
      }
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
    this.scene.add('cenafinal', cenafinal)
    this.scene.add('cenasala', cenasala)

    this.salaCorrente = 'cenastart'
    this.cenas = 0 
    this.scene.start(this.salaCorrente)
  }
}

window.onload = () => {
  window.game = new Game()
}
