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
  tipoEmpleado: number
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
  contrasena: string
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
  @Output() userCreated = new EventEmitter()

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
    this.empleado.idTipoEmpleado = values.tipoEmpleado
    this.changePage(Pages.address)
  }

  addAddress(values: AddressForm) {
    this.empleado.idPais = values.pais
    this.empleado.idEstado = values.estado
    this.empleado.idMunicipio = values.municipio
    this.empleado.nombreColonia = values.colonia
    this.empleado.nombreCalle = values.calle
    this.empleado.numero = values.numero

    if (!this.edit)
      this.changePage(Pages.employeeInfo)
    else
      this.updateUser()
  }

  updateUser() {
    this.currentStatus = Status.loading
    this.empleadosService.updateEmpleado(this.empleado).subscribe(e => {
      this.success()
    })
  }

  addEmployeeInfo(values: EmployeeInfo) {
    this.empleado.contrasena = values.contrasena
    this.addEmployee()
  }

  addEmployee() {
    this.currentStatus = Status.loading
    this.empleadosService.addEmpleado(this.empleado).subscribe(e => {
      this.success()
    })
  }

  success() {
    this.currentStatus = Status.success
    this.userCreated.emit()
    setTimeout(() => {
      this.dialogRef.close()
    }, 1500);
  }

  close() {
    if (this.edit)
      return this.iconClicked.emit()

    this.dialogRef.close()
  }

  changePage(page: Pages) {
    this.currentPage = page
  }
}

enum Pages {
  personalInfo,
  address,
  employeeInfo
}