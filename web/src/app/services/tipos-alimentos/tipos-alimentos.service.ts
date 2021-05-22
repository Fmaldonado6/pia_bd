import { TipoAlimento } from './../../models/models';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiposAlimentosService extends DataService {

  getTipoAlimentos(){
    return this.http.get<TipoAlimento[]>(`${this.url}/alimentos/tipos`)
  }

}
