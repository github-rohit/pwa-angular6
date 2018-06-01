import { Subscription } from 'rxjs';
import { AuthService } from './../../../shared/services/auth.service';
import { PostService } from './../../../shared/services/post.service';
import { Post } from '../../../shared/models/post';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnDestroy {
  paramSubscription: Subscription;
  postSubscription: Subscription;
  isPublished = true;
  isDraft = false;
  posts: Post[];
  status;
  user;

  // MatPaginator Inputs
  norecord = false;
  length = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 100];

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService) {
    this.posts = [];
    this.user = this.auth.user;
    this.paramSubscription = this.activatedRoute.queryParamMap.subscribe((qry: any) => {
      this.status = qry.get('status');
      this.getPosts(qry.params);
      this.activelink();
    });
  }

  getPosts(qry) {
    const query = Object.create(qry);
    query.created_by = this.user._id;

    this.postSubscription = this.postService.getPostByQuery(query).subscribe(res => {
      this.posts = res.posts;
      this.length = res.total;
      this.norecord = !res.total;
      window.scrollTo(0, 0);
    });
  }

  activelink() {
    if (this.status === 'draft') {
      this.isDraft = true;
      this.isPublished = false;
    } else {
      this.isDraft = false;
      this.isPublished = true;
    }
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
  }
}
