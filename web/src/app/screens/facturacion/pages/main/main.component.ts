import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { SectionCard } from '../../../../models/models';
import { Router } from '@angular/router';
import { CrearFacturaComponent } from 'src/app/shared/components/modals/facturas/crear-factura/crear-factura.component';

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
      onClick: () => { this.openFacturaCrear() }
    },
    {
      title: "Ver Facturas",
      icon: "supervised_user_circle",
      description: "Visualizar las facturas",
      action: "Obserbar Facturas",
      onClick: () => { this.openFacturaVer() }

    }
  ]

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
    this.openFacturaCrear()
  }

  changePage(route: string) {
    this.router.navigate([route])
  }

  openFacturaCrear() {
    this.dialog.open(CrearFacturaComponent)
  }

  openFacturaVer() {
    this.router.navigate(["/facturacion/ver"])
  }
}
