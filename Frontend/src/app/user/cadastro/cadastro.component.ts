import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { CadastroService } from './cadastro.service';
import { AlertModalService } from '../../alert-modal/alert-modal.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  cadastro: FormGroup;
  tipo: boolean;

  onSubmit() {
    console.log(this.cadastro.value);
    if (this.cadastro.valid) {
      console.log('submit');
      this.service.create(this.cadastro.value).subscribe(
        success => {
          console.log('sucesso');
          this.cadastro.reset();
          this.router.navigate(['/Login'])
          this.alertService.showAlertSuccess('Cadastro realizado com sucesso!');
        },
        error => console.error(error),
        () => console.log('request completo')
      );
    } else {
      Object.keys(this.cadastro.controls).forEach(campo => {
        const controle = this.cadastro.get(campo);
        controle.markAsTouched();
      })
    }
  }

  verificainValidTouch(campo) {
    return !this.cadastro.get(campo).valid && this.cadastro.get(campo).touched
  }

  verificaValidTouch(campo) {
    return this.cadastro.get(campo).valid && [this.cadastro.get(campo).touched || this.cadastro.get(campo).dirty]
  }

  aplicaCss(campo) {
    return {
      'is-invalid': this.verificainValidTouch(campo),
      'is-valid': this.verificaValidTouch(campo)
    }
  }

  constructor(
    private fb: FormBuilder,
    private service: CadastroService,
    private alertService: AlertModalService,
    private router: Router
  ) { }


  ngOnInit() {
    this.cadastro = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9.]+@ctjunior.com.br"), Validators.minLength(2), Validators.maxLength(50)]],
      phone: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(11)]],
      role: [null, Validators.required, this.selectedCargo],
      team: [null, Validators.required, this.selectedDiretoria],
      birthdate: [null, Validators.required],
      password: [null, Validators.required]
      /* foto: [null, Validators.required] */
    })
  }

  selectedDiretoria: string = '';
  selectedCargo: string = '';

  cargos: any = [
    'Diretor(a)', 'Gerente', 'Consultor(a)'
  ];
  diretorias: any = [
    'Consultoria', 'Construção Civil', 'Tecnologia'
  ];


  radioCargo(event: any) {
    this.selectedCargo = event.target.value;
  };
  radioDiretoria(event: any) {
    this.selectedDiretoria = event.target.value;
  };

  showHide() {
    this.tipo = !this.tipo;
  }
}
