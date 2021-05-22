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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(values: any) {

    this.submitForm.emit(values)

  }

  onIconClick() {
    this.iconClicked.emit()
  }

}
