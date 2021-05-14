import { Empleado } from 'src/app/models/models';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  formInformacion: FormGroup
  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()
  @Input() empleado = new Empleado

  constructor() {


    this.formInformacion = new FormGroup({
      nombre: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      apellidoPaterno: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      apellidoMaterno: new FormControl('', {
        validators: [
          Validators.required
        ]
      })
    })
  }

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
