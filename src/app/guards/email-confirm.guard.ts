import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmGuard implements CanActivate {

  constructor(private userService: UserService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userService.emailConfirmed().subscribe({
      next: response => {
        return of(true)
      },
      error: errorResponse => {
        this.router.navigate(["/user/confirmemail"])
        return of(false)
      }
    })
    return true;
  }

}
