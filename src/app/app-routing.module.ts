import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateDetailsComponent } from './components/car-update-details/car-update-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarDetailComponent},
  {path:"cars/getcardetailsbyid/:currentCarDetailId",pathMatch:"full",component:CarComponent},
  {path:"cars/color/:colorId/brand/:brandId",pathMatch:"full",component:CarDetailComponent},
  {path:"cars/update",pathMatch:"full",component:CarUpdateComponent},
  {path:"cars/updateDetails/:carId",pathMatch:"full",component:CarUpdateDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
