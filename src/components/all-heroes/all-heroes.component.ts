import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/models/hero';

@Component({
  selector: 'app-all-heroes',
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.css']
})
export class AllHeroesComponent implements OnInit {
  heroList: Hero[] = [new Hero(1, "Hero One", 1, 2, 3),
                      new Hero(2, "Hero Two", 4, 5, 6),
                      new Hero(3, "Hero Three", 7, 8, 9)];

  constructor() { }

  ngOnInit(): void {
  }

}
