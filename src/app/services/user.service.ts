import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityResponseModel } from '../models/entityResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:44307/"

  constructor(private httpClient: HttpClient) { }

  getUserDtoByUserId(userId: number) {
    return this.httpClient.get<EntityResponseModel<UserDto>>(this.apiUrl + "api/Users/GetUserDtoByUserId?userId=" + userId)
  }

  updateUserDto(userDto: UserDto) {
    return this.httpClient.post<EntityResponseModel<UserDto>>(this.apiUrl + "api/Users/UpdateUserDto", userDto)
  }

}
