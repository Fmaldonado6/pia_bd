import { CrearEmpleadoComponent } from './../../../../shared/components/modals/empleados/crear-empleado/crear-empleado.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionCard } from 'src/app/models/models';

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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.openRegisterModal()
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(CrearEmpleadoComponent)
  }

}
