import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails: CarDetailDto[] = []
  currentColorId:number=0
  currentBrandId:number=0
  brandFilterText:string=""
  colorFilterText:string=""

  constructor(private carService: CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]&&params["brandId"]){
        this.GetCarDetailsByBrandIdAndColorId(params["brandId"],params["colorId"])
      }
      else if (params["colorId"]) {
        this.getCarDetailsByColorId(params["colorId"])
      }else if(params["brandId"]){
        this.getCarDetailsByBrandId(params["brandId"])
      }else{
        this.getCarDetails()
      }
    })
    
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe(response => {
      this.carDetails = response.data
    })
  }

  getCarDetailsByColorId(colorId:number) {
    this.carService.GetCarDetailsByColorId(colorId).subscribe(response => {
      this.carDetails = response.data
    })
  }

  getCarDetailsByBrandId(brandId:number) {
    this.carService.GetCarDetailsByBrandId(brandId).subscribe(response => {
      this.carDetails = response.data
    })
  }

  GetCarDetailsByBrandIdAndColorId(brandId:number,colorId:number) {
    this.carService.GetCarDetailsByBrandIdAndColorId(brandId,colorId).subscribe(response => {
      this.carDetails = response.data
    })
  }

}
