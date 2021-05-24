import { EliminarTicketComponent } from './../../../../shared/components/modals/tickets/eliminar-ticket/eliminar-ticket.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Status, Ticket } from 'src/app/models/models';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  Status = Status
  currentStatus = Status.loading

  tickets: Ticket[] = []

  constructor(
    private ticketsService: TicketsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos() {
    this.currentStatus = Status.loading
    this.ticketsService.getTickets().subscribe(e => {
      this.tickets = e
      this.currentStatus = Status.loaded
    })


  }

  openDeleteModal(ticket: Ticket) {

    const dialog = this.dialog.open(EliminarTicketComponent, {
      data: {
        ticket: ticket
      }
    })

    dialog.componentInstance.ticketEliminado.subscribe(e => {
      this.getPedidos()
    })


  }
}
