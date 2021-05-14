import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss']
})
export class SectionCardComponent implements OnInit {

  @Input() title = ""
  @Input() icon = ""
  @Input() description = ""
  @Input() action = ""
  @Input() route = ""


  constructor() { }

  ngOnInit(): void {
  }

}
