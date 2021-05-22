import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlimentosRoutingModule } from './alimentos-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarAlimentosComponent } from './pages/agregar-alimentos/agregar-alimentos.component';
import { EditarAlimentosComponent } from './pages/editar-alimentos/editar-alimentos.component';
import { EliminarAlimentosComponent } from './pages/eliminar-alimentos/eliminar-alimentos.component';


@NgModule({
  declarations: [
    MainComponent,
    AgregarAlimentosComponent,
    EditarAlimentosComponent,
    EliminarAlimentosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlimentosRoutingModule
  ]
})
export class AlimentosModule { }
