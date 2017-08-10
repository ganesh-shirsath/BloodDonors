import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  username: string;
  password: string;
  role: any;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  public roles = [
    {value:true,name:"Admin"},
    {value:false,name:"User"}
  ]

  ngOnInit() {
    this.role = this.roles[1].value
  }

  onRegisterSubmit(){
    console.log(this.name)
    console.log(this.role)
    var user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role
    }

    console.log("User---------------",user)

    if(!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show("Please fill in all fields.",{cssClass:'alert-danger',timeout:3000});
      return false
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show("Email is not valid.",{cssClass:'alert-danger',timeout:3000});
      return false
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show("User register successfully.",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessagesService.show("User not saved. Something went wrong.",{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    })
  }

}
