import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar-tipo-alimento',
  templateUrl: './eliminar-tipo-alimento.component.html',
  styleUrls: ['./eliminar-tipo-alimento.component.scss']
})
export class EliminarTipoAlimentoComponent implements OnInit {
  @Output() tipoEliminado = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
