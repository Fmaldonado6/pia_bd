import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordResponse, Status, Empleado } from 'src/app/models/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'editar-contrasena',
  templateUrl: './editar-contrasena.component.html',
  styleUrls: ['./editar-contrasena.component.scss']
})
export class EditarContrasenaComponent implements OnInit {

  HeaderType = HeaderType

  @Input() empleado = new Empleado()
  @Output() iconClicked = new EventEmitter()

  Status = Status
  currentStatus = Status.loaded

  form = new FormGroup({})

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarContrasenaComponent>,
    private empleadosService: EmpleadosService
  ) { }

  onIconClick() {
    this.iconClicked.emit()
  }

  ngOnInit(): void {
    this.form = new FormGroup({

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

  onSubmit(values: any): any {

    if (values.contrasena != values.confirmarContrasena)
      return this.snackBar.open("Las contraseñas no coinciden", "CERRAR", { duration: 2000 })

    const passwordResponse = new PasswordResponse()

    passwordResponse.idEmpleado = this.empleado.idEmpleado
    passwordResponse.newPassword = values.contrasena

    this.empleadosService.updatePassword(passwordResponse).subscribe(e => {
      this.currentStatus = Status.success
    })

  }

  close() {
    this.dialogRef.close()
  }
}
