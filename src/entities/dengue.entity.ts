import * as Phaser from "phaser";
import Enemy from "../core/enemy";

export default class Dengue extends Enemy {

    // props
    // -------------------


    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(
            scene,
            x,
            y,
            "dengue",
            [0, 1],
            15
        );
    }

    // methods
    // ------------------

}