import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  @Input() hero: Hero;

  constructor() {
  }

  ngOnInit(): void {
  }

}
