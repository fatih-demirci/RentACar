import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'colorFilterPipe'
})
export class ColorFilterPipePipe implements PipeTransform {

  transform(value: CarDetailDto[], colorFilterText: string): CarDetailDto[] {
    colorFilterText = colorFilterText ? colorFilterText.toLocaleLowerCase() : ""
    return colorFilterText ? value.filter((cd:CarDetailDto)=>
      cd.colorName.toLocaleLowerCase().indexOf(colorFilterText)!==-1
    ) : value
  }

}
