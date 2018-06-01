import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { CommentService } from './../../services/comment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('post-id') postId: any;
  comments: any[] = [];
  form: FormGroup;
  toast: {};
  user;

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private commentService: CommentService) {
      this.user = this.auth.user;
  }

  login() {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.router.url
      }
    });
  }

  submit() {
    this.commentService.create(this.form.value).subscribe((comment) => {
      this.comments.push(Object.assign(comment, {author: [{name: this.user.name}]}));
      console.log(this.comments);
      this.form.controls['comment'].setValue('');
    }, error => {
      this.toast  = {
        classes: 'toast-error',
        message: ':( OOPS something went wrong while saving your comment.'
      };
    });
  }

  ngOnInit() {
    this.commentService.getById(this.postId).subscribe(comments => {
      this.comments = comments;
    });
    this.form = this.fb.group({
      postId: [this.postId],
      created_by: this.user._id,
      comment: ['', [
        Validators.required]]
    });
  }

}
