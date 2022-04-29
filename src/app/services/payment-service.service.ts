import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentInformation } from '../models/paymentInformation';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  private apiUrl:string = "https://localhost:44307/"

  constructor(private httpClient:HttpClient) { }

  pay(paymentInformation:PaymentInformation){
    this.httpClient.post<ResponseModel>(this.apiUrl+"api/Payments/Pay",paymentInformation)
  }
}
