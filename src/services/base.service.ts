import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  readonly baseUrl: string = "http://stavkyriacou.somee.com/HeroAPI/";

  constructor() { }
}
