import { AuthService } from './../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  userId: string;
  user;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService) {

    this.userService.getById(this.auth.user._id).subscribe((user) => {
      this.user = user[0];
    }, error => {

    });
  }

  ngOnInit() { }

}
