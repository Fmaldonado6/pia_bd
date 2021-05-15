import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeInfoComponent } from './pages/employee-info/employee-info.component';


@NgModule({
  declarations: [
    MainComponent,
    EmployeeInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmpleadosRoutingModule
  ]
})
export class EmpleadosModule { }
