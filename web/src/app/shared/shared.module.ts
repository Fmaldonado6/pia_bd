import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SectionCardComponent } from './components/section-card/section-card.component';
import { CrearEmpleadoComponent } from './components/modals/empleados/crear-empleado/crear-empleado.component';
import { ModalTitleComponent } from './components/modals/modal-title/modal-title.component';



@NgModule({
  declarations: [

    SectionCardComponent,
     CrearEmpleadoComponent,
     ModalTitleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    SectionCardComponent

  ]
})
export class SharedModule { }
