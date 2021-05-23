import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alimentos, Status } from 'src/app/models/models';
import { AlimentosService } from 'src/app/services/alimentos/alimentos.service';

interface ModalData {
  alimento: Alimentos
}

@Component({
  selector: 'app-crear-alimento',
  templateUrl: './crear-alimento.component.html',
  styleUrls: ['./crear-alimento.component.scss']
})
export class CrearAlimentoComponent implements OnInit {

  Pages = Pages
  Status = Status

  currentPage = Pages.AlimentoInfo
  currentStatus = Status.loaded

  Alimento = new Alimentos()
  edit = false
  @Output() iconClicked = new EventEmitter()
  @Output() alimentoCreado = new EventEmitter()


  constructor(
    private dialogRef: MatDialogRef<CrearAlimentoComponent>,
    private alimentosService: AlimentosService,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {

    if (this.modalData) {
      this.edit = true
      Object.assign(this.Alimento, this.modalData.alimento)
    }

  }


  addAlimentInfo(values: AlimentoInfoForm) {
    this.Alimento.nombre = values.nombre
    this.Alimento.idMarca = values.idMarca
    this.Alimento.idTipoAlimento = values.idTipoAlimento
    this.Alimento.precio = values.precio
    this.Alimento.cantidadDisponible = values.cantidadDisponible
    this.Alimento.descripcion = values.descripcion

    if (this.edit)
      this.updateAlimento()
    else
      this.addAlimento()
  }

  updateAlimento() {
    this.currentStatus = Status.loading

    this.alimentosService.updateAlimento(this.Alimento).subscribe(e => {
      this.currentStatus = Status.success
      this.success()
    })
  }

  addAlimento() {
    this.currentStatus = Status.loading

    this.alimentosService.addAlimento(this.Alimento).subscribe(e => {
      this.currentStatus = Status.success
      this.success()
    })
  }


  success() {
    this.currentStatus = Status.success
    this.alimentoCreado.emit()
    setTimeout(() => {
      this.dialogRef.close()
    }, 1500);
  }

  clickIcon() {
    if (this.edit)
      return this.iconClicked.emit()
    this.close()
  }

  close() {


    this.dialogRef.close()
  }

  changePage(page: Pages) {
    this.currentPage = page
  }

}

interface AlimentoInfoForm {
  nombre: string
  idMarca: string
  idTipoAlimento: number
  precio: number
  cantidadDisponible: number
  descripcion: string
}

interface Marca {
  nombreMarca: string
  idMarca: number
}

interface tipoAlimento {
  tipoAlimento: string
  nombreTipo: string
}

enum Pages {
  AlimentoInfo
}