import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlunoService} from "../../service/aluno.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent {

  @Input() matriculaFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.matriculaFormGroup = this.formBuilder.group({
      numeroMatricula: ['', Validators.required]
    });
  }

}
