import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { Status, TipoEmpleado } from 'src/app/models/models';
import { Component, OnInit } from '@angular/core';

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
    private empleadosService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.getTypes()
  }

  getTypes() {
    this.empleadosService.getTiposEmpleados().subscribe(e => {
      this.tipos = e
      this.currentStatus = Status.loaded
    })

  }

  openDeleteModal(tipo: TipoEmpleado) {


  }

}
