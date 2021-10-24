export interface VillainData {
    id: number;
    name: string
}

export class Villain {
    id: number;
    name: string;
    maxHp: number;
    currentHp: number;
    maxHpRoll: number = 10;
    minHpRoll: number = 1;

    constructor(villainData: VillainData) {
        this.id = villainData.id;
        this.name = villainData.name;
        this.maxHp = Math.floor(Math.random() * this.maxHpRoll) + this.minHpRoll;
        this.currentHp = this.maxHp;
    }
    takeDamage(damage: number): void {
        this.currentHp -= damage;
        if (this.currentHp < 0) {
            this.currentHp = 0;
        }
    }
}
