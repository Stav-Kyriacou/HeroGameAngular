export class Villain {
    id: number;
    name: string;
    maxHitPoints: number;
    currentHitPoints: number;

    constructor(id: number, name: string, minHP: number, maxHP: number) {
        this.id = id;
        this.name = name;
        this.maxHitPoints = Math.floor(Math.random() * maxHP) + minHP;
        this.currentHitPoints = this.maxHitPoints;
    }
    takeDamage(damage: number): void {
        this.currentHitPoints -= damage;
        if (this.currentHitPoints < 0) {
            this.currentHitPoints = 0;
        }
    }
}
