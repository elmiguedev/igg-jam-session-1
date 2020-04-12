import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Enemy extends Entity {

    // props
    // -------------------
    private animKey: string;
    protected target: Phaser.Physics.Arcade.Sprite;
    protected life: number = 20;
    protected targetSpeed: number;
    protected randomSpeed: number;
    protected visionRange: number = 60;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, frames: Array<number>, frameRate?: number, speed?: number) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: key,
            anims: [
                { key: key + "_idle", frames: frames, repeat: true, frameRate: (frameRate ? frameRate : 5) },
            ]
        });
        this.animKey = key + "_idle";
        this.targetSpeed = (speed ? speed : 20);
        this.randomSpeed = (speed ? speed / 3 : 7);
        this.init();
    }

    // update method
    // ------------------

    update() {
        this.checkFlip();
        this.checkMovement();
    }

    // methods
    // ------------------

    init() {
        this.anims.play(this.animKey, true);
        this.initRandomMovement();
    }

    initRandomMovement() {
        setInterval(() => {
            this.randomMovement();
        }, 1000);
    }

    follow(o) {
        this.target = o;
    }

    hurt() {
        if (this.life > 0) {
            this.life--;
            if (this.life <= 0) {
                this.kill();
                this.destroy();
            }
        }
    }

    getTargetDistance() {
        const a = this.target.x - this.x;
        const b = this.target.y - this.y;
        const d = Math.sqrt(a * a + b * b);
        return d;
    }

    randomMovement() {
        const newX = this.x + Phaser.Math.Between(-50, 50);
        const newY = this.y + Phaser.Math.Between(-50, 50);

        if (this.active == true)
            this.scene.physics.moveTo(this, newX, newY, this.randomSpeed);
    }

    targetMovement() {
        if (this.active == true)
            this.scene.physics.moveTo(this, this.target.x, this.target.y, this.targetSpeed);
    }

    checkMovement() {
        if (this.getTargetDistance() <= this.visionRange) {
            this.targetMovement();
        }
    }



    checkFlip() {
        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        } else {
            this.setFlipX(true);
        }
    }
}