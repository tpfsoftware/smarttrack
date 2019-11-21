import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("inside login")
  }
  login(){
    console.log("login")
    this.router.navigate(['/layout']);
  }
}
