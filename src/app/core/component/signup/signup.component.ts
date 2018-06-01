import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../shared/services/data.service';
import { ComparePasswordValidation } from './../../validation/compare-password.validation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  success = false;
  hide = true;
  form: FormGroup;
  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = fb.group({
      email: ['', [
        Validators.required,
        Validators.email]],
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      passwd: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      passwd_again: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    }, {
      validator: ComparePasswordValidation.MatchPassword
    });
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    this.subscription = this.http.post('/api/signup', this.form.value).subscribe(() => {
      this.success = true;
    }, (error: Response) => {
      if (error.status === 400) {
        this.form.controls['email'].setErrors(error.json());
      } else {
        throw error;
      }
    });
  }

  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('passwd');
  }

  get passwordAgain() {
    return this.form.get('passwd_again');
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
