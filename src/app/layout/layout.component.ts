import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
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
        label: 'Assignment',
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

}
