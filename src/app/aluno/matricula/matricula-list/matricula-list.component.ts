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
  codigoAluno?: string;

  constructor(private service: MatriculaService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //editando: o form serve para inserir e editar, se vir o codigo na URL então vamos editar
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.codigoAluno = codigo;
      this.buscarPorId(Number(codigo));
    }
    //fim editando
  }

  buscarPorId(codigo: number) {
    this.service.buscarPorId(codigo).subscribe({
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
}
