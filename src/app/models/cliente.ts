import { Endereco } from "./endereco";

export interface Usuario {
  id?: any;
  nome: string;
  endereco: Endereco;
  email: string;
  senha: string;
}
