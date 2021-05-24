import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status, Pedido } from 'src/app/models/models';
import { MarcasService } from 'src/app/services/marcas/marcas.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

interface ModalData {
  pedido: Pedido
}

@Component({
  selector: 'app-eliminar-pedido',
  templateUrl: './eliminar-pedido.component.html',
  styleUrls: ['./eliminar-pedido.component.scss']
})
export class EliminarPedidoComponent implements OnInit {
  Status = Status
  currentStatus = Status.loaded

  pedido = new Pedido()

  @Output() pedidoEliminado = new EventEmitter()

  constructor(
    private dialog: MatDialogRef<EliminarPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private pedidosService: PedidosService
  ) { }

  ngOnInit(): void {
    this.pedido = this.modalData.pedido
  }

  deletemMarca() {
    this.currentStatus = Status.loading

    this.pedidosService.deletePedido(this.pedido.idPedido).subscribe(e => {
      this.currentStatus = Status.success
      this.pedidoEliminado.emit()
    })
  }

  close() {
    this.dialog.close()
  }
}
