
import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ConfirmModel } from  './ConfirmModel';
import { CommentModalComponent } from './comment-modal.component';
import { CommentModel } from  './CommentModel';

@Injectable()
export class ModalService {
  constructor(private modalService: NgbModal) {}

  //sending populated values and callback function to get the response on how the modal has been closed
  openModal(confirmModel:ConfirmModel,confirmation) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.ok = confirmModel.ok;
    modalRef.componentInstance.cancel = confirmModel.cancel;
    modalRef.componentInstance.title = confirmModel.title;
    modalRef.componentInstance.message = confirmModel.message;
    modalRef.componentInstance.data = confirmModel.data;


    /*On  closing a modal */
    modalRef.result
      .then((result) => {
        console.log("result.................",result)
          confirmation(result)
        },
        (reason) => {
          console.log("reason.................",reason)
          confirmation(reason)
        });
  }

  addCommentModal(commentModel:CommentModel,comment) {
    const modalRef = this.modalService.open(CommentModalComponent);
    modalRef.componentInstance.add = commentModel.add;
    modalRef.componentInstance.cancel = commentModel.cancel;
    modalRef.componentInstance.title = commentModel.title;
    modalRef.componentInstance.data = commentModel.data;
    modalRef.componentInstance.id = commentModel.id;

    /*On  closing a modal */
    modalRef.result
      .then((result) => {
          console.log("result.................",result)
          comment(result)
        },
        (reason) => {
          console.log("reason.................",reason)
          comment(reason)
        });
  }

}
