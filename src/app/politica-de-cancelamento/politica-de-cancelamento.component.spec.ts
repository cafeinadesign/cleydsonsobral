import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaDeCancelamentoComponent } from './politica-de-cancelamento.component';

describe('PoliticaDeCancelamentoComponent', () => {
  let component: PoliticaDeCancelamentoComponent;
  let fixture: ComponentFixture<PoliticaDeCancelamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaDeCancelamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaDeCancelamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
