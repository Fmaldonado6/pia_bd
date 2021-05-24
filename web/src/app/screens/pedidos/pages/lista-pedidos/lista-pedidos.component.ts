import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pedido, Status } from 'src/app/models/models';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { CrearPedidosComponent } from 'src/app/shared/components/modals/pedidos/crear-pedidos/crear-pedidos.component';
import { EliminarPedidoComponent } from 'src/app/shared/components/modals/pedidos/eliminar-pedido/eliminar-pedido.component';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  Status = Status
  currentStatus = Status.loading

  pedidos: Pedido[] = []

  constructor(
    private pedidosService: PedidosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos() {
    this.currentStatus = Status.loading
    this.pedidosService.getPedidos().subscribe(e => {
      this.pedidos = e
      this.currentStatus = Status.loaded
    })

  }

  openRegisterModal() {
    const dialog = this.dialog.open(CrearPedidosComponent)

    dialog.componentInstance.empPedido.subscribe(e => {
      this.getPedidos()
    })
  }


  openDeleteModal(pedido: Pedido) {

    const dialog = this.dialog.open(EliminarPedidoComponent, {
      data: {
        pedido: pedido
      }
    })

    dialog.componentInstance.pedidoEliminado.subscribe(e => {
      this.getPedidos()
    })


  }
}
