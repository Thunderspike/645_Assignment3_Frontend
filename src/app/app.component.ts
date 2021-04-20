import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Home',
        routerLink: '/',
      },
      {
        label: 'List of Surveys',
        routerLink: '/dashboard',
      },
    ];
  }
}
