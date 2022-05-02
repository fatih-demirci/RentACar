import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { PaymentInformation } from 'src/app/models/paymentInformation';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentalDetails: RentalDetailDto[] = []
  @Input() carDetailDto: CarDetailDto = { dailyPrice: 0, id: 0, brandName: "", carDescription: "", colorName: "", modelYear: 0 }

  rentResult:ResponseModel={message:"",success:false}
  rentalClicked = false
  paymentInformation  = {
    creditCardNumber: "",
    cvv: "",
    expiryDate: "",
    name: "",
    total: 0,
    rentDay:1,
    rentDate:"01/01/0001"
  }
  rentalAddForm: FormGroup  = this.formBuilder.group({})

  constructor(private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getRentalDetails();
    this.createRentalAddForm();
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      rentDay:["",Validators.required],
      creditCardNumber:["",Validators.required],
      cvv:["",Validators.required],
      expiryDate:["",Validators.required],
      name:["",Validators.required],
      rentDate:["01/01/0001",Validators.required]
    })
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe(response => {
      this.rentalDetails = response.data
    })
  }

  calculateTotal() {
    this.paymentInformation = Object.assign({},this.rentalAddForm.value)
    this.paymentInformation.total = this.paymentInformation.rentDay * this.carDetailDto.dailyPrice
    console.log(this.paymentInformation)
    console.log(this.carDetailDto)
    console.log(this.paymentInformation.total)
  }

  rentCar() {
    this.calculateTotal()
    this.rentalClicked=true
    this.rentalService.add(this.carDetailDto.id, 1002,this.paymentInformation.rentDate,this.paymentInformation).subscribe({
      next: response=>{
      this.rentResult = response
      this.toastrService.success(this.rentResult.message,"Kiralama başarılı")
      },
      error: errorResponse=>{
        this.rentResult.message = errorResponse.error.message
        this.toastrService.error(this.rentResult.message,"Kiralama başarısız")
        console.log(this.paymentInformation)
      }
    })
    
  }

}
