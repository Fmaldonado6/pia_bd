import { Pedido } from './../../models/models';
import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends DataService {
  getPedidos() {
    return this.http.get<Pedido[]>(`${this.url}/pedidos`).pipe(catchError(this.handleError))
  }

  addPedido(pedido: Pedido) {
    return this.http.post<Pedido>(`${this.url}/pedidos`, pedido).pipe(catchError(this.handleError))
  }

  getPedido(id: string) {
    return this.http.get<Pedido>(`${this.url}/pedidos/${id}`).pipe(catchError(this.handleError))
  }

  deletePedido(id: number) {
    return this.http.delete<Pedido>(`${this.url}/pedidos/${id}`).pipe(catchError(this.handleError))
  }

  editPedido(pedido: Pedido) {
    return this.http.put<Pedido>(`${this.url}/pedidos`, pedido).pipe(catchError(this.handleError))

  }

}
