import {Component} from '@angular/core';
import {Empresa} from "../../interface/Empresa";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Route, Router} from "@angular/router";
import {EmpresaService} from "../../service/empresa.service";

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent {

  listaEmpresas: Empresa[] = [];
  formFiltro!: FormGroup;

  constructor(private service: EmpresaService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formFiltro = this.formBuilder.group({
      busca: [""]
    })
    this.listar();
  }

  public listar() {
    const nomeFiltro = this.formFiltro?.get('busca')?.value;
    this.service.listar(nomeFiltro).subscribe({
        next: (result) => {
          this.listaEmpresas = result;
        },
        error: (erro) => {
          this.verifyErro(erro);
        }
      }
    );
  }

  public confirmacaoExcluir(empresa: Empresa) {
    if (empresa.codigo) {
      if (confirm("Deseja realmente excluir?")) {
        this.service.excluir(empresa.codigo).subscribe({
          next: () => {
            this.listar();
          },
          error: (erro) => {
            alert("Não foi possivel excluir. Possíveis causas: Contém registros dependentes ou sessão expirada.")
          }
        });
      }
    }
  }

  public verifyErro(erro: any) {
    if (erro.status === 401 || erro.status === 403) {
      alert("Sessão expirada. Por favor, faça o login novamente.")
      this.router.navigate(['/login'])
    }
  }

}
