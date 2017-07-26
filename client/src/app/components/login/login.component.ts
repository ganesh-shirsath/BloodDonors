import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    console.log(this.username)
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        console.log(data)
        this.authService.storeUserDate(data.token,data.user);
        this.flashMessageService.show("You are now logged in.",{cssClass:'alert-success', timeout:5000});
        this.router.navigate(['dashboard']);
      }
      else {
        console.log(data.msg)
        this.flashMessageService.show(data.msg,{cssClass:'alert-danger', timeout:5000});
        this.router.navigate(['login']);
      }
    });
  }

}
