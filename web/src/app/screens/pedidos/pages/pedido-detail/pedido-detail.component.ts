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

  pedido = new Pedido()

  constructor(
    private activatedRoute: ActivatedRoute,
    private pedidosService: PedidosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params.id
    this.getPedido()
    this.openAddAddDialog()
  }

  openAddAddDialog() {
    this.dialog.open(AgregarDetalleComponent)
  }

  getPedido() {

    this.currentStatus = Status.loading

    this.pedidosService.getPedido(this.id).subscribe(e => {

      this.pedido = e
      this.currentStatus = Status.loaded

    })

  }

}
