import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../../shared/shared.module';
import { FacturaCrearComponent } from './pages/factura-crear/factura-crear.component';
import { FacturaVerComponent } from './pages/factura-ver/factura-ver.component';

@NgModule({
  declarations: [
    MainComponent,
    FacturaCrearComponent,
    FacturaVerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FacturacionRoutingModule
  ]
})
export class FacturacionModule { }
