import { Component, OnInit } from '@angular/core';
import { DonorService } from '../../services/donor.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-donor-register',
  templateUrl: './donor-register.component.html',
  styleUrls: ['./donor-register.component.css']
})
export class DonorRegisterComponent implements OnInit {
  fname: string;
  lname: string;
  occupation: string;
  mstatus: string;
  dob: Date;
  bgroup: string;
  ddate: Date;
  isRecentDonor: boolean;
  city: string;
  state: string;
  email: string;
  mobile: string;

  date: DateModel;
  options: DatePickerOptions;

  public maritalStatus = [
    {value:"Married", name:"Married" },
    {value:"Single", name:"Single"}
  ]

  public bloodGroups = [
    {value:"O Positive", name:"O+" },
    {value:"O Negative", name:"O-"},
    {value:"A Positive", name:"A+"},
    {value:"A Negative", name:"A-"},
    {value:"B Positive", name:"B+"},
    {value:"B Negative", name:"B-"},
    {value:"AB Positive", name:"AB+"},
    {value:"AB Negative", name:"AB-"}
  ]


  constructor(
    private donorService: DonorService,
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
  }

  checkIsRecentDonor(event){
    console.log("checkIsRecentDonor-: "+new Date(event.formatted));

    const diff = Math.floor(new Date().getTime() - new Date(event.formatted).getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff/day);

    if(days > 90) {
      console.log("Greater days-: "+days);
      this.isRecentDonor = false;
    }
    else {
      console.log("less days-: "+days);
      this.isRecentDonor = true;
    }
  }

  onRegisterDonorSubmit() {
    let donor = {
      fname: this.fname,
      lname: this.lname,
      occupation: this.occupation,
      mstatus: this.mstatus,
      dob: this.dob,
      bgroup: this.bgroup,
      ddate: this.ddate,
      isRecentDonor: this.isRecentDonor,
      city: this.city,
      state: this.state,
      email: this.email,
      mobile: this.mobile
    }

    console.log("donor.................")
    console.log(donor)
    console.log("donor.................")

    if(!this.validateService.validateRegisterDonor(donor)) {
      this.flashMessageService.show("Please select all mandetory fields.",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(donor.email)) {
      this.flashMessageService.show("Email is not valid.",{cssClass:'alert-danger', timeout:3000})
      return false;
    }
    console.log("Donorrrrrrrrrr",donor)
    //Register Donor
    this.donorService.registerDonor(donor).subscribe(data => {
      if(data.success) {
        this.flashMessageService.show("Donor register successfully.", {cssClass:'alert-sucess',timeout:3000})
        this.router.navigate(['/searchDonor']);
      }
      else {
        this.flashMessageService.show("Donor is not register. Something went wrong.", {cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/registerDonor']);
      }
    });
  }

}
