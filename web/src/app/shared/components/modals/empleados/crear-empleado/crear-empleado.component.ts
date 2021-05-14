import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Status } from 'src/app/models/models';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {

  Pages = Pages
  Status = Status
  currentStatus = Status.loading

  constructor(
    private dialogRef: MatDialogRef<CrearEmpleadoComponent>,
    private direccionesService: DireccionesService
  ) { }

  ngOnInit(): void {
    this.getPaises()
  }

  getPaises() {
    this.direccionesService.getPaises().subscribe(e => {
      console.log(e)
    })
  }


  close() {
    this.dialogRef.close()
  }

}

enum Pages {
  personalInfo,
  direction,
}