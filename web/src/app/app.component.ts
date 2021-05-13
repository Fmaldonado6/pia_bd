import { AuthService } from 'src/app/services/auth/auth.service';
import { Status } from './models/models';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Status = Status
  currentStatus = Status.loaded
  isLoggedIn = false
  innerWidth = 0;
  opened: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth

    this.authService.loggedUser.asObservable().subscribe(e => {
      this.isLoggedIn = e != null
      console.log(this.isLoggedIn, e)
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth >= 1234)
      this.opened = true
  }

}
