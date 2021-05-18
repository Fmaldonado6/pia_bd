import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado, Status } from 'src/app/models/models';

interface ModalData {
  empleado: Empleado
}

@Component({
  selector: 'app-eliminar-empleado',
  templateUrl: './eliminar-empleado.component.html',
  styleUrls: ['./eliminar-empleado.component.scss']
})
export class EliminarEmpleadoComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  empleado = new Empleado()

  constructor(
    private dialog: MatDialogRef<EliminarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private empleadosService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.empleado = this.modalData.empleado
  }

  deleteUser() {
    this.currentStatus = Status.loading

    this.empleadosService.deleteEmpleado(this.empleado.idEmpleado).subscribe(e => {
      this.currentStatus = Status.success
    })
  }

  close() {
    this.dialog.close()
  }

}
