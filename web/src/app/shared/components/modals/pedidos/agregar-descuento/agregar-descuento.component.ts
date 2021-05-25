import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Pedido, Status } from 'src/app/models/models';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

interface ModalData {
  pedido: Pedido
}

@Component({
  selector: 'app-agregar-descuento',
  templateUrl: './agregar-descuento.component.html',
  styleUrls: ['./agregar-descuento.component.scss']
})
export class AgregarDescuentoComponent implements OnInit {

  form = new FormGroup({})
  pedido = new Pedido()

  Status = Status
  currentStatus = Status.loaded

  @Output() descuentoAplicado = new EventEmitter()

  constructor(
    private pedidosService: PedidosService,
    private dialog: MatDialogRef<AgregarDescuentoComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData
  ) { }

  ngOnInit(): void {

    Object.assign(this.pedido, this.modalData.pedido)

    this.form = new FormGroup({
      descuento: new FormControl(this.pedido.descuento*100, [
        Validators.required,
        Validators.pattern(/^0*(?:[0-9][0-9]?|100)$/)
      ])
    })

  }

  formSubmit(value: any) {
    this.currentStatus = Status.loading
    this.pedido.descuento = value.descuento / 100
    this.pedidosService.editPedido(this.pedido).subscribe(e => {
      this.currentStatus = Status.success
      this.descuentoAplicado.emit()
      setTimeout(() => {
        this.close()
      }, 1500);
    })

  }

  close() {
    this.dialog.close()
  }

}
