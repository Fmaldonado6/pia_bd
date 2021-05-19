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
import { ConfirmMenuComponent } from './components/confirm-menu/confirm-menu.component';
import { EliminarEmpleadoComponent } from './components/modals/empleados/eliminar-empleado/eliminar-empleado.component';
import { InfoMenuComponent } from './components/info-menu/info-menu.component';
import { TiposEmpleadoComponent } from './components/modals/empleados/tipos-empleado/tipos-empleado.component';
import { TipoEmpleadosInfoComponent } from './components/modals/empleados/tipos-empleado/pages/tipo-empleados-info/tipo-empleados-info.component';
import { TipoEmpleadosPrivilegiosComponent } from './components/modals/empleados/tipos-empleado/pages/tipo-empleados-privilegios/tipo-empleados-privilegios.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [

    SectionCardComponent,
    CrearEmpleadoComponent,
    ModalTitleComponent,
    PersonalInfoComponent,
    AddressComponent,
    EmployeeInfoComponent,
    ConfirmMenuComponent,
    EliminarEmpleadoComponent,
    InfoMenuComponent,
    TiposEmpleadoComponent,
    TipoEmpleadosInfoComponent,
    TipoEmpleadosPrivilegiosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,

  ],
  exports: [
    MaterialModule,
    SectionCardComponent,
    NgxMaterialTimepickerModule,


  ]
})
export class SharedModule { }