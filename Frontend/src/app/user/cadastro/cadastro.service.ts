import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private readonly API = '/api/register';

  constructor(private http: HttpClient) {}

  create(cadastro) {
    return this.http.post(this.API, cadastro).pipe(take(1));
  }
}