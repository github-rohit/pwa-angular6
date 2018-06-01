import { Directive, ElementRef, HostListener, AfterContentInit  } from '@angular/core';

@Directive({
  selector: '[autoResizeTextarea]'
})
export class AutoResizeTextareaDirective implements AfterContentInit {
  event: KeyboardEvent;
  constructor(private el: ElementRef) { }

  ngAfterContentInit() {
    this.setHeightToScrollHeight();
  }

  @HostListener('keydown.enter') onKeydownEnter() {
    event.preventDefault();
  }

  @HostListener('keyup') onKeyup() {
    this.setHeightToScrollHeight();
  }

  setHeight(height) {
    this.el.nativeElement.style.height = height + 'px';
  }

  setHeightToScrollHeight() {
    this.setHeight(0);
    const height = this.el.nativeElement.scrollHeight;
    this.setHeight(height);

  }
}
