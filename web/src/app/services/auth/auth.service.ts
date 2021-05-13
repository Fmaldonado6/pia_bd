import { Token } from './../../models/models';
import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { catchError } from 'rxjs/operators'
import { Empleado } from 'src/app/models/models';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService {

  loggedUser = new BehaviorSubject<Empleado | null>(null)

  TOKEN_KEY = "token_bar"


  setUser(user: Empleado) {
    this.loggedUser.next(user)
  }

  auth(empleado: Empleado) {
    return this.http.post(`${this.url}/auth`, empleado).pipe(catchError(this.handleError))
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  loggedIn() {
    return this.loggedUser.value != null
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getTokenInfo(): Token | null {
    const token = localStorage.getItem(this.TOKEN_KEY)

    if (!token)
      return null

    return this.getDataFromToken(token)
  }

  getDataFromToken(token: any) {
    let parsedToken: any = JSON.parse(atob(token.split('.')[1]))

    return parsedToken as Token
  }
}
