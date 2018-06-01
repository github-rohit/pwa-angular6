import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../shared/services/post.service';
import { Post } from './../../../shared/models/post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnDestroy {
  postSubscription: Subscription;
  routeSubscription: Subscription;

  posts: Post[] = [];
  norecord = false;
  selectedCategory = '';
  searchQuery = '';
  // MatPaginator Inputs
  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService) {
    this.posts = [];
    this.routeSubscription = this.activatedRoute.queryParamMap.subscribe((qry: any) => {
      this.selectedCategory = qry.get('category') || '';
      this.searchQuery = qry.get('query') || '';
      this.getPosts(qry.params);
    });
  }

  getPosts(qry) {
    this.postSubscription = this.postService.getPostByQuery(qry).subscribe(res => {
      this.posts = res.posts;
      this.norecord = !res.total;
      this.length = res.total;
      window.scrollTo(0, 0);
    });
  }

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

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
  }
}
