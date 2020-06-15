import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  tipo: boolean;
  
  usuario: User = new User();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.login = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9.]+@ctjunior.com.br"), Validators.minLength(2), Validators.maxLength(50)]],
      password: [null, Validators.required]
    })
  }

  fazerLogin() {
    if (this.login.valid) {
      this.authService.fazerLogin(this.login.value);
      this.login.reset();
    } else {
      Object.keys(this.login.controls).forEach(campo => {
        const controle = this.login.get(campo);
        controle.markAsTouched();
      })
    }
  }

  verificainValidTouch(campo) {
    return !this.login.get(campo).valid && this.login.get(campo).touched
  }

  verificaValidTouch(campo) {
    return this.login.get(campo).valid && [this.login.get(campo).touched || this.login.get(campo).dirty]
  }

  aplicaCss(campo) {
    return {
      'is-invalid': this.verificainValidTouch(campo),
      'is-valid': this.verificaValidTouch(campo)
    }
  }

  showHide() {
    this.tipo = !this.tipo;
  }
}
