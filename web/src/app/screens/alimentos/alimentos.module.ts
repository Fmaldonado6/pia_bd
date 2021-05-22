import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlimentosRoutingModule } from './alimentos-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlimentosRoutingModule
  ]
})
export class AlimentosModule { }
