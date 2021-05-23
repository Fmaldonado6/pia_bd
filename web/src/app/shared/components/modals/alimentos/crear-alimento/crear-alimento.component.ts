import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Alimentos, Status } from 'src/app/models/models';
import { AlimentosService } from 'src/app/services/alimentos/alimentos.service';

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

  @Input() Alimento = new Alimentos()
  @Input() edit = false
  @Output() iconClicked = new EventEmitter()
  @Output() userCreated = new EventEmitter()

  constructor(
    private dialogRef: MatDialogRef<CrearAlimentoComponent>,
    private alimentosService: AlimentosService
  ) { }

  ngOnInit(): void {
  }

  addAlimentInfo(values: AlimentoInfoForm) {
    this.Alimento.nombre = values.nombre
    this.Alimento.idMarca = values.idMarca
    this.Alimento.idTipoAlimento = values.idTipoAlimento
    this.Alimento.precio = values.precio
    this.Alimento.cantidadDisponible = values.cantidadDisponible
    this.Alimento.descripcion = values.descripcion
    this.addAlimento()
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