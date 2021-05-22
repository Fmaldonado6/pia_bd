import { PedidoAlimento } from './../../../../../../../models/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alimentos } from 'src/app/models/models';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'alimentos-cantidad',
  templateUrl: './alimentos-cantidad.component.html',
  styleUrls: ['./alimentos-cantidad.component.scss']
})
export class AlimentosCantidadComponent {

  HeaderType = HeaderType
  @Input() alimento = new Alimentos()
  @Output() iconClicked = new EventEmitter()
  @Output() addAlimento = new EventEmitter<PedidoAlimento>()

  cantidad = 1


  onIconClick() {
    this.iconClicked.emit()
  }

  onAddAlimento() {

    const pedidoAlimento = new PedidoAlimento()
    pedidoAlimento.cantidad = this.cantidad
    pedidoAlimento.alimento = this.alimento
    pedidoAlimento.precio = this.alimento.precio

    this.addAlimento.emit(pedidoAlimento)
  }

  add() {
    this.cantidad++
  }

  remove() {
    this.cantidad--
  }


}
