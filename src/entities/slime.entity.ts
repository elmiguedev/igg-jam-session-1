import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Slime extends Entity {

    // props
    // -------------------
    private life: number = 10;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: "slime",
            anims: [
                { key: "slime_idle", frames: [0, 1, 2, 3, 2, 1], repeat: true, frameRate: 5 },
            ]
        });
        this.init();
    }

    // methods
    // ------------------

    init() {
        this.anims.play("slime_idle", true);
    }

    follow(o) {
        this.scene.physics.moveTo(this, o.x, o.y, 10);
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
}