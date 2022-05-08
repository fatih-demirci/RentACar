import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let resultIsAuthenticated = this.authService.haveToken()
    if (resultIsAuthenticated.success) {


      this.authService.isAuthenticated().subscribe({
        next: response => {
          if (response.success) {
            return of(true)
          }
          this.localStorageService.removeItem("token")
          this.toastrService.info("Giriş yapınız")
          this.router.navigate(["/login"])
          return of(false)
        },
        error: errorResponse => {
          this.localStorageService.removeItem("token")
          this.toastrService.info("Giriş yapınız")
          this.router.navigate(["/login"])
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
