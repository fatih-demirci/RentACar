import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerDto } from '../models/customerDto';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl: string = "https://localhost:44307/"

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + "api/Customers/GetAll")
  }

  getCustomerDtoByUserId(userId: number) {
    return this.httpClient.get<EntityResponseModel<CustomerDto>>(this.apiUrl + "api/Customers/GetCustomerDtoByUserId?userId=" + userId)
  }
}
