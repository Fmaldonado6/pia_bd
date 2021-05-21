import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { Privilegios, TipoEmpleado } from 'src/app/models/models';
import { PrivilegiosService } from 'src/app/services/privilegios/privilegios.service';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'tipo-empleados-privilegios',
  templateUrl: './tipo-empleados-privilegios.component.html',
  styleUrls: ['./tipo-empleados-privilegios.component.scss']
})
export class TipoEmpleadosPrivilegiosComponent implements OnInit {
  HeaderType = HeaderType

  @Output() submitForm = new EventEmitter()
  @Output() iconClicked = new EventEmitter()
  @Input() tipoEmpleado = new TipoEmpleado()
  @Input() edit = false

  form: FormGroup = new FormGroup({})

  privilegios: Privilegios[] = []


  constructor(
    private privilegiosService: PrivilegiosService
  ) { }

  ngOnInit(): void {
    this.getPrivilegios()
  }

  getPrivilegios() {
    this.privilegiosService.getPrivilegios().subscribe(e => {
      this.privilegios = e
    })
  }

  onSubmit(values: MatListOption[]) {

    const selectedPrivilegios: Privilegios[] = []

    for (let value of values) {
      selectedPrivilegios.push(value.value)
    }

    this.submitForm.emit(selectedPrivilegios)
  }

  includes(privilegio: Privilegios): boolean {
    for (let empleadoPrivilegio of this.tipoEmpleado.privilegios) {
      if (empleadoPrivilegio.idPrivilegio == privilegio.idPrivilegio)
        return true
    }
    return false

  }

  onIconClick() {
    this.iconClicked.emit()
  }
}
