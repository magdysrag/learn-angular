import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private isLoggedSubject!: BehaviorSubject<boolean>;
  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserlogged);
  }
  login(userName: string, password: string) {
    //call login API, and get access token
    let userToken = '123456789';
    localStorage.setItem('token', userToken);
    this.isLoggedSubject.next(true);
  }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedSubject.next(false);
  }
  get isUserlogged() {
    return localStorage.getItem('token') ? true : false;
  }
  getLoggedStatus() {
    return this.isLoggedSubject; //as Observable<boolean> if I want force return Observable or Observer Observer<boolean>
  } // can return observer or observable
}
