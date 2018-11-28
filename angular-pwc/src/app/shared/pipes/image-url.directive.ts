import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlDirective implements PipeTransform {

  constructor() { }

  transform(value: any, ...args: any[]): any {
    console.log('transform image url', value, args);
    return 'magic_' + value;
  }

}
