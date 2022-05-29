import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  private apiUrl = "https://localhost:44307/api/"
  constructor(private httpClient: HttpClient) { }

  getById(id: number) {
    return this.httpClient.get<ListResponseModel<any>>(this.apiUrl + "CarImages/GetById?id=" + id)
  }

  getFirstImageById(id: number) {
    return this.httpClient.get<EntityResponseModel<Byte[]>>(this.apiUrl + "CarImages/GetFirstImageById?carId=" + id)
  }
}
