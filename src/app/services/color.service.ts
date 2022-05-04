import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private apiUrl:string = "https://localhost:44307/"

  constructor(private httpClient:HttpClient) { }

  getAll(){
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"api/Colors/GetAll")
  }

  add(color:Color){
    console.log(color)
    return this.httpClient.post<ResponseModel>(this.apiUrl+"api/Colors/Add",color)
  }

  updateColor(color:Color){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"api/Colors/Update",color)
  }
}
