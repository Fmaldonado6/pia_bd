import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-crear-tipo-alimento',
  templateUrl: './crear-tipo-alimento.component.html',
  styleUrls: ['./crear-tipo-alimento.component.scss']
})
export class CrearTipoAlimentoComponent implements OnInit {

  @Output() tipoCreado = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
