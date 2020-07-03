import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './user';
import { AlertModalService } from 'src/app/alert-modal/alert-modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() login: FormGroup;
  tipo: boolean;

  usuario: User = new User();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9.]+@ctjunior.com.br"), Validators.minLength(2), Validators.maxLength(50)]],
      password: [null, Validators.required]
    })
  }

  /* fazerLogin() {
    if (this.login.valid) {
      this.authService.fazerLogin(this.login.value).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/Dashboard']);
            this.login.reset();
            this.alertService.showAlertSuccess('Login realizado com sucesso!');
          } else {
            this.login.reset();
          }
        },
        error => console.error(error),
        () => console.log('request completo')
      );
    } else {
      Object.keys(this.login.controls).forEach(campo => {
        const controle = this.login.get(campo);
        controle.markAsTouched();
      })
    }
  } */


  fazerLogin() {
    if (this.login.valid) {
    console.log ('TESTE 1 VALID');
      this.authService.fazerLogin(this.login.value).subscribe(
        success => {
          if (success) {
            console.log(success);
            this.login.reset();
            this.router.navigate(['/Dashboard']);
            this.alertService.showAlertSuccess('Login realizado com sucesso!');
          }
        })
    } else {
      console.log ('TESTE 1 INVALID');
      this.alertService.showAlertDanger('Campo Usuario ou Senha: Inválido!');
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
