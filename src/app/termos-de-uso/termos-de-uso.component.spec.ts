import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TermosDeUsoComponent } from './termos-de-uso.component';

describe('TermosDeUsoComponent', () => {
  let component: TermosDeUsoComponent;
  let fixture: ComponentFixture<TermosDeUsoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TermosDeUsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermosDeUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
