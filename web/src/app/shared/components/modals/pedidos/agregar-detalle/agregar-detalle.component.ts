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

  constructor(
    private dialog: MatDialogRef<AgregarDetalleComponent>,
    private tiposAlimentosService: TiposAlimentosService
  ) { }

  ngOnInit(): void {
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