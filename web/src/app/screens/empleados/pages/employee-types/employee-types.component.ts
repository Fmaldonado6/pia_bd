import { MatDialog } from '@angular/material/dialog';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { Status, TipoEmpleado } from 'src/app/models/models';
import { Component, OnInit } from '@angular/core';
import { TiposEmpleadoComponent } from 'src/app/shared/components/modals/empleados/tipos-empleado/tipos-empleado.component';

@Component({
  selector: 'app-employee-types',
  templateUrl: './employee-types.component.html',
  styleUrls: ['./employee-types.component.scss']
})
export class EmployeeTypesComponent implements OnInit {


  Status = Status
  currentStatus = Status.loading

  tipos: TipoEmpleado[] = []

  constructor(
    private empleadosService: EmpleadosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTypes()
    this.openRegisterModal()
  }

  getTypes() {
    this.empleadosService.getTiposEmpleados().subscribe(e => {
      this.tipos = e
      this.currentStatus = Status.loaded
    })

  }

  openRegisterModal() {
    this.dialog.open(TiposEmpleadoComponent)
  }

  openDeleteModal(tipo: TipoEmpleado) {


  }

}
