import { Status } from 'src/app/models/models';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipos-empleado',
  templateUrl: './tipos-empleado.component.html',
  styleUrls: ['./tipos-empleado.component.scss']
})
export class TiposEmpleadoComponent implements OnInit {

  Pages = Pages
  Status = Status

  currentStatus = Status.loaded
  currentPage = Pages.infoPage

  constructor(
    private dialogRef: MatDialogRef<TiposEmpleadoComponent>
  ) { }

  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close()
  }

}

enum Pages {
  infoPage,
  privilegesPage
}