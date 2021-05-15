import { AuthService } from './../../../../services/auth/auth.service';
import { CrearEmpleadoComponent } from './../../../../shared/components/modals/empleados/crear-empleado/crear-empleado.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionCard } from 'src/app/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sections: any[] = [
    {
      title: "Mi información",
      icon: "account_circle",
      description: "Consulta la información del empleado actual.",
      action: "Consultar",
      onClick: () => { this.openMyInfo() }
    },
    {
      title: "Registrar",
      icon: "person_add",
      description: "Registrar un nuevo empleado",
      action: "Crear",
      onClick: () => { this.openRegisterModal() }
    },
    {
      title: "Editar o eliminar",
      icon: "edit",
      description: "Edita la información o elimina de nuestros registros a un empleado.",
      action: "Editar"
    },

  ]

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openMyInfo() {

    const id = this.authService.loggedUser.value?.idEmpleado

    console.log(id)

    this.router.navigate(["/empleados/" + id])

  }


  openRegisterModal() {
    const dialogRef = this.dialog.open(CrearEmpleadoComponent)
  }

}
