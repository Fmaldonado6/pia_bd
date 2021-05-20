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
      icon: "monetization_on",
      description: "Registra un nuevo pedido",
      action: "Crear",
      onClick: () => { this.changePage("/pedidos") }

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
