import { Status } from './models/models';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Status = Status
  currentStatus = Status.loaded
  isLoggedIn = false


  onLogin() {
    this.isLoggedIn = true
    this.currentStatus = Status.loaded
  }

  onError() {
    console.log("error")
    this.currentStatus = Status.loaded
  }

  changeStatus(status: Status) {
    this.currentStatus = status
  }

}
