import { Pedido, Ticket } from 'src/app/models/models';
import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketsService extends DataService {


  getTickets() {
    return this.http.get<Ticket[]>(`${this.url}/tickets`).pipe(catchError(this.handleError))
  }

  getTicket(id: number) {
    return this.http.get<Ticket>(`${this.url}/tickets/${id}`).pipe(catchError(this.handleError))
  }

  addTicket(pedido: Pedido) {
    return this.http.post(`${this.url}/tickets`, pedido).pipe(catchError(this.handleError))

  }

  deleteTicket(id: number) {
    return this.http.delete<Ticket>(`${this.url}/tickets/${id}`).pipe(catchError(this.handleError))
  }

}
