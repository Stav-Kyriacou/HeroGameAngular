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
}
