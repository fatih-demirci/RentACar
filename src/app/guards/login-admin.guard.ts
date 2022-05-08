import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let resultIsAuthenticated = this.authService.haveToken()
    if (resultIsAuthenticated.success) {

      this.authService.isAuthorizedAdmin().subscribe({
        next: response => {
          if (response.success) {
            return of(true)
          }
          return of(false)
        },
        error: errorResponse => {
          this.toastrService.info("Yetki yok")
          this.router.navigate(["/"])
          return of(false)
        }
      })

      return true


    } else {
      this.toastrService.info(resultIsAuthenticated.message)
      this.router.navigate(["/login"])
      return false
    }


  }

}
