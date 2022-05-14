import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserDto } from 'src/app/models/userDto';
import { Customer } from 'src/app/models/customer'
import { UserService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-information-update',
  templateUrl: './user-information-update.component.html',
  styleUrls: ['./user-information-update.component.css']
})
export class UserInformationUpdateComponent implements OnInit {

  userUpdateForm: FormGroup = this.formBuilder.group({})
  customerUpdateForm: FormGroup = this.formBuilder.group({})
  passwordUpdateForm: FormGroup = this.formBuilder.group({})
  customer: Customer = { companyName: "", id: 0, userId: 0 }
  user: UserDto = { email: "", firstName: "", lastName: "", userId: 0 }
  isCustomer: boolean = false

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private customerService: CustomerService,
    private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserInformation()
    this.getCustomerInformation()
    this.createUserUpdateForm()
    this.createCustomerUpdateForm()
    this.createPasswordUpdateForm()
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]]
    })
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      companyName: [this.customer.companyName, [Validators.required]]
    })
  }

  createPasswordUpdateForm() {
    this.passwordUpdateForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]]
    })
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      this.user = Object.assign({ userId: this.user.userId }, this.userUpdateForm.value)
      this.userService.updateUserDto(this.user).subscribe({
        next: response => {
          this.toastrService.success(response.message, "Başarılı")
        },
        error: errorResponse => {
          console.log(errorResponse)
          this.toastrService.error(errorResponse.error.message, "Hata")
        }
      })
    }

  }

  updateCustomer() {
    if (this.customerUpdateForm.valid) {
      this.customer = Object.assign({ id: this.customer.id, userId: this.customer.userId }, this.customerUpdateForm.value)
      this.customerService.update(this.customer).subscribe({
        next: response => {
          this.toastrService.success(response.message, "Başarılı")
        },
        error: errorResponse => {
          this.toastrService.error(errorResponse.error.message, "Hata")
        }
      })
    }
  }

  updatePassword() {
    this.authService.changePassword(this.passwordUpdateForm.value.oldPassword, this.passwordUpdateForm.value.newPassword).subscribe({
      next: response => {
        this.toastrService.success(response.message, "Başarılı")
      },
      error: errorResponse => {
        this.toastrService.error(errorResponse.error.message, "Hata")
        console.log(errorResponse)
      }
    })
  }

  getUserInformation() {
    this.userService.getUserDtoByUserId(0).subscribe({
      next: response => {
        this.user = response.data
        this.createUserUpdateForm();
      },
      error: errorResponse => { console.log(errorResponse) }
    })
  }

  getCustomerInformation() {
    this.customerService.getByUserId().subscribe({
      next: response => {
        this.customer = response.data
        this.isCustomer = true
        this.createCustomerUpdateForm();
      },
      error: errorResponse => {
        this.isCustomer = false
        console.log(errorResponse)
      }
    })
  }


}
