import { AuthService } from './../../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { async } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../../shared/component/toast/toast.component';

@Component({
  selector: 'profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.css']
})
export class ProfileUpdateFormComponent implements OnInit {
  toast = {};
  userId: string;
  user;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.userId = auth.user._id;
  }

  submit() {
    this.userService.update(this.userId, this.form.value).subscribe(user => {
      this.toast = {
        classes: 'toast-success',
        message: 'Your profile has been updated successfully.'
      };
    }, error => {
      this.toast = {
        classes: 'toast-error',
        message: ':( OOPS something went wrong while updating your profile.'
      };
    });
  }

  async ngOnInit() {

    await this.userService.getById(this.userId).subscribe(user => {
      this.user = user[0];
      this.setFormValue();
    });
  }

  setFormValue() {

    this.form = this.fb.group({
      profileImage: [this.user.profileImage],
      aboutme: [this.user.aboutme],
      website: [this.user.website],
      gender: [this.user.gender],
      location: [this.user.location],
      facebook: [this.user.facebook],
      twitter: [this.user.twitter],
      google_plus: [this.user.google_plus],
      linkedIn: [this.user.linkedIn],
      instagram: [this.user.instagram],
      tumblr: [this.user.tumblr],
      pinterest: [this.user.pinterest]
    });

    console.log(this.form)

  }

}
