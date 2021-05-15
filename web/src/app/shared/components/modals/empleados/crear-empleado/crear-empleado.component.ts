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
}

interface AddressForm {
  idPais: number
  idEstado: number
  idMunicipio: number
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

  currentPage = Pages.employeeInfo
  currentStatus = Status.loaded

  empleado = new Empleado()


  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
    private empleadosService: EmpleadosService
  ) { }

  addPersonalInfo(values: PersonalInfoForm) {
    this.empleado.nombre = `${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`
    this.changePage(Pages.address)
  }

  addAddress(values: AddressForm) {
    console.log(values)
    this.changePage(Pages.employeeInfo)
  }

  addEmployeeInfo(values: EmployeeInfo) {
    console.log(values)
  }

  addEmployee() {
    this.currentStatus = Status.loading

    this.empleadosService.addEmpleado(this.empleado).subscribe(e => {
      console.log(e)
    })
  }

  close() {
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