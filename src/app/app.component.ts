import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navLinks: any[];
  activeLinkIndex = 0;
  constructor(private router: Router) {
    // this.router.navigate(['/login']);
    this.navLinks = [
      {
        label: 'Dashboard',
        link: '/dashboard',
        index: 0
      }, {
        label: 'Assignment',
        link: '/task-assignment',
        index: 1
      }, {
        label: 'Insights',
        link: '/insights',
        index: 2
      },
    ];

    this.router.events.subscribe((res) => {
      console.log(res)
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
