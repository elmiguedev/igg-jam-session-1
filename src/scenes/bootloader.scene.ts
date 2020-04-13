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
        });
        this.load.spritesheet("slime", "../assets/img/slime.png", {
            frameWidth: 16,
            frameHeight: 8
        });
        this.load.spritesheet("covid", "../assets/img/covid.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("dengue", "../assets/img/dengue.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("orb", "../assets/img/orb.png", {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet("cube", "../assets/img/cube.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image("bullet", "../assets/img/bullet.png");
        this.load.image("covid-bullet", "../assets/img/covid-bullet.png");
        this.load.image("orb-bullet", "../assets/img/orb-bullet.png");

        // load fonts
        this.load.image("namco_font", "../assets/fonts/namco.png");

        // load map
        this.load.image("map_tiles", "../assets/img/map_tiles.png");
        this.load.tilemapTiledJSON("map", "../assets/map/map.json");
        this.load.tilemapTiledJSON("map_1", "../assets/map/map_1.json");

        // load everything
        this.load.on('complete', () => {
            // this.scene.start('MainScene');
            this.scene.start('StartScene');
        });

    }


}