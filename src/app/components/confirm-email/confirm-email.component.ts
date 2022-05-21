import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailConfirmationService } from 'src/app/services/mail-confirmation.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmMailForm: FormGroup = this.formBuilder.group({})

  constructor(private mailConfirmationService: MailConfirmationService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createConfirmMailForm()
  }

  createConfirmMailForm() {
    this.confirmMailForm = this.formBuilder.group({
      confirmationNumber: ["", [Validators.required]]
    })
  }

  sendConfirmationMail() {
    this.mailConfirmationService.sendConfirmationMail().subscribe({
      next: response => {
        this.toastrService.success(response.message, "Başarılı")
        console.log(response)
      },
      error: errorResponse => {
        this.toastrService.error(errorResponse.error.message, "Hata")
        console.log(errorResponse)
      }
    })
  }

  confirmMail() {
    let number = this.confirmMailForm.value["confirmationNumber"]
    this.mailConfirmationService.confirmMail(number).subscribe({
      next: response => {
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["/"])
      },
      error: errorResponse => {
        this.toastrService.error(errorResponse.error.message, "Hata")
      }
    })
  }

}
