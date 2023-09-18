import {Component, Input} from '@angular/core';
import {AlunoService} from "../../service/aluno.service";
import {Aluno} from "../../interface/Aluno";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent {

  listaAlunos: Aluno[] = [];
  formFiltro!: FormGroup;

  constructor(private service: AlunoService,
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
          this.listaAlunos = result;
          this.fillPhotos(this.listaAlunos);
        },
        error: (erro) => {
          this.verifyErro(erro);
        }
      }
    );
  }

  private fillPhotos(listaAlunos: Aluno[]) {
    listaAlunos.forEach(value => {
      if (value.foto == undefined) {
        value.foto = "../assets/sem-foto.jpg";
      } else {
        value.foto = 'data:image/png;base64,' + value.foto;
      }
    });
  }

  public confirmacaoExcluir(aluno: Aluno) {
    if (aluno.codigo) {
      if (confirm("Deseja realmente excluir?")) {
        this.service.excluir(aluno.codigo).subscribe({
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
