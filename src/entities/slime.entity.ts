import * as Phaser from "phaser";
import Enemy from "../core/enemy";

export default class Slime extends Enemy {

    // props
    // -------------------


    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(
            scene,
            x,
            y,
            "slime",
            [0, 1, 2, 1],
            5,
            Phaser.Math.Between(10, 30)
        );
        this.setDepth(7);
    }

    // methods
    // ------------------

}