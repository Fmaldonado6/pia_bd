import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pedido, Empleado, Status } from 'src/app/models/models';
import { Router } from '@angular/router';



interface FormValues {
  empleado: number
}

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.scss']
})

export class CrearPedidosComponent {

  @Input() edit = false
  @Output() iconClicked = new EventEmitter()
  @Output() empPedido = new EventEmitter()


  Status = Status
  Pages = Pages

  currentPage = Pages.employeeList
  currentStatus = Status.loaded

  pedido = new Pedido()

  constructor(
    private dialogRef: MatDialogRef<CrearPedidosComponent>,
    private pedidosService: PedidosService,
    private router: Router
  ) { }

  addPedido(values: FormValues) {
    this.pedido.idEmpleado = values.empleado
    this.currentStatus = Status.loading
    this.pedidosService.addPedido(this.pedido).subscribe(e => {
      this.pedido = e
      this.success()
    })
  }

  success() {
    this.currentStatus = Status.success
    this.empPedido.emit()
  }

  clickIcon() {
    if (this.edit)
      return this.iconClicked.emit()
    this.close()
  }

  verPedido() {
    this.close()
    this.router.navigate([`/pedidos/${this.pedido.idPedido}`])
  }

  close() {
    this.dialogRef.close()
  }

}

enum Pages {
  employeeList
}
