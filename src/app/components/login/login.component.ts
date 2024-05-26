import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  url: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService
      .getGoogleUrl()
      .subscribe((data: any) => (this.url = data.authURL));
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle(this.url);
  }
}
