import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Statement } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { Status, Alimentos, TipoAlimento, PedidoAlimento, Pedido } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';

interface ModalData {
  pedido: Pedido
}

@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.scss']
})
export class AgregarDetalleComponent implements OnInit {

  Pages = Pages
  Status = Status

  currentPage = Pages.alimentosCantidad
  currentStatus = Status.loaded

  tipoAlimentos: TipoAlimento[] = []
  typeSelected = new TipoAlimento()
  alimento = new Alimentos()

  pedido = new Pedido()

  constructor(
    private dialog: MatDialogRef<AgregarDetalleComponent>,
    private tiposAlimentosService: TiposAlimentosService,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {

    Object.assign(this.pedido, this.modalData.pedido)

    this.getTiposAlimentos()
  }

  getTiposAlimentos() {
    this.tiposAlimentosService.getTipoAlimentos().subscribe(e => {
      this.tipoAlimentos = e
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

  addAlimento(alimento: Alimentos) {
    this.alimento = alimento
    this.changePage(Pages.alimentosCantidad)
  }

  addAlimentoPedido(pedidoAlimento: PedidoAlimento) {
    console.log(pedidoAlimento)
  }

}

enum Pages {
  main,
  alimentosList,
  alimentosCantidad
}