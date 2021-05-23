import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/models';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss']
})
export class CrearFacturaComponent implements OnInit {

  Status = Status
  currentStatus = Status

  Pages = Pages
  currentPage = Pages.info

  constructor() { }

  ngOnInit(): void {
  }

}

enum Pages {
  info,
  address
}