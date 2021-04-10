/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Justin Mercer     Student ID: 113545180     Date: April 10th, 2021
*
* Online Link to Music App: https://jmercer6-web422-a6.netlify.app/
*
* Online Link to User Api: https://jmercer6-a6api.herokuapp.com/
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: any = null;
  searchString: String;
  handleSearch(): void {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  constructor(private router: Router, private auth: AuthService) {}

  title = 'WEB422-A4';

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
