import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pedido, Empleado, Status, Factura } from 'src/app/models/models';
import { Router } from '@angular/router';

interface FormValues {
  pedido: number
}

@Component({
  selector: 'app-crear-facturas-crear',
  templateUrl: './crear-facturas-crear.component.html',
  styleUrls: ['./crear-facturas-crear.component.scss']
})

export class CrearFacturasCrearComponent{

  @Input() edit = false
  @Output() iconClicked = new EventEmitter()
  @Output() factPedido = new EventEmitter()
  
  Status = Status
  Pages = Pages

  currentPage = Pages.ordersList
  currentStatus = Status.loaded

  factura = new Factura()

  constructor(
    private dialogRef: MatDialogRef<CrearFacturasCrearComponent>,
    private pedidosService: PedidosService,
    private router: Router
    ) {}

  // addFactura(values: FormValues){
  //   this.factura.idPedido = values.pedido
  //   this.currentStatus = Status.loading
  //   this.pedidosService.addFactura(this.factura).subscribe(p => {
  //     this.factura = p
  //     this.success()
  //   })


  // success() {
  //   this.currentStatus = Status.success
  //   this.factPedido.emit()
  // }

  clickIcon() {
    if (this.edit)
      return this.iconClicked.emit()
    this.close()
  }
  
  // verPedidos() {
  //   this.close()
  //   this.router.navigate([`/pedidos/${this.pedido.idPedido}`])
  // }

  close() {
    this.dialogRef.close()
  }

}

enum Pages{
  ordersList
}
