import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendaCompleta } from '../models/venda';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http: HttpClient) { }

  finalizarVenda(venda: VendaCompleta) {
    return this.http.post<VendaCompleta>(`${API_CONFIG.baseUrl}/api/vendas`, venda);
  }
}
