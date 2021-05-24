import { ListaPedidosComponent } from './pages/lista-pedidos/lista-pedidos.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { PedidoDetailComponent } from './pages/pedido-detail/pedido-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "lista",
    component: ListaPedidosComponent
  },
  {
    path: "tickets",
    component: TicketListComponent
  },
  {
    path: "ticket/:id",
    component: TicketDetailComponent
  },
  {
    path: ":id",
    component: PedidoDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
