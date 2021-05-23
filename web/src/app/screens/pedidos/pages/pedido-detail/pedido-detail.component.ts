import { PedidoAlimento } from './../../../../models/models';
import { EditarDetalleComponent } from './../../../../shared/components/modals/pedidos/editar-detalle/editar-detalle.component';
import { AgregarDetalleComponent } from './../../../../shared/components/modals/pedidos/agregar-detalle/agregar-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pedido, SectionCard, Status } from 'src/app/models/models';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.scss']
})
export class PedidoDetailComponent implements OnInit {


  id: string = ""

  Status = Status
  currentStatus = Status.loading

  total = 0

  pedido = new Pedido()

  constructor(
    private activatedRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params.id
    this.getPedido()
  }

  openAddAddDialog() {
    const dialog = this.dialog.open(AgregarDetalleComponent, {
      data: {
        pedido: this.pedido
      }
    })

    dialog.componentInstance.pedidoEditado.subscribe(e => {
      this.getPedido()
    })
  }

  openEditIdemDialog(detalle: PedidoAlimento) {
    const dialog = this.dialog.open(EditarDetalleComponent, {
      data: {
        detalle: detalle,
        pedido: this.pedido
      }
    })

    dialog.componentInstance.detalleActualizado.subscribe(e => {
      this.getPedido()
    })

  }

  getPedido() {

    this.currentStatus = Status.loading

    this.pedidosService.getPedido(this.id).subscribe(e => {

      this.pedido = e

      for (let detalle of this.pedido.alimentos) {
        this.total += detalle.precio * detalle.cantidad
      }

      this.currentStatus = Status.loaded

    })

  }

}
