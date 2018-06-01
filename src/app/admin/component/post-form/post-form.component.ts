import { AuthService } from './../../../shared/services/auth.service';
import { CategoryService } from './../../../shared/services/category.service';
import { Post } from './../../../shared/models/post';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from './../../../shared/services/post.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ReplaceWithDashPipe } from '../../../shared/pipes/replace-with-dash.pipe';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  post: Post;
  postId: string;
  status: string;
  toast = {};
  user;
  category;
  form: FormGroup;
  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.user = this.auth.user;
    this.renderer.addClass(document.body, 'body-white');
    this.createForm();
  }

  keyupHandlerFunction($event) {
    this.form.controls['description'].setValue($event);
  }

  private createForm() {
    this.form = this.fb.group({
      title: ['', [
        Validators.required]
      ],
      description: ['', [
        Validators.required]],
      image: [''],
      category: ['Uncategorized'],
      tags: [[]]
    });
  }

  private formatTags(tags, save?) {
    let arr = [];

    if (save) {
      arr = Array.from(tags, val => {
        return {'text': val};
      });
    } else {
      arr = Array.from(tags, (o: any) => o.text);
    }

    return arr;
  }

  private formatFormData(status) {
    this.form.value['status'] = status;
    const data = Object.assign({}, this.form.value);

    if (this.form.value.tags) {
      data.tags = this.formatTags(this.form.value.tags, true);
    }  
    
    return data;
  }

  private preview(data: Post) {
    const title = new ReplaceWithDashPipe().transform(this.form.value.title);
    this.router.navigate(['/post/' + data._id + '/' + title], {
      queryParams: {
        status: data.status.toLowerCase(),
        preview: true
      }
    });
  }

  private errorToast() {
    this.toast  = {
      classes: 'toast-error',
      message: ':( OOPS something went wrong while saving post.'
    };
  }

  private save(data) {
    this.postService.create(data).subscribe((post: Post) => {
      this.preview(post);
    }, (error) => {
      this.errorToast();
    });
  }

  private update(data) {
    this.postService.update(this.postId, data).subscribe(() => {
      this.preview(this.post);
    }, (error) => {
      this.errorToast();
    });
  }

  submit($event?) {
    const status = $event || this.post.status;
    const data = this.formatFormData(status);

    if (this.postId) {
      this.update(data);
    } else {
      this.save(data);
    }

  }

  get title() {
    return this.form.get('title');
  }

  get image() {
    return this.form.get('image');
  }

  get description() {
    return this.form.get('description');
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');

    this.categoryService.getAll().subscribe((category) => {
      this.category = category;
    }, (error) => {

    });
    if (this.postId) {
      this.status = this.route.snapshot.queryParamMap.get('status');
      this.postService.getByIdWithAuth(this.postId, {
        status: this.status
      }).subscribe(post => {
        this.post = post[0];
        this.form.setValue({
          title: this.post.title,
          description: this.post.description,
          image: this.post.image,
          category: this.post.category.toString(),
          tags: this.formatTags(this.post.tags)
        });
      }, error => {

      });
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'body-white');
  }
}
