import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertModalService } from 'src/app/alert-modal/alert-modal.service';

import { User } from './user';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private alertService: AlertModalService
  ) { }
  
  fazerLogin(login: User) {
    if (login.email === 'evandro@ctjunior.com.br' && login.password === '123'){
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/Dashboard']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
      this.alertService.showAlertDanger('Campo Usuario ou Senha: Inválido.');
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

}
