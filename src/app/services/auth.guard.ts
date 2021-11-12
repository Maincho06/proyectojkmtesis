import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { clearState } from '@utils/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public _authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    // if (!this._authService.isAuthenticated()) {
    //   clearState();
    //   this.router.navigate(['login']);
    //   return false;
    // }
    return true;
  }
}
