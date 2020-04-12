import * as Phaser from "phaser";
import Slime from "../entities/slime.entity";
import Entity from "../core/entity";
import Enemy from "../core/enemy";

export default class EnemySpawn {

    private scene: Phaser.Scene;
    private group: Phaser.Physics.Arcade.Group;
    private type: string;
    private target: Entity;
    private size: number = 5;
    private spawnRate: number = 1000;
    private entities: Array<Enemy> = [];
    private timer:any;

    public x: number;
    public y: number;

    constructor(x: number, y: number, enemyGroup: Phaser.Physics.Arcade.Group, type: string, target: Entity) {
        this.scene = enemyGroup.scene;
        this.group = enemyGroup;
        this.type = type;
        this.target = target;
        this.x = x;
        this.y = y;

        this.initSpawner();
    }

    initSpawner() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.spawn();
        },this.spawnRate);
    }

    spawn() {

        // clean dead entities
        this.removeEntities();

        // check if entities are full
        if (this.entities.length > this.size) {
            return;
        }

        console.log("spawn!",this.entities.length);

        // create entity
        switch (this.type) {
            case "slime":
                this.createSlime();
                break;

            default:
                break;
        }
    }

    createSlime() {
            const slime = new Slime(this.scene, this.x, this.y);
            this.group.add(slime);
            this.entities.push(slime);
            slime.follow(this.target);
    }

    removeEntities() {
        for (let i = 0; i < this.entities.length; i++) {
            const e = this.entities[i];
            if (e.active === false && e.visible === false ) {
                this.entities.splice(i,1);
                this.group.remove(e);
            }

        }
    }

    // public methods
    // --------------------

    public setSize(size:number) {
        this.size = size;
        return this;
    }

    public setSpawnRate(rate:number) {
        this.spawnRate = rate;
        this.initSpawner();
        return this;
    }

}