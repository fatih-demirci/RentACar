import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarDetailComponent},
  {path:"cars/getcardetailsbyid/:currentCarDetailId",pathMatch:"full",component:CarComponent},
  {path:"cars/getcardetailsbycolorId/:colorId",pathMatch:"full",component:CarDetailComponent},
  {path:"cars/getcardetailsbybrandid/:brandId",pathMatch:"full",component:CarDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
