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
import { EliminarTipoEmpleadoComponent } from './components/modals/empleados/eliminar-tipo-empleado/eliminar-tipo-empleado.component';
// import { PedidosComponent } from './components/modals/pedidos/pedidos.component';
import { CrearPedidosComponent } from './components/modals/pedidos/crear-pedidos/crear-pedidos.component';
import { EditarEmpleadoComponent } from './components/modals/empleados/editar-empleado/editar-empleado.component';
import { EditarEmpleadoMainComponent } from './components/modals/empleados/editar-empleado/pages/editar-empleado-main/editar-empleado-main.component';
import { EditarInformacionComponent } from './components/modals/empleados/editar-empleado/pages/editar-informacion/editar-informacion.component';


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
    TipoEmpleadosPrivilegiosComponent,
    EliminarTipoEmpleadoComponent,
    CrearPedidosComponent,
    EditarEmpleadoComponent,
    EditarEmpleadoMainComponent,
    EditarInformacionComponent
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