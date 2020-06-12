import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComponent } from './user/cadastro/cadastro.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'Login', component: UserComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'Cadastro', component: UserComponent,
    children: [{ path: '', component: CadastroComponent }]
  },
  { path: 'Dashboard', component:  DashboardComponent, canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'Login' },
  { path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CadastroComponent, LoginComponent, DashboardComponent, NavbarComponent, PaginaNaoEncontradaComponent]
