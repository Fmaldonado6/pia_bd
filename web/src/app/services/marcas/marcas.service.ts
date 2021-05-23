import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Marca } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class MarcasService extends DataService {


  addMarca(marca: Marca) {
    return this.http.post(`${this.url}/alimentos/marcas`, marca).pipe(catchError(this.handleError))
  }


  updateMarca(marca: Marca) {
    return this.http.put(`${this.url}/alimentos/marcas`, marca).pipe(catchError(this.handleError))
  }


  getMarcas() {
    return this.http.get<Marca[]>(`${this.url}/alimentos/marcas`).pipe(catchError(this.handleError))
  }

}
