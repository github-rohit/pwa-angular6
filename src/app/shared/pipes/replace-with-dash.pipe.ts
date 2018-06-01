import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWithDash'
})
export class ReplaceWithDashPipe implements PipeTransform {

  transform(value: any, args: string[] = []): any {
    return value.length ? value.replace(/ /g, '-') : '';
  }

}
