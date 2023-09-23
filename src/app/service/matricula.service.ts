import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Aluno} from "../interface/Aluno";
import {Observable} from "rxjs";
import {Matricula} from "../interface/Matricula";

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private readonly API = "http://localhost:4848/matricula";

  constructor(private http: HttpClient) {
  }

  listar(filtroNome: string | null): Observable<Aluno[]> {
    const options = {
      headers: this.getDeafultHeader(),
      params: new HttpParams()
    };
    if (filtroNome) {
      options.params = options.params.set('q', filtroNome);
    }
    return this.http.get<Aluno[]>(this.API.concat("/buscar"), options);
  }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.API, aluno, {headers: this.getDeafultHeader()});
  }

  excluir(id: number): Observable<Aluno> {
    const url = this.API.concat("/").concat(id.toString());
    return this.http.delete<Aluno>(url, {headers: this.getDeafultHeader()});
  }

  editar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(this.API, aluno, {headers: this.getDeafultHeader()});
  }

  buscarPorId(codigo: number): Observable<Matricula> {
    const url = this.API.concat("/").concat(codigo.toString());
    return this.http.get<Matricula>(url, {headers: this.getDeafultHeader()});
  }

  buscarMatriculasPorAluno(codigo: number): Observable<Matricula[]> {
    const url = this.API.concat("/buscarPorAluno/").concat(codigo.toString());
    return this.http.get<Matricula[]>(url, {headers: this.getDeafultHeader()});
  }

  private getDeafultHeader() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(atob(<string>localStorage.getItem('token')))
    });
    return reqHeader;
  }
}
