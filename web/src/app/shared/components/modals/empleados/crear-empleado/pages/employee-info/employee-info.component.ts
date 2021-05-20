import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { EventEmitter, Output, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HeaderType } from '../../../../modal-title/modal-title.component';
import { Empleado, TipoEmpleado } from 'src/app/models/models';
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
  @Input() empleado = new Empleado()
  @Input() edit = false



  matcher = new MyErrorStateMatcher();


  form: FormGroup = new FormGroup({})

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({

      contrasena: new FormControl(this.empleado.contrasena, {
        validators: [
          Validators.required
        ]
      }),
      confirmarContrasena: new FormControl('', [
        Validators.required,
      ])
    })
  }

  onSubmit(values: any): any {

    if (values.contrasena != values.confirmarContrasena)
      return this.snackBar.open("Las contraseñas no coinciden", "CERRAR", { duration: 2000 })

    this.submitForm.emit(values)

  }




  onIconClick() {
    this.iconClicked.emit()
  }


}
