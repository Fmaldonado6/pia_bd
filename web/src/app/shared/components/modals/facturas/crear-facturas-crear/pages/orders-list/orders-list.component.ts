import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Pedido, Factura } from 'src/app/models/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderType } from '../../../../modal-title/modal-title.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})


export class OrdersListComponent implements OnInit {
  HeaderType = HeaderType
  formInformacion: FormGroup = new FormGroup({})
  @Output() submitForm = new EventEmitter()
  @Output() iconClicked = new EventEmitter()
  @Input() factura = new Factura()
  @Input() edit = false

  pedidos: Pedido[] = []

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.formInformacion = new FormGroup({
      pedido: new FormControl('', [
        Validators.required
      ])
    })

    this.getPedidos()
  }
  onSubmit(values: any) {

    this.submitForm.emit(values)

  }
  onIconClick(){
    this.iconClicked.emit()
  }

  getPedidos() {
    this.pedidosService.getPedidos().subscribe(p => {
      this.pedidos = p
    })
  }

}
