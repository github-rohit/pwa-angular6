import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ComparePasswordValidation } from './../../validation/compare-password.validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  success = false;
  error = false;
  form: FormGroup;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  submit() {
    
    if (!this.form.valid) {
      return;
    }

    this.subscription = this.http.post('/api/forgotpassword', this.form.value).subscribe(() => {
      this.success = true;
    }, error => {
      this.error = true;
    });
  }

  get email() {
    return this.form.get('email');
  }
  
  ngOnInit() {
    this.renderer.addClass(document.body, 'body-img');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.renderer.removeClass(document.body, 'body-img');
  }  

}
