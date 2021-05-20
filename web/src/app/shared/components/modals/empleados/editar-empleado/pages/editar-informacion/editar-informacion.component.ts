import { FormGroup } from '@angular/forms';
import { Empleado } from 'src/app/models/models';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'editar-informacion',
  templateUrl: './editar-informacion.component.html',
  styleUrls: ['./editar-informacion.component.scss']
})
export class EditarInformacionComponent implements OnInit {
  HeaderType = HeaderType
  @Output() iconClicked = new EventEmitter()
  @Input() empleado = new Empleado()
  @Input() edit = false

  form = new FormGroup({})

  ngOnInit(): void {
  }

  onIconClick() {
    this.iconClicked.emit()
  }

}
