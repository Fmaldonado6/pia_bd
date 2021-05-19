import { EmpleadosService } from './services/empleados/empleados.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Status, Empleado } from './models/models';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  currentUser: Empleado = new Empleado()

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
    private authService: AuthService,
    private empleadosService: EmpleadosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth

    this.authService.loggedUser.asObservable().subscribe(e => {
      this.isLoggedIn = !!e
    })

    const token = this.authService.getToken()
    if (!token)
      return

    this.isLoggedIn = true
    this.currentStatus = Status.loading

    this.empleadosService.getMyInfo().subscribe(e => {
      this.currentUser = e
      this.authService.setUser(e)
      this.currentStatus = Status.loaded
    }, () => {
      this.authService.logout()
      this.currentStatus = Status.loaded
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth >= 1234)
      this.opened = true
  }

  signOut() {
    this.router.navigate(["/"])
    this.authService.logout()
  }

}
