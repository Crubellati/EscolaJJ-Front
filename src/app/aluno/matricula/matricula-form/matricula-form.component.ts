import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlunoService} from "../../../service/aluno.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../../interface/Status";
import {MatriculaService} from "../../../service/matricula.service";

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styleUrls: ['./matricula-form.component.css']
})
export class MatriculaFormComponent {

  formulario!: FormGroup;
  nomeAluno?: string;

  constructor(private service: MatriculaService,
              private router: Router,
              private alunoService: AlunoService,
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
      dataInicio: [new Date(), Validators.required],
      dataFinal: [null],
      observacao: [""],
      diaVencimento: ["01", Validators.required],
      valorMensalidade: [""]
    });

    const aluno = this.route.snapshot.paramMap.get('aluno');
    if (aluno != null) {
      this.buscarAluno(parseInt(aluno));
    }

    const matriculaCodigo = this.route.snapshot.paramMap.get('matricula');
    if (matriculaCodigo != null) {
      this.buscarMatriculaPorId(parseInt(matriculaCodigo));
    }
  }

  buscarAluno(aluno:number) {
      this.alunoService.buscarPorId(aluno).subscribe((aluno) => {
        this.nomeAluno = aluno.nome;
      });
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

  buscarMatriculaPorId(codigo: number) {
    this.service.buscarPorId(codigo).subscribe((result) => {
      this.formulario.patchValue(result);
      if (result.dataInicio != null) {
        this.setDataFormatada(result.dataInicio, 'dataInicio');
      }
      if (result.dataFinal != null) {
        this.setDataFormatada(result.dataFinal, 'dataFinal');
      }
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
