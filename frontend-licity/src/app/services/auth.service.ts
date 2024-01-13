import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'access_token';
  private roleKey = 'XTeXJ/HaN3rvvr8W';
  private idKey = '/X6FIXmxLUAWvRQy';
  private isAuthenticated = false;
  private userRole: string | null = null;
  private userId: string | null = null;

  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem(this.tokenKey);
    this.userRole = localStorage.getItem(this.roleKey) ?? null;
    this.userId = localStorage.getItem(this.idKey) ?? null;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  getUserId(): string | null {
    return this.userId;
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, body).pipe(
      map((response) => {
        if (response && response.access_token) {
          const tokenPayload = this.decodeToken(response.access_token);
          this.userId = response.user._id;
          this.userRole = tokenPayload.role;
          this.setAccessToken(response.access_token);
        }
        return response;
      }),
    );
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  setAccessToken(token: string): void {
    this.isAuthenticated = true;
    localStorage.setItem(this.tokenKey, token);
    this.updateUserData(token);
  }

  private updateUserData(token: string): void {
    const tokenPayload = this.decodeToken(token);
    this.userRole = tokenPayload.role ?? null;
    localStorage.setItem(this.roleKey, this.userRole ?? '');
    localStorage.setItem(this.idKey, this.userId ?? '');
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    this.isAuthenticated = true;
    return !!this.getAccessToken();
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userRole = null;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.idKey);
  }
}
