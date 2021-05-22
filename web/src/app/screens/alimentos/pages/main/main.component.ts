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
      icon: "add_circle",
      description: "Agrega un nuevo alimento.",
      action: "Agregar",
      onClick: () => { this.changePage("/alimentos") }
    },
    {
      title: "Editar alimentos",
      icon: "edit",
      description: "Edita las descripciones, precios o nombres de nuestros alimentos.",
      action: "Editar",
      onClick: () => { this.changePage("/alimentos") }
    },
    {
      title: "Eliminar alimentos",
      icon: "edit",
      description: "Eliminar alguno de los alimentos.",
      action: "Eliminar",
      onClick: () => { this.changePage("/alimentos") }
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
