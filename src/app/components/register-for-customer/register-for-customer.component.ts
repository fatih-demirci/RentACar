import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterForCustomerModel } from 'src/app/models/registerForCustomerModel';
import { TokenModel } from 'src/app/models/tokenModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register-for-customer',
  templateUrl: './register-for-customer.component.html',
  styleUrls: ['./register-for-customer.component.css']
})
export class RegisterForCustomerComponent implements OnInit {

  registerForCustomerForm: FormGroup = this.formBuilder.group({})
  registerForCustomerModel: RegisterForCustomerModel = { companyName: "", email: "", firstName: "", lastName: "", password: "" }
  tokenModel: TokenModel = { expiration: "", token: "" }


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toatrService: ToastrService,
    private router: Router,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createRegisterForCustomerForm();
  }

  createRegisterForCustomerForm() {
    this.registerForCustomerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      companyName: ["", Validators.required],
    })
  }

  register() {
    if (this.registerForCustomerForm.valid) {
      this.registerForCustomerModel = Object.assign({}, this.registerForCustomerForm.value)
      this.authService.registerForCustomer(this.registerForCustomerModel).subscribe({
        next: response => {
          this.tokenModel = response
          this.toatrService.success("Üyelik başarılı", "Başarılı")
          this.localStorageService.setItem("token", this.tokenModel)
          this.router.navigate(["/"])
          window.location.reload()
        },
        error: errorResponse => {
          this.toatrService.error("Üyelik başarısız", "Hata")
        }
      })

    }
  }


}
