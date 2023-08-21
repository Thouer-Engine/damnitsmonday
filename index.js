/*importação dos objeto*/

import cena0 from './cena0.js'
import config from './config.js'

class Game extends Phaser.Game {
    constructor () {
        super(config)

        this.scene.add('cena0',cena0)
        this.scene.start('cena0')
    }
}

window.onload = () => {
    window.game = new Game()
}

