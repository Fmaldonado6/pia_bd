import { Component, Input, OnInit } from '@angular/core';
import { TipoAlimento } from 'src/app/models/models';
import { TiposAlimentosService } from 'src/app/services/tipos-alimentos/tipos-alimentos.service';

@Component({
  selector: 'alimentos-list',
  templateUrl: './alimentos-list.component.html',
  styleUrls: ['./alimentos-list.component.scss']
})
export class AlimentosListComponent implements OnInit {


  @Input() typeSelected = new TipoAlimento()

  constructor(
    private tipoAlimentosService: TiposAlimentosService
  ) { }

  ngOnInit(): void {
  }

  getAlimentos(id: number) {
  }

}
