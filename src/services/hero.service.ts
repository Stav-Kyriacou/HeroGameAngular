import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero, HeroData } from 'src/models/hero';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';

//CORS resources
//https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-5.0
//https://medium.com/easyread/enabling-cors-in-asp-net-web-api-4be930f97a5c
//https://www.tektutorialshub.com/angular/angular-httpheaders/

//Object instantiation
//https://stackoverflow.com/questions/51763745/angular-6-error-typeerror-is-not-a-function-but-it-is


@Injectable({
  providedIn: 'root'
})
export class HeroService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }

  // getHero(): Observable<Hero> {
  //   return this._http.get<Hero>(this.baseUrl + "Hero/1").pipe(map(data => new Hero(data)));
  // }

  //if you just return Hero[], its methods wont be accessible because it was never instantiated with new Hero()
  //instead, store the json data as HeroData[] which doesnt contain any methods, just attributes
  //need to convert the HeroData[] to a Hero[] that has been instantiated using the HeroData[]
  //the first map takes the HeroData[] and returns a Hero[]
  //the second map takes each HeroData from the array and instantiates a Hero object
  getAllHeroes(): Observable<Hero[]> {
    return this._http.get<HeroData[]>(this.baseUrl + "Hero").pipe(map(heroDataArray => heroDataArray.map(heroData => new Hero(heroData))));
  }

  //Can use this method, just need to replace the subscribe part in ngOnInit() to the line below in game.component.ts
  // this._heroService.getAllHeroes().subscribe(res => { this.heroList = res.map(x => Object.assign(new Hero(x), x) ) } );
  // getAllHeroes(): Observable<Hero[]> {
  //   return this._http.get<Hero[]>(this.baseUrl + "Hero");
  // }
}
