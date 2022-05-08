import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.localStorageService.getItem("token")) {
      this.authService.isAuthenticated().subscribe({
        next: response => {
          return of(true)
        },
        error: errorResponse => {
          this.localStorageService.removeItem("token")
          this.router.navigate(["/login"])
          return of(false)
        }
      })
    }
    return of(true)
  }

}
