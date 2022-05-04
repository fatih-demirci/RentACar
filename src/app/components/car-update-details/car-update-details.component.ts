import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update-details',
  templateUrl: './car-update-details.component.html',
  styleUrls: ['./car-update-details.component.css']
})
export class CarUpdateDetailsComponent implements OnInit {

  carId: number = 0
  car: Car = { brandId: 0, description: "", colorId: 0, dailyPrice: 0, id: 0, modelYear: 0 }
  colors: Color[] = []
  brands: Brand[] = []
  carUpdateForm: FormGroup = this.formBuilder.group({})

  constructor(private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCarUpdateForm()
    this.activatedRoute.params.subscribe(
      params => {
        this.carId = params["carId"]
        this.getCarDetails()
      }
    )
    this.getColors()
    this.getBrands()

  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.carId],
      brandId: [this.car.brandId, Validators.required,],
      colorId: [this.car.colorId, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      description: [this.car.description, Validators.required]
    })
  }

  getCarDetails() {
    this.carService.getById(this.carId).subscribe({
      next: response => {
        this.car = response.data
        this.createCarUpdateForm()
      },
      error: errorResponse => { console.log(errorResponse) }
    })
  }

  getColors() {
    this.colorService.getAll().subscribe({
      next: response => {
        this.colors = response.data
      },
      error: errorResponse => {
        console.log(errorResponse)
      }
    })
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: response => {
        this.brands = response.data
      },
      error: errorResponse => {
        console.log(errorResponse)
      }
    })
  }

  updateCar() {
    this.car = Object.assign({}, this.carUpdateForm.value)
    this.car.id=this.carId
    console.log(this.car)
    this.carService.updateCar(this.car).subscribe({
      next:response=>{this.toastrService.success(response.message,"Araç Güncelleme")},
      error:errorResponse=>{console.log(errorResponse)}
    })
  }

}
