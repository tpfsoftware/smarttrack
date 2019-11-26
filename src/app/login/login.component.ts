import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validator } from '@angular/forms'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("inside login")
  }
  login(){
    console.log(this.username , this.password)
    if(this.username == 'Admin' && this.password == '12345678'){
      this.router.navigate(["/layout"]);
     }else {
       alert("Authentication error");
     }
 
  }
}
