import { Component, OnInit } from '@angular/core';
import { SectionCard } from 'src/app/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sections: SectionCard[] = [
    {
      title: "Mi información",
      icon: "account_circle",
      description: "Consulta la información del empleado actual.",
      action: "Consultar"
    },
    {
      title: "Registrar",
      icon: "person_add",
      description: "Registrar un nuevo empleado",
      action: "Crear"
    },
    {
      title: "Editar o eliminar",
      icon: "edit",
      description: "Edita la información o elimina de nuestros registros a un empleado.",
      action: "Editar"
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
