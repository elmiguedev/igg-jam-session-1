import * as Phaser from "phaser";
import Entity from "../core/entity";
import Bullet from "./bullet.entity";

export default class Gladiator extends Entity {

    // props
    // -------------------

    public bullets: Phaser.Physics.Arcade.Group;
    public shootDelay: number = 100;
    public isShooting: boolean = false;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: "gladiator",
            anims: [
                { key: "gladiator_idle", start: 0, end: 2, repeat: true, frameRate: 5 },
                { key: "gladiator_walk", frames: [0, 3, 4, 3], repeat: true, frameRate: 10 },
            ]
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        this.configureMovementSettings();
        this.configureHitbox();
        this.configureGun();
    }

    update() {
        this.checkAnim();
    }

    // methods
    // -------------------

    configureMovementSettings() {
        this.setDrag(1000, 1000)
        this.setMaxVelocity(300, 300);
    }

    configureHitbox() {
        this.setDepth(8)
        this.setSize(8, 12);
        this.setOffset(8, 20);
    }

    configureGun() {
        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            maxSize: 50
        })
    }

    walk(orientation: string) {
        switch (orientation) {
            case "left": this.setVelocityX(-150); this.setFlipX(true); break;
            case "right": this.setVelocityX(150); this.setFlipX(false); break;
            case "up": this.setVelocityY(-150); break;
            case "down": this.setVelocityY(150); break;
            default: break;
        }
    }

    shoot(cursor) {
        if (!this.isShooting) {
            const h = 16;
            const x = this.x + (Math.cos(cursor.angle) * h);
            const y = this.y + (Math.sin(cursor.angle) * h);
            const c: Bullet = this.bullets.getFirstDead(true, x, y);
            if (c) {
                this.scene.physics.moveTo(c, cursor.x, cursor.y, 500);
                this.isShooting = true;
                setTimeout(() => {
                    this.isShooting = false;
                }, this.shootDelay);
            }
        }
    }

    checkAnim() {
        if (this.body.velocity.y == 0 && this.body.velocity.x == 0)
            this.anims.play("gladiator_idle", true);
        else
            this.anims.play("gladiator_walk", true);

    }
}