import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { BloodRequestService } from '../../services/blood-request.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blood-request',
  templateUrl: './blood-request.component.html',
  styleUrls: ['./blood-request.component.css']
})
export class BloodRequestComponent implements OnInit {
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  requireBlood: string;
  comment: string;

  constructor(
    private validateService: ValidateService,
    private bloodRequestService: BloodRequestService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onBloodRequestSubmit() {

    let bloodReq = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      city: this.city,
      state: this.state,
      requireBlood: this.requireBlood,
      comment: this.comment
    }

    if(!this.validateService.validateBloodRequest(bloodReq)) {
      this.flashMessageService.show("Please fill in all fields.",{cssClass:'alert-danger',timeout:3000})
      return false;
    }

    if(!this.validateService.validateEmail(bloodReq.email)) {
      this.flashMessageService.show("Email is not valid", {cssClass:'alert-danger',timeout:3000})
      return false;
    }
    console.log("onBloodRequestSubmit",bloodReq)
    this.bloodRequestService.registerBloodrequest(bloodReq).subscribe( data => {
      if(data.success) {
        this.flashMessageService.show("Blood request is successfully register",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/dashboard']);
      }
      else {
        this.flashMessageService.show("Blood request is not register. Somethig went wrong",{cssClass:'alert-danger',timeout:3000})
        this.router.navigate(['/blood-request'])
      }
    }
    )
  }

}
