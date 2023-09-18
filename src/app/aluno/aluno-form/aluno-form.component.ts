import {Component, Input, ViewChild} from '@angular/core';
import {AlunoService} from "../../service/aluno.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../interface/Status";
import {Aluno} from "../../interface/Aluno";

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent {

  formulario!: FormGroup;

  constructor(private service: AlunoService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  statusCombo: Status[] = [
    {description: 'ATIVO', value: 'ATIVO'},
    {description: 'INATIVO', value: 'INATIVO'},
  ];

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      codigo: [undefined],
      nome: ["", Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      cpf: ["",],
      endereco: ["",],
      celular: ["",],
      cidade: ['Lins',],
      status: ["ATIVO", Validators.required],
      data_cadastro: new Date(),
      data_nasc: [null],
      celular2: [""],
      rg: [""],
      complemento: [""],
      bairro: [""],
      uf: [""],
      nomeResponsavel: [""],
      celResponsavel: [""]
    });

    //editando: o form serve para inserir e editar, se vir o codigo na URL então vamos editar
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.buscarPorId(Number(codigo));
    }
    //fim editando

  }

  salvar() {
    if (this.formulario.valid) {
      if (this.formulario.get('codigo')?.value) {
        this.service.editar(this.formulario.value).subscribe(() => {
          this.router.navigate(['/alunoList']);
        });
      } else {
        this.service.criar(this.formulario.value).subscribe(() => {
          this.router.navigate(['/alunoList']);
        });
      }
    }
  }

  buscarPorId(codigo: number) {
    this.service.buscarPorId(codigo).subscribe((result) => {
      this.formulario.patchValue(result);
      this.setDataFormatada(result.data_cadastro, 'data_cadastro');
      this.setDataFormatada(result.data_nasc, 'data_nasc');
    });
  }

  private setDataFormatada(data: string, controlName: string) {
    const partesData = data.split('-');
    const ano = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]) - 1; // Subtrai 1 para ajustar o mês
    const dia = parseInt(partesData[2]);
    this.formulario.controls[controlName].setValue(new Date(ano, mes, dia));
  }
}
