import { User } from '../models/user';
import { API_CONFIG } from './../config/api.config';
import { Credenciais } from './../models/credenciais';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  private user: User = {
    name: '',
    isAdmin: false
  };

  constructor(private http: HttpClient ) {
}

verificarPerfilAdm(): Observable<boolean> {
  return this.http.get<boolean>(`${API_CONFIG.baseUrl}/api/auth/isAdm`);
}

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/api/auth`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  sucessFulLogin(authtoken: string) {
    localStorage.setItem('token', authtoken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/api/user`);
  }

  loadUser(): void {
    this.getUser().subscribe(user => {
      this.user.name = user.name;
      this.getProfiles().subscribe(profiles => {
        this.user.isAdmin = profiles.isAdmin;
      });
    });
  }

  loadPerfil(): void {
    this.getProfiles().subscribe(profiles => {
      this.user.isAdmin = profiles.isAdmin;
    })
  }

  loadName(): void {
    this.getUser().subscribe(user => {
      this.user.name = user.name;
    })
  }

  getName(): string {
    return this.user.name;
  }

  getProfiles(): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/api/auth/isAdmin`);
  }

  logout() {
    localStorage.clear();
  }
}
