import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Car } from '../../models/car';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarDetailDto } from 'src/app/models/carDetailDto';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carAddForm: FormGroup = this.formBuilder.group({})
  brandAddForm: FormGroup = this.formBuilder.group({})
  colorAddForm: FormGroup = this.formBuilder.group({})
  cars: CarDetailDto[] = []
  car: Car = { brandId: 0, colorId: 0, dailyPrice: 0, description: "", id: 0, modelYear: 2000 }
  color: Color = { id: 0, name: "" }
  brand: Brand = { id: 0, name: "" }
  brands: Brand[] = []
  colors: Color[] = []
  colorsUpdated: Color[] = []
  brandsUpdated: Brand[] = []
  carAddResponse: ResponseModel = { message: "", success: false }

  constructor(private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.createBrandAddForm()
    this.createColorAddForm()
    this.getAllBrands()
    this.getAllColors()
    this.getAllCarDetails()
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: [0, Validators.required],
      colorId: [0, Validators.required],
      modelYear: [2000, Validators.required],
      dailyPrice: [0, Validators.required],
      description: ["", Validators.required]
    })
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  addBrand() {
    this.brand.name = this.brandAddForm.value.brandName
    this.brandService.add(this.brand).subscribe({
      next: response => {
        this.toastrService.success(response.message, "Marka eklendi")
      },
      error: errorResponse => {
        console.log(errorResponse)
      }

    })
    console.log(this.brand)
  }

  addColor() {
    this.color.name = this.colorAddForm.value.colorName
    this.colorService.add(this.color).subscribe({
      next: response => { this.toastrService.success(response.message, "Renk eklendi") },
      error: errorResponse => { console.log(errorResponse) }
    })
    console.log(this.color)
  }

  updateColor(color: Color) {
    this.colorService.updateColor(color).subscribe({
      next: response => { this.toastrService.success(response.message, "Renk güncellendi") },
      error: errorResponse => { console.log(errorResponse) }
    })
  }

  updateBrand(brand: Brand) {
    this.brandService.updateBrand(brand).subscribe({
      next:response=>{this.toastrService.success(response.message,"Marka güncellendi")},
      error:errorResponse=>{console.log(errorResponse)}
    })
  }

  getAllCarDetails() {
    this.carService.getCarDetails().subscribe({
      next: response => { this.cars = response.data },
      error: errorResponse => { this.toastrService.error("Araçlar yüklenemedi", "Hata") }
    })
  }

  getAllBrands() {
    this.brandService.getAll().subscribe(response => {
      this.brands = response.data
      for (let i = 0; i < this.brands.length; i++) {
        this.brandsUpdated[i] = { id: 0, name: "" }
        this.brandsUpdated[i].id = this.brands[i].id
        this.brandsUpdated[i].name = this.brands[i].name
      }
    })
  }

  getAllColors() {
    this.colorService.getAll().subscribe(response => {
      this.colors = response.data
      for (let i = 0; i < this.colors.length; i++) {
        this.colorsUpdated[i] = { id: 0, name: "" }
        this.colorsUpdated[i].id = this.colors[i].id
        this.colorsUpdated[i].name = this.colors[i].name
      }
    })
  }

  addCar() {
    this.car = Object.assign({}, this.carAddForm.value)
    this.carService.add(this.car).subscribe(
      {
        next: response => {
          this.carAddResponse = response
          this.toastrService.success(this.carAddResponse.message)
        },
        error: errorResponse => {
          this.carAddResponse.message = ""
          for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
            this.carAddResponse.message += errorResponse.error.ValidationErrors[i].ErrorMessage
          }
          this.toastrService.error(this.carAddResponse.message, "Araç eklenemedi")
        }

      }
    )
  }

}
