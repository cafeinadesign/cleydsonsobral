import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoliticaDeCancelamentoComponent } from './politica-de-cancelamento.component';

describe('PoliticaDeCancelamentoComponent', () => {
  let component: PoliticaDeCancelamentoComponent;
  let fixture: ComponentFixture<PoliticaDeCancelamentoComponent>;

  beforeEach(waitForAsync(() => {
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
