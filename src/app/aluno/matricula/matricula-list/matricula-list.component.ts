import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlunoService} from "../../../service/aluno.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatriculaService} from "../../../service/matricula.service";
import {Aluno} from "../../../interface/Aluno";
import {Matricula} from "../../../interface/Matricula";

@Component({
  selector: 'app-matricula-list',
  templateUrl: './matricula-list.component.html',
  styleUrls: ['./matricula-list.component.css']
})
export class MatriculaListComponent implements OnInit {

  listaMatriculas: Matricula[] = [];
  nomeAluno?: string;
  codigoAluno?: number;

  constructor(private service: MatriculaService,
              private alunoService: AlunoService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.populaLista();
  }

  private populaLista() {
    const aluno = this.route.snapshot.paramMap.get('aluno');
    if (aluno) {
      this.buscarAluno(Number(aluno));
      this.buscarMatriculasPorAluno(Number(aluno));
    }
  }

  buscarAluno(codigo: number) {
    this.alunoService.buscarPorId(codigo).subscribe((aluno) => {
      this.codigoAluno = aluno.codigo;
      this.nomeAluno = aluno.nome;
    });
  }

  buscarMatriculasPorAluno(codigo: number) {
    this.service.buscarMatriculasPorAluno(codigo).subscribe({
      next: (result) => {
        this.listaMatriculas = result;
      },
      error: (erro) => {
        this.verifyErro(erro);
      }
    });
  }

  public verifyErro(erro: any) {
    if (erro.status === 401 || erro.status === 403) {
      alert("Sessão expirada. Por favor, faça o login novamente.")
      this.router.navigate(['/login'])
    }
  }

  public confirmacaoExcluir(matricula: Matricula) {
    if (matricula.codigo) {
      if (confirm("Deseja realmente excluir?")) {
        this.service.excluir(matricula.codigo).subscribe({
          next: () => {
            this.populaLista();
          },
          error: (erro) => {
            alert("Não foi possivel excluir. Possíveis causas: Contém registros dependentes ou sessão expirada.")
          }
        });
      }
    }
  }
}
