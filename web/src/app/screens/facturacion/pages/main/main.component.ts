import { Component, OnInit } from '@angular/core';
import { SectionCard } from '../../../../models/models';
import { Router } from '@angular/router';
import { CrearFacturasCrearComponent } from 'src/app/shared/components/modals/facturas/crear-facturas-crear/crear-facturas-crear.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  sections: SectionCard[] = [
 
    {
      title: "Gestionar Facturas",
      icon: "sticky_note_2",
      description: "Aquí podrás gestionar todas las facturas creadas.",
      action: "Ver Facturas",
      onClick: () => { this.openFacturaVer() }
    }
  ]
  

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {
    this.openFacturaCrear()
  }

  changePage(route: string) {
    this.router.navigate([route])
  }

  openRegisterModal() {
    this.dialog.open(CrearFacturasCrearComponent)
  }

  openFacturaCrear() {
  }

  openFacturaVer() {
    this.router.navigate(["/facturacion/ver"])
  }
}
