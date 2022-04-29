import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { PaymentInformation } from '../models/paymentInformation';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44307/"
  constructor(private httpClient:HttpClient) { }

  getRentalDetails(){
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl+"api/Rentals/GetRentalDetails")
  }

  add(carId:number,customerId:number,rentDate:string,paymentInformation:PaymentInformation){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"api/Rentals/Add?CarId="+carId+"&CustomerId="+customerId+"&RentDate="+rentDate,paymentInformation)
  }


}
