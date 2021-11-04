import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }
  getAllGames(): Observable<Game[]> {
    return this._http.get<Game[]>(this.baseUrl + "Game");
  }
  addNewGame(newGame: Game): Observable<Game> {
    return this._http.post<Game>(this.baseUrl + "Game", newGame);
  }
}
