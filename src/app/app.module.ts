import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PrincipalComponent} from './principal/principal.component';
import {EmpresaListComponent} from './empresa/empresa-list/empresa-list.component';
import {EmpresaFormComponent} from './empresa/empresa-form/empresa-form.component';
import {AlunoListComponent} from './aluno/aluno-list/aluno-list.component';
import {AlunoFormComponent} from './aluno/aluno-form/aluno-form.component';
import {TopBarComponent} from './componentes/top-bar/top-bar.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {RodapeContadorComponent} from './componentes/rodape-contador/rodape-contador.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";
import { MatriculaListComponent } from './aluno/matricula/matricula-list/matricula-list.component';
import { MatriculaFormComponent } from './aluno/matricula/matricula-form/matricula-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    EmpresaListComponent,
    EmpresaFormComponent,
    AlunoListComponent,
    AlunoFormComponent,
    LoginComponent,
    TopBarComponent,
    RodapeContadorComponent,
    MatriculaListComponent,
    MatriculaFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule,
    MatSelectModule, MatDividerModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule,
    MatAutocompleteModule,
    ButtonModule, CardModule, InputTextModule, CalendarModule, AutoCompleteModule, DropdownModule, PanelModule, DividerModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
