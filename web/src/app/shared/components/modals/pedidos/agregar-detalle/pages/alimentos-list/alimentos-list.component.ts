import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alimentos, Status, TipoAlimento } from 'src/app/models/models';
import { AlimentosService } from 'src/app/services/alimentos/alimentos.service';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'alimentos-list',
  templateUrl: './alimentos-list.component.html',
  styleUrls: ['./alimentos-list.component.scss']
})
export class AlimentosListComponent implements OnInit {

  HeaderType = HeaderType
  @Input() typeSelected = new TipoAlimento()
  @Output() iconClicked = new EventEmitter()
  @Output() addAlimento = new EventEmitter<Alimentos>()

  alimentos: Alimentos[] = []

  alimentosFilter: Alimentos[] = []

  currentStatus = Status.loading
  Status = Status

  constructor(
    private alimentosService: AlimentosService
  ) { }

  ngOnInit(): void {
    this.getAlimentos(this.typeSelected.idTipoAlimento)
  }

  filterList(e: string) {
    if (!e || e == "")
      this.alimentosFilter = this.alimentos

    this.alimentosFilter = this.alimentos.filter(x => x.nombre.toLowerCase().includes(e.toLowerCase()))
  }

  getAlimentos(id: number) {
    this.alimentosService.getAlimentosByTipoId(id).subscribe(e => {
      this.alimentos = this.alimentosFilter = e
      this.currentStatus = Status.loaded
    })
  }

  onAddAlimento(alimento: Alimentos) {
    this.addAlimento.emit(alimento)
  }

  onIconClick() {
    this.iconClicked.emit()
  }

}
