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
      title: "Agregar alimentos o bebidas",
      icon: "add_circle",
      description: "Agrega un nuevo alimento y o una bebida.",
      action: "Agregar",
      onClick: () => { this.changePage("/alimentos") }
      //Cambiar la ruta de onClick
    },
    {
      title: "Editar alimentos o bebidas",
      icon: "edit",
      description: "Edita las descripciones, precios o nombres de nuestros alimentos o bebidas.",
      action: "Editar",
      onClick: () => { this.changePage("/alimentos") }
      //Cambiar la ruta de onClick
    },
    {
      title: "Eliminar alimentos o bebidas",
      icon: "edit",
      description: "Eliminar alguno de los alimentos y o bebidas.",
      action: "Eliminar",
      onClick: () => { this.changePage("/alimentos") }
      //Cambiar la ruta de onClick
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
