import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tipo-empleados-info',
  templateUrl: './tipo-empleados-info.component.html',
  styleUrls: ['./tipo-empleados-info.component.scss']
})
export class TipoEmpleadosInfoComponent implements OnInit {
  @Output() submitForm = new EventEmitter()
  @Output() iconClicked = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(values: any) {
    console.log(values)
    this.submitForm.emit(values)
  }

  onIconClick() {
    this.iconClicked.emit()
  }


}
