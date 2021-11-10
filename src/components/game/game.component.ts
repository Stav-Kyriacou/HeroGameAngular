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
    console.log("Hero List before: " + this.heroList);

    this._heroService.getAllHeroes().subscribe(heroes => this.heroList = heroes,
      error => console.log("Error: " + error),
      () => {
        this.init();
        console.log("Hero List After: ");
        console.log(this.heroList);
      });
    this._villainService.getAllVillains().subscribe(villains => this.villainList = villains,
      error => console.log("Error: " + error),
      () => { this.init() });
    this._gameService.getAllGames().subscribe(games => this.gameList = games,
      error => console.log("Error: " + error),
      () => { });


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
      this.checkHpRemaining();
      this.checkUsesRemaining();
    }
    this.checkWin();
  }
  /**
   * Set the selected hero to the hero component clicked
   */
  onSelectHero(hero: Hero) {
    this.selectedHero = hero;
  }
  /**
   * Set the selected villain to the villain component clicked
   */
  onSelectVillain(villain: Villain)
  {
    this.selectedVillain = villain;
  }
  /**
   * Checks if the win condiiton has been met
   * Counts as hero win if they run out of turns the same turn that all villains die
   */
  checkWin(): void {
    if (!this.gameOver) {
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
  /**
   * Checks the total HP remaining from all villains
   */
  checkHpRemaining(): void {
    this.totalHpRemaining = 0;

    for (let v of this.villainList) {
      this.totalHpRemaining += v.currentHp;
    }
  }
  /**
   * Checks the total Uses remaining from all heroes
   */
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

    this._gameService.addNewGame(newGame).subscribe(response => console.log('sent new game. Response: ' + response));
  }
}
