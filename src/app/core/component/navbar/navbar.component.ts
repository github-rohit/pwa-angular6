import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScroll = false;
  showMenu = false;
  isLoggedIn;
  user;
  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private router: Router) { }

  logout() {
    this.http.post('/api/logout', {}).subscribe(() => {
      this.isLoggedIn = false;
      this.user = false;
      this.auth.logout();
      this.router.navigateByUrl('/login');
    }, error => {

    });
  }

  toggleMenu($event) {
    this.showMenu = !this.showMenu;
  }

  closeMenu($event) {
    this.showMenu = false;
  }

  @HostListener('window:scroll') onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  afterLogin() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.user = this.isLoggedIn ? this.auth.user : {};
  }

  ngOnInit() {
    this.afterLogin();
  }

}
