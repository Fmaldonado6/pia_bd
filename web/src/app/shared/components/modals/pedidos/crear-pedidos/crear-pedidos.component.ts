import { PedidosService } from './../../../../../services/pedidos/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pedido } from 'src/app/models/models';


interface miPedido{
  fecha?: Date
  descuentoPed: number
  subtotalPed: number
  totalPed: number
}

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.scss']
})


export class CrearPedidosComponent {

  pedido = new Pedido()

  constructor(
    private dialogRef: MatDialogRef<CrearPedidosComponent>
  ) { }

  addPedido(values: miPedido) {
    this.pedido.fechaPedido = values.fecha
    this.pedido.total = values.totalPed
    this.pedido.subtotal = values.subtotalPed
    this.pedido.descuento = values.descuentoPed
  }

}
