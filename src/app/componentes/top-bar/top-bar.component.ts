import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  nomeProfissional!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    try {
      this.nomeProfissional = JSON.parse(atob(<string>localStorage.getItem('nomeProfissional')));
    } catch (e) {
      alert("Sessão expirada. Por favor, faça o login novamente.")
      this.router.navigate(['/login']);
    }
  }

  deslogar() {
    if (confirm('Deseja realmente deslogar do sistema?')) {
      alert("Deslogado com sucesso.")
      // localStorage.setItem('token', btoa(JSON.stringify(null)));
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
