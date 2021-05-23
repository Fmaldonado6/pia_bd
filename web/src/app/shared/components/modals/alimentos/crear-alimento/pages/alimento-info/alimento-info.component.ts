import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alimentos, TipoAlimento, Marca } from 'src/app/models/models';
import { HeaderType } from '../../../../modal-title/modal-title.component';
import { TiposAlimentosService } from '../../../../../../../services/tipos-alimentos/tipos-alimentos.service';
import { MarcasService } from 'src/app/services/marcas/marcas.service';

@Component({
  selector: 'alimento-info',
  templateUrl: './alimento-info.component.html',
  styleUrls: ['./alimento-info.component.scss']
})
export class AlimentoInfoComponent implements OnInit {

  HeaderType = HeaderType
  formInformacion: FormGroup = new FormGroup({})
  tiposAlimentos: TipoAlimento[] = [];
  idMarca: Marca [] = []

  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()
  @Input() alimento = new Alimentos()
  @Input() edit = false

  constructor(private tiposAlimentosService: TiposAlimentosService,
              private tiposMarcaService: MarcasService) { }

  ngOnInit(): void {
    this.getTiposAlimentos();
    this.getTiposMarca();

    this.formInformacion = new FormGroup({
      tipoAlimento: new FormControl(this.alimento.idTipoAlimento, {
        validators: [
          Validators.required
        ]
      }),
      nombre: new FormControl(this.alimento.nombre, {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z/0-9]+$/),
        ]
      }),
      idAlimento: new FormControl(this.alimento.idAlimento, {
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]
      }),
      idMarca: new FormControl(this.alimento.idMarca, {
        validators: [
          Validators.required
        ]
      }),
      precio: new FormControl(this.alimento.precio, {
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]
      }),
      cantidadDisponible: new FormControl(this.alimento.cantidadDisponible, {
        validators: [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
        ]
      }),
      descripcion: new FormControl(this.alimento.descripcion, {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z/0-9]+$/),
        ]
      })
    })
  }

  getTiposAlimentos() {
    this.tiposAlimentosService.getTipoAlimentos().subscribe(e => {
      this.tiposAlimentos = e
    })
  }

  getTiposMarca() {
    this.tiposMarcaService.getMarcas().subscribe(e => {
      this.idMarca = e
    })
  }

  onSubmit(values: any) {
    
    this.submitForm.emit(values)

  }

  onIconClick() {
    this.iconClicked.emit()
  }
}
