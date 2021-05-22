import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { PedidosService } from './../../../../../services/pedidos/pedidos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pedido, Empleado, Status } from 'src/app/models/models';


interface miPedido{
  fecha?: Date
  descuentoPed: number
  subtotalPed: number
  totalPed: number
}

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.scss']
})


export class CrearPedidosComponent {

  @Input() edit = false
  @Output() iconClicked = new EventEmitter()


  Status = Status
  Pages = Pages


  currentPage = Pages.employeeList

  currentStatus = Status.loaded

  pedido = new Pedido()

  constructor(
    private dialogRef: MatDialogRef<CrearPedidosComponent>
  ) { }

  addPedido(values: miPedido) {
    this.pedido.fechaPedido = values.fecha
    this.pedido.total = values.totalPed
    this.pedido.subtotal = values.subtotalPed
    this.pedido.descuento = values.descuentoPed
  }

  clickIcon() {
    if (this.edit)
      return this.iconClicked.emit()
    this.close()
  }

  close() {


    this.dialogRef.close()
  }

}

enum Pages {
  employeeList
}
