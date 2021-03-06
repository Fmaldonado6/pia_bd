import { CrearPedidosComponent } from './../../../../shared/components/modals/pedidos/crear-pedidos/crear-pedidos.component';
import { Component, OnInit } from '@angular/core';
import { SectionCard } from 'src/app/models/models';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  sections: SectionCard[] = [
    {
      title: "Crear",
      icon: "add",
      description: "Registra un nuevo pedido",
      action: "Crear",
      onClick: () => { this.openRegisterModal() }

    },
    {
      title: "Ver pedidos",
      icon: "monetization_on",
      description: "Ver todos los pedidos registrados",
      action: "Ver",
      onClick: () => { this.changePage("/pedidos/lista") }

    },
    {
      title: "Ver Tickets",
      icon: "sticky_note_2",
      description: "Ver todos los tickets registrados",
      action: "Ver",
      onClick: () => { this.changePage("/pedidos/tickets") }

    },

  ]
  constructor(
    private dialog: MatDialog,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  changePage(route: string) {
    this.router.navigate([route])
  }

  openRegisterModal() {
    this.dialog.open(CrearPedidosComponent)
  }

}
