import * as Phaser from "phaser";
import Gladiator from "../entities/gladiator.entity";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private keys: any;
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        background: Phaser.Tilemaps.StaticTilemapLayer,
        objects: Phaser.Tilemaps.ObjectLayer,
    };
    private playerCamera: any;
    private gladiator: Gladiator;

    // constructor 
    // ----------------------


    constructor() {
        super({
            key: "MainScene"
        })
    }

    // methods 
    // ----------------------

    init() {

        this.createMap();
        this.createGladiator();
        this.createKeys();
        this.configureCamera();
        this.createHud();
        this.createCollisions();
    }

    createHud() {
    }

    createMap() {
        // const map = this.make.tilemap({ key: "l_1" });
        // const tileset = map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);
        // const background = map.createStaticLayer("background", tileset, 0, 0);
        // // const obstacles = map.createStaticLayer("obstacles", tileset, 0, 0).setDepth(5);
        // // const overlayer = map.createStaticLayer("overlayer", tileset, 0, 0).setDepth(10);
        // const objects = map.getObjectLayer("objects");


        // this.mapLayers = {
        //     map: map,
        //     background: background,
        //     objects: objects
        // }
    }

    createGladiator() {
        this.gladiator = new Gladiator(this, 50, 50);
    }

    createCollisions() {
    }


    configureCamera() {
        // // this is a fix for tiles jitter
        // this.playerCamera = new Phaser.Geom.Point(this.ant.x, this.ant.y);
        // this.cameras.main.startFollow(this.playerCamera);
        // this.cameras.main.setBounds(
        //     0,
        //     0,
        //     this.mapLayers.map.widthInPixels,
        //     this.mapLayers.map.heightInPixels
        // );
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("w"),
            down: this.input.keyboard.addKey("s"),
            left: this.input.keyboard.addKey("a"),
            right: this.input.keyboard.addKey("d"),
            space: this.input.keyboard.addKey("space")
        }
    }

    // update methods
    // -----------------------------

    update() {
        this.checkCamera();
        this.checkInput();
        this.gladiator.update();
    }

    checkInput() {
        if (this.keys.left.isDown) this.gladiator.walk("left");
        if (this.keys.right.isDown) this.gladiator.walk("right");
        if (this.keys.up.isDown) this.gladiator.walk("up");
        if (this.keys.down.isDown) this.gladiator.walk("down");


    }

    checkCamera() {
        // this.playerCamera.x = Math.floor(this.ant.x);
        // this.playerCamera.y = Math.floor(this.ant.y);
    }


}