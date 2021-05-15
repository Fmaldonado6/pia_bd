import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeInfoComponent } from './pages/employee-info/employee-info.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';


@NgModule({
  declarations: [
    MainComponent,
    EmployeeInfoComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmpleadosRoutingModule
  ]
})
export class EmpleadosModule { }
