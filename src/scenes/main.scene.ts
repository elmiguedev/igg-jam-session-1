import * as Phaser from "phaser";
import Gladiator from "../entities/gladiator.entity";
import Bullet from "../entities/bullet.entity";
import Slime from "../entities/slime.entity";
import Covid from "../entities/covid.entity";
import Dengue from "../entities/dengue.entity";
import Enemy from "../core/enemy";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private keys: any;
    private cursor: any = { x: 0, y: 0 };
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        ground: Phaser.Tilemaps.StaticTilemapLayer,
        walls: Phaser.Tilemaps.StaticTilemapLayer,
        entities: Phaser.Tilemaps.ObjectLayer
    };
    private playerCamera: any;
    private gladiator: Gladiator;
    private enemies: Phaser.Physics.Arcade.Group;


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
        this.createEnemies();
        this.createKeys();
        this.createCursor();
        this.configureCamera();
        this.createHud();
        this.createCollisions();
    }

    createHud() {
    }

    createMap() {

        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 16, 16, 0, 0);
        const ground = map.createStaticLayer("ground", tileset, 0, 0);
        const walls = map.createStaticLayer("walls", tileset, 0, 0);
        walls.setCollisionByProperty({ solid: true })
        const entities = map.getObjectLayer("entities");

        this.mapLayers = {
            map: map,
            ground: ground,
            walls: walls,
            entities: entities
        }
    }

    createGladiator() {
        this.gladiator = new Gladiator(this, 50, 50);
    }

    createCollisions() {
        this.physics.add.collider(this.gladiator, this.mapLayers.walls);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.enemies, this.gladiator, (e: Enemy, g: Gladiator) => {
            const angle = Phaser.Math.Angle.Between(e.x, e.y, g.x, g.y);
            console.log(angle);
            this.physics.velocityFromRotation(angle, -300, this.gladiator.body.velocity);
        });
        this.physics.add.collider(this.enemies, this.mapLayers.walls);
        this.physics.add.collider(this.gladiator.bullets, this.mapLayers.walls, (b: Bullet, w) => {
            b.kill();
            b.destroy();
        });

        this.physics.add.collider(this.gladiator.bullets, this.enemies, (b: Bullet, e) => {
            b.kill();
            b.destroy();
            e.hurt();
        });
    }


    configureCamera() {
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.startFollow(this.gladiator);
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("w"),
            down: this.input.keyboard.addKey("s"),
            left: this.input.keyboard.addKey("a"),
            right: this.input.keyboard.addKey("d"),
            space: this.input.keyboard.addKey("space"),
            mouse: this.input.mousePointer
        }
    }

    createCursor() {
        this.input.on('pointermove', (pointer) => {
            this.cursor.x = pointer.x + this.cameras.main.scrollX;
            this.cursor.y = pointer.y + this.cameras.main.scrollY;
            this.cursor.angle = Phaser.Math.Angle.Between(this.gladiator.x, this.gladiator.y, this.cursor.x, this.cursor.y)
        }, this);
    }

    createEnemies() {
        this.enemies = this.physics.add.group({
            runChildUpdate: true
        });

        for (let i = 0; i < this.mapLayers.entities.objects.length; i++) {
            const entity = this.mapLayers.entities.objects[i];
            switch (entity.type) {
                case "slime":
                    const slime = new Slime(this, entity.x, entity.y);
                    this.enemies.add(slime);
                    slime.follow(this.gladiator);
                    break;
                case "covid":
                    const covid = new Covid(this, entity.x, entity.y);
                    this.enemies.add(covid);
                    covid.follow(this.gladiator);
                    break;

                default:
                    break;
            }
        }
    }

    // update methods
    // -----------------------------

    update() {
        this.checkInput();
        this.checkEnemies();
        this.gladiator.update();
    }

    checkInput() {
        if (this.keys.left.isDown) this.gladiator.walk("left");
        if (this.keys.right.isDown) this.gladiator.walk("right");
        if (this.keys.up.isDown) this.gladiator.walk("up");
        if (this.keys.down.isDown) this.gladiator.walk("down");
        if (this.keys.space.isDown) this.gladiator.shoot(this.cursor);
        if (this.keys.mouse.isDown) this.gladiator.shoot(this.cursor);
    }

    checkCamera() {
        this.playerCamera.x = Math.floor(this.gladiator.x);
        this.playerCamera.y = Math.floor(this.gladiator.y);
    }

    checkEnemies() {
        this.enemies.getChildren().forEach(e => {
            e.follow(this.gladiator);
        })
    }


}