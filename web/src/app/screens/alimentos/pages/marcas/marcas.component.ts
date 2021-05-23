import { Component, OnInit } from '@angular/core';
import { Marca, Status } from 'src/app/models/models';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  marcas: Marca[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
