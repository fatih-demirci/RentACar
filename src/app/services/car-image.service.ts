import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient:HttpClient) { }

  getById(id:number){
    return this.httpClient.get<ListResponseModel<any>>("https://localhost:44307/api/CarImages/GetById?id="+id)
  }
}
