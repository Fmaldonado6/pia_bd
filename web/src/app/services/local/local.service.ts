import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { InfoSucursalResource } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class LocalService extends DataService {

  getLocalInfo() {
    return this.http.get<InfoSucursalResource>(`${this.url}/sucursal`).pipe(catchError(this.handleError))
  }
}
