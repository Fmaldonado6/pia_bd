import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editar-tipo-alimento',
  templateUrl: './editar-tipo-alimento.component.html',
  styleUrls: ['./editar-tipo-alimento.component.scss']
})
export class EditarTipoAlimentoComponent implements OnInit {
  @Output() tipoEditado = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
