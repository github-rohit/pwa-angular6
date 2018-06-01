import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'toast-message',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input('toast') toast: any;

  constructor() { }

  close() {
    this.toast = {};
  }

}
