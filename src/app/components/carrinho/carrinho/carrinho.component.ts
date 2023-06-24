import { Component, OnInit } from '@angular/core';
import { ItemVenda } from 'src/app/models/itemVenda';
import { CarrinhoService } from 'src/app/service/carrinho.service';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  itensVenda: ItemVenda[] = [];
  valorTotal?: number;
  isDrawerOpen = false;

  constructor(public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.itensVenda = this.carrinhoService.getItensVenda();
    this.valorTotal = this.carrinhoService.getValorTotal();
  }

  removerItem(item: ItemVenda) {
    this.carrinhoService.removerItem(item.produto.id);
  }

  abrirCarrinho() {
    this.isDrawerOpen = true;
  }

  fecharCarrinho() {
    this.isDrawerOpen = false;
  }
}
