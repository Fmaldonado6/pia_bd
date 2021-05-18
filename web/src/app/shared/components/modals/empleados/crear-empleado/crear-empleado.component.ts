import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent {

  Pages = Pages
  Status = Status

  currentPage = Pages.personalInfo
  currentStatus = Status.loaded

  empleado = new Empleado()


  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
    private empleadosService: EmpleadosService
  ) { }

  addPersonalInfo(values: PersonalInfoForm) {
    this.empleado.nombre = `${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`
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

    this.empleadosService.addEmpleado(this.empleado).subscribe(e => {
      this.currentStatus = Status.success
      setTimeout(() => {
        this.dialogRef.close()
      }, 1500);
    })
  }

  close() {
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