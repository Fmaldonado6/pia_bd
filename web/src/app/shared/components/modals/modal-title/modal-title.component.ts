import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal-title',
  templateUrl: './modal-title.component.html',
  styleUrls: ['./modal-title.component.scss']
})
export class ModalTitleComponent {

  HeaderType = HeaderType
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() type = HeaderType.close

  @Output() iconClicked = new EventEmitter()


  emitIconClicked() {
    this.iconClicked.emit()
  }

}

export enum HeaderType {
  close,
  goBack
}
