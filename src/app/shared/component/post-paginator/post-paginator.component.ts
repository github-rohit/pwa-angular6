import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-paginator',
  templateUrl: './post-paginator.component.html',
  styleUrls: ['./post-paginator.component.css']
})
export class PostPaginatorComponent implements OnInit {
  @Input('length') length: 10;
  @Input('pageSize') pageSize: 10;
  // MatPaginator Inputs

  pageSizeOptions = [10, 25, 100];

  constructor(
    private router: Router
  ) { }

  appendAQueryParam(qryObj) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: qryObj,
      queryParamsHandling: 'merge',
      preserveFragment: true 
    });
  
    this.router.navigateByUrl(urlTree); 
  }

  pageChange(event: PageEvent) {
    this.appendAQueryParam({
      pageIndex: event.pageIndex + 1,
      pageSize: event.pageSize
    });
  }

  ngOnInit() {
  }

}
