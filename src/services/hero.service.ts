import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from 'src/models/hero';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  readonly baseUrl: string = "http://stavkyriacou.somee.com/HeroAPI/"

  constructor(private _http: HttpClient) { }

  getAllHeroes(): Observable<Hero[]> {
    console.log("get all heroes");
    return this._http.get<Hero[]>(this.baseUrl + "Hero");
  }
}
