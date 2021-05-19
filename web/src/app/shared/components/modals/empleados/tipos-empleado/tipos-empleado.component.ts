import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { Privilegios, Status, TipoEmpleado } from 'src/app/models/models';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipos-empleado',
  templateUrl: './tipos-empleado.component.html',
  styleUrls: ['./tipos-empleado.component.scss']
})
export class TiposEmpleadoComponent {

  Pages = Pages
  Status = Status

  currentStatus = Status.loaded
  currentPage = Pages.privilegesPage

  tipoEmpleado = new TipoEmpleado()

  constructor(
    private dialogRef: MatDialogRef<TiposEmpleadoComponent>,
    private empleadosService: EmpleadosService
  ) { }


  addTipoEmpleadoInfo(values: TipoEmpleado) {
    this.tipoEmpleado.nombreTipoEmpleado = values.nombreTipoEmpleado
    this.tipoEmpleado.sueldo = values.sueldo
    this.tipoEmpleado.horaEntrada = values.horaEntrada
    this.tipoEmpleado.horaSalida = values.horaSalida
    this.changePage(Pages.privilegesPage)
  }

  addPrivilegios(values: Privilegios[]) {
    this.tipoEmpleado.privilegios = values
    this.addTipoEmpleado()
  }

  addTipoEmpleado() {
    this.currentStatus = Status.loading
    this.empleadosService.addTipoEmpleado(this.tipoEmpleado).subscribe(e => {
      this.currentStatus = Status.success
    })
  }

  close() {
    this.dialogRef.close()
  }

  changePage(page: Pages) {
    this.currentPage = page
  }

}

enum Pages {
  infoPage,
  privilegesPage
}