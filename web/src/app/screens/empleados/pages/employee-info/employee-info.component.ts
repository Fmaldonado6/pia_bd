import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Status, Empleado } from 'src/app/models/models';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {



  Status = Status
  currentStatus = Status.loading

  empleado = new Empleado()

  constructor(
    private route: ActivatedRoute,
    private empleadosService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.getEmpleadoInfo()
  }

  getEmpleadoInfo() {

    const id = this.route.snapshot.params.id
    this.empleadosService.getEmpleadosInfo(id).subscribe(e => {
      this.empleado = e
      this.currentStatus = Status.loaded
    })

  }

}
