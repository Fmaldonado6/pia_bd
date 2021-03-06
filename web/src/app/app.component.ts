import { EmpleadosService } from './services/empleados/empleados.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Status, Empleado, PrivilegiosId } from './models/models';
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

  menuSections: any[] = []

  constructor(
    private authService: AuthService,
    private empleadosService: EmpleadosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth

    this.authService.loggedUser.asObservable().subscribe(e => {
      this.isLoggedIn = !!e
      if (e)
        this.currentUser = e
      this.setUpMenu()
    })

    const token = this.authService.getToken()

    if (token)
      this.getUser()

  }

  getUser() {
    this.isLoggedIn = true
    this.currentStatus = Status.loading

    this.empleadosService.getMyInfo().subscribe(e => {
      this.currentUser = e
      this.setUpMenu()
      this.authService.setUser(e)
      this.currentStatus = Status.loaded
    }, () => {
      this.authService.logout()
      this.currentStatus = Status.loaded
    })
  }

  setUpMenu() {
    this.menuSections = [
      {
        icon: "home",
        title: "Inicio",
        route: "/home",
        canActivate: true
      },
      {
        icon: "local_bar",
        title: "Información",
        route: "/info",
        canActivate: true
      },
      {
        icon: "monetization_on",
        title: "Pedidos",
        route: "/pedidos",
        canActivate: this.hasPermission(PrivilegiosId.gestionarPedidos)
      },
      {
        icon: "supervised_user_circle",
        title: "Empleados",
        route: "/empleados",
        canActivate: true
      },
      {
        icon: "fastfood",
        title: "Alimentos y Bebidas",
        route: "/alimentos",
        canActivate: this.hasPermission(PrivilegiosId.gestionarAlimentos)
      },
      {
        icon: "sticky_note_2",
        title: "Facturación",
        route: "/facturacion",
        canActivate: this.hasPermission(PrivilegiosId.gestionarFacturas)
      }
    ]
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth >= 1234)
      this.opened = true
  }

  hasPermission(permission: PrivilegiosId) {
    for (let privilegio of this.currentUser.privilegios) {
      if (privilegio.idPrivilegio == permission)
        return true
    }
    return false

  }

  signOut() {
    this.authService.logout()
  }

}
