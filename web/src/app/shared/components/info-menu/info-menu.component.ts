import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.scss']
})
export class InfoMenuComponent {
  @Input() type = Types.success
  @Input() title = "Completado!";
  @Input() accept = "Aceptar"
  @Output() clickEvent = new EventEmitter();

  buttonColors = {
    [Types.success]: " rgb(111, 204, 111)",
    [Types.badRequest]: "#ef5350"
  }


  colors = {
    [Types.success]: " rgb(111, 204, 111)",
    [Types.badRequest]: "#ef5350"
  }

  icons = {
    [Types.success]: "check",
    [Types.badRequest]: "close"
  }

  buttonClicked() { this.clickEvent.emit() }

}
export enum Types {
  success,
  badRequest
}

