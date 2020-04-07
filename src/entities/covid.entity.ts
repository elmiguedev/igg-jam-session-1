import * as Phaser from "phaser";
import Enemy from "../core/enemy";

export default class Covid extends Enemy {

    // props
    // -------------------


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

}