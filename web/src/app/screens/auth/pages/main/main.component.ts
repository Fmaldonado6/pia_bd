import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Empleado, Status } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';


interface FormData {
  numEmpleado: string
  password: string
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loginForm: FormGroup;
  Status = Status
  currentStatus = Status.loaded

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private empleadoService: EmpleadosService
  ) {
    this.loginForm = new FormGroup({
      numEmpleado: new FormControl(),
      password: new FormControl()
    });
  }
  ngOnInit(): void {

    const token = this.authService.getToken()

    console.log(token)

    if (token)
      this.getEmpleadoInfo(token)

  }

  changePage() {
    this.router.navigate(["/home"])
  }


  login(value: FormData) {
    this.currentStatus = Status.loading
    let numEmpleado = value.numEmpleado
    let password = value.password
    const empleado = new Empleado()
    empleado.idEmpleado = Number.parseInt(numEmpleado)
    empleado.contrasena = password
    this.authService.auth(empleado).subscribe((e) => {

      this.getEmpleadoInfo(e as string)

    }, () => {
      this.snackBar.open("Usuario o contraseña incorrectos", "CERRAR", {
        duration: 2000, verticalPosition: "top"
      })
      this.currentStatus = Status.loaded
    })
  }

  getEmpleadoInfo(token: string) {
    this.currentStatus = Status.loading
    this.authService.saveToken(token)
    this.empleadoService.getMyInfo().subscribe(e => {
      this.authService.setUser(e)
      this.changePage()
    })


  }
}
