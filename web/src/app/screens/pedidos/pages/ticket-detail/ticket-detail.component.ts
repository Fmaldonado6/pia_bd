import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { TicketResource } from 'src/app/models/models';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  id = ""

  ticket = new TicketResource()



  constructor(
    private route: ActivatedRoute,
    private ticektService: TicketsService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id

    this.getTicket()
  }

  getTicket() {

    this.ticektService.getTicket(this.id).subscribe(e => {
      console.log(e)
      this.ticket = e
    })

  }

}
