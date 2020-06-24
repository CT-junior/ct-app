import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecuperarsenhaService {
  private readonly API = '/api/';

  constructor(private http: HttpClient) { }

  send(cadastro) {
    return this.http.post(this.API, cadastro).pipe(take(1));
  }
}
