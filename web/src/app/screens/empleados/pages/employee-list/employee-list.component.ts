import { EditarEmpleadoComponent } from './../../../../shared/components/modals/empleados/editar-empleado/editar-empleado.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Empleado, Status } from 'src/app/models/models';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { EliminarEmpleadoComponent } from 'src/app/shared/components/modals/empleados/eliminar-empleado/eliminar-empleado.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  Status = Status
  currentStatus = Status.loading

  empleados: Empleado[] = []

  constructor(
    private empleadosService: EmpleadosService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getEmpleados()
    this.openEditModal(new Empleado())
  }

  getEmpleados() {
    this.currentStatus = Status.loading
    this.empleadosService.getEmpleados().subscribe(e => {
      this.empleados = e
      this.currentStatus = Status.loaded
    })
  }

  openDeleteModal(empleado: Empleado) {

    const dialog = this.dialog.open(EliminarEmpleadoComponent, {
      data: {
        empleado: empleado
      }
    })

    dialog.componentInstance.empleadoEliminado.subscribe(e => {
      this.getEmpleados()
    })
  }

  openEditModal(empleado: Empleado) {
    console.log(empleado)
    const dialog = this.dialog.open(EditarEmpleadoComponent, {
      data: {
        empleado: empleado
      }
    })

  }

}
