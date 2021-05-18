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
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {
    this.empleado = this.modalData.empleado
  }

  cancel() {
    this.dialog.close()
  }

}
