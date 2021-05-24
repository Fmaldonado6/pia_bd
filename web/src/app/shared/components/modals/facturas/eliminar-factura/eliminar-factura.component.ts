import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Factura, Status } from 'src/app/models/models';
import { FacturasService } from 'src/app/services/facturas/facturas.service';

interface ModalData {
  factura: Factura
}

@Component({
  selector: 'app-eliminar-factura',
  templateUrl: './eliminar-factura.component.html',
  styleUrls: ['./eliminar-factura.component.scss']
})
export class EliminarFacturaComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  factura = new Factura()

  @Output() pedidoEliminado = new EventEmitter()

  constructor(
    private dialog: MatDialogRef<EliminarFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private facturasService: FacturasService
  ) { }

  ngOnInit(): void {
    this.factura = this.modalData.factura
  }

  deletemMarca() {
    this.currentStatus = Status.loading

    this.facturasService.deleteFactura(this.factura.idFactura).subscribe(e => {
      this.currentStatus = Status.success
      this.pedidoEliminado.emit()
    })
  }

  close() {
    this.dialog.close()
  }
}
