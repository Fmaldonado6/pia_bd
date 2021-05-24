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
import { CrearPedidosComponent } from './components/modals/pedidos/crear-pedidos/crear-pedidos.component';
import { EditarEmpleadoComponent } from './components/modals/empleados/editar-empleado/editar-empleado.component';
import { EditarEmpleadoMainComponent } from './components/modals/empleados/editar-empleado/pages/editar-empleado-main/editar-empleado-main.component';
import { EditarContrasenaComponent } from './components/modals/empleados/editar-empleado/pages/editar-contrasena/editar-contrasena.component';
import { AgregarDetalleComponent } from './components/modals/pedidos/agregar-detalle/agregar-detalle.component';
import { MainComponent } from './components/modals/pedidos/agregar-detalle/pages/main/main.component';
import { AlimentosListComponent } from './components/modals/pedidos/agregar-detalle/pages/alimentos-list/alimentos-list.component';
import { AlimentosCantidadComponent } from './components/modals/pedidos/agregar-detalle/pages/alimentos-cantidad/alimentos-cantidad.component';
import { EmployeeListComponent } from './components/modals/pedidos/crear-pedidos/pages/employee-list/employee-list.component';
import { EditarDetalleComponent } from './components/modals/pedidos/editar-detalle/editar-detalle.component';
import { CrearAlimentoComponent } from './components/modals/alimentos/crear-alimento/crear-alimento.component';
import { EliminarAlimentoComponent } from './components/modals/alimentos/eliminar-alimento/eliminar-alimento.component';
import { EditarAlimentoComponent } from './components/modals/alimentos/editar-alimento/editar-alimento.component';
import { AlimentoInfoComponent } from './components/modals/alimentos/crear-alimento/pages/alimento-info/alimento-info.component';
import { CrearMarcaComponent } from './components/modals/marcas/crear-marca/crear-marca.component';
import { EditarMarcaComponent } from './components/modals/marcas/editar-marca/editar-marca.component';
import { EliminarMarcaComponent } from './components/modals/marcas/eliminar-marca/eliminar-marca.component';
import { CrearTipoAlimentoComponent } from './components/modals/tipoAlimentos/crear-tipo-alimento/crear-tipo-alimento.component';
import { EditarTipoAlimentoComponent } from './components/modals/tipoAlimentos/editar-tipo-alimento/editar-tipo-alimento.component';
import { EliminarTipoAlimentoComponent } from './components/modals/tipoAlimentos/eliminar-tipo-alimento/eliminar-tipo-alimento.component';
import { CrearFacturasCrearComponent } from './components/modals/facturas/crear-facturas-crear/crear-facturas-crear.component';
import { OrdersListComponent } from './components/modals/facturas/crear-facturas-crear/pages/orders-list/orders-list.component';
import { EliminarPedidoComponent } from './components/modals/pedidos/eliminar-pedido/eliminar-pedido.component';


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
    EditarContrasenaComponent,
    AgregarDetalleComponent,
    MainComponent,
    AlimentosListComponent,
    AlimentosCantidadComponent,
    EmployeeListComponent,
    EditarDetalleComponent,
    CrearAlimentoComponent,
    EliminarAlimentoComponent,
    EditarAlimentoComponent,
    AlimentoInfoComponent,
    CrearMarcaComponent,
    EditarMarcaComponent,
    EliminarMarcaComponent,
    CrearTipoAlimentoComponent,
    EditarTipoAlimentoComponent,
    EliminarTipoAlimentoComponent,
    CrearFacturasCrearComponent,
    OrdersListComponent,
    EliminarPedidoComponent,
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
