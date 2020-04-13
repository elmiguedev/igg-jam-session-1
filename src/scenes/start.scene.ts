import * as Phaser from "phaser";
import Gladiator from "../entities/gladiator.entity"

export default class StartScene extends Phaser.Scene {

    // properties
    // ----------------------
    private title: string = "GLADIADOR";
    private description: string[] = [
        "¿Podrás abrir el portal",
        "y escapar de la muerte?",
    ]
    private startText: string = "<Enter> para comenzar";
    private startKey:any;
    
    
    // constructor
    // ----------------------

    
    constructor() {
        super({
            key: "StartScene"
        })
    }
    
    // methods
    // ----------------------
    init() {
        this.createTitle();
        this.createPlayer();
        this.createDescription();
        this.createStartText();
        this.startKey = this.input.keyboard.addKey("enter");
    }

    getCenterX() {
        return this.game.canvas.width/2;
    }

    getCenterY() {
        return this.game.canvas.height/2;
    }
    
    createPlayer() {
        const x = this.getCenterX();
        const y = this.getCenterY();
        const g = new Gladiator(this,x,y).setOrigin(0.5);
    }

    createTitle() {
        this.add.text(
            this.getCenterX(),
            50,
            this.title
        ).setOrigin(0.5);
    }
 
    createDescription() {
        this.add.text(
            this.getCenterX(),
            150,
            this.description
        ).setOrigin(0.5);
    }

    createStartText() {
        this.add.text(
            this.getCenterX(),
            180,
            this.startText
        ).setOrigin(0.5);
    }

    startGame() {

        // this.cameras.main.fadeOut(1000);
        // this.cameras.main.on("camerafadeoutcomplete", () => {
            this.scene.start("MainScene");
        // })

    }

    update() {
        if (this.startKey.isDown) {
            this.startGame();
        }
    }
}