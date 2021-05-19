import { catchError } from 'rxjs/operators';
import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { Privilegios } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class PrivilegiosService extends DataService {


  getPrivilegios() {
    return this.http.get<Privilegios[]>(`${this.url}/privilegios`).pipe(catchError(this.handleError))
  }

}
