import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { Privilegios } from 'src/app/models/models';
import { PrivilegiosService } from 'src/app/services/privilegios/privilegios.service';

@Component({
  selector: 'tipo-empleados-privilegios',
  templateUrl: './tipo-empleados-privilegios.component.html',
  styleUrls: ['./tipo-empleados-privilegios.component.scss']
})
export class TipoEmpleadosPrivilegiosComponent implements OnInit {

  @Output() submitForm = new EventEmitter()
  @Output() iconClicked = new EventEmitter()

  form: FormGroup = new FormGroup({})

  privilegios: Privilegios[] = []


  constructor(
    private privilegiosService: PrivilegiosService
  ) { }

  ngOnInit(): void {
    this.getPrivilegios()
  }

  getPrivilegios() {
    this.privilegiosService.getPrivilegios().subscribe(e => {
      this.privilegios = e
    })
  }

  onSubmit(values: MatListOption[]) {

    const selectedPrivilegios: Privilegios[] = []

    for (let value of values) {
      selectedPrivilegios.push(value.value)
    }

    this.submitForm.emit(selectedPrivilegios)
  }

  onIconClick() {
    this.iconClicked.emit()
  }
}
