import { APP_NAME } from './../models/index';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  appName = APP_NAME;
  constructor(private router: Router) { }

  start() {
    console.log('t');

    localStorage.setItem('start', 'true');
    this.router.navigateByUrl('tabs/tab1');
  }
}
