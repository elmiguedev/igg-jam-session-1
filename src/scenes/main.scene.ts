import * as Phaser from "phaser";

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

        this.add.text(40,40,"holis");

        this.createMap();
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
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            space: this.input.keyboard.addKey("space")
        }
    }

    // update methods
    // -----------------------------

    update() {
         this.checkCamera();
         this.checkInput();
    }

    checkInput() {

    }

    checkCamera() {
        // this.playerCamera.x = Math.floor(this.ant.x);
        // this.playerCamera.y = Math.floor(this.ant.y);
    }


}