export class Villain {
    id: number;
    name: string;
    maxHitPoints: number;
    currentHitPoints: number;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.maxHitPoints = Math.floor(Math.random() * 10) + 1;
        this.currentHitPoints = this.maxHitPoints;
    }
}
