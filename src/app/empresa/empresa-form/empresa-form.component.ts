import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../interface/Status";
import {EmpresaService} from "../../service/empresa.service";
import {debounceTime} from 'rxjs/operators';
import {Observable, startWith} from "rxjs";
import {ProfissionalService} from "../../service/profissional.service";
import {map} from 'rxjs/operators';
import {Profissional} from "../../interface/Profissional";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent {

  formulario!: FormGroup;
  suggestions: any | undefined;

  constructor(private service: EmpresaService,
              private profissionalService: ProfissionalService,
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
      endereco: ['',],
      bairro: [""],
      telefone: ['',],
      cidade: ['Lins',],
      uf: [""],
      responsavel: [undefined, Validators.required],
      data_inicio: [''],
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
          this.router.navigate(['/empresaList']);
        });
      } else {
        this.service.criar(this.formulario.value).subscribe(() => {
          this.router.navigate(['/empresaList']);
        });
      }
    }
  }

  buscarPorId(codigo: number) {
    this.service.buscarPorId(codigo).subscribe((result) => {
      this.formulario.patchValue(result);
      const partesData = result.data_inicio.split('-');
      const ano = parseInt(partesData[0]);
      const mes = parseInt(partesData[1]) - 1; // Subtrai 1 para ajustar o mês
      const dia = parseInt(partesData[2]);
      this.formulario.controls['data_inicio'].setValue(new Date(ano,mes,dia));
    });
  }

  search(event: AutoCompleteCompleteEvent) {
    this.profissionalService.listar(event.query).subscribe({
        next: (result) => {
          this.suggestions = result;
        },
        error: (erro) => {
          this.verifyErro(erro);
        }
      }
    );
  }

  public verifyErro(erro: any) {
    if (erro.status === 401 || erro.status === 403) {
      alert("Sessão expirada. Por favor, faça o login novamente.")
      this.router.navigate(['/login'])
    }
  }

}
