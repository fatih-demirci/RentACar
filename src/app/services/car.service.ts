import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { EntityResponseModel } from '../models/entityResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl: string = "https://localhost:44307/"
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + "api/Cars/GetAll")
  }

  getCarDetails() {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(this.apiUrl + "api/Cars/GetCarDetails")
  }

  GetCarDetailsById(id: number) {
    return this.httpClient.get<EntityResponseModel<CarDetailDto>>(this.apiUrl + "api/Cars/GetCarDetailsById?id=" + id)
  }

  GetCarDetailsByColorId(colorId: number) {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(this.apiUrl + "api/Cars/GetCarDetailsByColorId?colorId=" + colorId)
  }

  GetCarDetailsByBrandId(brandId: number) {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(this.apiUrl + "api/Cars/GetCarDetailsByBrandId?brandId=" + brandId)
  }

  GetCarDetailsByBrandIdAndColorId(brandId: number, colorId: number) {
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(this.apiUrl + "api/Cars/GetCarDetailsByBrandIdAndColorId?brandId=" + brandId + "+&colorId=" + colorId)
  }
}

