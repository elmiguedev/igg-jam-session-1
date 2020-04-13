import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class OrbBullet extends Entity {

    // props
    // -------------------

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: "orb-bullet",
        });
        this.init();
    }

    // methods
    // ------------------

    init() {
        
    }
}