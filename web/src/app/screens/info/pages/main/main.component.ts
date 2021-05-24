import { Component, OnInit } from '@angular/core';
import { InfoSucursal, InfoSucursalResource, Status } from 'src/app/models/models';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  Status = Status
  currentStatus = Status.loading

  sucursal = new InfoSucursalResource()

  constructor(
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo() {
    this.localService.getLocalInfo().subscribe(e => {
      this.currentStatus = Status.loaded
      this.sucursal = e
    })
  }

}
