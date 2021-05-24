import { Component, OnInit } from '@angular/core';
import { SectionCard } from '../../../../models/models';
import { Router } from '@angular/router';
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
  }

  changePage(route: string) {
    this.router.navigate([route])
  }


  openFacturaVer() {
    this.router.navigate(["/facturacion/ver"])
  }
}
