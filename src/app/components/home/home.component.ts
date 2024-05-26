import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string | null = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.username = this.authService.getUsername();
    } else {
      this.route.queryParams.subscribe((params) => {
        const code = params['code'];
        if (code !== undefined) {
          this.authService.loginWithGoogleCallback(code);
        }
      });
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
