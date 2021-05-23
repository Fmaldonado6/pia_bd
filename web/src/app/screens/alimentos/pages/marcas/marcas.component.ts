import { CrearMarcaComponent } from './../../../../shared/components/modals/marcas/crear-marca/crear-marca.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Marca, Status } from 'src/app/models/models';
import { MarcasService } from 'src/app/services/marcas/marcas.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  marcas: Marca[] = []

  constructor(
    private marcasService: MarcasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMarcas()
  }

  getMarcas() {

    this.currentStatus = Status.loading

    this.marcasService.getMarcas().subscribe(e => {
      this.marcas = e
      this.currentStatus = Status.loaded
    })

  }

  openAddMarca() {

    const dialog = this.dialog.open(CrearMarcaComponent)
    dialog.componentInstance.marcaCreada.subscribe(e => {
      this.getMarcas()
    })
  }

}
