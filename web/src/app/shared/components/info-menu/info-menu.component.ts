import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.scss']
})
export class InfoMenuComponent {
  @Input() type = InfoTypes.success
  @Input() title = "Completado!";
  @Input() accept = "Aceptar"
  @Output() clickEvent = new EventEmitter();

  buttonColors = {
    [InfoTypes.success]: " rgb(111, 204, 111)",
    [InfoTypes.badRequest]: "#ef5350"
  }


  colors = {
    [InfoTypes.success]: " rgb(111, 204, 111)",
    [InfoTypes.badRequest]: "#ef5350"
  }

  icons = {
    [InfoTypes.success]: "check",
    [InfoTypes.badRequest]: "close"
  }

  buttonClicked() { this.clickEvent.emit() }

}
export enum InfoTypes {
  success,
  badRequest
}

