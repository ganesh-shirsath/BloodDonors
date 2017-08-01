
import { Injectable } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input} from '@angular/core';
import {NgModule} from '@angular/core';
import {ModalComponent} from './modal.component';
import {ConfirmModel} from  './ConfirmModel';

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

    console.log("confirmModel.data.................")
    console.log(confirmModel.data)
    console.log("confirmModel.data.................")

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

}
