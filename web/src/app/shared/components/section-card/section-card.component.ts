import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent {

  @Input() title = ""
  @Input() icon = ""
  @Input() description = ""
  @Input() action = ""
  @Input() route = ""
  @Output() buttonClicked = new EventEmitter()

  clickButton() {
    this.buttonClicked.emit()
  }

}
