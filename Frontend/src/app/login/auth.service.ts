import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly API = 'http://localhost:3000/cadastro';

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  fazerLogin(login: User) {
    if (login.email === 'evandro@ctjunior.com.br' && login.password === '123'){
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/Dashboard'])
    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}
