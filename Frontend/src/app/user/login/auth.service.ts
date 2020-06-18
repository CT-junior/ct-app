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
    return this.http.post<any>(this.API, login)
      .pipe(
        tap(token => this.doLoginUser(login.email, token)),
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

  private doLoginUser(email: string, token: Token) {
    this.loggedUser = email;
    this.storeTokens(token);
    this.mostrarMenuEmitter.emit(true);
  }

  private storeTokens(token: Token) {
    localStorage.setItem(this.JWT_TOKEN, token.token);
  }

  isLoggedIn() {
    this.mostrarMenuEmitter.emit(false);
    return this.getJwtToken(), this.usuarioAutenticado;
  }

  getJwtToken() {
    this.mostrarMenuEmitter.emit(true);
    return localStorage.getItem(this.JWT_TOKEN);
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }


}
