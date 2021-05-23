import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { Empleado, Pedido} from 'src/app/models/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  HeaderType = HeaderType
  formInformacion: FormGroup = new FormGroup({})
  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()
  @Input() pedido = new Pedido()
  @Input() edit = false

  empleados: Empleado[] = []

  constructor(private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.getEmpleados()
  }

  onSubmit(values: any) {

    this.submitForm.emit(values)

  }

  onIconClick() {
    this.iconClicked.emit()
  }

  getEmpleados() {
    this.empleadosService.getEmpleados().subscribe(e => {
      this.empleados = e
    })
  }

}
