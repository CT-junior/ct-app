import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RecuperarsenhaService } from './recuperarsenha.service'
import { AlertModalService } from 'src/app/alert-modal/alert-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css']
})
export class RecuperarsenhaComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: RecuperarsenhaService,
    private alertService: AlertModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9.]+@ctjunior.com.br"), Validators.minLength(2), Validators.maxLength(50)]]
    })
  }

  EsqueciMinhaSenha() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.send(this.form.value).subscribe(
        success => {
          console.log('sucesso');
          this.form.reset();
          this.router.navigate(['/Login'])
          this.alertService.showAlertSuccess('Senha provisória enviada com sucesso!');
        },
        error => console.error(error),
        () => console.log('request completo')
      );
    } else {
      Object.keys(this.form.controls).forEach(campo => {
        const controle = this.form.get(campo);
        controle.markAsTouched();
      })
    }
  }

  verificainValidTouch(campo) {
    return !this.form.get(campo).valid && this.form.get(campo).touched
  }

  verificaValidTouch(campo) {
    return this.form.get(campo).valid && [this.form.get(campo).touched || this.form.get(campo).dirty]
  }

  aplicaCss(campo) {
    return {
      'is-invalid': this.verificainValidTouch(campo),
      'is-valid': this.verificaValidTouch(campo)
    }
  }

}
