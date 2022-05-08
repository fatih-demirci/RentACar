import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginDoneGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.haveToken().success) {
      this.authService.isAuthenticated().subscribe({
        next: response => {
          if (response.success) {
            this.toastrService.info("Giriş yapılı")
            this.router.navigate(["/"])
            return of(false)
          }
          return of(true)
        },
        error: errorResponse => {
          return of(true)
        }
      })
    }
    return of(true);
  }

}
