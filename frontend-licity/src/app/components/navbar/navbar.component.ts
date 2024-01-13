import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  getUserRole(): string | null {
    return this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
