import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeInfoComponent } from './pages/employee-info/employee-info.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "list",
    component: EmployeeListComponent
  },
  {
    path: ":id",
    component: EmployeeInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
