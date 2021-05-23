import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Alimentos, Status } from 'src/app/models/models';

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

  @Input() Alimento = new Alimentos ()
  @Input() edit = false
  @Output() iconClicked = new EventEmitter()
  @Output() userCreated = new EventEmitter()

  constructor(private dialogRef: MatDialogRef<CrearAlimentoComponent> ) { }

  ngOnInit(): void {
  }

  addAlimentInfo(values: AlimentoInfoForm) {
    this.Alimento.nombre = values.nombre
    this.Alimento.idAlimento = values.idAlimento
    this.Alimento.idMarca = values.idMarca
    this.Alimento.idTipoAlimento = values.idTipoAlimento
    this.Alimento.precio = values.precio
    this.Alimento.cantidadDisponible = values.cantidadDisponible
    this.Alimento.descripcion = values.descripcion
  }

  success() {
    this.currentStatus = Status.success
    this.userCreated.emit()
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
  idAlimento: number
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