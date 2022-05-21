import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MailConfirmationService {

  private apiUrl: string = "https://localhost:44307/"

  constructor(private httpClient: HttpClient) { }

  sendConfirmationMail() {
    return this.httpClient.get<ResponseModel>(this.apiUrl + "api/MailConfirmations/SendConfirmationMail")
  }

  confirmMail(number: string) {
    return this.httpClient.get<ResponseModel>(this.apiUrl + "api/MailConfirmations/ConfirmMail?number=" + number)
  }
}
