import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Statement } from '@angular/compiler';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Status, Alimentos, TipoAlimento, PedidoAlimento, Pedido } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

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

  currentPage = Pages.main
  currentStatus = Status.loaded

  tipoAlimentos: TipoAlimento[] = []
  typeSelected = new TipoAlimento()
  alimento = new Alimentos()

  pedido = new Pedido()

  @Output() pedidoEditado = new EventEmitter()

  constructor(
    private dialog: MatDialogRef<AgregarDetalleComponent>,
    private tiposAlimentosService: TiposAlimentosService,
    private pedidosService: PedidosService,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {

    this.pedido = JSON.parse(JSON.stringify(this.modalData.pedido))

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
    pedidoAlimento.idPedido = this.pedido.idPedido

    let exists = false

    for (let detalle of this.pedido.alimentos) {

      if (detalle.idAlimento == pedidoAlimento.idAlimento) {
        detalle.cantidad += pedidoAlimento.cantidad
        detalle.precio += pedidoAlimento.precio
        exists = true
        break;
      }
    }

    if (!exists)
      this.pedido.alimentos.push(pedidoAlimento)

    this.currentStatus = Status.loading

    this.pedidosService.editPedido(this.pedido).subscribe(e => {
      this.currentStatus = Status.success
      this.pedidoEditado.emit()
    })

  }

}

enum Pages {
  main,
  alimentosList,
  alimentosCantidad
}