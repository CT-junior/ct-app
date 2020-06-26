import { Component, OnInit } from '@angular/core';

import { AuthService } from '../user/login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  opened = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  toggleSidebar() {
    this.opened = !this.opened;
  }

  fazerLogout() {
    this.authService.fazerLogout();
  }
}
