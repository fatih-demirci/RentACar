import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EntityResponseModel } from '../models/entityResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterForCustomerModel } from '../models/registerForCustomerModel';
import { ResponseModel } from '../models/responseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = "https://localhost:44307/"

  constructor(private httpClient: HttpClient,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<EntityResponseModel<TokenModel>>(this.apiUrl + "api/Auth/login", loginModel)
  }

  registerForCustomer(registerForCustomerModel: RegisterForCustomerModel) {
    return this.httpClient.post<TokenModel>(this.apiUrl + "api/Auth/RegisterForCustomer", registerForCustomerModel)
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.httpClient.get<ResponseModel>(this.apiUrl + "api/Auth/ChangePassword?oldPassword=" + oldPassword + "&newPassword=" + newPassword)
  }

  haveToken() {
    let errorResponseModel: ResponseModel
    if (this.localStorageService.getItem("token")) {
      return errorResponseModel = { message: "Giriş yapılı", success: true }
    }
    return errorResponseModel = { message: "Giriş yapınız", success: false }
  }

  private isAuthorized(claim: string) {
    return this.httpClient.get<ResponseModel>(this.apiUrl + "api/Auth/IsAuthorized" + claim)

  }

  isAuthorizedAdmin() {
    return this.isAuthorized("Admin")
  }

  isAuthorizedUser() {
    return this.isAuthorized("User")
  }

  isAuthenticated() {
    return this.httpClient.get<ResponseModel>(this.apiUrl + "api/Auth/IsAuthenticated")
  }

  logout() {
    this.localStorageService.removeItem("token")
    window.location.reload()
    this.toastrService.success("Çıkış yapıldı", "Başarılı")
  }
}