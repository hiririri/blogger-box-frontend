import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.username = this.authService.getUsername(); // Assuming you have a method to get the username
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
