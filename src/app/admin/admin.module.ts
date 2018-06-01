import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUpdateFormComponent } from './component/profile-update-form/profile-update-form.component';
import { ProfileViewComponent } from './component/profile-view/profile-view.component';
import { PostFormComponent } from './component/post-form/post-form.component';
import { MyPostsComponent } from './component/my-posts/my-posts.component';
import { AutoResizeTextareaDirective } from './directive/auto-resize-textarea.directive';
import { UserService } from './services/user.service';
import { AuthGuard } from '../shared/services/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: 'admin/myposts',
      component: MyPostsComponent, 
      canActivate: [AuthGuard]
    }, {
      path: 'admin/post/new',
      component: PostFormComponent, 
      canActivate: [AuthGuard]
    }, {
      path: 'admin/post/:id',
      component: PostFormComponent, 
      canActivate: [AuthGuard]
    }, {
      path: 'admin/profile/update',
      component: ProfileUpdateFormComponent, 
      canActivate: [AuthGuard]
    }, {
      path: 'admin/profile',
      component: ProfileViewComponent, 
      canActivate: [AuthGuard]
    }])
  ],
  declarations: [
    ProfileUpdateFormComponent,
    ProfileViewComponent,
    PostFormComponent,
    MyPostsComponent,
    AutoResizeTextareaDirective
  ],
  exports: [],
  providers: [UserService]
})
export class AdminModule { }
