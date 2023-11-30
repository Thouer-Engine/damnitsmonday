export default class cut4 extends Phaser.Scene {
  constructor() {
    super("cut4");
  }

  preload() {
    this.load.image("cut4", "../assets/citfindplinio.png");
   this.load.image("portal", "../assets/itens/portal1.png");
  }

  create () {
    this.cutscene = this.add.image(400, 225, "cut4")
     
     const botaox = this.add.image(400, 225, "portal").setScrollFactor(0, 0);
     botaox.setDisplaySize(800, 450);
     botaox.setInteractive();
     botaox
       .on(
         "pointerdown",
         () => {
            this.game.scene.stop("cut4");
           this.game.scene.start("cenafinal");
        
         },
         this
       )
     
    
  }

  update() {}
}
