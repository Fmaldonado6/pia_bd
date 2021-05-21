import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoEmpleado } from 'src/app/models/models';

@Component({
  selector: 'tipo-empleados-info',
  templateUrl: './tipo-empleados-info.component.html',
  styleUrls: ['./tipo-empleados-info.component.scss']
})
export class TipoEmpleadosInfoComponent implements OnInit {
  @Output() submitForm = new EventEmitter()
  @Output() iconClicked = new EventEmitter()
  @Input() tipoEmpleado = new TipoEmpleado()
  @Input() edit = false

  form: FormGroup = new FormGroup({})


  ngOnInit(): void {

    this.form = new FormGroup({
      nombreTipoEmpleado: new FormControl(this.tipoEmpleado.nombreTipoEmpleado, [
        Validators.required
      ]),
      horaEntrada: new FormControl(this.tipoEmpleado.horaEntrada, [
        Validators.required

      ]),
      horaSalida: new FormControl(this.tipoEmpleado.horaSalida, [
        Validators.required

      ]),
      sueldo: new FormControl(this.tipoEmpleado.sueldo, [
        Validators.required

      ]),

    })

  }

  onSubmit(values: any) {
    this.submitForm.emit(values)
  }

  onIconClick() {
    this.iconClicked.emit()
  }


}
