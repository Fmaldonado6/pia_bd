import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Estado, Pais, Municipio, Calle, Colonia } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService extends DataService {


  getPaises() {
    return this.http.get<Pais[]>(`${this.url}/direcciones/pais`).pipe(catchError(this.handleError))
  }

  getEstados(id: number) {
    return this.http.get<Estado[]>(`${this.url}/direcciones/estados/${id}`).pipe(catchError(this.handleError))
  }

  getMunicipios(id: number) {
    return this.http.get<Municipio[]>(`${this.url}/direcciones/municipios/${id}`).pipe(catchError(this.handleError))
  }

  getCalle(id: number) {
    return this.http.get<Calle>(`${this.url}/direcciones/calles/${id}`).pipe(catchError(this.handleError))
  }

  getColonia(id: number) {
    return this.http.get<Colonia>(`${this.url}/direcciones/colonias/${id}`).pipe(catchError(this.handleError))
  }

}
