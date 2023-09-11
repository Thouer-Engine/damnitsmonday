/* importação dos objeto */
import config from './config.js'
import cenastart from './cena-start.js'
import cena0 from './cena0.js'
import gameover from './gameover.js'



class Game extends Phaser.Game {
    constructor () {
        super(config)

        this.scene.add('cena-start.js', cenastart)
        this.scene.add('cena0', cena0)
        this.scene.add('gameover', gameover)
        this.scene.start('cenastart')
        
    }
}

window.onload = () => {
    window.game = new Game()

}
