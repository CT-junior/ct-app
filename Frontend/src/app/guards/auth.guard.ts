import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../user/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /* canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean{

    if(this.authService.usuarioEstaAutenticado()){
      return true;
    }

    this.router.navigate(['/Login']);
    
    return false;
  } */

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log ('TESTE Auth');

    if (!this.authService.isLoggedIn()) {
      console.log ('TESTE Auth VALID');
      this.router.navigate(['/Login']);
    }
      /* this.router.navigate(['/Login']); */
      console.log ('TESTE Auth VALID 2');
      return this.authService.isLoggedIn();
  }
}
