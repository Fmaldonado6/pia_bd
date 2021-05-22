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
      title: "Alimentos",
      icon: "fastfood",
      description: "Agrega o edita las descripciones, precios y nombres de nuestros alimentos",
      action: "Gestionar Alimentos"
    },
    {
      title: "Bebidas",
      icon: "beer-outline",
      description: "Agrega o edita las descripciones, precios y nombres de nuestras bebidas.",
      action: "Gestionar Bebidas"
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
