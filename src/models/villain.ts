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
    takeDamage(damage: number): void {
        this.currentHitPoints -= damage;
        if (this.currentHitPoints < 0) {
            this.currentHitPoints = 0;
        }
    }
}
