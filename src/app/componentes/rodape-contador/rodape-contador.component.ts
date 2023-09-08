import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rodape-contador',
  templateUrl: './rodape-contador.component.html',
  styleUrls: ['./rodape-contador.component.css']
})
export class RodapeContadorComponent {

  @Input() qtd: number;

constructor() {
  this.qtd = 0;
}

}
