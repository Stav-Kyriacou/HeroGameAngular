import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Hero } from 'src/models/hero';
import { Villain } from 'src/models/villain';
import { HeroService } from 'src/services/hero.service';
import { map } from 'rxjs/operators';
import { VillainService } from 'src/services/villain.service';
import { Game } from 'src/models/game';
import { GameService } from 'src/services/game.service';
import { ɵangular_packages_platform_browser_testing_testing_a } from '@angular/platform-browser/testing';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // heroList: Hero[] = [new Hero(1, "Hero One", 1, 6, 3),
  //                     new Hero(2, "Hero Two", 1, 6, 3),
  //                     new Hero(3, "Hero Three", 1, 6, 3)];
  // villainList: Villain[] = [new Villain(1, "Villain One", 1, 10),
  //                           new Villain(2, "Villain Two", 1, 10),
  //                           new Villain(2, "Villain Three", 1, 10)];
  // gameList: Game[] = [new Game(1, new Date("2021-09-13T00:00:00"), "Heroes Won"), 
  //                     new Game(2, new Date("2021-09-13T00:00:00"), "Villains Won"),
  //                     new Game(3, new Date("2021-09-13T00:00:00"), "Heroes Won")];
  heroList: Hero[];
  villainList: Villain[];
  gameList: Game[];
  selectedHero: Hero;
  selectedVillain: Villain;
  totalUsesRemaining: number = 0;
  totalHpRemaining: number = 0;
  gameOver: boolean = false;
  gameResult: string = "";

  constructor(private _heroService: HeroService,
    private _villainService: VillainService,
    private _gameService: GameService) {
  }
  ngOnInit(): void {
    this._heroService.getAllHeroes().subscribe(heroes => this.heroList = heroes,
      error => console.log("Error: " + error),
      () => { this.init() });
    this._villainService.getAllVillains().subscribe(villains => this.villainList = villains,
      error => console.log("Error: " + error),
      () => { this.init() });
    this._gameService.getAllGames().subscribe(games => this.gameList = games,
      error => console.log("Error: " + error),
      () => {
        console.log("received games");
      });
  }

  init(): void {
    if (this.heroList != null)
      this.selectedHero = this.heroList[0];
    if (this.villainList != null)
      this.selectedVillain = this.villainList[0];
  }

  attack(): void {
    const combatLog: HTMLElement = <HTMLElement>document.getElementById('combatLog');
    this.checkHpRemaining();
    this.checkUsesRemaining();
    if ((this.selectedHero != null || this.selectedVillain != null) && this.totalUsesRemaining > 0) {
      let damage: number = this.selectedHero.attack(this.selectedVillain);
      combatLog.innerHTML = this.selectedHero.name + " dealt " + damage + " damage to " + this.selectedVillain.name;
      // this.totalUsesRemaining--;
      // this.totalHpRemaining -= damage;
      this.checkHpRemaining();
      this.checkUsesRemaining();
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
    console.log("HP: " + this.totalHpRemaining);
    console.log("Uses: " + this.totalUsesRemaining);
    if (!this.gameOver) {
      //counts heroes running out of action on the same turn that all the villains die as a win
      if ((this.totalUsesRemaining > 0 && this.totalHpRemaining <= 0) || (this.totalUsesRemaining == 0 && this.totalHpRemaining <= 0)) {
        console.log("Heroes win. Heroes killed the villains");
        this.gameResult = "Heroes win. Heroes killed the villains";
        this.addGame(true);
        this.gameOver = true;
      }
      else if (this.totalUsesRemaining <= 0 && this.totalHpRemaining > 0) {
        console.log("Villains win. Heroes ran out of turns");
        this.gameResult = "Villains win. Heroes ran out of turns";
        this.addGame(false);
        this.gameOver = true;
      }
    }
  }

  checkHpRemaining(): void {
    this.totalHpRemaining = 0;

    for (let v of this.villainList) {
      this.totalHpRemaining += v.currentHp;
    }

  }

  checkUsesRemaining(): void {
    this.totalUsesRemaining = 0;

    for (let h of this.heroList) {
      this.totalUsesRemaining += h.usesRemaining;
    }

  }

  addGame(heroesWon: boolean) {
    let lastID: number = 0;
    if (this.gameList != null) {
      for (let g of this.gameList) {
        if (g.gameID > lastID) {
          lastID = g.gameID;
        }
      }
    }
    lastID++;

    let result: string = "";
    result = heroesWon ? "Heroes Won" : "Villains Won";

    let date = new Date().toISOString();
    let auDate = new DatePipe('en-us').transform(date, 'yyyy-MM-ddThh:mm:ss', 'UTS+11');

    console.log(date);
    console.log(auDate);

    let newGame: Game = { gameID: lastID, dateTimeStarted: auDate, result: result };
    this.gameList.push(newGame);
    console.log(newGame);

    this._gameService.addNewGame(newGame).subscribe(response => console.log('success' + response));
  }
}
