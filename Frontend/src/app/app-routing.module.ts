import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Cadastro' },
  { path: 'Cadastro', component:  CadastroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CadastroComponent]
