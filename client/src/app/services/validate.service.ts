import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.name === undefined || user.email === undefined
      || user.username === undefined || user.password === undefined || user.role === undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateRegisterDonor(donor) {
    if(donor.fname === undefined || donor.dob === undefined || donor.bgroup === undefined
    || donor.ddate === undefined || donor.isRecentDonor === undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  validateBloodRequest(bloodRequest) {
    if(bloodRequest.name === undefined || bloodRequest.mobile === undefined
      || bloodRequest.city === undefined || bloodRequest.requireBlood === undefined) {
      return false;
    }
    else {
      return true;
    }
  }

}
