import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AlertModalService } from 'src/app/alert-modal/alert-modal.service';
import { User, Token } from './user';

import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly API = '/api/authenticate';

  private usuarioAutenticado: boolean = false;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private alertService: AlertModalService,
    private http: HttpClient
  ) { }

  /* fazerLogin(login: User) {
    if (login.email === 'evandro@ctjunior.com.br' && login.password === '123'){
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/Dashboard']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
      this.alertService.showAlertDanger('Campo Usuario ou Senha: Inválido.');
    }
  } */
  /*  fazerLogin(login: User): Observable<boolean> {
     if(login){
       this.usuarioAutenticado = true;
       this.mostrarMenuEmitter.emit(true);
       this.router.navigate(['/Dashboard']);
       return this.http.post<any>(this.API, login)
     } else {
       this.usuarioAutenticado = false;
       this.mostrarMenuEmitter.emit(false);
       this.alertService.showAlertDanger('Campo Usuario ou Senha: Inválido.');
     }
       
   }
  */

  fazerLogin(login: User): Observable<boolean> {
    console.log ('TESTE 2');
    return this.http.post<any>(this.API, login)
      .pipe(
        tap(token => this.doLoginUser(login.email, token)),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  private doLoginUser(email: string, token: Token) {
    console.log ('TESTE 3');
    this.loggedUser = email;
    this.storeTokens(token);
  }

  private storeTokens(token: Token) {
    console.log ('TESTE 4');
    localStorage.setItem(this.JWT_TOKEN, token.token);
  }

  isLoggedIn() {
    console.log ('TESTE 5');
    this.mostrarMenuEmitter.emit(true);
    return !!this.getJwtToken();
  }

  getJwtToken() {
    console.log ('TESTE 6');
    return localStorage.getItem(this.JWT_TOKEN);
  }

  usuarioEstaAutenticado() {
    console.log ('TESTE 7');
    return this.usuarioAutenticado;
  }
}
