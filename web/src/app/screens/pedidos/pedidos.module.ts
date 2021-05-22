import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ListaPedidosComponent } from './pages/lista-pedidos/lista-pedidos.component';
import { PedidoDetailComponent } from './pages/pedido-detail/pedido-detail.component';


@NgModule({
  declarations: [
    MainComponent,
    ListaPedidosComponent,
    PedidoDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
