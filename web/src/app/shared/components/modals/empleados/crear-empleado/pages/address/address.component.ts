import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Pais, Estado, Municipio, Status } from 'src/app/models/models';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';
import { HeaderType } from '../../../../modal-title/modal-title.component';
import { CrearEmpleadoComponent } from '../../crear-empleado.component';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  HeaderType = HeaderType

  paises: Pais[] = []
  estados: Estado[] = []
  municipios: Municipio[] = []

  formDireccion: FormGroup
  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()

  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
    private direccionesService: DireccionesService
  ) {




    this.formDireccion = new FormGroup({

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
      colonia: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      calle: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      numero: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
    })

  }

  ngOnInit(): void {
    this.getPaises()
  }

  onSubmit(values: any) {
    console.log(values)
    this.submitForm.emit(values)

  }


  getPaises() {
    this.direccionesService.getPaises().subscribe(e => {
      this.paises = e
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

  onIconClick() {
    this.iconClicked.emit()
  }

}
