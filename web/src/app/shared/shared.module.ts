import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SectionCardComponent } from './components/section-card/section-card.component';
import { CrearEmpleadoComponent } from './components/modals/empleados/crear-empleado/crear-empleado.component';
import { ModalTitleComponent } from './components/modals/modal-title/modal-title.component';
import { PersonalInfoComponent } from './components/modals/empleados/crear-empleado/pages/personal-info/personal-info.component';
import { AddressComponent } from './components/modals/empleados/crear-empleado/pages/address/address.component';
import { EmployeeInfoComponent } from './components/modals/empleados/crear-empleado/pages/employee-info/employee-info.component';



@NgModule({
  declarations: [

    SectionCardComponent,
     CrearEmpleadoComponent,
     ModalTitleComponent,
     PersonalInfoComponent,
     AddressComponent,
     EmployeeInfoComponent
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
