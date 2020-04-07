import * as Phaser from "phaser";
import Enemy from "../core/enemy";
import CovidBullet from "./covid-bullet.entity";

export default class Covid extends Enemy {

    // props
    // -------------------
    public bullets: Phaser.Physics.Arcade.Group;
    private isShooting: boolean = false;
    private shootDelay: number = 1000;
    private shootDistance: number = 200;


    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(
            scene,
            x,
            y,
            "covid",
            [0, 1, 2, 1],
            5
        );
    }

    // methods
    // ------------------

    update() {
        super.update();
        this.checkDistance();
    }

    // methods
    // ------------------

    init() {
        super.init();

        this.bullets = this.scene.physics.add.group({
            maxSize: 10,
            classType: CovidBullet
        });

        this.scene.physics.add.collider(this.bullets, this.scene.mapLayers.walls, (b: CovidBullet, w) => {
            b.kill();
            b.destroy();
        });
    }

    shoot() {
        if (!this.isShooting) {
            const b: CovidBullet = this.bullets.getFirstDead(true, this.x, this.y);
            if (b) {
                this.scene.physics.moveToObject(b, this.target, 100);
                const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
                b.setRotation(angle);
                this.isShooting = true;
                setTimeout(() => {
                    this.isShooting = false;
                }, this.shootDelay);
            }
        }
    }

    checkDistance() {
        if (this.getTargetDistance() <= this.shootDistance) {
            this.shoot();
        }
    }

}