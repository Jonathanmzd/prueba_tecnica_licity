import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setAccessToken(response.access_token);
        this.router.navigate(['/crear-proyecto']);
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
      },
    );
  }
}
