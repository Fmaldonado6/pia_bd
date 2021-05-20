import { AuthService } from 'src/app/services/auth/auth.service';
import { CrearEmpleadoComponent } from './../../../../shared/components/modals/empleados/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './../../../../shared/components/modals/empleados/editar-empleado/editar-empleado.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Empleado, Status } from 'src/app/models/models';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { EliminarEmpleadoComponent } from 'src/app/shared/components/modals/empleados/eliminar-empleado/eliminar-empleado.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    this.currentStatus = Status.loading
    this.empleadosService.getEmpleados().subscribe(e => {
      this.empleados = e
      this.currentStatus = Status.loaded
    })
  }

  openDeleteModal(empleado: Empleado): any {

    if (empleado.idEmpleado == this.authService.loggedUser.value?.idEmpleado)
      return this.snackBar.open("No puedes eliminar el usuario actual", "CERRAR", { duration: 2000 })

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
    const dialog = this.dialog.open(EditarEmpleadoComponent, {
      data: {
        empleado: empleado
      }
    })


  }

  openRegisterModal() {

    const dialog = this.dialog.open(CrearEmpleadoComponent)

  }

}
