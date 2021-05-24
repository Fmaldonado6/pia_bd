import { FacturaDetalleComponent } from './pages/factura-detalle/factura-detalle.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaCrearComponent } from './pages/factura-crear/factura-crear.component';
import { FacturaVerComponent } from './pages/factura-ver/factura-ver.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'create',
    component: FacturaCrearComponent
  },
  {
    path: 'ver',
    component: FacturaVerComponent
  },
  {
    path: ':id',
    component: FacturaDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
