import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl:string = "https://localhost:44307/"

  constructor(private httpClient:HttpClient) { }

  getAll(){
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"api/Brands/GetAll")
  }
}
