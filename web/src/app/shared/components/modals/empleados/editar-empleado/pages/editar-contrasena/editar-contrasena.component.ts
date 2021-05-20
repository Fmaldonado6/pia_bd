import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editar-contrasena',
  templateUrl: './editar-contrasena.component.html',
  styleUrls: ['./editar-contrasena.component.scss']
})
export class EditarContrasenaComponent {

  @Output() iconClicked = new EventEmitter()


  onIconClick() {
    this.iconClicked.emit()
  }

}
