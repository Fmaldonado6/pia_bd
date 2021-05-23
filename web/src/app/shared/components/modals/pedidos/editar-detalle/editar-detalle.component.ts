import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventEmitter, Inject, Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Alimentos, Pedido, PedidoAlimento, Status } from 'src/app/models/models';
import { HeaderType } from '../../modal-title/modal-title.component';

interface ModalData {
  detalle: PedidoAlimento
  pedido: Pedido
}

@Component({
  selector: 'app-editar-detalle',
  templateUrl: './editar-detalle.component.html',
  styleUrls: ['./editar-detalle.component.scss']
})
export class EditarDetalleComponent implements OnInit {
  HeaderType = HeaderType

  detalle: PedidoAlimento = new PedidoAlimento()
  pedido = new Pedido()

  cantidad = 1

  Status = Status
  currentStatus = Status.loaded

  @Output() detalleActualizado = new EventEmitter()

  constructor(
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private dialogRef: MatDialogRef<EditarDetalleComponent>,
    private pedidosService: PedidosService

  ) { }


  ngOnInit(): void {
    this.detalle = JSON.parse(JSON.stringify(this.modalData.detalle))
    this.pedido = JSON.parse(JSON.stringify(this.modalData.pedido))
    this.cantidad = this.detalle.cantidad
  }

  close() {
    this.dialogRef.close()
  }

  onAddAlimento() {
    this.currentStatus = Status.loading

    this.detalle.cantidad = this.cantidad


    for (let detalles of this.pedido.alimentos) {

      if (detalles.idAlimento == this.detalle.idAlimento) {
        const index = this.pedido.alimentos.indexOf(detalles)

        this.pedido.alimentos[index] = this.detalle

        if (this.cantidad == 0)
          this.pedido.alimentos.splice(index, 1)

        break;
      }

    }

    this.pedidosService.editPedido(this.pedido).subscribe(e => {
      this.currentStatus = Status.success
      this.detalleActualizado.emit()
      setTimeout(() => {
        this.close()
      }, 1500);
    })

  }

  add() {
    this.cantidad++
  }

  remove() {
    this.cantidad--
  }
}
