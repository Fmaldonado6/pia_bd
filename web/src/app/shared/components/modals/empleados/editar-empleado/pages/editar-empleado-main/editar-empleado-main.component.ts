import { Empleado } from 'src/app/models/models';
import { Pages } from './../../editar-empleado.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'editar-empleado-main',
  templateUrl: './editar-empleado-main.component.html',
  styleUrls: ['./editar-empleado-main.component.scss']
})
export class EditarEmpleadoMainComponent {
  Pages = Pages
  @Output() iconClicked = new EventEmitter()
  @Output() tileClicked = new EventEmitter<Pages>()
  @Input() empleado = new Empleado()
  onTileClicked(page: Pages) {
    this.tileClicked.emit(page)
  }

  onIconClick() {
    this.iconClicked.emit()
  }

}
