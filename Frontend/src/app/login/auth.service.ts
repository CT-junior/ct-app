import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly API = 'http://localhost:3000/cadastro';

  private usuarioAutenticado: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  fazerLogin(login: User) {
    if (login.email === 'evandro@ctjunior.com.br' && login.password === '123'){
      this.usuarioAutenticado = true;
      this.router.navigate(['/Dashboard'])
    } else {
      this.usuarioAutenticado = false;
    }
  }
}
