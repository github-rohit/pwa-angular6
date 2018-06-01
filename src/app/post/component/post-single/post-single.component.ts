import { UnauthorizedError } from './../../../shared/errors/unauthorized-error';
import { AppError } from './../../../shared/errors/app-error';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from './../../../shared/services/comment.service';
import { PostService } from './../../../shared/services/post.service';
import { Http } from '@angular/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../shared/models/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.scss']
})
export class PostSingleComponent implements OnDestroy {
  subscription: Subscription;

  post: Post;
  postId: string;
  preview: string;
  status: string;

  constructor(private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.postId = this.route.snapshot.paramMap.get('id');
    this.preview = this.route.snapshot.queryParamMap.get('preview');
    this.status = this.route.snapshot.queryParamMap.get('status');

    this.getPost();

  }

  private getPost() {
    if (this.preview) {
      this.subscription = this.postService.getByIdWithAuth(this.postId, {
        status: this.status
      }).subscribe(post => {
        this.post = post[0];
      }, (error: AppError) => {
        if (error instanceof UnauthorizedError) {
          this.router.navigate(['/login'], {
            queryParams: {
                returnUrl: this.router.url
            }
        });          
        } else { 
          throw error;
        }
      });
    } else {
      this.subscription = this.postService.getById(this.postId).subscribe(post => {
        this.post = post[0];
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
