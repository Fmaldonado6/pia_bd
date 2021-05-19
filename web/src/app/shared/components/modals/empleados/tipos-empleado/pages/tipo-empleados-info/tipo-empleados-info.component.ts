import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tipo-empleados-info',
  templateUrl: './tipo-empleados-info.component.html',
  styleUrls: ['./tipo-empleados-info.component.scss']
})
export class TipoEmpleadosInfoComponent implements OnInit {
  @Output() submitForm = new EventEmitter()
  @Output() iconClicked = new EventEmitter()

  form: FormGroup = new FormGroup({})


  ngOnInit(): void {

    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      horaEntrada: new FormControl('', [
        Validators.required

      ]),
      horaSalida: new FormControl('', [
        Validators.required

      ]),
      salario: new FormControl('', [
        Validators.required

      ]),

    })

  }

  onSubmit(values: any) {
    console.log(values)
    this.submitForm.emit(values)
  }

  onIconClick() {
    this.iconClicked.emit()
  }


}
