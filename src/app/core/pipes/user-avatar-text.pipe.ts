import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAvatarText'
})
export class UserAvatarTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let text = '';

    if (value.length) {
      const arr = value.split(' ');
      text += arr[0].charAt(0);
      text += arr.length > 1 ? arr.pop().charAt(0) : '';
    }
    return text;
  }

}
