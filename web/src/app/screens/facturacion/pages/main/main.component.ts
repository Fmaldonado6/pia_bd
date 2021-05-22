import { Component, OnInit } from '@angular/core';
import { SectionCard } from '../../../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  sections: SectionCard[] = [
    {
      title: "Crear Facturas",
      icon: "monetization_on",
      description: "Crea, edita y elimina las facturas",
      action: "Gestionar Facturas",
      onClick: () => { this.changePage("/factura-crear") }
    },
    {
      title: "Ver Facturas",
      icon: "supervised_user_circle",
      description: "Visualizar las facturas",
      action: "Obserbar Facturas",
      onClick: () => { this.changePage("/empleados") }

    }
  ]

  constructor(
    private router: Router
  ) {

  }



  changePage(route: string) {
    this.router.navigate([route])
  }

}
