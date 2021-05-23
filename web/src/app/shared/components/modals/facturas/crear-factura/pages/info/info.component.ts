import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/models';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  pedidos: Pedido[] = []

  constructor(

    private pedidosService: PedidosService

  ) { }

  ngOnInit(): void {
  }

  getPedidos() {
  }

}
