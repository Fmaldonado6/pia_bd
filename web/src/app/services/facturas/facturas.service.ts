import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Factura, FacturaResource } from 'src/app/models/models';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasService extends DataService {


  getFacturas() {
    return this.http.get<Factura[]>(`${this.url}/facturas`).pipe(catchError(this.handleError))
  }

  getFactura(id: number) {
    return this.http.get<FacturaResource>(`${this.url}/facturas/${id}`).pipe(catchError(this.handleError))
  }

}
