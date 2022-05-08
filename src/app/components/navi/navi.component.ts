import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerDto } from 'src/app/models/customerDto';
import { UserDto } from 'src/app/models/userDto';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthorizedAdmin: boolean = false
  isAuthenticated: boolean = false
  isCustomer: boolean = false
  isUser: boolean = false
  customerDto: CustomerDto = { companyName: "asdasd", customerId: 0, email: "", firstName: "", lastName: "", userId: 0 }
  userDto: UserDto = { email: "", firstName: "adsdsaadsdsds", lastName: "", userId: 0 }

  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private userService: UserService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.checkIsAuthorizedAdmin()
    this.checkIsAuthenticated()
    this.getDto()
  }

  checkIsAuthorizedAdmin() {
    this.authService.isAuthorizedAdmin().subscribe({
      next: response => {
        if (response.success) {
          this.isAuthorizedAdmin = true
        } else {
          this.isAuthorizedAdmin = false
        }
      },
      error: errorResponse => {
        this.isAuthorizedAdmin = false
      }
    })
  }

  checkIsAuthenticated() {

    if (this.localStorageService.getItem("token") != null) {
      this.authService.isAuthenticated().subscribe({
        next: response => {
          if (response.success) {
            this.isAuthenticated = true
          } else {
            this.isAuthenticated = false
            this.authService.logout()
          }
        },
        error: errorResponse => {
          this.isAuthenticated = false
          this.authService.logout()
        }
      })
    } else {
      this.isAuthenticated = false
    }
  }

  logout() {
    this.authService.logout()
  }

  getDto() {
    this.customerService.getCustomerDtoByUserId(0).subscribe({
      next: response => {
        if (response.success) {
          this.customerDto = response.data
          this.isCustomer = true
          this.isUser = false
        }
      },
      error: errorResponse => {
        this.userService.getUserDtoByUserId(0).subscribe({
          next: response => {
            if (response.success) {
              this.userDto = response.data
              this.isCustomer = false
              this.isUser = true
            }
          },
          error: errorResponse => {

          }
        })
      }
    }
    )
  }
}
