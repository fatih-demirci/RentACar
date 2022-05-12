import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CreditCard } from 'src/app/models/creditCard';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentalDetails: RentalDetailDto[] = []
  @Input() carDetailDto: CarDetailDto = { dailyPrice: 0, id: 0, brandName: "", carDescription: "", colorName: "", modelYear: 0 }

  rentResult: ResponseModel = { message: "", success: false }
  rentalClicked = false
  paymentInformation = {
    creditCardNumber: "",
    cvv: "",
    expiryDate: "",
    name: "",
    total: 0,
    rentDay: 1,
    rentDate: "01/01/0001"
  }
  creditCard: CreditCard = { creditCardNumber: "", cvv: "", expiryDate: "", id: 0, name: "" }
  rentalAddForm: FormGroup = this.formBuilder.group({})
  saveCreditCard: boolean = false
  date: Date = new Date()

  constructor(private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    this.getRentalDetails()
    this.createRentalAddForm()
    this.getCreditCard()
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDay: ["", Validators.required],
      creditCardNumber: [this.creditCard.creditCardNumber, Validators.required],
      cvv: [this.creditCard.cvv, Validators.required],
      expiryDate: [this.creditCard.expiryDate, Validators.required],
      name: [this.creditCard.name, Validators.required],
      rentDate: [this.getDateNow(), Validators.required],
      saveCreditCard: [false, Validators.required]
    })
  }

  getCreditCard() {
    this.creditCardService.getByUserId().subscribe({
      next: response => {
        if (response.success) {
          this.creditCard = response.data
          this.createRentalAddForm()
        }
      },
      error: errorResponse => {

      }
    })
  }

  addCreditCard(creditCard: CreditCard) {
    this.creditCardService.add(creditCard).subscribe({
      next: response => {
        if (response.success) {
          this.toastrService.success(response.message, "Başarılı")
        }
      },
      error: errorResponse => {
        console.log(errorResponse)
      }
    })
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe(response => {
      this.rentalDetails = response.data
    })
  }

  calculateTotal() {
    this.paymentInformation = Object.assign({}, this.rentalAddForm.value)
    this.paymentInformation.total = this.paymentInformation.rentDay * this.carDetailDto.dailyPrice
    console.log(this.paymentInformation)
    console.log(this.carDetailDto)
    console.log(this.paymentInformation.total)
  }

  rentCar() {
    this.calculateTotal()
    this.rentalClicked = true

    this.rentalService.add(this.carDetailDto.id, 0, this.paymentInformation.rentDate, this.paymentInformation).subscribe({
      next: response => {
        this.rentResult = response
        this.toastrService.success(this.rentResult.message, "Kiralama başarılı")
        let newCreditCard: CreditCard = { creditCardNumber: this.paymentInformation.creditCardNumber, cvv: this.paymentInformation.cvv, expiryDate: this.paymentInformation.expiryDate, name: this.paymentInformation.name, id: 0 }
        this.addCreditCard(newCreditCard)
      },
      error: errorResponse => {
        this.rentResult.message = errorResponse.error.message
        this.toastrService.error(this.rentResult.message, "Kiralama başarısız")
        if (errorResponse.error.Message) {
          this.toastrService.error("Yetki yok", "Hata")
        }
        console.log(errorResponse)
      }
    })

  }

  getDateNow() {
    let month = (this.date.getMonth() + 1).toString()
    let day = (this.date.getDate()).toString()
    if (month.length <= 1) {
      month = "0" + month
    }
    if (day.length <= 1) {
      day = "0" + day
    }
    return this.date.getFullYear() + "-" + (month) + "-" + (day)
  }

}
