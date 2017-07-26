import { Component, OnInit } from '@angular/core';

import { BloodRequestService } from '../../services/blood-request.service';
import { BloodRequest } from '../../model/blood-requests'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bloodRequests : BloodRequest[] = [];
  isBloodReq : boolean = false;

  filterQuery : string = "";
  rowsOnPage : number = 2;
  sortBy : string = "email";
  sortOrder : string = "asc";

  constructor(
    private bloodRequestService: BloodRequestService
  ) { }

  ngOnInit() {
    this.getBloodReqs();
  }

  getBloodReqs() {
    this.bloodRequestService.getBloodRequests().subscribe(data => {
      if(data.success) {
        this.bloodRequests = data['bloodReq'];
        this.isBloodReq = true;
        console.log("bloodReq..........",this.bloodRequests)
      }
      else {
        this.isBloodReq = false;
      }
    })
  }

}
