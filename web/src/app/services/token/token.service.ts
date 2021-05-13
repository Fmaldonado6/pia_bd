import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  intercept(req: any, next: any) {
    const token = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })

    return next.handle(token)

  }

  constructor(private authService: AuthService) { }
}
