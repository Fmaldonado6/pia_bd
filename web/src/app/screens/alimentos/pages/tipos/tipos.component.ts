import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Status, TipoAlimento } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';
import { CrearTipoAlimentoComponent } from 'src/app/shared/components/modals/tipoAlimentos/crear-tipo-alimento/crear-tipo-alimento.component';
import { EditarTipoAlimentoComponent } from 'src/app/shared/components/modals/tipoAlimentos/editar-tipo-alimento/editar-tipo-alimento.component';
import { EliminarTipoAlimentoComponent } from 'src/app/shared/components/modals/tipoAlimentos/eliminar-tipo-alimento/eliminar-tipo-alimento.component';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  tiposAlimentos: TipoAlimento[] = []
  filterTiposAlimentos: TipoAlimento[] = []

  constructor(
    private tiposAlimentosService: TiposAlimentosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTipos()
  }

  getTipos() {

    this.currentStatus = Status.loading

    this.tiposAlimentosService.getTipoAlimentos().subscribe(e => {
      this.tiposAlimentos = e
      this.filterTiposAlimentos = this.tiposAlimentos
      this.currentStatus = Status.loaded
    })

  }

  openUpdateTipo(tipo: TipoAlimento) {
    const dialog = this.dialog.open(EditarTipoAlimentoComponent, {
      data: {
        tipo: tipo
      }
    })
    dialog.componentInstance.tipoEditado.subscribe(e => {
      this.getTipos()
    })
  }

  openDeleteTipo(tipo: TipoAlimento) {
    const dialog = this.dialog.open(EliminarTipoAlimentoComponent, {
      data: {
        tipo: tipo
      }
    })

    dialog.componentInstance.tipoEliminado.subscribe(e => {
      this.getTipos()
    })
  }

  filter(input: string): any {

    if (!input || input == "")
      return this.filterTiposAlimentos = this.tiposAlimentos

    const inputLowerCase = input.toLowerCase()

    this.filterTiposAlimentos = this.tiposAlimentos.filter(x =>
      x.nombre.toLowerCase().includes(inputLowerCase)

    )

  }

  openAddTipo() {

    const dialog = this.dialog.open(CrearTipoAlimentoComponent)
    dialog.componentInstance.tipoCreado.subscribe(e => {
      this.getTipos()
    })
  }

}
