import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlunoFormComponent} from "./aluno/aluno-form/aluno-form.component";
import {AlunoListComponent} from "./aluno/aluno-list/aluno-list.component";
import {PrincipalComponent} from "./principal/principal.component";
import {BrowserModule} from "@angular/platform-browser";
import {EmpresaListComponent} from "./empresa/empresa-list/empresa-list.component";
import {LoginComponent} from "./login/login.component";
import {EmpresaFormComponent} from "./empresa/empresa-form/empresa-form.component";
import {MatriculaListComponent} from "./aluno/matricula/matricula-list/matricula-list.component";
import {MatriculaFormComponent} from "./aluno/matricula/matricula-form/matricula-form.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'principal', component: PrincipalComponent},

  { path: 'alunoList', component: AlunoListComponent},
  { path: 'alunoForm/:codigo', component: AlunoFormComponent },
  { path: 'alunoForm', component: AlunoFormComponent },

  { path: 'empresaForm/:codigo', component: EmpresaFormComponent },
  { path: 'empresaForm', component: EmpresaFormComponent },
  { path: 'empresaList', component: EmpresaListComponent },

  { path: 'matriculaList/:aluno', component: MatriculaListComponent },
  { path: 'matriculaForm/new/:aluno', component: MatriculaFormComponent },
  { path: 'matriculaForm/edit/:matricula', component: MatriculaFormComponent }];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
