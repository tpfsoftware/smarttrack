import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  username: string;
  password: string;
  message: string = 'Authentication error.';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  
  constructor(private router: Router,private _snackBar: MatSnackBar) 
  { }

  ngOnInit() {
    console.log("inside login")
  }
  login(){
    console.log("login")
    let config = new MatSnackBarConfig();
      config.duration = this.setAutoHide ? this.autoHide : 0;  
     if(this.username == 'Admin' && this.password == '12345678'){
      this.router.navigate(["/layout"]);
      console.log("successfully login")
     }else {
      
      this._snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
      console.log("error")
     }
  }
}


