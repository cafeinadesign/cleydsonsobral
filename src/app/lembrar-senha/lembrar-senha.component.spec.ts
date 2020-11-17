import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LembrarSenhaComponent } from './lembrar-senha.component';

describe('LembrarSenhaComponent', () => {
  let component: LembrarSenhaComponent;
  let fixture: ComponentFixture<LembrarSenhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LembrarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembrarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
