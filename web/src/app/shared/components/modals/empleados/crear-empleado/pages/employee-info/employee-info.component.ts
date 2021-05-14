import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  HeaderType = HeaderType

  @Output() iconClicked = new EventEmitter()

  form = new FormGroup({
    tipoEmpleado: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    contrasena: new FormControl('', {
      validators: [
        Validators.required
      ]
    }),
    confirmarContrasena: new FormControl('', {
      validators: [
        Validators.required
      ]
    })
  })

  constructor(
    private empleadosService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.getTiposEmpleados()
  }

  getTiposEmpleados() {
    this.empleadosService.getTiposEmpleados().subscribe(e => {
      console.log(e)
    })
  }

  onIconClick() {
    this.iconClicked.emit()
  }


}
