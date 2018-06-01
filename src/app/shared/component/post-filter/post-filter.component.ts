import { CategoryService } from './../../services/category.service';
import { Category } from './../../models/category';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.scss']
})
export class PostFilterComponent implements OnInit, OnDestroy {
  @Input('selectedCategory') selectedCategory: string;
  @Input('search-query') query: string;

  qrerySubscription: Subscription;
  subscription: Subscription;
  
  categorys: Category[];
  form;
  
  constructor(
    private catService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.form = fb.group({
      query: [this.query, [
        Validators.required
      ]]
    });    
  }

  categoryChange(value) {
    let queryParams = {};
    if (value) {
      queryParams = {
        queryParams: {
          category: value
        }
      };
    }

    this.query = '';
    this.setQuery();
    this.router.navigate(['/'], queryParams);
  }

  filter() {
    this.router.navigate(['/'], {
        queryParams: {
          query: this.form.value.query
        }
      });
  }

  setQuery() {
    this.form.controls.query.setValue(this.query);
  }

  ngOnInit() {
    this.setQuery();
    this.subscription = this.catService.getAll().subscribe((res) => {
      this.categorys = res;
    }, error => {

    });

    this.qrerySubscription = this.activatedRoute.queryParams.subscribe(qry => {
      this.selectedCategory = qry.category || '';
      this.query = qry.query || '';
      this.setQuery();
    });
  }

  ngOnDestroy() {
    this.qrerySubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

}
