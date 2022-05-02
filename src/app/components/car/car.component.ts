import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { PaymentInformation } from 'src/app/models/paymentInformation';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service'
import { ResponseModel } from '../../models/responseModel';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  currentCarDetailId: number = 0
  carDetailDto: CarDetailDto = { dailyPrice: 0, id: 0, brandName: "", carDescription: "", colorName: "", modelYear: 0 }
  carImages: any[] = []
  imagePaths: any[] = []
  

  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private activatedRoot: ActivatedRoute,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params => {
      this.currentCarDetailId = params["currentCarDetailId"]
    })
    this.getCarDetailsById(this.currentCarDetailId)
    this.getCarImagesById(this.currentCarDetailId)
  }

  getCarDetailsById(id: number) {
    this.carService.GetCarDetailsById(id).subscribe(response => {
      this.carDetailDto = response.data
    })
  }

  getCarImagesById(id: number) {
    this.carImageService.getById(id).subscribe(response => {
      this.carImages = response.data
      for (let i = 0; i < this.carImages.length; i++) {
        this.imagePaths[i] = 'data:image/png;base64,' + this.carImages[i]
      }
    })

  }

  

}
