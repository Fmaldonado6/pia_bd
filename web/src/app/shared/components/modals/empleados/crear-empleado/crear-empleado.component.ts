import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Empleado, Estado, Municipio, Pais, Status } from 'src/app/models/models';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';

interface PersonalInfoForm {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  telefono: string
}

interface AddressForm {
  pais: number
  estado: number
  municipio: number
  colonia: string
  calle: string
  numero: number
}

interface EmployeeInfo {
  password: string
  tipoEmpleado: number
}

@Component({
  selector: 'crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {

  Pages = Pages
  Status = Status

  currentPage = Pages.personalInfo
  currentStatus = Status.loaded

  @Input() empleado = new Empleado()
  @Input() edit = false

  @Output() iconClicked = new EventEmitter()

  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
    private empleadosService: EmpleadosService
  ) { }
  ngOnInit(): void {
    console.log(this.empleado)
  }

  addPersonalInfo(values: PersonalInfoForm) {
    this.empleado.nombre = values.nombre
    this.empleado.apellidoMaterno = values.apellidoMaterno
    this.empleado.apellidoPaterno = values.apellidoPaterno
    this.empleado.telefono = values.telefono
    this.changePage(Pages.address)
  }

  addAddress(values: AddressForm) {
    this.empleado.idPais = values.pais
    this.empleado.idEstado = values.estado
    this.empleado.idMunicipio = values.municipio
    this.empleado.nombreColonia = values.colonia
    this.empleado.nombreCalle = values.calle
    this.empleado.numero = values.numero
    this.changePage(Pages.employeeInfo)
  }

  addEmployeeInfo(values: EmployeeInfo) {
    this.empleado.idTipoEmpleado = values.tipoEmpleado
    this.empleado.contrasena = values.password
    this.addEmployee()
  }

  addEmployee() {
    this.currentStatus = Status.loading
    console.log(this.empleado)
    this.empleadosService.addEmpleado(this.empleado).subscribe(e => {
      this.currentStatus = Status.success
      setTimeout(() => {
        this.dialogRef.close()
      }, 1500);
    })
  }

  close() {
    if (this.edit)
      return this.iconClicked.emit()

    this.dialogRef.close()
  }

  changePage(page: Pages) {
    console.log(this.empleado)
    this.currentPage = page
  }
}

enum Pages {
  personalInfo,
  address,
  employeeInfo
}