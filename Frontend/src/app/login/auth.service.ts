import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(private router: Router) { }

  fazerLogin(usuario: User) {
    if (usuario.nome === 'usuario@gmail.com' && usuario.senha === '123'){
      this.usuarioAutenticado = true;
      this.router.navigate(['/Dashboard'])
    } else {
      this.usuarioAutenticado = false;
    }
  }
}
