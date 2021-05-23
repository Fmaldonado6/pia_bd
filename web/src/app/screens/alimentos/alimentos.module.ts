import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlimentosRoutingModule } from './alimentos-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { TiposComponent } from './pages/tipos/tipos.component';
import { VerAlimentosComponent } from './pages/ver-alimentos/ver-alimentos.component';


@NgModule({
  declarations: [
    MainComponent,
    MarcasComponent,
    TiposComponent,
    VerAlimentosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlimentosRoutingModule
  ]
})
export class AlimentosModule { }
