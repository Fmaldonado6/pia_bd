import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TipoAlimento } from 'src/app/models/models';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Output() iconClicked = new EventEmitter()
  @Output() typeSelected = new EventEmitter<TipoAlimento>()
  @Input() tipoAlimentos: TipoAlimento[] = []


  onIconClick() {
    this.iconClicked.emit()
  }

  onTypeSelected(tipo: TipoAlimento) {
    this.typeSelected.emit(tipo)
  }

}
