import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Enemy extends Entity {

    // props
    // -------------------
    private animKey: string;
    protected target: Phaser.Physics.Arcade.Sprite;
    protected life: number = 20;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, frames: Array<number>, frameRate?: number) {
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
        this.init();
    }

    // update method
    // ------------------

    update() {
        this.checkFlip();
    }

    // methods
    // ------------------

    init() {
        this.anims.play(this.animKey, true);
    }

    follow(o) {
        this.target = o;
        this.scene.physics.moveTo(this, this.target.x, this.target.y, 20);
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

    checkFlip() {
        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        } else {
            this.setFlipX(true);
        }
    }
}