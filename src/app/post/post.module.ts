import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './component/post/post.component';
import { PostSingleComponent } from './component/post-single/post-single.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: 'post/:id/:title',
      component: PostSingleComponent
    }])
  ],
  declarations: [
    PostComponent,
    PostSingleComponent
  ],
  exports: [
    PostComponent
  ],
  providers: []
})
export class PostModule { }
