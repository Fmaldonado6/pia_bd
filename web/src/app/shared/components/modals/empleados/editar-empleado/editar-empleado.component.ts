import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
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

  currentPage = Pages.changePassword
  currentStatus = Status.loaded

  empleado = new Empleado()

  @Output() userEdited = new EventEmitter()

  constructor(
    private dialogRef: MatDialogRef<EditarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {
    Object.assign(this.empleado, this.modalData.empleado)
  }

  close() {
    this.dialogRef.close()
  }

  onUserEdited() {
    this.userEdited.emit()
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
