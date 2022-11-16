import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// service 
export class AppService {
  getAll() {
    return ["css","html","js","ts"];
  }
  constructor() { }
}
