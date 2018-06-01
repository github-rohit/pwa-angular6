import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[imageToBase64]'
})
export class ImageToBase64Directive {
  el;
  @Input() imageToBase64: any;

  constructor(
    private elementRef: ElementRef
  ) { 
    this.el = elementRef.nativeElement;
  }

  @HostListener('change') change() {
    this.convert();
  }

  convert() {
    const file = this.el.files[0];
    const reader = new FileReader();

    reader.onloadend = () =>  {
      if (file.size > 500000) {
        this.el.value = '';
        alert('File size must be less than .5MB');
      } else {
        this.imageToBase64.setValue(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }


}
