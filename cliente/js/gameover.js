export default class gameover extends Phaser.Scene {
  constructor () {
    super('gameover')
  }
  preload(){
    this.load.image('gameover', '../assets/gameover.png')

  }
  

  create() {
    this.image = this.add
    this.add.image(400,225,'gameover')
  }
  upload()

}