import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Gladiator extends Entity {

    // props
    // -------------------

    public isWalking: boolean = false;

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
    }

    update() {
        this.checkAnim();
    }

    // methods
    // -------------------

    configureMovementSettings() {
        this.setDrag(1000, 1000)
        this.setMaxVelocity(100, 100);
    }

    configureHitbox() {
        this.setSize(8, 12);
        this.setOffset(8, 20);
    }

    walk(orientation: string) {
        switch (orientation) {
            case "left": this.setVelocityX(-300); this.setFlipX(true); break;
            case "right": this.setVelocityX(300); this.setFlipX(false); break;
            case "up": this.setVelocityY(-300); break;
            case "down": this.setVelocityY(300); break;
            default: break;
        }
    }

    checkAnim() {
        if (this.body.velocity.y == 0 && this.body.velocity.x == 0)
            this.anims.play("gladiator_idle", true);
        else
            this.anims.play("gladiator_walk", true);

    }
}