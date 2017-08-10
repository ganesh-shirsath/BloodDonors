import { Component,Input,Output,EventEmitter} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { BloodRequestService } from '../services/blood-request.service';

@Component({
  selector: 'comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent {
  @Input() title;
  @Input() cancel;
  @Input() add;

  constructor(
    public activeModal: NgbActiveModal,
    private bloodRequestService: BloodRequestService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  )
  {}
  addCommentBtn(event,comment,id)  {
    console.log("comment-------------"+comment);
    console.log("id-------------"+id);
    this.bloodRequestService.addCommentToBloodRequest({comment:comment,bloodReqId:id})
      .subscribe(data => {
        if(data.success) {
          this.activeModal.close(event);
          //this.router.navigate(['/dashboard']);
        }
        else {
          this.flashMessageService.show("Something went wrong.",{cssClass:"alert-danger",timeout:4000})
          console.log(data.msg)
        }
      })
  }

  cancelBtn(event)  {
    this.activeModal.close(event);
  }

}
