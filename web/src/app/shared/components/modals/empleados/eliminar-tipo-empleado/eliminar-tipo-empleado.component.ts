import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status, TipoEmpleado } from 'src/app/models/models';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';

interface ModalData {
  tipoEmpleado: TipoEmpleado
}

@Component({
  selector: 'app-eliminar-tipo-empleado',
  templateUrl: './eliminar-tipo-empleado.component.html',
  styleUrls: ['./eliminar-tipo-empleado.component.scss']
})
export class EliminarTipoEmpleadoComponent implements OnInit {
  Status = Status
  currentStatus = Status.loaded

  tipoEmpleado = new TipoEmpleado()

  @Output() typeDeleted = new EventEmitter()

  constructor(
    private dialog: MatDialogRef<EliminarTipoEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private empleadosService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.tipoEmpleado = this.modalData.tipoEmpleado
  }

  deleteUser() {
    this.currentStatus = Status.loading

    this.empleadosService.deleteTipoEmpleado(this.tipoEmpleado.idTipoEmpleado).subscribe(e => {
      this.currentStatus = Status.success
      this.typeDeleted.emit()
    })
  }

  close() {
    this.dialog.close()
  }
}
