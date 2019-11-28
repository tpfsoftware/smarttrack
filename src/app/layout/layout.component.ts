import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex: any;

  constructor(private router: Router) {
    this.router.navigate(['/layout/dashboard']);
    this.navLinks = [
      {
        label: 'Dashboard',
        link: 'dashboard',
        index: 0
      }, {
        label: 'Assets',
        link: 'task-assignment',
        index: 1
      }, {
        label: 'Insights',
        link: 'insights',
        index: 2
      },
    ];


    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

  }

  ngOnInit() {
  }
  logout(){
    this.router.navigate(['/login'])
  }

}
