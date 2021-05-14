import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent {

  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>
  ) { }


  close() {
    this.dialogRef.close()
  }

}
