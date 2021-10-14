import { Villain } from "./villain";

export class Hero {
    id: number;
    name: string;
    minRoll: number;
    maxRoll: number;
    startingUses: number;
    usesRemaining: number;

    constructor(id: number, name: string, minRoll: number, maxRoll: number, startingUses: number) {
        this.id = id;
        this.name = name;
        this.minRoll = minRoll;
        this.maxRoll = maxRoll;
        this.startingUses = startingUses;
        this.usesRemaining = startingUses;
    }
    roll(): number {
        //returns a random number between the min and max roll (both inclusive)
        return Math.floor(Math.random() * (this.maxRoll - this.minRoll + 1)) + this.minRoll;
    }
    attack(target: Villain): number {
        if (this.usesRemaining > 0 && target.currentHitPoints > 0) {
            let damage: number = this.roll();
            target.takeDamage(damage);
            this.usesRemaining--;
            return damage;
        } else {
            return 0;
        }
    }
}
