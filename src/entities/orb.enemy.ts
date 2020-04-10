import * as Phaser from "phaser";
import Enemy from "../core/enemy";

export default class Orb extends Enemy {

    // props
    // -------------------


    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(
            scene,
            x,
            y,
            "orb",
            [0, 1, 2, 3, 4, 5, 4, 3, 2, 1],
            10,
            Phaser.Math.Between(10, 30)
        );
    }

    // methods
    // ------------------

}