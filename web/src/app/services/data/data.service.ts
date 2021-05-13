import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { BadInput, NotFoundError, Conflict, AppError } from 'src/app/models/exceptions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = environment.base_url

  constructor(protected http: HttpClient) { }

  protected handleError(error: Response) {
    if (error.status === 400)
      return throwError(new BadInput(error));

    if (error.status === 404)
      return throwError(new NotFoundError(error));

    if (error.status === 409)
      return throwError(new Conflict(error));

    return throwError(new AppError(error));
  }
}
