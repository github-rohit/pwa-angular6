import { Subscription } from 'rxjs';
import { AuthService } from './../../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  returnUrl;
  hide = true;
  form: FormGroup;
  constructor(
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    this.form = fb.group({
      email: ['', [
        Validators.required,
        Validators.email]],
        passwd: ['', [
        Validators.required
      ]]
    });
  }

  routeToAdmin() {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.router.navigate(['/admin/myposts'], {
        queryParams: {
          status: 'published' 
        }
      });      
    }
  }

  submit() {
    
    if (!this.form.valid) {
      return;
    }

    this.subscription = this.http.post('/api/login', this.form.value).subscribe((res: any) => {
      this.authService.token = res.token;
      this.routeToAdmin();
    }, (res) => {
      if (res.error) {
        this.form.setErrors(res.error);
      }
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('passwd');
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
