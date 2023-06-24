import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { ItemVenda } from 'src/app/models/itemVenda';
import { VendaCompleta } from 'src/app/models/venda';
import { VendaService } from 'src/app/service/venda.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  produtos?: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private vendaSerive: VendaService
  ) { }

  ngOnInit() {
    this.produtoService.findAll().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  addToCart(produto: Produto) {
    this.carrinhoService.adicionarItem(produto, 1);
  }

  increaseQuantity(produto: Produto) {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(produto.id);
    if (itemNoCarrinho) {
      itemNoCarrinho.quantidade++;
    }
  }

  decreaseQuantity(produto: Produto) {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(produto.id);
    if (itemNoCarrinho && itemNoCarrinho.quantidade > 0) {
      itemNoCarrinho.quantidade--;
    }
  }

  getQuantidade(idProduto: number): number {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(idProduto);
    return itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
  }

  getCarrinhoQuantity(): number {
    const itensVenda: ItemVenda[] = this.carrinhoService.getItensVenda();
    let somaQuantidade = 0;

    for (const item of itensVenda) {
      somaQuantidade += item.quantidade;
    }

    return somaQuantidade;
  }

  submitVenda() {
    const vendaCompleta: VendaCompleta = this.carrinhoService.getVendaCompleta();
    this.vendaSerive.finalizarVenda(vendaCompleta).subscribe(
      (venda: VendaCompleta) => {
        console.log('Venda finalizada:', venda);
        this.carrinhoService.limparCarrinho();
      },
      (error) => {
        console.log(vendaCompleta)
        console.error('Erro ao finalizar venda:', error);
        // Lógica para tratamento de erro, se necessário
      }
    );
  }
}
