import { Component, Input, OnInit } from '@angular/core';
import { Alimentos } from 'src/app/models/models';

@Component({
  selector: 'app-alimentos-cantidad',
  templateUrl: './alimentos-cantidad.component.html',
  styleUrls: ['./alimentos-cantidad.component.scss']
})
export class AlimentosCantidadComponent implements OnInit {

  @Input() alimento = new Alimentos()

  constructor() { }

  ngOnInit(): void {
  }

}
