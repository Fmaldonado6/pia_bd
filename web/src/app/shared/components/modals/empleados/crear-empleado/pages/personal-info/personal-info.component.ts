import { HeaderType } from './../../../../modal-title/modal-title.component';
import { Empleado, TipoEmpleado } from 'src/app/models/models';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';



@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  HeaderType = HeaderType
  formInformacion: FormGroup = new FormGroup({})
  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()
  @Input() empleado = new Empleado()
  @Input() edit = false

  tiposEmpleado: TipoEmpleado[] = []

  constructor(
    private empleadosService: EmpleadosService,
  ) { }

  ngOnInit(): void {
    this.getTiposEmpleados()

    this.formInformacion = new FormGroup({
      tipoEmpleado: new FormControl(this.empleado.idTipoEmpleado, {
        validators: [
          Validators.required
        ]
      }),
      nombre: new FormControl(this.empleado.nombre, {
        validators: [
          Validators.required
        ]
      }),
      apellidoPaterno: new FormControl(this.empleado.apellidoPaterno, {
        validators: [
          Validators.required
        ]
      }),
      apellidoMaterno: new FormControl(this.empleado.apellidoMaterno, {
        validators: [
          Validators.required
        ]
      }),
      telefono: new FormControl(this.empleado.telefono, {
        validators: [
          Validators.required
        ]
      }),

    })
  }


  getTiposEmpleados() {
    this.empleadosService.getTiposEmpleados().subscribe(e => {
      this.tiposEmpleado = e
    })
  }

  onSubmit(values: any) {
    this.submitForm.emit(values)

  }

  onIconClick() {
    this.iconClicked.emit()
  }




}
