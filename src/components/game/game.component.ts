import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Hero } from 'src/models/hero';
import { Villain } from 'src/models/villain';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  heroList: Hero[] = [new Hero(1, "Hero One", 1, 5, 3),
                      new Hero(2, "Hero Two", 4, 5, 6),
                      new Hero(3, "Hero Three", 7, 8, 9)];
  villainList: Villain[] = [new Villain(1, "Villain One"),
                            new Villain(2, "Villain Two"),
                            new Villain(3, "Villain Three")];
  selectedHero: Hero;
  selectedVillain: Villain;

  constructor() {

  }
  ngOnInit(): void {
    this.selectedHero = this.heroList[0];
    this.selectedVillain = this.villainList[0];
  }
  ngAfterViewInit() {

  }
  ngAfterContentInit() {

  }
  attack(): void {
    if (this.selectedHero != null || this.selectedVillain != null) {
      console.log(this.selectedHero.attack(this.selectedVillain));
    }
  }
  selectChange(): void {
    const heroSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('hero-select');
    const villainSelect: HTMLSelectElement = <HTMLSelectElement>document.getElementById('villain-select');

    this.selectedHero = this.heroList[heroSelect.selectedIndex];
    this.selectedVillain = this.villainList[villainSelect.selectedIndex];
  }
}
