import { DataService } from './services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentService } from './services/comment.service';
import { HttpModule } from '@angular/http';
import { PostService } from './services/post.service';
import { PostCardComponent } from './component/post-card/post-card.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatComponentModule } from './component/mat-component/mat-component.module';
import { PostCommentComponent } from './component/post-comment/post-comment.component';
import { TinymceEditorComponent } from './component/tinymce-editor/tinymce-editor.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CategoryComponent } from './component/category/category.component';
import { CategoryService } from './services/category.service';
import { ReplaceWithDashPipe } from './pipes/replace-with-dash.pipe';
import { UserService } from './services/user.service';
import { ToastComponent } from './component/toast/toast.component';
import { RequestInterceptor } from './services/request-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { PostFilterComponent } from './component/post-filter/post-filter.component';
import { PostPaginatorComponent } from './component/post-paginator/post-paginator.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ImageToBase64Directive } from './directive/image-to-base64.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentModule,
    HttpClientModule,
    RouterModule.forChild([])
  ],
  declarations: [
    PostCardComponent,
    PostCommentComponent,
    TinymceEditorComponent,
    TruncatePipe,
    CategoryComponent,
    ReplaceWithDashPipe,
    ToastComponent,
    PostFilterComponent,
    PostPaginatorComponent,
    NotFoundComponent,
    ImageToBase64Directive
  ],
  exports: [
    MatComponentModule,
    PostCardComponent,
    PostCommentComponent,
    TinymceEditorComponent,
    TruncatePipe,
    ReplaceWithDashPipe,
    CategoryComponent,
    ToastComponent,
    PostFilterComponent,
    PostPaginatorComponent,
    NotFoundComponent,
    ImageToBase64Directive
  ],
  providers: [
    PostService,
    CommentService,
    CategoryService,
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
  ]
})
export class SharedModule { }
