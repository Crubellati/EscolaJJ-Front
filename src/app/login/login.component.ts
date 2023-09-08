import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  formulario!: FormGroup;

  private readonly API = "http://localhost:4848/login";
  public showUsuarioNotFound: boolean = false;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      login: [""],
      senha: [""]
    })
  }

  entrar() {
    this.httpClient.post<any>(this.API, this.formulario.value)
      .subscribe({
        next: (resposta) => {
          localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
          localStorage.setItem('nomeProfissional', btoa(JSON.stringify(resposta['nomeProfissional'])));
          this.router.navigate(['/principal']);
        },
        error: (erro) => {
          alert("Usuário não encontrado");
          this.showUsuarioNotFound = true;
        }
      });
  }

  obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(<string>localStorage.getItem('token')))
      : null;
  }
}
