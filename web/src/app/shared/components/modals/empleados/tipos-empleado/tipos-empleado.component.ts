import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { Privilegios, Status, TipoEmpleado } from 'src/app/models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Forbbiden } from 'src/app/models/exceptions';
import { InfoTypes } from '../../../info-menu/info-menu.component';

interface ModalData {
  tipoEmpleado: TipoEmpleado
}

@Component({
  selector: 'app-tipos-empleado',
  templateUrl: './tipos-empleado.component.html',
  styleUrls: ['./tipos-empleado.component.scss']
})
export class TiposEmpleadoComponent implements OnInit {
  InfoTypes = InfoTypes
  Pages = Pages
  Status = Status

  currentStatus = Status.loaded
  currentPage = Pages.infoPage

  tipoEmpleado = new TipoEmpleado()

  @Output() typeCreated = new EventEmitter()

  edit = false

  constructor(
    private dialogRef: MatDialogRef<TiposEmpleadoComponent>,
    private empleadosService: EmpleadosService,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {
    if (this.modalData) {
      this.edit = true
      Object.assign(this.tipoEmpleado, this.modalData.tipoEmpleado)
    }
  }


  addTipoEmpleadoInfo(values: TipoEmpleado) {
    this.tipoEmpleado.nombreTipoEmpleado = values.nombreTipoEmpleado
    this.tipoEmpleado.sueldo = values.sueldo
    this.tipoEmpleado.horaEntrada = values.horaEntrada
    this.tipoEmpleado.horaSalida = values.horaSalida
    this.changePage(Pages.privilegesPage)
  }

  addPrivilegios(values: Privilegios[]) {
    this.tipoEmpleado.privilegios = values

    if (this.edit)
      this.updateTipoEmpleado()
    else
      this.addTipoEmpleado()
  }

  updateTipoEmpleado() {
    this.currentStatus = Status.loading
    this.empleadosService.updateTipoEmpleado(this.tipoEmpleado).subscribe(e => {
      this.success()
    }, e => {
      this.error(e)
    })
  }

  addTipoEmpleado() {
    this.currentStatus = Status.loading
    this.empleadosService.addTipoEmpleado(this.tipoEmpleado).subscribe(e => {
      this.success()
    }, e => {
      this.error(e)
    })
  }


  success() {
    this.currentStatus = Status.success
    this.typeCreated.emit()
    setTimeout(() => {
      this.close()
    }, 1500);
  }

  error(e: Error) {
    if (e instanceof Forbbiden)
      this.currentStatus = Status.forbidden
    else
      this.currentStatus = Status.error
  }

  close() {
    this.dialogRef.close()
  }

  changePage(page: Pages) {
    this.currentStatus = Status.loaded
    this.currentPage = page
  }

}

enum Pages {
  infoPage,
  privilegesPage
}