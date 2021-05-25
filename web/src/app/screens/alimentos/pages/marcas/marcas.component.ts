import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Marca, Status } from 'src/app/models/models';
import { MarcasService } from 'src/app/services/marcas/marcas.service';
import { EditarMarcaComponent } from 'src/app/shared/components/modals/marcas/editar-marca/editar-marca.component';
import { EliminarMarcaComponent } from 'src/app/shared/components/modals/marcas/eliminar-marca/eliminar-marca.component';
import { CrearMarcaComponent } from 'src/app/shared/components/modals/marcas/crear-marca/crear-marca.component';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  marcas: Marca[] = []
  filterMarcas: Marca[] = []

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
      this.filterMarcas = this.marcas
      this.currentStatus = Status.loaded
    })

  }

  filter(input: string): any {

    if (!input || input == "")
      return this.filterMarcas = this.marcas

    const inputLowerCase = input.toLowerCase()

    this.filterMarcas = this.marcas.filter(x =>
      x.nombreMarca.toLowerCase().includes(inputLowerCase)

    )

  }

  openUpdateMarca(marca: Marca) {
    const dialog = this.dialog.open(EditarMarcaComponent, {
      data: {
        marca: marca
      }
    })
    dialog.componentInstance.marcaCreada.subscribe(e => {
      this.getMarcas()
    })
  }

  openDeleteMarca(marca: Marca) {
    const dialog = this.dialog.open(EliminarMarcaComponent, {
      data: {
        marca: marca
      }
    })

    dialog.componentInstance.marcaEliminada.subscribe(e => {
      this.getMarcas()
    })
  }

  openAddMarca() {

    const dialog = this.dialog.open(CrearMarcaComponent)
    dialog.componentInstance.marcaCreada.subscribe(e => {
      this.getMarcas()
    })
  }

}
