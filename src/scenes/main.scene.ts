import * as Phaser from "phaser";
import Gladiator from "../entities/gladiator.entity";
import Bullet from "../entities/bullet.entity";
import Enemy from "../core/enemy";
import EnemySpawn from "../generators/enemy.spawn";
import Entity from "../core/entity";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private keys: any;
    private cursor: any = { x: 0, y: 0 };
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        ground: Phaser.Tilemaps.StaticTilemapLayer,
        solid: Phaser.Tilemaps.StaticTilemapLayer,
        outside: Phaser.Tilemaps.StaticTilemapLayer,
        fg: Phaser.Tilemaps.StaticTilemapLayer,
        bg: Phaser.Tilemaps.StaticTilemapLayer,
        entities: Phaser.Tilemaps.ObjectLayer
    };
    private playerCamera: any;
    private gladiator: Gladiator;
    private enemies: Phaser.Physics.Arcade.Group;
    private bullets: Phaser.Physics.Arcade.Group;


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

        const map = this.make.tilemap({ key: "map_1" });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 16, 16, 0, 0);
        const ground = map.createStaticLayer("ground", tileset, 0, 0).setDepth(-1);
        const solid = map.createStaticLayer("solid", tileset, 0, 0).setVisible(false);
        const outside = map.createStaticLayer("outside", tileset, 0, 0).setVisible(false);
        const bg = map.createStaticLayer("bg", tileset, 0, 0).setDepth(5);
        const fg = map.createStaticLayer("fg", tileset, 0, 0).setDepth(10);
        const entities = map.getObjectLayer("entities");

        solid.setCollisionByProperty({ solid: true })
        outside.setCollisionByProperty({ outside: true })

        this.mapLayers = {
            map: map,
            ground: ground,
            solid: solid,
            outside: outside,
            fg: fg,
            bg: bg,
            entities: entities
        }
    }

    createGladiator() {
        const playerMap = this.mapLayers.entities.objects.filter(o => o.type == "player")[0];
        let x = 200;
        let y = 100;
        if (playerMap) {
            x = playerMap.x;
            y = playerMap.y;
        }
        this.gladiator = new Gladiator(this, x, y);
    }

    setGladiatorStartPosition() {
        const playerMap = this.mapLayers.entities.objects.filter(o => o.type == "player")[0];
        let x = 200;
        let y = 100;
        if (playerMap) {
            x = playerMap.x;
            y = playerMap.y;
        }
        this.gladiator.setPosition(x,y);
    }

    createCollisions() {
        this.physics.add.collider(this.bullets, this.gladiator, (b: Entity, g:Gladiator) => {
            const angle = Phaser.Math.Angle.Between(b.x, b.y, g.x, g.y);
            this.physics.velocityFromRotation(angle, -50, this.gladiator.body.velocity);
            this.cameras.main.shake(10);
        });
        this.physics.add.collider(this.gladiator, this.mapLayers.solid);
        this.physics.add.collider(this.gladiator, this.mapLayers.outside, () => {
            this.setGladiatorStartPosition();
        });
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.enemies, this.gladiator, (e: Enemy, g: Gladiator) => {
            const angle = Phaser.Math.Angle.Between(e.x, e.y, g.x, g.y);
            this.physics.velocityFromRotation(angle, -300, this.gladiator.body.velocity);
            this.cameras.main.shake(100);
            //this.cameras.main.flash(100);
        });
        this.physics.add.collider(this.enemies, this.mapLayers.solid);
        this.physics.add.collider(this.gladiator.bullets, this.mapLayers.solid, (b: Bullet, w) => {
            b.kill();
            b.destroy();
        });
        this.physics.add.collider(this.bullets, this.mapLayers.solid, (b: Entity, w) => {
            b.kill();
            b.destroy();
            this.bullets.remove(b);
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

        // create enemies group
        this.enemies = this.physics.add.group({
            runChildUpdate: true,
            immovable: true
        });

        // create bullets groups
        this.bullets = this.physics.add.group({
            immovable: true,
            maxSize: 50
        });

        // create spawners
        for (let i = 0; i < this.mapLayers.entities.objects.length; i++) {
            const entity = this.mapLayers.entities.objects[i];
            switch (entity.type) {
                case "slime":
                    const s = new EnemySpawn(entity.x, entity.y, this.enemies, "slime", this.gladiator)
                        .setSize(6)
                        .setSpawnArea(50)
                        .setSpawnRate(2000)
                        .quickSpawn();
                    break;
                case "cube":
                    const c = new EnemySpawn(entity.x, entity.y, this.enemies, "cube", this.gladiator)
                        .setSize(1)
                        .setSpawnArea(10)
                        .setSpawnRate(2000)
                        .quickSpawn();

                    break;
                case "orb":
                    const o = new EnemySpawn(entity.x, entity.y, this.enemies, "orb", this.gladiator, this.bullets)
                        .setSize(1)
                        .setSpawnArea(10)
                        .setSpawnRate(5000)
                        .quickSpawn();

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
        // this.checkEnemies();
        this.checkOutside();
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
            // e.follow(this.gladiator);
        })
    }

    checkOutside() {
        if (this.gladiator.y < 0 
            || this.gladiator.x < 0  
           )
        {
            this.setGladiatorStartPosition();
        }
    }


}