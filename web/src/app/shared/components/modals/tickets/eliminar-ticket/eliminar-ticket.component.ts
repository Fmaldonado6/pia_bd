import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status, Ticket } from 'src/app/models/models';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

interface ModalData {
  ticket: Ticket
}

@Component({
  selector: 'app-eliminar-ticket',
  templateUrl: './eliminar-ticket.component.html',
  styleUrls: ['./eliminar-ticket.component.scss']
})
export class EliminarTicketComponent implements OnInit {
  Status = Status
  currentStatus = Status.loaded

  ticket = new Ticket()

  @Output() ticketEliminado = new EventEmitter()

  constructor(
    private dialog: MatDialogRef<EliminarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
    private ticketsService: TicketsService
  ) { }

  ngOnInit(): void {
    this.ticket = this.modalData.ticket
  }

  deletemMarca() {
    this.currentStatus = Status.loading

    this.ticketsService.deleteTicket(this.ticket.idTicket).subscribe(e => {
      this.currentStatus = Status.success
      this.ticketEliminado.emit()
    })
  }

  close() {
    this.dialog.close()
  }

}
