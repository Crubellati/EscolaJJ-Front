import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Empresa} from "../interface/Empresa";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = "http://localhost:4848/empresa";

  constructor(private http: HttpClient) {
  }

  listar(filtroNome: string | null): Observable<Empresa[]> {
    const options = {
      headers: this.getDeafultHeader(),
      params: new HttpParams()
    };
    if (filtroNome) {
      options.params = options.params.set('q', filtroNome);
    }
    return this.http.get<Empresa[]>(this.API.concat("/buscar"), options);
  }

  criar(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.API, empresa, {headers: this.getDeafultHeader()});
  }

  excluir(id: number): Observable<Empresa> {
    const url = this.API.concat("/").concat(id.toString());
    return this.http.delete<Empresa>(url, {headers: this.getDeafultHeader()});
  }

  editar(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(this.API, empresa, {headers: this.getDeafultHeader()});
  }

  buscarPorId(codigo: number): Observable<Empresa> {
    // Passando parametros nas requisições
    // let params = new HttpParams().set("",codigo.toString());
    const url = this.API.concat("/").concat(codigo.toString());
    return this.http.get<Empresa>(url, {headers: this.getDeafultHeader()});
  }

  private getDeafultHeader() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(atob(<string>localStorage.getItem('token')))
    });
    return reqHeader;
  }
}
