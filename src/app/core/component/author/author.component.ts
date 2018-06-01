import { PostService } from './../../../shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../admin/services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;
  userSubscription: Subscription;
  postSubscription: Subscription;

  id: string;
  norecord = false;
  user = {};
  posts;
  length;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) { }

  getUser() {
    this.userSubscription = this.userService.getById(this.id).subscribe((user) => {
      this.user = user[0];
    }, error => {

    });
  }

  getPosts(qry) {
    const query = Object.create(qry);
    query.created_by = this.id;

    this.postSubscription = this.postService.getPostByQuery(query).subscribe((res) => {
      this.posts = res.posts;
      this.length = res.total;
      this.norecord = !res.total;
      window.scrollTo(0, 0);
    }, error => {

    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.paramSubscription = this.activatedRoute.queryParamMap.subscribe((qry: any) => {
      this.getPosts(qry.params);
    });
    this.getUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
