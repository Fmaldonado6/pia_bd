import { Component, OnInit } from '@angular/core';
import { SectionCard } from 'src/app/models/models';
import { Router } from '@angular/router'
import { CrearAlimentoComponent } from 'src/app/shared/components/modals/alimentos/crear-alimento/crear-alimento.component';
import { MatDialog } from '@angular/material/dialog';

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
      onClick: () => { this.openRegisterModal() }
      //Cambiar la ruta de onClick
    },
    {
      title: "Editar alimentos o bebidas",
      icon: "local_dining",
      description: "Edita las descripciones, precios o nombres de nuestros alimentos o bebidas.",
      action: "Editar",
      onClick: () => { this.changePage("/alimentos/list") }
      //Cambiar la ruta de onClick
    },
    {
      title: "Editar tipos de alimento",
      icon: "local_bar",
      description: "Edita o elimina los diferentes tipos de alimentos que ofrecemos.",
      action: "Editar",
      onClick: () => { this.changePage("/alimentos/list") }
      //Cambiar la ruta de onClick
    },
    {
      title: "Eliminar o editar marcas",
      icon: "format_list_bulleted",
      description: "Edita o elimina las marcas que manejamos en nuestros alimentos.",
      action: "Editar",
      onClick: () => { this.changePage("/alimentos/marcas") }
    },
  ]

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {

  }

  changePage(route: string) {
    this.router.navigate([route])
  }



  openRegisterModal() {
    this.dialog.open(CrearAlimentoComponent)
  }

}
