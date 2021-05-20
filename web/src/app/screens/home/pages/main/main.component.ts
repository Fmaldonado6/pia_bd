import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionCard } from 'src/app/models/models';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  sections: SectionCard[] = [
    {
      title: "Pedidos",
      icon: "monetization_on",
      description: "Crea, edita y elimina los pedidos creados por nuestros clientes",
      action: "Gestionar Pedidos",
      onClick: () => { this.changePage("/pedidos") }
    },
    {
      title: "Empleados",
      icon: "supervised_user_circle",
      description: "Registra o eliminar la información de nuestros empleados",
      action: "Gestionar Empleados",
      onClick: () => { this.changePage("/empleados") }

    },
    {
      title: "Alimentos y bebidas",
      icon: "fastfood",
      description: "Agrega o edita las descripciones, precios y nombres de nuestros alimentos y bebidas.",
      action: "Gestionar Alimentos y Bebida",
      onClick: () => { this.changePage("/pedidos") }

    },
    {
      title: "Facturación",
      icon: "sticky_note_2",
      description: "Crea, edita y elimina facturas de los pedidos realizados",
      action: "Gestionar Facturas",
      onClick: () => { this.changePage("/pedidos") }

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
