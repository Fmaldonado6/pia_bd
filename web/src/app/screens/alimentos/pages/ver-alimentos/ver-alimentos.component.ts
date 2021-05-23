import { CrearAlimentoComponent } from './../../../../shared/components/modals/alimentos/crear-alimento/crear-alimento.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alimentos, AlimentosFull, Status } from 'src/app/models/models';
import { AlimentosService } from 'src/app/services/alimentos/alimentos.service';

@Component({
  selector: 'app-ver-alimentos',
  templateUrl: './ver-alimentos.component.html',
  styleUrls: ['./ver-alimentos.component.scss']
})
export class VerAlimentosComponent implements OnInit {

  Status = Status
  currentStatus = Status.loading

  alimentos: AlimentosFull[] = []

  filterAlimentos: AlimentosFull[] = []

  constructor(
    private dialog: MatDialog,
    private alimentosService: AlimentosService
  ) { }

  ngOnInit(): void {
    this.getAlimentos()
  }

  getAlimentos() {
    this.currentStatus = Status.loading
    this.alimentosService.getAlimentosFull().subscribe(e => {
      this.alimentos = e
      this.filterAlimentos = this.alimentos
      this.currentStatus = Status.loaded
    })
  }

  openAddAlimento() {
    const dialog = this.dialog.open(CrearAlimentoComponent)

    dialog.componentInstance.alimentoCreado.subscribe(e => {
      this.getAlimentos()
    })
  }

  openUpdateAlimento(alimento: Alimentos) {
    const dialog = this.dialog.open(CrearAlimentoComponent, {
      data: {
        alimento: alimento
      }
    })

    dialog.componentInstance.alimentoCreado.subscribe(e => {
      this.getAlimentos()
    })
  }

  filter(input: string): any {

    if (!input || input == "")
      return this.filterAlimentos = this.alimentos

    const inputLowerCase = input.toLowerCase()

    this.filterAlimentos = this.alimentos.filter(x =>
      x.nombre.toLowerCase().includes(inputLowerCase)
      || x.marca.nombreMarca.toLowerCase().includes(inputLowerCase)
      || x.tipoAlimento.nombre.toLowerCase().includes(inputLowerCase)

    )

  }


  openDeleteAlimento(alimento: Alimentos) {

  }

}
