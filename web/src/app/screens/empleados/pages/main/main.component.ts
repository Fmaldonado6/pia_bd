import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionCard } from 'src/app/models/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrearEmpleadoComponent } from 'src/app/shared/components/modals/empleados/crear-empleado/crear-empleado.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
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
      action: "Editar",
      onClick: () => { this.openEmployeeList() }
    },
    {
      title: "Tipos de empleado",
      icon: "work",
      description: "Administra los diferentes tipos de empleado que existen en nuestro bar.",
      action: "Administrar",
      onClick: () => { this.openEmployeeTypes() }
    },

  ]

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }



  openMyInfo() {

    const id = this.authService.loggedUser.value?.idEmpleado

    this.router.navigate(["/empleados/" + id])

  }

  openEmployeeList() {
    this.router.navigate(["/empleados/list"])
  }

  openEmployeeTypes() {
    this.router.navigate(["/empleados/types"])
  }

  openRegisterModal() {
    this.dialog.open(CrearEmpleadoComponent)
  }

}
