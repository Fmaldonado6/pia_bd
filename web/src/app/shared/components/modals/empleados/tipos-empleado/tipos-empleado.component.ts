import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { Privilegios, Status, TipoEmpleado } from 'src/app/models/models';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Forbbiden } from 'src/app/models/exceptions';
import { InfoTypes } from '../../../info-menu/info-menu.component';

@Component({
  selector: 'app-tipos-empleado',
  templateUrl: './tipos-empleado.component.html',
  styleUrls: ['./tipos-empleado.component.scss']
})
export class TiposEmpleadoComponent {
  InfoTypes = InfoTypes
  Pages = Pages
  Status = Status

  currentStatus = Status.loaded
  currentPage = Pages.infoPage

  tipoEmpleado = new TipoEmpleado()

  @Output() typeCreated = new EventEmitter()

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
      this.typeCreated.emit()
      setTimeout(() => {
        this.close()
      }, 1500);
    }, e => {

      if (e instanceof Forbbiden)
        this.currentStatus = Status.forbidden
      else
        this.currentStatus = Status.error
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