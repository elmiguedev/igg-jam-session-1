import * as Phaser from "phaser";

export default class BootloaderScene extends Phaser.Scene {

    // properties
    // ----------------------

    // constructor
    // ----------------------


    constructor() {
        super({
            key: "BootloaderScene"
        })
    }

    // methods
    // ----------------------

    /**
     * Load all assets of the game
     */
    preload() {

        // load sprites
        this.load.spritesheet("gladiator", "../assets/img/gladiator.png", {
            frameWidth: 24,
            frameHeight: 32
        })

        // load fonts
        this.load.image("namco_font", "../assets/fonts/namco.png");

        // load map
        this.load.image("map_tiles", "../assets/img/map_tiles.png");
        this.load.tilemapTiledJSON("map", "../assets/map/map.json");

        // load everything
        this.load.on('complete', () => {
            this.scene.start('MainScene');
        });

    }


}