import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Factura, FacturaResource, Status, Pedido } from 'src/app/models/models';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { Router } from '@angular/router';

interface ModalData {
  pedido: Pedido
}

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.scss']
})
export class CrearFacturaComponent implements OnInit {

  Status = Status
  currentStatus = Status.loaded

  Pages = Pages
  currentPage = Pages.info

  factura = new FacturaResource()

  constructor(
    private dialog: MatDialogRef<CrearFacturaComponent>,
    private facturasService: FacturasService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {
    this.factura.idPedido = this.modalData.pedido.idPedido
    this.factura.subtotal = this.modalData.pedido.subtotal
    this.factura.total = this.modalData.pedido.total
    this.factura.descuento = this.modalData.pedido.descuento
  }

  addFacturaInfo(values: Factura) {
    this.factura.nombre = values.nombre
    this.factura.apMaterno = values.apMaterno
    this.factura.apPaterno = values.apPaterno
    this.factura.RFC = values.RFC
    this.factura.telefono = values.telefono
    this.factura.concepto = values.concepto
    this.changePage(Pages.address)
  }

  addFacturaAddress(values: FacturaResource) {
    this.factura.idPais = values.idPais
    this.factura.idEstado = values.idEstado
    this.factura.idMunicipio = values.idMunicipio
    this.factura.nombreColonia = values.nombreColonia
    this.factura.nombreCalle = values.nombreCalle
    this.factura.numero = values.numero
    this.crearFactura()
  }

  crearFactura() {
    this.currentStatus = Status.loading

    this.facturasService.addFactura(this.factura).subscribe(e => {
      this.factura = e
      this.currentStatus = Status.success
    })
  }

  close() {
    this.dialog.close()
  }

  verFactura() {
    this.close()
    this.router.navigate([`/facturacion/${this.factura.idFactura}`])
  }

  changePage(page: Pages) {
    this.currentPage = Pages.address
  }

}

enum Pages {
  info,
  address
}