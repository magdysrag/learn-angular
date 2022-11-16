import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstPipe',
})
export class FirstPipePipe implements PipeTransform {
  transform(value: string, limit: number=20): unknown {
    if (!value) return null;
    // let actualLimit = limit ? limit : 20;
    return value.substring(0, limit) + '  ......';
  }
}
