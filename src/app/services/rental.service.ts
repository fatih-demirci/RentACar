import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44307/"
  constructor(private httpClient:HttpClient) { }

  GetRentalDetails(){
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl+"api/Rentals/GetRentalDetails")
  }
}
