import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      const userType = localStorage.getItem('userType');
      
      if (token == null) {
        return true;
      } else {
        if (userType === 'client') {
          this.router.navigate(['client']);
        } 
        return false;
      }
    } else {
      // If running on the server, block access since localStorage is not available
      return false;
    }
  }
}
