import {Component, Input, ViewChild} from '@angular/core';
import {AlunoService} from "../service/aluno.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../interface/Status";
import {MatriculaComponent} from "./matricula/matricula.component";

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent {

  formulario!: FormGroup;
  @ViewChild(MatriculaComponent) matriculaComponent!: MatriculaComponent;

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
      nome: ['', Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )],
      cpf: ['',],
      endereco: ['',],
      celular: ['',],
      cidade: ['Lins',],
      status: ["ATIVO", Validators.required],

      data_cadastro: new Date(), // Initialize with the current date and time
      data_nasc: [null],
      celular2: [""],
      rg: [""],
      complemento: [""],
      bairro: [""],
      uf: [""]
    });

    //editando: o form serve para inserir e editar, se vir o codigo na URL então vamos editar
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.buscarPorId(Number(codigo));
    }
    //fim editando

  }

  salvar() {
    const alunoForm = this.formulario;
    const matriculaForm = this.matriculaComponent.matriculaFormGroup;

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
    this.service.buscarPorId(codigo).subscribe((a) => {
      this.formulario.patchValue(a);
    });
  }
}
