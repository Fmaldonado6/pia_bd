import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Estado, Municipio, Pais, Status } from 'src/app/models/models';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {

  Pages = Pages
  Status = Status
  currentStatus = Status.loading


  paises: Pais[] = []
  estados: Estado[] = []
  municipios: Municipio[] = []

  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
    private direccionesService: DireccionesService
  ) {

    this.form = new FormGroup({
      nombre: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      apellidoPaterno: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      apellidoMaterno: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      pais: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      estado: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      municipio: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),

    })

  }

  ngOnInit(): void {
    this.getPaises()
  }

  getPaises() {
    this.direccionesService.getPaises().subscribe(e => {
      this.paises = e
      this.currentStatus = Status.loaded
    })
  }

  getEstados(id: number) {
    this.direccionesService.getEstados(id).subscribe(e => {
      console.log(e)
      this.estados = e
    })
  }

  getMunicipios(id: number) {
    this.direccionesService.getMunicipios(id).subscribe(e => {
      console.log(e)
      this.municipios = e
    })
  }


  close() {
    this.dialogRef.close()
  }

}

enum Pages {
  personalInfo,
  direction,
}