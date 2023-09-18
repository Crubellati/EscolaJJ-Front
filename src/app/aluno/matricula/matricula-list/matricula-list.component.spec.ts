import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaListComponent } from './matricula-list.component';

describe('MatriculaListComponent', () => {
  let component: MatriculaListComponent;
  let fixture: ComponentFixture<MatriculaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatriculaListComponent]
    });
    fixture = TestBed.createComponent(MatriculaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
