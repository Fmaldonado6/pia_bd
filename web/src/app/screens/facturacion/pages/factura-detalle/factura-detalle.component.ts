import { FacturaResource, Status } from 'src/app/models/models';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas/facturas.service';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.scss']
})
export class FacturaDetalleComponent implements OnInit {

  Status = Status

  currentStatus = Status.loading

  id = 0

  factura = new FacturaResource()

  constructor(
    private route: ActivatedRoute,
    private facturasService: FacturasService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id
    this.getFactura()
  }

  getFactura() {
    this.currentStatus = Status.loading

    this.facturasService.getFactura(this.id).subscribe(e => {
      this.factura = e
      this.currentStatus = Status.loaded
    })
  }
}
