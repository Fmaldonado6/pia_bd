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

  menuSections = [
    {
      icon: "home",
      title: "Inicio",
      route: "/home"
    },
    {
      icon: "monetization_on",
      title: "Pedidos",
      route: "/pedidos"
    },
    {
      icon: "supervised_user_circle",
      title: "Empleados",
      route: "/empleados"
    },
    {
      icon: "fastfood",
      title: "Alimentos y Bebidas",
      route: "/comida"
    },
    {
      icon: "sticky_note_2",
      title: "Facturación",
      route: "/facturacion"
    }
  ]

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
