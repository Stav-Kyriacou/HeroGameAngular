import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Hero } from 'src/models/hero';
import { Villain } from 'src/models/villain';
import { HeroService } from 'src/services/hero.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  heroList: Hero[] = [new Hero(1, "Hero One", 1, 6, 3),
                      new Hero(2, "Hero Two", 1, 6, 3),
                      new Hero(3, "Hero Three", 1, 6, 3)];
  // heroList: Hero[];
  villainList: Villain[] = [new Villain(1, "Villain One", 1, 10),
                            new Villain(2, "Villain Two", 1, 10),
                            new Villain(2, "Villain Three", 1, 10)];
  selectedHero: Hero;
  selectedVillain: Villain;
  totalUsesRemaining: number = 0;
  totalHpRemaining: number = 0;

  constructor(private _heroService: HeroService) {

  }
  ngOnInit(): void {
    // this._heroService.getAllHeroes().subscribe(heroes => this.heroList = heroes);
    this.selectedHero = this.heroList[0];
    this.selectedVillain = this.villainList[0];
  }
  ngAfterViewInit() {

  }
  ngAfterContentInit() {

  }
  attack(): void {
    const combatLog: HTMLElement = <HTMLElement>document.getElementById('combatLog');
    this.checkHpRemaining();
    this.checkUsesRemaining();
    if ((this.selectedHero != null || this.selectedVillain != null) && this.totalUsesRemaining > 0) {
      let damage: number = this.selectedHero.attack(this.selectedVillain);
      combatLog.innerHTML = this.selectedHero.name + " dealt " + damage + " damage to " + this.selectedVillain.name;
      this.totalUsesRemaining--;
      this.totalHpRemaining -= damage;
    }
    this.checkWin();
  }
  selectChange(): void {
    const heroSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('hero-select');
    const villainSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('villain-select');

    this.selectedHero = this.heroList[heroSelect.selectedIndex];
    this.selectedVillain = this.villainList[villainSelect.selectedIndex];
  }
  checkWin(): void {
    //counts heroes running out of action on the same turn that all the villains die as a win
    if ((this.totalUsesRemaining > 0 && this.totalHpRemaining <= 0) || (this.totalUsesRemaining == 0 && this.totalHpRemaining <= 0)) {
      console.log("Heroes win. Heroes killed the villains");
    }
    else if (this.totalUsesRemaining <= 0 && this.totalHpRemaining > 0) {
      console.log("Villains win. Heroes ran out of turns");
    }
  }
  checkHpRemaining(): void {
    this.totalHpRemaining = 0;

    for (let v of this.villainList) {
      this.totalHpRemaining += v.currentHitPoints;
    }
  }
  checkUsesRemaining(): void {
    this.totalUsesRemaining = 0;

    for (let h of this.heroList) {
      this.totalUsesRemaining += h.usesRemaining;
    }
  }
}
