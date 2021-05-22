import { Component, OnInit } from '@angular/core';
import { SectionCard } from 'src/app/models/models';
import { Router } from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  sections: SectionCard[] = [
    {
      title: "Agregar alimentos",
      icon: "fastfood",
      description: "Agrega un nuevo alimento.",
      action: "Gestionar Alimentos",
      onClick: () => { this.changePage("/pedidos") }
    },
    {
      title: "Editar alimentos",
      icon: "edit",
      description: "Edita las descripciones, precios o nombres de nuestros alimentos.",
      action: "Gestionar Bebidas",
      onClick: () => { this.changePage("/pedidos") }
    },
    {
      title: "Eliminar alimentos",
      icon: "edit",
      description: "Eliminar alguno de los alimentos.",
      action: "Gestionar Bebidas",
      onClick: () => { this.changePage("/pedidos") }
    },
  ]

  constructor(
    private router: Router
  ) {

  }

  changePage(route: string){
    this.router.navigate([route])
  }


  ngOnInit(): void {
  }

}
