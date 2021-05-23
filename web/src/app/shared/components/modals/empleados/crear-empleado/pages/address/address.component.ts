import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Pais, Estado, Municipio, Empleado } from 'src/app/models/models';
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

  formDireccion: FormGroup = new FormGroup({})
  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()
  @Input() empleado = new Empleado()
  @Input() edit = false

  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
    private direccionesService: DireccionesService
  ) {



  }

  ngOnInit(): void {
    this.getPaises()

    if (!this.empleado.nombreCalle && this.empleado.idCalle)
      this.getCalle(this.empleado.idCalle)


    if (!this.empleado.nombreColonia && this.empleado.idColonia)
      this.getColonia(this.empleado.idColonia)

    this.formDireccion = new FormGroup({

      pais: new FormControl(this.empleado.idPais, {
        validators: [
          Validators.required
        ]
      }),
      estado: new FormControl(this.empleado.idEstado, {
        validators: [
          Validators.required
        ]
      }),
      municipio: new FormControl(this.empleado.idMunicipio, {
        validators: [
          Validators.required
        ]
      }),
      colonia: new FormControl(this.empleado.nombreColonia, {
        validators: [
          Validators.required,
<<<<<<< Updated upstream
=======
          Validators.pattern(/^[a-z A-ZÁ-ÿ\u00f1\u00d1/0-9]+$/),
>>>>>>> Stashed changes
        ]
      }),
      calle: new FormControl(this.empleado.nombreCalle, {
        validators: [
          Validators.required,
<<<<<<< Updated upstream
=======
          Validators.pattern(/^[a-z A-ZÁ-ÿ\u00f1\u00d1/0-9]+$/),
>>>>>>> Stashed changes
        ]
      }),
      numero: new FormControl(this.empleado.numero, {
        validators: [
          Validators.required
        ]
      }),
    })
  }

  onSubmit(values: any) {
    this.submitForm.emit(values)

  }


  getPaises() {
    this.direccionesService.getPaises().subscribe(e => {
      this.paises = e
      this.formDireccion.patchValue({ pais: this.empleado.idPais })
    })
  }

  getEstados(id: number) {
    this.direccionesService.getEstados(id).subscribe(e => {
      this.estados = e
      this.formDireccion.patchValue({ estado: this.empleado.idEstado })

    })
  }

  getMunicipios(id: number) {
    this.direccionesService.getMunicipios(id).subscribe(e => {
      this.municipios = e
      this.formDireccion.patchValue({ municipio: this.empleado.idMunicipio })

    })
  }

  getColonia(id: number) {
    this.direccionesService.getColonia(id).subscribe(e => {
      this.formDireccion.patchValue({ colonia: e.nombre })

    })
  }

  getCalle(id: number) {
    this.direccionesService.getCalle(id).subscribe(e => {
      this.formDireccion.patchValue({ calle: e.nombre })

    })
  }

  onIconClick() {
    this.iconClicked.emit()
  }

}
