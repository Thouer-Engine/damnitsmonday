/* importação dos objeto */
import win from './win.js'
import config from './config.js'
import cena0 from './cena0.js'
import gameover from './gameover.js'
import cenastart from './cenastart.js'


class Game extends Phaser.Game {
    constructor () {
        super(config)

        this.scene.add('cenastart', cenastart)
        this.scene.add('cena0', cena0)
        this.scene.add('gameover', gameover)
        this.scene.add('win', win)
        this.scene.start('cenastart')

    }
}

window.onload = () => {
    window.game = new Game()

}
