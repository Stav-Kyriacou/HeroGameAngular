import { Component, Input, OnInit } from '@angular/core';
import { Villain } from 'src/models/villain';

@Component({
  selector: 'app-villain',
  templateUrl: './villain.component.html',
  styleUrls: ['./villain.component.css']
})
export class VillainComponent implements OnInit {
  @Input() villain: Villain;

  constructor() { }

  ngOnInit(): void {
  }

}
