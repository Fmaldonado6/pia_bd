import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Output() iconClicked = new EventEmitter()

  tipoAlimentos = []

  onIconClick() {
    this.iconClicked.emit()
  }

}
