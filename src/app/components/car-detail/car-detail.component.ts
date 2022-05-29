import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetailsLoaded: boolean = false
  carDetails: CarDetailDto[] = []
  brands: Brand[] = []
  colors: Color[] = []
  currentColorId: number = 0
  currentBrandId: number = 0
  brandFilterText: string = ""
  colorFilterText: string = ""
  brandFilterSelect: number = 0
  colorFilterSelect: number = 0
  carImages: Map<number, number[]> = new Map<number, number[]>()

  constructor(private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private carImageService: CarImageService
  ) { }

  ngOnInit(): void {

    this.GetAllBrands();
    this.GetAllColors();

    this.activatedRoute.params.subscribe(params => {
      if (!params["colorId"] && !params["brandId"]) {
        this.getCarDetails()
      } else {
        if (params["colorId"] != 0 && params["brandId"] != 0) {
          this.GetCarDetailsByBrandIdAndColorId(params["brandId"], params["colorId"])
        }
        else if (params["colorId"] != 0) {
          this.getCarDetailsByColorId(params["colorId"])
        } else if (params["brandId"] != 0) {
          this.getCarDetailsByBrandId(params["brandId"])
        } else {
          this.getCarDetails()
        }
      }

    })

  }

  getCarDetails() {

    this.carService.getCarDetails().subscribe(response => {
      this.carDetails = response.data
      this.carDetailsLoaded = true
      this.carDetails.forEach(car => {
        this.getFirstImageById(car.id)
      });
    })
  }

  getCarDetailsByColorId(colorId: number) {
    this.carService.GetCarDetailsByColorId(colorId).subscribe(response => {
      this.carDetails = response.data
      this.toastrService.success(response.message)
      this.carDetailsLoaded = true
    })
  }

  getCarDetailsByBrandId(brandId: number) {
    this.carService.GetCarDetailsByBrandId(brandId).subscribe(response => {
      this.carDetails = response.data
      this.toastrService.success(response.message)
      this.carDetailsLoaded = true
    })
  }

  GetCarDetailsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService.GetCarDetailsByBrandIdAndColorId(brandId, colorId).subscribe(response => {
      this.carDetails = response.data
      this.toastrService.success(response.message)
      this.carDetailsLoaded = true
    })
  }

  GetAllBrands() {
    return this.brandService.getAll().subscribe(response => {
      this.brands = response.data
    })
  }

  GetAllColors() {
    return this.colorService.getAll().subscribe(response => {
      this.colors = response.data
    })
  }

  getFirstImageById(id: number) {
    return this.carImageService.getFirstImageById(id).subscribe({
      next: response => {
        this.carImages.set(id, response.data)
      },
      error: errorResponse => { console.log(errorResponse) }
    })
  }

  getCarImage(id: number) {
    let imageByteArray = this.carImages.get(id)
    if (imageByteArray) {
      return 'data:image/png;base64,' + this.carImages.get(id)!
    }
    return ''
  }
}