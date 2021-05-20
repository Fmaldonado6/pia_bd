import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Status, Empleado } from 'src/app/models/models';

interface ModalData {
  empleado: Empleado
}

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.scss']
})
export class EditarEmpleadoComponent implements OnInit {

  Status = Status
  Pages = Pages

  currentPage = Pages.editInfo
  currentStatus = Status.loaded

  empleado = new Empleado()

  constructor(
    private dialogRef: MatDialogRef<EditarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {
    this.empleado = this.modalData.empleado
    console.log(this.empleado)
  }

  close() {
    this.dialogRef.close()
  }

  changePage(page: Pages) {
    this.currentPage = page
  }

}

export enum Pages {
  main,
  editInfo,
  changePassword
}
