import { AuthService } from './../../shared/services/auth.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(protected router: Router,
    protected authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/admin/myposts'], {
      queryParams: {
        status: 'published'
      }
    });
    return false;
  }
}
