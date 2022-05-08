import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateDetailsComponent } from './components/car-update-details/car-update-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterForCustomerComponent } from './components/register-for-customer/register-for-customer.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { LoginDoneGuard } from './guards/login-done.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", component: CarDetailComponent, canActivate: [AuthGuard] },
  { path: "cars/getcardetailsbyid/:currentCarDetailId", pathMatch: "full", component: CarComponent, canActivate: [AuthGuard] },
  { path: "cars/color/:colorId/brand/:brandId", pathMatch: "full", component: CarDetailComponent, canActivate: [AuthGuard] },
  { path: "cars/update", pathMatch: "full", component: CarUpdateComponent, canActivate: [LoginAdminGuard, LoginGuard, AuthGuard] },
  { path: "cars/updateDetails/:carId", pathMatch: "full", component: CarUpdateDetailsComponent, canActivate: [LoginAdminGuard, LoginGuard, AuthGuard] },
  { path: "login", pathMatch: "full", component: LoginComponent, canActivate: [LoginDoneGuard, AuthGuard] },
  { path: "registerCustomer", pathMatch: "full", component: RegisterForCustomerComponent, canActivate: [LoginDoneGuard, AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
