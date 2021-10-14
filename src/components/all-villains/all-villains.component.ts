import { Component, Input, OnInit } from '@angular/core';
import { Villain } from 'src/models/villain';

@Component({
  selector: 'app-all-villains',
  templateUrl: './all-villains.component.html',
  styleUrls: ['./all-villains.component.css']
})
export class AllVillainsComponent implements OnInit {
  villainList: Villain[] = [new Villain(1, "Villain One"),
                            new Villain(2, "Villain Two"),
                            new Villain(3, "Villain Three")
                          ];
  constructor() { }

  ngOnInit(): void {
  }

}
