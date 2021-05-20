import { HeaderType } from './../../../../modal-title/modal-title.component';
import { Empleado } from 'src/app/models/models';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  HeaderType = HeaderType
  formInformacion: FormGroup = new FormGroup({})
  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()
  @Input() empleado = new Empleado()
  @Input() edit = false


  ngOnInit(): void {
    const nombre = this.empleado.nombre.split(" ")
    this.formInformacion = new FormGroup({
      nombre: new FormControl(nombre[0], {
        validators: [
          Validators.required
        ]
      }),
      apellidoPaterno: new FormControl(nombre[1], {
        validators: [
          Validators.required
        ]
      }),
      apellidoMaterno: new FormControl(nombre[2], {
        validators: [
          Validators.required
        ]
      }),
      telefono: new FormControl(this.empleado.telefono, {
        validators: [
          Validators.required
        ]
      }),

    })
  }

  onSubmit(values: any) {
    this.submitForm.emit(values)

  }

  onIconClick() {
    this.iconClicked.emit()
  }




}
