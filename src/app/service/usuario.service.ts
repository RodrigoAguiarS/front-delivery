import { Usuario } from './../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_CONFIG.baseUrl}/api/auth/criar`, usuario);
  }

  recuperarSenha(email: string): Observable<string> {
    const request: Email = { email: email };
    return this.http.post<string>(`${API_CONFIG.baseUrl}/reset-password`, request);
  }
}
