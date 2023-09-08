import {Profissional} from "./Profissional";

export interface Empresa {
  codigo?: number
  nome: string
  endereco: string
  telefone: string
  bairro:string
  cidade: string
  uf: string
  responsavel: Profissional
  data_inicio: string
}
