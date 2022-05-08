import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NaviComponent } from '../navi/navi.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({})

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe({
        next: response => {
          this.localStorageService.setItem("token", response.data)
          window.location.reload()
        },
        error: responseError => {
          console.log(responseError)
          this.toastrService.error(responseError.error, "Hata")
        }
      })
    }
  }
}
