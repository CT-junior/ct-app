import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { CadastroService } from './cadastro.service';
import { AlertModalService } from '../alert-modal/alert-modal.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastro: FormGroup;

  onSubmit() {
    console.log(this.cadastro.value);
    if (this.cadastro.valid) {
      console.log('submit');
      this.service.create(this.cadastro.value).subscribe(
        success => {
          console.log('sucesso');
          this.alertService.showAlertSuccess('Cadastro realizado com sucesso!');
          this.cadastro.reset();
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
    private alertService: AlertModalService
  ) { }


  ngOnInit() {
    this.cadastro = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(50)]],
      celular: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(11)]],
      data: [null, Validators.required],
      cargo: [null, Validators.required, this.selectedCargo],
      diretoria: [null, Validators.required, this.selectedDiretoria],
      senha: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
      /* foto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]] */
    })
  }

  selectedDiretoria: string = '';
  selectedCargo: string = '';

  cargos: any = [
    'Diretor(a)', 'Gerente', 'Consultor'
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


}
