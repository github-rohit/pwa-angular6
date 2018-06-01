import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'email-verifier',
  templateUrl: './email-verifier.component.html',
  styleUrls: ['./email-verifier.component.css']
})
export class EmailVerifierComponent implements OnInit, OnDestroy {
  error;
  subscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { 
    this.renderer.addClass(document.body, 'body-verification');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscription = this.http.post('api/verification', {
      id: id
    }).subscribe(() => {
      this.router.navigate(['/login']);
    }, error => {
      this.error = true;
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'body-verification');
    this.subscription.unsubscribe();
  }
}
