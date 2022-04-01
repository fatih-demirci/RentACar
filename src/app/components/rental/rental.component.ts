import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentalDetails:RentalDetailDto[]=[]

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.GetRentalDetails();
  }

  GetRentalDetails(){
    this.rentalService.GetRentalDetails().subscribe(response=>{
      this.rentalDetails = response.data
    })
  }

}
