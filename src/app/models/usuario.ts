import { Endereco } from "./endereco";

export interface Usuario {
  id: number;
  nome: string;
  endereco: Endereco;
  email: string;
  senha: string;
}
