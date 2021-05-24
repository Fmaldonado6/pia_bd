import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Estado, Factura, FacturaResource, Municipio, Pais } from 'src/app/models/models';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'factura-address',
  templateUrl: './factura-address.component.html',
  styleUrls: ['./factura-address.component.scss']
})
export class FacturaAddressComponent implements OnInit {
  HeaderType = HeaderType

  paises: Pais[] = []
  estados: Estado[] = []
  municipios: Municipio[] = []

  formDireccion: FormGroup = new FormGroup({})
  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()
  @Input() factura = new FacturaResource()
  @Input() edit = false

  constructor(
    private direccionesService: DireccionesService
  ) {



  }

  ngOnInit(): void {
    this.getPaises()

    if (!this.factura.nombreCalle && this.factura.idCalle)
      this.getCalle(this.factura.idCalle)


    if (!this.factura.nombreColonia && this.factura.idColonia)
      this.getColonia(this.factura.idColonia)

    this.formDireccion = new FormGroup({

      idPais: new FormControl(this.factura.idPais, {
        validators: [
          Validators.required
        ]
      }),
      idEstado: new FormControl(this.factura.idEstado, {
        validators: [
          Validators.required
        ]
      }),
      idMunicipio: new FormControl(this.factura.idMunicipio, {
        validators: [
          Validators.required
        ]
      }),
      nombreColonia: new FormControl(this.factura.nombreColonia, {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-z A-ZÁ-ÿ\u00f1\u00d1/0-9]+$/),
        ]
      }),
      nombreCalle: new FormControl(this.factura.nombreCalle, {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-z A-ZÁ-ÿ\u00f1\u00d1/0-9]+$/),
        ]
      }),
      numero: new FormControl(this.factura.numero, {
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
      this.formDireccion.patchValue({ pais: this.factura.idPais })
    })
  }

  getEstados(id: number) {
    this.direccionesService.getEstados(id).subscribe(e => {
      this.estados = e
      this.formDireccion.patchValue({ estado: this.factura.idEstado })

    })
  }

  getMunicipios(id: number) {
    this.direccionesService.getMunicipios(id).subscribe(e => {
      this.municipios = e
      this.formDireccion.patchValue({ municipio: this.factura.idMunicipio })

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
