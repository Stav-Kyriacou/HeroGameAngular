import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Villain, VillainData } from 'src/models/villain';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VillainService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }

  getAllVillains(): Observable<Villain[]> {
    return this._http.get<VillainData[]>(this.baseUrl + "Villain").pipe(map(villainDataArray => villainDataArray.map(villainData => new Villain(villainData))));
  }
}
