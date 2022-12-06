import { UserAuthService } from './../../services/user-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authUserServe: UserAuthService) {}
  isUserLogged: boolean = false; 
  ngOnInit(): void {
    this.authUserServe.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
}
