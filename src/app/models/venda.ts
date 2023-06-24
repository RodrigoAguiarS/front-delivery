import { ItemVenda } from "./itemVenda";

export interface VendaCompleta {
  cliente: number;
  itensVenda: ItemVenda[];
}
