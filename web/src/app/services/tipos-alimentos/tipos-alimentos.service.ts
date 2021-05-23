import { catchError } from 'rxjs/operators';
import { TipoAlimento } from './../../models/models';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiposAlimentosService extends DataService {

  getTipoAlimentos() {
    return this.http.get<TipoAlimento[]>(`${this.url}/alimentos/tipos`).pipe(catchError(this.handleError))
  }

  addTipoAlimento(tipo: TipoAlimento) {
    return this.http.post(`${this.url}/alimentos/tipos`, tipo).pipe(catchError(this.handleError))

  }

  updateTipoAlimento(tipo: TipoAlimento) {
    return this.http.put(`${this.url}/alimentos/tipos`, tipo).pipe(catchError(this.handleError))

  }

  deleteTipoAlimento(id: number) {
    return this.http.delete(`${this.url}/alimentos/tipos/${id}`).pipe(catchError(this.handleError))

  }

}
