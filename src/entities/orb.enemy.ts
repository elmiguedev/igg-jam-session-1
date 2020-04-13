import * as Phaser from "phaser";
import Enemy from "../core/enemy";
import OrbBullet from "./orb-bullet.entity";

export default class Orb extends Enemy {

    // props
    // -------------------
    private sceneBullets: Phaser.Physics.Arcade.Group;
    private isShooting: boolean = false;
    private shootDelay: number = 1000;
    private shootDistance: number = 200;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number, bulletsGroup: Phaser.Physics.Arcade.Group) {
        super(
            scene,
            x,
            y,
            "orb",
            [0, 1, 2, 3, 4, 5, 4, 3, 2, 1],
            10,
            Phaser.Math.Between(10, 30)
        );

        // reset target speed
        this.targetSpeed = this.randomSpeed;
        this.sceneBullets = bulletsGroup;
        this.visionRange = 100;
        this.life = 10;
    }

    // methods
    // ------------------

    update() {
        super.update();
        this.checkShoot();
    }

    checkShoot() {
        if (this.getTargetDistance() < this.visionRange) {

            if (!this.isShooting && Phaser.Math.Between(1,20) == 1) {
                const b: OrbBullet = new OrbBullet(this.scene, this.x, this.y);
                this.sceneBullets.add(b);
                if (b) {
                    this.scene.physics.moveToObject(b, this.target, 200);
                    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
                    b.setRotation(angle);
                    this.isShooting = true;
                    setTimeout(() => {
                        this.isShooting = false;
                    }, this.shootDelay);
                }
            }
        }
    }
}