import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'confirm-menu',
  templateUrl: './confirm-menu.component.html',
  styleUrls: ['./confirm-menu.component.scss']
})
export class ConfirmMenuComponent {
  @Output() cancelPressed = new EventEmitter();
  @Output() confirmPressed = new EventEmitter();
  @Input() title: string = "";
  @Input() body: string = "";
  @Input() confirm: string = "Eliminar";


  onCancelPressed() {
    this.cancelPressed.emit()
  }

  onConfirmPressed() {
    this.confirmPressed.emit()
  }
}