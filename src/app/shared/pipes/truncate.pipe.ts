import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, args: string[] = []): any {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 300;
    const trail = args.length > 1 ? args[1] : '...';

    const tmp = document.createElement('div');
    tmp.innerHTML = value;
    value = tmp.innerText;

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
