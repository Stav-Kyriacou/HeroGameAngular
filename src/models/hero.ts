import { Villain } from "./villain";

export interface HeroData {
    id: number;
    name: string;
    minRoll: number;
    maxRoll: number;
    startingUses: number;
}

export class Hero {
    id: number;
    name: string;
    minRoll: number;
    maxRoll: number;
    startingUses: number;
    usesRemaining: number;
    constructor(heroData: HeroData) {
        this.id = heroData.id;
        this.name = heroData.name;
        this.minRoll = heroData.minRoll;
        this.maxRoll = heroData.maxRoll;
        this.startingUses = heroData.startingUses;
        this.usesRemaining = this.startingUses;
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
