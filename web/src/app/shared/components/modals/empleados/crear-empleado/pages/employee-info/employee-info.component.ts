import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, ValidatorFn, AbstractControlOptions, AbstractControl, ValidationErrors } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HeaderType } from '../../../../modal-title/modal-title.component';
import { TipoEmpleado } from 'src/app/models/models';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const invalidCtrl = !!(control && control.invalid && control.parent!!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  HeaderType = HeaderType

  @Output() iconClicked = new EventEmitter()
  @Output() submitForm = new EventEmitter()

  tiposEmpleado: TipoEmpleado[] = []

  matcher = new MyErrorStateMatcher();


  form: FormGroup

  constructor(
    private empleadosService: EmpleadosService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      tipoEmpleado: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      contrasena: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      confirmarContrasena: new FormControl('', [
        Validators.required,
      ])
    })
  }



  ngOnInit(): void {
    this.getTiposEmpleados()
  }

  onSubmit(values: any): any {

    if (values.contrasena != values.confirmarContrasena)
      return this.snackBar.open("Las contraseñas no coinciden", "CERRAR", { duration: 2000 })

    this.submitForm.emit(values)

  }


  getTiposEmpleados() {
    this.empleadosService.getTiposEmpleados().subscribe(e => {
      this.tiposEmpleado = e
    })
  }


  onIconClick() {
    this.iconClicked.emit()
  }


}
