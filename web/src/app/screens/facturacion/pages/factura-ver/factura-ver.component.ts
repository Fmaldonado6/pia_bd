import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Factura, Status } from 'src/app/models/models';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { EliminarFacturaComponent } from 'src/app/shared/components/modals/facturas/eliminar-factura/eliminar-factura.component';

@Component({
  selector: 'app-factura-ver',
  templateUrl: './factura-ver.component.html',
  styleUrls: ['./factura-ver.component.scss']
})
export class FacturaVerComponent implements OnInit {

  Status = Status
  currentStatus = Status.loading

  facturas: Factura[] = []

  constructor(
    private facturasService: FacturasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos() {
    this.currentStatus = Status.loading
    this.facturasService.getFacturas().subscribe(e => {
      this.facturas = e
      this.currentStatus = Status.loaded
    })

  }

  openDeleteModal(factura: Factura) {

    const dialog = this.dialog.open(EliminarFacturaComponent, {
      data: {
        factura: factura
      }
    })

    dialog.componentInstance.pedidoEliminado.subscribe(e => {
      this.getPedidos()
    })


  }

}
