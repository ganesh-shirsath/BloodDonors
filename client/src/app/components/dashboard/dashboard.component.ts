import { Component, OnInit } from '@angular/core';

import { BloodRequestService } from '../../services/blood-request.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BloodRequest } from '../../model/blood-requests'
import { ModalService } from '../../modal/modal.service';
import { CommentModel } from  '../../modal/CommentModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bloodRequests : BloodRequest[] = [];
  isBloodReq : boolean = false;
  private commentModal:CommentModel;
  private modalService:ModalService;

  filterQuery : string = "";
  rowsOnPage : number = 2;
  sortBy : string = "email";
  sortOrder : string = "asc";

  constructor(
    private bloodRequestService: BloodRequestService,
    private modalService1: ModalService,
    private flashMessageService: FlashMessagesService
  ) {
    this.modalService = modalService1;
  }

  ngOnInit() {
    this.getBloodReqs();
  }


  viewComments = (bRequest) => {
    this.commentModal = {add:"Add",cancel:"Close",title:"Blood Request Comments",data:bRequest.comments,id:bRequest._id};
    this.modalService.addCommentModal(this.commentModal,(err, comment)=>{
       if(comment) {
         console.log("comment----=========_++++",comment)
         this.flashMessageService.show("Comment added successfully.",{cssClass:'alert-success',timeout:3000});
         this.getBloodReqs();
       }
    })
  }

  getBloodReqs() {
    this.bloodRequestService.getBloodRequests().subscribe(data => {
      if(data.success) {
        this.bloodRequests = data['bloodReq'];
        this.isBloodReq = true;
      }
      else {
        this.isBloodReq = false;
      }
    })
  }

}
