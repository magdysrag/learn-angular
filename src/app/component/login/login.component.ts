import { UserAuthService } from './../../services/user-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authUserServe: UserAuthService) {}
  isUserLogged: boolean = false;

  ngOnInit() {
    // this.isUserLogged = this.authUserServe.isUserlogged;
    this.authUserServe.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
  login() {
    this.authUserServe.login('userName', 'password');
    this.isUserLogged = this.authUserServe.isUserlogged;
  }
  logout() {
    this.authUserServe.logout();
    this.isUserLogged = this.authUserServe.isUserlogged;
  }
}
