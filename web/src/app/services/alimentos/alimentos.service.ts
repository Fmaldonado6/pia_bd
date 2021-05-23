import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Alimentos } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService extends DataService {


  getAlimentos() {
    return this.http.get<Alimentos[]>(`${this.url}/alimentos`).pipe(catchError(this.handleError))
  }

  getAlimentosByTipoId(id: number) {
    return this.http.get<Alimentos[]>(`${this.url}/alimentos/tipo/${id}`).pipe(catchError(this.handleError))

  }

  addAlimento(alimento: Alimentos) {
    return this.http.post(`${this.url}/alimentos`, alimento).pipe(catchError(this.handleError))
  }

  updateAlimento(alimento: Alimentos) {
    return this.http.put(`${this.url}/alimentos`, alimento).pipe(catchError(this.handleError))
  }


}
