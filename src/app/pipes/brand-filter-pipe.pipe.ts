import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'brandFilterPipe'
})
export class BrandFilterPipePipe implements PipeTransform {

  transform(value: CarDetailDto[], brandFilterText: string): CarDetailDto[] {
    brandFilterText = brandFilterText ? brandFilterText.toLocaleLowerCase() : ""
    return brandFilterText ? value.filter((cd:CarDetailDto)=>
      cd.brandName.toLocaleLowerCase().indexOf(brandFilterText)!==-1
    ) : value
  }

}
