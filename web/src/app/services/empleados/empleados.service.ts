import { Empleado, TipoEmpleado } from 'src/app/models/models';
import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService extends DataService {

  getMyInfo() {
    return this.http.get<Empleado>(`${this.url}/empleados/info`).pipe(catchError(this.handleError))
  }

  getTiposEmpleados() {
    return this.http.get<TipoEmpleado[]>(`${this.url}/empleados/tipos`).pipe(catchError(this.handleError))

  }

}
