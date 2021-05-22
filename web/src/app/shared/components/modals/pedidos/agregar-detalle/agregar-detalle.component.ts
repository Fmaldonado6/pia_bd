import { Alimentos, TipoAlimento } from './../../../../../models/models';
import { MatDialogRef } from '@angular/material/dialog';
import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';

@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.scss']
})
export class AgregarDetalleComponent implements OnInit {

  Pages = Pages
  Status = Status

  currentPage = Pages.main
  currentStatus = Status.loaded

  tipoAlimentos: TipoAlimento[] = []
  typeSelected = new TipoAlimento()
  alimento = new Alimentos()
  constructor(
    private dialog: MatDialogRef<AgregarDetalleComponent>,
    private tiposAlimentosService: TiposAlimentosService
  ) { }

  ngOnInit(): void {
    this.getTiposAlimentos()
  }

  getTiposAlimentos() {
    this.tiposAlimentosService.getTipoAlimentos().subscribe(e => {
      this.tipoAlimentos = e
      console.log(e)
    })
  }

  selectType(tipo: TipoAlimento) {
    this.typeSelected = tipo
    this.changePage(Pages.alimentosList)
  }

  selectFood(alimento: Alimentos) {
    this.alimento = alimento
    this.changePage(Pages.alimentosCantidad)
  }

  changePage(pages: Pages) {
    this.currentPage = pages
  }

  close() {
    this.dialog.close()
  }

}

enum Pages {
  main,
  alimentosList,
  alimentosCantidad
}