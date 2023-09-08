import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

  }

}
