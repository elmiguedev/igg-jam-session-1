import * as Phaser from "phaser";
import Enemy from "../core/enemy";

export default class Cube extends Enemy {

    // props
    // -------------------
    private boostSpeed:number;
    private targetSpeedOriginal:number;
    private tackleTimer: any;
    private tackleRate: number = 3000;
    private canTackle:boolean = true;
    private isTackling:boolean = false;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(
            scene,
            x,
            y,
            "cube",
            [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
            15,
            Phaser.Math.Between(10, 30)
        );

        // reset target speed
        this.targetSpeed = this.randomSpeed * 5;
        this.targetSpeedOriginal = this.targetSpeed;
        this.boostSpeed = this.targetSpeedOriginal * 8;

    }

    // methods
    // ------------------

    update() {
        super.update();

        // check tackle
        if (this.getTargetDistance() < this.visionRange) {
            if (this.canTackle == true && Phaser.Math.Between(1,500) == 1) {
                this.canTackle = false;
                this.isTackling = true;
                setTimeout(() => {
                    this.isTackling = false;
                }, 300);
                setTimeout(() => {
                    this.canTackle = true;
                }, this.tackleRate);
            } 
        } 
    }

    // target movement override
    targetMovement() {
        const speed = (this.isTackling ? this.boostSpeed : this.targetSpeed);
        if (this.active == true)
            this.scene.physics.moveTo(this, this.target.x, this.target.y, speed);
    }

}