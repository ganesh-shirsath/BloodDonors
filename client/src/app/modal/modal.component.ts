import { Component,Input,Output,EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title;
  @Input() message;
  @Input() cancel;
  @Input() ok;

  constructor(public activeModal: NgbActiveModal)
  {}
  okBtn(event)  {
    this.activeModal.close(event);
  }

  cancelBtn(event)  {
    this.activeModal.close(event);
  }

}
