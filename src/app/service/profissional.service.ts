import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Aluno} from "../interface/Aluno";
import {Profissional} from "../interface/Profissional";

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  private readonly API = "http://localhost:4848/profissional";

  constructor(private http: HttpClient) {
  }

  listar(filtroNome: string | null): Observable<Profissional[]> {
    const options = {
      headers: this.getDeafultHeader(),
      params: new HttpParams()
    };
    if (filtroNome) {
      options.params = options.params.set('q', filtroNome);
    }
    let x =  this.http.get<Profissional[]>(this.API.concat("/buscar"), options);
    return x;
  }

  criar(profissional: Profissional): Observable<Aluno> {
    return this.http.post<Aluno>(this.API, profissional, {headers: this.getDeafultHeader()});
  }

  excluir(id: number): Observable<Aluno> {
    const url = this.API.concat("/").concat(id.toString());
    return this.http.delete<Aluno>(url, {headers: this.getDeafultHeader()});
  }

  editar(profissional: Profissional): Observable<Profissional> {
    return this.http.put<Profissional>(this.API, profissional, {headers: this.getDeafultHeader()});
  }

  buscarPorId(codigo: number): Observable<Profissional> {
    const url = this.API.concat("/").concat(codigo.toString());
    return this.http.get<Profissional>(url, {headers: this.getDeafultHeader()});
  }

  private getDeafultHeader() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(atob(<string>localStorage.getItem('token')))
    });
    return reqHeader;
  }

  buscarPorNome(nome: string): Observable<Profissional[]> {
    const params = new HttpParams().set('nome', nome); // Supondo que o nome seja passado como parâmetro de consulta
    return this.http.get<Profissional[]>('/buscar', { params });
  }
}
