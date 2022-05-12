import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCard } from '../models/creditCard';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private apiUrl: string = "https://localhost:44307/"

  constructor(private httpClient: HttpClient) { }

  getByUserId() {
    return this.httpClient.get<EntityResponseModel<CreditCard>>(this.apiUrl + "api/CreditCards/GetByUserId?userId=0")
  }

  add(creditCard: CreditCard) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "api/CreditCards/Add", creditCard)
  }
}
