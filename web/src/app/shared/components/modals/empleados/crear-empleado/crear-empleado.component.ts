import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Empleado, Estado, Municipio, Pais, Status } from 'src/app/models/models';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';

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
  ) { }

  addPersonalInfo(values: PersonalInfoForm) {
    this.empleado.nombre = `${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`
    this.changePage(Pages.address)
  }

  addAddress(values: AddressForm) {
    console.log(values)
    this.changePage(Pages.employeeInfo)
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